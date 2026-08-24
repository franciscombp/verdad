// ============================================================================
// REVISAR — el corrector de pruebas
// ============================================================================
//   node herramientas/revisar.mjs
//
// Lee la capa de datos entera y comprueba lo que un humano no puede comprobar
// setenta veces seguidas sin equivocarse. Dos clases de aviso:
//
//   ERROR   rompe el juego o miente al jugador. Sale con código 1.
//   AVISO   huele mal pero se puede jugar. Sale con código 0.
//
// LO QUE MÁS SE ROMPE, Y POR QUÉ ESTÁ AQUÍ. Las `marcas` son frases que el
// escritorio busca DENTRO del texto para subrayarlas. Una coma de diferencia y
// no subraya nada: el jugador no ve la prueba y el juego le castiga por no
// verla. Es un fallo invisible en el navegador y evidente aquí.
//
// LO SEGUNDO: que un día se pueda jugar. Si un día pide cuatro censuras y solo
// llegan tres piezas censurables, ese día está perdido de antemano y no por
// culpa de nadie. El motor lo permite —hay días en que los sellos no llegan a
// la cuota y eso es diseño—, pero tiene que ser una decisión escrita, no un
// descuido del contenido.
// ============================================================================

import { DATOS } from '../datos/index.js';

import { dictamen } from '../juego/motor/evaluacion.js';

const errores = [];
const avisos = [];
const err = (m) => errores.push(m);
const avi = (m) => avisos.push(m);

const vistos = { id: new Map(), expediente: new Map() };
// Solo los temas que ACUSAN. Los de `salvo` —«oposicion», «minimizada»— son
// exenciones, y una exención no se subraya: no hay nada que enseñarle al
// jugador salvo la ausencia del castigo.
const TEMAS_CALIENTES = new Set(
  Object.values(DATOS.REGLAS).flatMap((r) => r.detecta.temas || [])
);

for (const guion of DATOS.CAMPANA) {
  const piezas = DATOS.PIEZAS[guion.dia] || [];
  const reglas = guion.reglas.map((id) => ({ id, ...DATOS.REGLAS[id] }));

  for (const id of guion.reglas) {
    if (!DATOS.REGLAS[id]) err(`Día ${guion.dia}: la regla «${id}» no existe.`);
  }
  if (!DATOS.DIFICULTAD.includes(guion.dificultad)) {
    err(`Día ${guion.dia}: «${guion.dificultad}» no es una etiqueta de dificultad. Las hay en reglas.js.`);
  }

  if (piezas.length !== guion.piezas) {
    err(`Día ${guion.dia}: el guion pide ${guion.piezas} piezas y hay ${piezas.length}.`);
  }

  const cuenta = { censurar: 0, aprobar: 0, conflicto: 0, limpias: 0 };

  for (const pz of piezas) {
    const donde = `Día ${guion.dia} · ${pz.id}`;

    // ── identidad ──────────────────────────────────────────────────────
    if (vistos.id.has(pz.id)) err(`${donde}: id repetido (también en ${vistos.id.get(pz.id)}).`);
    vistos.id.set(pz.id, donde);
    if (vistos.expediente.has(pz.expediente)) {
      err(`${donde}: expediente ${pz.expediente} repetido (también en ${vistos.expediente.get(pz.expediente)}).`);
    }
    vistos.expediente.set(pz.expediente, donde);

    // ── que el medio y el autor existan y se conozcan ──────────────────
    const medio = DATOS.MEDIOS[pz.medio];
    const autor = DATOS.AUTORES[pz.autor];
    if (!medio) err(`${donde}: medio desconocido «${pz.medio}».`);
    if (!autor) err(`${donde}: autor desconocido «${pz.autor}».`);
    if (medio && autor && autor.medio && autor.medio !== pz.medio) {
      err(`${donde}: ${autor.nombre} escribe en ${autor.medio}, no en ${pz.medio}.`);
    }

    // ── las marcas, que es donde se rompe todo ─────────────────────────
    const texto = [pz.entradilla, ...(pz.cuerpo || [])].join('\n');
    for (const marca of pz.marcas || []) {
      if (!texto.includes(marca.texto)) {
        err(`${donde}: la marca «${marca.texto}» no aparece literal en el texto.`);
      }
      if (!(pz.temas || []).includes(marca.tema)) {
        err(`${donde}: la marca «${marca.texto}» declara el tema «${marca.tema}» y no está en temas.`);
      }
    }
    // Un tema caliente sin marca es una acusación sin pruebas: la regla salta y
    // el jugador no tiene nada subrayado que mirar.
    for (const tema of pz.temas || []) {
      if (TEMAS_CALIENTES.has(tema) && !(pz.marcas || []).some((m) => m.tema === tema)) {
        avi(`${donde}: tema caliente «${tema}» sin ninguna marca que lo señale.`);
      }
    }

    // ── forma ──────────────────────────────────────────────────────────
    if (!pz.titular || pz.titular.length > 120) avi(`${donde}: titular de ${pz.titular?.length ?? 0} caracteres.`);
    if (!pz.entradilla || pz.entradilla.length < 80) avi(`${donde}: entradilla muy corta para decidir con ella.`);
    if (!Array.isArray(pz.cuerpo) || pz.cuerpo.length < 2) err(`${donde}: el cuerpo necesita al menos dos párrafos.`);
    if (!['critico', 'neutro', 'elogioso'].includes(pz.tono)) err(`${donde}: tono inválido «${pz.tono}».`);

    // ── qué haría el motor con ella ────────────────────────────────────
    const d = dictamen(pz, reglas);
    if (d.contradiccion) cuenta.conflicto++;
    else cuenta[d.exige]++;
    if (d.limpia) cuenta.limpias++;
  }

  // ── ¿el día se puede jugar? ──────────────────────────────────────────
  const censurables = cuenta.censurar + cuenta.conflicto;
  if (guion.cuota != null && censurables < guion.cuota) {
    err(`Día ${guion.dia}: la cuota pide ${guion.cuota} censuras y solo hay ${censurables} piezas censurables.`);
  }
  if (guion.cuota != null && guion.sellos != null && guion.sellos < guion.cuota) {
    avi(`Día ${guion.dia}: ${guion.sellos} sellos para una cuota de ${guion.cuota}. Día sin solución buena (¿a propósito?).`);
  }
  if (guion.dia >= 3 && !cuenta.conflicto) {
    err(`Día ${guion.dia}: desde el Día 3 tiene que haber al menos una contradicción y no hay ninguna.`);
  }
  if (!cuenta.aprobar) avi(`Día ${guion.dia}: no hay ni una pieza que se deba aprobar.`);
  if (!cuenta.censurar) avi(`Día ${guion.dia}: no hay ni una pieza que se deba censurar.`);

  const total = piezas.length || 1;
  console.log(
    `Día ${guion.dia} · ${String(piezas.length).padStart(2)} piezas` +
    ` · censurar ${String(cuenta.censurar).padStart(2)}` +
    ` · aprobar ${String(cuenta.aprobar).padStart(2)}` +
    ` · conflicto ${cuenta.conflicto}` +
    ` · limpias ${cuenta.limpias}` +
    ` · reglas: ${guion.reglas.join(', ')}` +
    (Math.max(cuenta.censurar, cuenta.aprobar) / total > 0.8 ? '   ⚠ desequilibrado' : '')
  );
}

console.log('');
for (const a of avisos) console.log(`AVISO  ${a}`);
for (const e of errores) console.log(`ERROR  ${e}`);
console.log(`\n${errores.length} errores · ${avisos.length} avisos`);
process.exit(errores.length ? 1 : 0);
