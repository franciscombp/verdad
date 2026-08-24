// ============================================================================
// LA PARTIDA — el estado, y las cinco cosas que se le pueden hacer
// ============================================================================
// Todo lo que el juego sabe cabe en un objeto. Las pantallas lo leen y no lo
// tocan; solo estas funciones lo mueven, y cada una devuelve lo que hay que
// pintar. Si mañana esto se guarda en un servidor o se rebobina para repetir
// una jornada, no hay que buscar el estado por seis archivos: está aquí.
//
//   nueva(datos, opciones)   arranca un contrato de siete días
//   abrirDia(p)              prepara la jornada: reglas, piezas, sellos, cuota
//   pieza(p)                 la que está encima de la mesa
//   resolver(p, decision)    la sella y devuelve el informe
//   cerrarDia(p)             el reporte de la jornada y si sigue habiendo turno
//   contrato(p)              el final
// ============================================================================

import { dictamen, riesgo, consecuencias, motivo, esperado } from './evaluacion.js';

const TOPE = (n) => Math.max(0, Math.min(100, n));

// El turno son nueve horas y siempre las mismas. Que la hora avance con las
// piezas y no con el reloj de verdad es deliberado: en el Ministerio el tiempo
// lo marca el trabajo pendiente.
const ENTRADA = 8 * 60;
const JORNADA = 9 * 60;

export function nueva(datos, opciones = {}) {
  return {
    datos,
    conReloj: opciones.conReloj !== false,
    dia: 0,                       // 0 = todavía no ha empezado el primer día
    gobierno: datos.INICIO.gobierno,
    pueblo: datos.INICIO.pueblo,
    estabilidad: datos.INICIO.estabilidad,
    paranoia: 0,                  // sube con cada infracción; entra en el riesgo
    firmasBuencan: 0,             // el protocolo se dispara a la tercera
    jornada: null,
    historial: [],                // un reporte por día cerrado
    total: { procesadas: 0, correctas: 0, omitidas: 0, censuradas: 0, rectificadas: 0 },
    despedido: false,
  };
}

/* ─── abrir la jornada ────────────────────────────────────────────────────
   Resuelve el memorando —los ids del día se convierten en reglas de verdad— y
   deja la mesa puesta. Las piezas llegan EN EL ORDEN ESCRITO: el guion de un
   día está pensado como una curva (fácil, fácil, trampa, difícil), y barajarlo
   la rompería. */
export function abrirDia(p) {
  const guion = p.datos.CAMPANA[p.dia];
  const reglas = guion.reglas.map((id) => ({ id, ...p.datos.REGLAS[id] }));
  const piezas = (p.datos.PIEZAS[guion.dia] || []).slice(0, guion.piezas);

  p.jornada = {
    guion,
    reglas,
    piezas,
    i: 0,
    sellos: guion.sellos,           // null = sin límite
    procesadas: 0,
    correctas: 0,
    omitidas: 0,
    censuradas: 0,
    rectificadas: 0,
    injustificadas: 0,
    conflictos: 0,
    delta: { gobierno: 0, pueblo: 0, estabilidad: 0 },
    ultimo: null,
  };
  return p.jornada;
}

export function pieza(p) {
  const j = p.jornada;
  return j && j.i < j.piezas.length ? j.piezas[j.i] : null;
}

export function quedan(p) {
  const j = p.jornada;
  return j ? j.piezas.length - j.i : 0;
}

// La hora que marca el terminal, en función de lo que lleva despachado.
export function hora(p) {
  const j = p.jornada;
  const avance = j && j.piezas.length ? (j.i / j.piezas.length) * JORNADA : 0;
  const m = Math.round(ENTRADA + avance);
  const h24 = Math.floor(m / 60);
  const min = String(m % 60).padStart(2, '0');
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${String(h12).padStart(2, '0')}:${min} ${h24 < 12 ? 'AM' : 'PM'}`;
}

// ¿Le quedan sellos para censurar? Cuando no, el botón se apaga y la cuota del
// día se vuelve imposible. Eso también es una decisión de diseño.
export function puedeCensurar(p) {
  const j = p.jornada;
  return j.sellos === null || j.sellos > 0;
}

/* ¿Se le puede pedir una rectificación a este medio?

   COOPTACIÓN, el segundo vector jugable. En vez de retirar la pieza se le hace
   reescribirla: sale más barato en la calle, no gasta sello y no cuenta para la
   cuota. A cambio, el Ministerio paga menos por una nota adecuada que por una
   nota que no existe.

   No vale con todos. Un medio HOSTIL no se coopta —su vector es la represión
   total y ese es todo su chiste: a PICHI RADIO no se le pide nada, se le
   cierra—. Y el verbo no existe el primer día: el Acto 1 enseña dos botones,
   y el tercero llega cuando ya duele tener solo dos. */
export function puedeRectificar(p) {
  const j = p.jornada;
  if (!j.guion.rectificar) return false;
  const pz = pieza(p);
  if (!pz) return false;
  const medio = p.datos.MEDIOS[pz.medio];
  return !!medio && medio.faccion !== 'hostil';
}

/* ─── resolver una pieza ──────────────────────────────────────────────────
   `decision` es 'aprobar' | 'censurar' | 'rectificar'. `porTiempo` marca las
   que se archivan solas cuando se acaba el reloj: el silencio administrativo
   aprueba. */
export function resolver(p, decision, porTiempo = false) {
  const j = p.jornada;
  const pz = pieza(p);
  if (!pz) return null;

  const medio = p.datos.MEDIOS[pz.medio];
  const autor = p.datos.AUTORES[pz.autor];
  const dict = dictamen(pz, j.reglas);
  const nivel = riesgo(pz, { medio, autor, dict, estado: p });
  const res = consecuencias({ decision, dict, nivel });

  p.gobierno = TOPE(p.gobierno + res.gobierno);
  p.pueblo = TOPE(p.pueblo + res.pueblo);
  p.estabilidad = TOPE(p.estabilidad + res.estabilidad);

  j.delta.gobierno += res.gobierno;
  j.delta.pueblo += res.pueblo;
  j.delta.estabilidad += res.estabilidad;

  j.procesadas++;
  p.total.procesadas++;
  if (res.correcta) { j.correctas++; p.total.correctas++; }
  if (res.clase === 'omision') { j.omitidas++; p.total.omitidas++; p.paranoia++; }
  if (res.clase === 'celo') { j.injustificadas++; p.paranoia++; }
  if (dict.contradiccion) j.conflictos++;
  if (decision === 'censurar') {
    j.censuradas++; p.total.censuradas++;
    if (j.sellos !== null) j.sellos--;
  }
  // Rectificar no gasta sello y NO cuenta para la cuota: el Ministerio quiere
  // tijeras, y una nota reescrita sigue estando ahí.
  if (decision === 'rectificar') { j.rectificadas++; p.total.rectificadas++; }
  if (pz.autor === 'andres-buencan') p.firmasBuencan++;

  const informe = {
    pieza: pz,
    medio, autor,
    decision, porTiempo,
    dict,
    nivel,
    esperado: esperado(dict),
    resultado: res,
    motivo: motivo(dict, res, decision),
    // El protocolo migratorio se dispara con la tercera firma y solo una vez.
    protocolo: pz.autor === 'andres-buencan' && p.firmasBuencan === 3 ? 'buencan' : null,
    // Y la cuarta llega igual. El expediente lo dice sin inmutarse, que es
    // exactamente lo que hace un expediente: el hombre está fuera del país y su
    // columna sigue entrando por el mismo cable de todas las semanas. No hay
    // que subrayarlo ni explicarlo; basta con que conste.
    posdata: pz.autor === 'andres-buencan' && p.firmasBuencan > 3
      ? p.datos.POSDATAS.buencan : null,
  };

  j.ultimo = informe;
  j.i++;
  return informe;
}

/* ─── cerrar la jornada ───────────────────────────────────────────────────
   Aquí es donde se pasa factura por lo que NO se hizo: la cuota de censura.
   El Ministerio no pide que aciertes; pide que cortes. */
export function cerrarDia(p) {
  const j = p.jornada;
  const g = j.guion;
  const precision = j.procesadas ? Math.round((j.correctas / j.procesadas) * 100) : 0;

  // La confianza del Gobierno se descuenta sola cada noche. Ver `presion` en
  // `campana.js`: no castiga nada, solo sube el listón.
  const presion = g.presion || 0;
  p.gobierno = TOPE(p.gobierno - presion);

  // Y si la confianza cae por debajo del suelo, el puesto empieza a moverse.
  // Las dos barras del Ministerio tienen que hablarse: un funcionario en el que
  // el Gobierno ya no confía no conserva la silla por inercia, la conserva
  // hasta que alguien mira el expediente. Aquí, cada noche.
  const DESCONFIANZA = 25;
  const desconfiado = p.gobierno < DESCONFIANZA;
  if (desconfiado) p.estabilidad = TOPE(p.estabilidad - 5);

  let castigoCuota = 0;
  const cuotaIncumplida = g.cuota != null && j.censuradas < g.cuota;
  if (cuotaIncumplida) {
    castigoCuota = 6;
    p.estabilidad = TOPE(p.estabilidad - castigoCuota);
    p.gobierno = TOPE(p.gobierno - 3);
  }

  const reporte = {
    dia: g.dia,
    acto: g.acto,
    cita: g.cita,
    procesadas: j.procesadas,
    correctas: j.correctas,
    omitidas: j.omitidas,
    censuradas: j.censuradas,
    rectificadas: j.rectificadas,
    injustificadas: j.injustificadas,
    conflictos: j.conflictos,
    precision,
    cuota: g.cuota,
    presion,
    desconfiado,
    cuotaIncumplida,
    castigoCuota,
    gobierno: p.gobierno,
    pueblo: p.pueblo,
    estabilidad: p.estabilidad,
  };

  p.historial.push(reporte);
  p.dia++;

  // Sin estabilidad no hay puesto, y sin puesto no hay más jornadas.
  if (p.estabilidad <= 0) p.despedido = true;
  reporte.ultimo = p.despedido || p.dia >= p.datos.CAMPANA.length;

  // Y la jornada deja de existir, que es lo que le pasa a una jornada cerrada.
  // No es limpieza: es corrección. El turno se guarda después de CADA pieza,
  // incluida la última, y si la jornada terminada siguiera colgando del estado,
  // al restaurar se abriría el día NUEVO y encima se le volcarían el índice y
  // los contadores del día VIEJO — o sea, empezar el martes en la pieza nueve
  // de ocho, con la precisión del lunes.
  p.jornada = null;
  return reporte;
}

/* ─── el final ────────────────────────────────────────────────────────────
   Dos, los del alcance jugable. El tercero —el filtrador, quien empieza a
   aprobar pequeñas verdades— pide una mecánica que esta versión no tiene:
   aprobar a sabiendas y que eso cuente para algo. La estructura ya lo admite;
   lo que falta es el juego, no el hueco. */
export function contrato(p) {
  const dias = p.historial.length;
  const precision = p.total.procesadas
    ? Math.round((p.total.correctas / p.total.procesadas) * 100) : 0;

  // El listón del Final A. Está en 50 y no en 55 por una razón medida: quien
  // juega con dos verbos y acierta TODO lo que puede acertar acaba rozando esa
  // cifra —los sellos no dan para la cuota de los últimos días y algo se le
  // escapa por fuerza—, y el techo del juego no puede depender de un punto.
  // Quien además usa el tercer verbo se va a noventa. Ver `herramientas/simular.mjs`.
  const modelo = !p.despedido && p.gobierno >= 50;
  return {
    id: modelo ? 'modelo' : 'chivo',
    despedido: p.despedido,
    dias,
    precision,
    total: p.total,
    gobierno: p.gobierno,
    pueblo: p.pueblo,
    estabilidad: p.estabilidad,
  };
}
