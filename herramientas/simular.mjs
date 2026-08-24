// ============================================================================
// SIMULAR — jugar el contrato mil veces sin tocar el ratón
// ============================================================================
//   node herramientas/simular.mjs [partidas]
//
// El corrector (`revisar.mjs`) mira si el contenido está bien escrito. Esto mira
// si el juego está bien BALANCEADO, que es otra cosa y no se ve leyendo.
//
// Juegan cuatro perfiles y ninguno es un jugador real —los jugadores reales
// aprenden—, pero entre los cuatro acotan el campo:
//
//   obediente   sabe el memorando de memoria y no falla nunca. Es el techo:
//               si ÉSTE acaba despedido, el juego es injusto.
//   tijeras     censura todo. El Ministerio debería quererle y la calle odiarle.
//   manga-ancha aprueba todo. Debería durar poco.
//   despistado  acierta seis de cada diez. Es el suelo razonable: si éste
//               sobrevive siempre, el juego no tiene tensión.
//
// LO QUE SE BUSCA. Que el obediente llegue al día 7 SIEMPRE, que el despistado
// llegue a veces, y que los dos finales se repartan. Un juego donde todo el
// mundo acaba igual no tiene decisiones: tiene un pasillo.
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
  tijeras: () => 'censurar',
  'manga-ancha': () => 'aprobar',
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
      let decision = PERFILES[perfil](dict, dado);
      // Sin sellos no se puede censurar, aunque el perfil quiera.
      if (decision === 'censurar' && !Partida.puedeCensurar(p)) decision = 'aprobar';
      Partida.resolver(p, decision, false);
    }
    Partida.cerrarDia(p);
  }
  return { ...Partida.contrato(p), perfil };
}

const resumen = {};
for (const perfil of Object.keys(PERFILES)) {
  const r = { modelo: 0, chivo: 0, despedidos: 0, dias: 0, precision: 0, gobierno: 0, pueblo: 0 };
  for (let i = 0; i < CUANTAS; i++) {
    const f = jugar(perfil, i + 1);
    r[f.id]++;
    if (f.despedido) r.despedidos++;
    r.dias += f.dias; r.precision += f.precision;
    r.gobierno += f.gobierno; r.pueblo += f.pueblo;
  }
  resumen[perfil] = r;
}

const pct = (n) => `${Math.round((n / CUANTAS) * 100)} %`;
const med = (n) => (n / CUANTAS).toFixed(1);

console.log(`${CUANTAS} contratos por perfil\n`);
console.log('perfil       días  precisión  gobierno  pueblo  despedido  modelo   chivo');
console.log('───────────────────────────────────────────────────────────────────────────');
for (const [perfil, r] of Object.entries(resumen)) {
  console.log(
    perfil.padEnd(12) +
    med(r.dias).padStart(4) +
    `${med(r.precision)} %`.padStart(11) +
    med(r.gobierno).padStart(10) +
    med(r.pueblo).padStart(8) +
    pct(r.despedidos).padStart(11) +
    pct(r.modelo).padStart(8) +
    pct(r.chivo).padStart(8)
  );
}

// Las tres cosas que tienen que cumplirse para que el juego sea un juego.
const fallos = [];
const o = resumen.obediente;
if (o.despedidos) fallos.push(`El obediente acaba despedido el ${pct(o.despedidos)} de las veces. Es el techo: no debería caer nunca.`);
if (o.modelo < CUANTAS) fallos.push(`El obediente solo llega a burócrata modelo el ${pct(o.modelo)} de las veces.`);
const d = resumen.despistado;
if (d.despedidos === 0) fallos.push('El despistado no cae nunca: sobra margen y el juego no tiene tensión.');
if (d.despedidos === CUANTAS) fallos.push('El despistado cae siempre: el margen es demasiado estrecho.');
const t = resumen.tijeras;
if (t.pueblo / CUANTAS > 30) fallos.push(`Censurarlo todo deja al pueblo en ${med(t.pueblo)}: censurar de más sale barato.`);

console.log('');
if (fallos.length) { fallos.forEach((f) => console.log(`BALANCE  ${f}`)); process.exit(1); }
console.log('El balance cumple: el obediente sobrevive siempre, el despistado a veces, y censurarlo todo se paga.');
