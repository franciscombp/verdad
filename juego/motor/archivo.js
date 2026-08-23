// ============================================================================
// EL ARCHIVO — guardar el turno para poder volver
// ============================================================================
// Una partida son quince o veinte minutos y un recargo de página los tiraba
// enteros. Se guarda en `localStorage` después de CADA pieza, no al cerrar el
// día: la mitad de las veces que alguien cierra una pestaña es a mitad de algo.
//
// LO QUE SE GUARDA ES EL ESTADO, NO EL CONTENIDO. En el disco van cifras y un
// índice; las piezas, las reglas y los medios se vuelven a leer de `datos/` al
// restaurar. Así una partida guardada no envejece con el texto: si mañana se
// corrige una errata en un titular, el turno guardado la recoge.
//
// Y SE TIRA SI NO CUADRA. Versión distinta, día que ya no existe, JSON roto:
// se borra y se empieza de nuevo. Restaurar a medias es peor que no restaurar.
// ============================================================================

const LLAVE = 'elcensor.turno';
const VERSION = 1;

export function guardar(p) {
  try {
    const j = p.jornada;
    localStorage.setItem(LLAVE, JSON.stringify({
      v: VERSION,
      conReloj: p.conReloj,
      dia: p.dia,
      gobierno: p.gobierno, pueblo: p.pueblo, estabilidad: p.estabilidad,
      paranoia: p.paranoia, firmasBuencan: p.firmasBuencan,
      historial: p.historial, total: p.total, despedido: p.despedido,
      jornada: j ? {
        i: j.i, sellos: j.sellos,
        procesadas: j.procesadas, correctas: j.correctas, omitidas: j.omitidas,
        censuradas: j.censuradas, injustificadas: j.injustificadas, conflictos: j.conflictos,
        delta: j.delta,
      } : null,
    }));
  } catch { /* modo privado, cuota llena: el juego sigue, sin red */ }
}

export function leer() {
  try {
    const crudo = localStorage.getItem(LLAVE);
    if (!crudo) return null;
    const g = JSON.parse(crudo);
    return g && g.v === VERSION ? g : null;
  } catch { return null; }
}

export function borrar() {
  try { localStorage.removeItem(LLAVE); } catch { /* da igual */ }
}

/* Vuelca lo guardado sobre una partida recién hecha. Devuelve `false` si algo
   no cuadra, y entonces quien llama empieza de cero. */
export function restaurar(p, g, abrirDia) {
  if (!g || g.dia == null || g.dia > p.datos.CAMPANA.length) return false;
  Object.assign(p, {
    conReloj: g.conReloj !== false,
    dia: g.dia,
    gobierno: g.gobierno, pueblo: g.pueblo, estabilidad: g.estabilidad,
    paranoia: g.paranoia || 0, firmasBuencan: g.firmasBuencan || 0,
    historial: g.historial || [], total: g.total, despedido: !!g.despedido,
  });
  if (!g.jornada || p.despedido || p.dia >= p.datos.CAMPANA.length) return true;

  const j = abrirDia(p);
  Object.assign(j, g.jornada);
  // Un índice fuera de rango significa que el guardado y el guion ya no hablan
  // del mismo día. Mejor perder el turno que jugarlo torcido.
  if (j.i > j.piezas.length) return false;
  return true;
}
