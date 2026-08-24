// ============================================================================
// SIMULAR — jugar el contrato mil veces sin tocar el ratón
// ============================================================================
//   node herramientas/simular.mjs [partidas]
//
// El corrector (`revisar.mjs`) mira si el contenido está bien escrito. Esto mira
// si el juego está bien BALANCEADO, que es otra cosa y no se ve leyendo.
//
// Juegan cinco perfiles y ninguno es un jugador real —los jugadores reales
// aprenden—, pero entre los cinco acotan el campo:
//
//   obediente   sabe el memorando de memoria y no falla nunca. Es el techo:
//               si ÉSTE acaba despedido, el juego es injusto.
//   tijeras     censura todo. El Ministerio debería quererle y la calle odiarle.
//   manga-ancha aprueba todo. Debería durar poco.
//   casi        se sabe el memorando y falla una de cada siete. Es el jugador
//               de verdad, y el que decide si el juego es duro o injusto:
//               debería sobrevivir casi siempre y quedarse cerca del Final A.
//   despistado  acierta seis de cada diez. Es el suelo razonable: si éste
//               sobrevive siempre, el juego no tiene tensión.
//   astuto      sabe lo mismo que el obediente y además usa el tercer verbo:
//               rectifica las contradicciones y, cuando se le acaban los
//               sellos, adecúa en vez de dejar pasar. Debería acabar con MÁS
//               apoyo popular que el obediente sin perder al Gobierno.
//
// LO QUE SE BUSCA. Que el obediente llegue al día 7 SIEMPRE, que el despistado
// llegue a veces, que censurarlo todo se pague en la calle y que el astuto acabe
// mejor que el obediente. Un juego donde todo el mundo acaba igual no tiene
// decisiones: tiene un pasillo.
// ============================================================================

import { DATOS } from '../datos/index.js';
import * as Partida from '../juego/motor/partida.js';
import { dictamen } from '../juego/motor/evaluacion.js';

const CUANTAS = Number(process.argv[2]) || 400;

// Un generador con semilla: dos ejecuciones seguidas tienen que dar lo mismo o
// esto no sirve para comparar antes y después de un cambio de balance.
function aleatorio(semilla) {
  let s = semilla >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

const PERFILES = {
  obediente: (dict) => (dict.contradiccion ? 'censurar' : dict.exige),
  // El único que juega el juego entero. `puede` dice si hoy se puede rectificar.
  astuto: (dict, dado, puede) => {
    if (dict.contradiccion) return puede ? 'rectificar' : 'censurar';
    if (dict.exige === 'censurar' && puede) return 'censurar';
    return dict.exige;
  },
  tijeras: () => 'censurar',
  'manga-ancha': () => 'aprobar',
  // El jugador de verdad, más o menos: se sabe el memorando y falla una de cada
  // siete. Es el que decide si el juego es duro o injusto.
  casi: (dict, dado) => {
    const bueno = dict.contradiccion ? 'censurar' : dict.exige;
    if (dado() < 0.86) return bueno;
    return bueno === 'censurar' ? 'aprobar' : 'censurar';
  },
  despistado: (dict, dado) => {
    const bueno = dict.contradiccion ? 'censurar' : dict.exige;
    if (dado() < 0.6) return bueno;
    return bueno === 'censurar' ? 'aprobar' : 'censurar';
  },
};

function jugar(perfil, semilla) {
  const dado = aleatorio(semilla);
  const p = Partida.nueva(DATOS, { conReloj: false });

  while (p.dia < DATOS.CAMPANA.length && !p.despedido) {
    const j = Partida.abrirDia(p);
    while (Partida.pieza(p)) {
      const dict = dictamen(Partida.pieza(p), j.reglas);
      const adecuable = Partida.puedeRectificar(p);
      let decision = PERFILES[perfil](dict, dado, adecuable);
      // Sin sellos no se puede censurar. El astuto adecúa; los demás no saben.
      if (decision === 'censurar' && !Partida.puedeCensurar(p)) {
        decision = perfil === 'astuto' && adecuable ? 'rectificar' : 'aprobar';
      }
      if (decision === 'rectificar' && !adecuable) decision = dict.exige || 'censurar';
      Partida.resolver(p, decision, false);
    }
    Partida.cerrarDia(p);
  }
  return { ...Partida.contrato(p), perfil };
}

const resumen = {};
for (const perfil of Object.keys(PERFILES)) {
  const r = { modelo: 0, chivo: 0, despedidos: 0, dias: 0, precision: 0, gobierno: 0, pueblo: 0, adecuadas: 0 };
  for (let i = 0; i < CUANTAS; i++) {
    const f = jugar(perfil, i + 1);
    r[f.id]++;
    if (f.despedido) r.despedidos++;
    r.dias += f.dias; r.precision += f.precision;
    r.gobierno += f.gobierno; r.pueblo += f.pueblo;
    r.adecuadas += f.total.rectificadas;
  }
  resumen[perfil] = r;
}

const pct = (n) => `${Math.round((n / CUANTAS) * 100)} %`;
const med = (n) => (n / CUANTAS).toFixed(1);

console.log(`${CUANTAS} contratos por perfil\n`);
console.log('perfil       días  precisión  gobierno  pueblo  adecuadas  despedido  modelo   chivo');
console.log('──────────────────────────────────────────────────────────────────────────────────────');
for (const [perfil, r] of Object.entries(resumen)) {
  console.log(
    perfil.padEnd(12) +
    med(r.dias).padStart(4) +
    `${med(r.precision)} %`.padStart(11) +
    med(r.gobierno).padStart(10) +
    med(r.pueblo).padStart(8) +
    med(r.adecuadas).padStart(11) +
    pct(r.despedidos).padStart(11) +
    pct(r.modelo).padStart(8) +
    pct(r.chivo).padStart(8)
  );
}

// Lo que tiene que cumplirse para que el juego sea un juego. Si algo de esto
// falla, el contenido o el balance han dejado de sostener las decisiones.
const fallos = [];
const o = resumen.obediente;
if (o.despedidos) fallos.push(`El obediente acaba despedido el ${pct(o.despedidos)} de las veces. Es el techo: no debería caer nunca.`);
if (o.modelo < CUANTAS) fallos.push(`El obediente solo llega a burócrata modelo el ${pct(o.modelo)} de las veces.`);
const c = resumen.casi;
if (c.despedidos > CUANTAS * 0.25) fallos.push(`El que falla una de cada siete acaba despedido el ${pct(c.despedidos)} de las veces: el juego es injusto, no duro.`);
// El punto más importante de la curva: el jugador de verdad tiene que poder
// llegar al Final A y no tenerlo garantizado. Si siempre llega, acertar no
// significa nada; si no llega nunca, el final bueno es decorativo.
if (c.modelo < CUANTAS * 0.1 || c.modelo > CUANTAS * 0.6) {
  fallos.push(`El que falla una de cada siete llega a burócrata modelo el ${pct(c.modelo)} de las veces. Debería estar entre el 10 % y el 60 %: ni regalado ni imposible.`);
}
const d = resumen.despistado;
if (d.despedidos === 0) fallos.push('El despistado no cae nunca: sobra margen y el juego no tiene tensión.');
if (d.despedidos === CUANTAS) fallos.push('El despistado cae siempre: el margen es demasiado estrecho.');
const t = resumen.tijeras;
if (t.pueblo / CUANTAS > 30) fallos.push(`Censurarlo todo deja al pueblo en ${med(t.pueblo)}: censurar de más sale barato.`);
const a = resumen.astuto;
if (a.despedidos) fallos.push(`El astuto acaba despedido el ${pct(a.despedidos)} de las veces: el tercer verbo no puede castigar a quien lo usa bien.`);
if (a.pueblo <= o.pueblo) fallos.push(`El astuto acaba con ${med(a.pueblo)} de apoyo popular y el obediente con ${med(o.pueblo)}: rectificar no está sirviendo de nada.`);

console.log('');
if (fallos.length) { fallos.forEach((f) => console.log(`BALANCE  ${f}`)); process.exit(1); }
console.log('El balance cumple: el obediente sobrevive siempre, el despistado a veces, censurarlo todo se paga\ny quien usa el tercer verbo acaba mejor con la calle sin perder al Gobierno.');
