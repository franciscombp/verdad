// ============================================================================
// EL CENSOR — el hilo que une las pantallas
// ============================================================================
// Aquí no se decide nada del juego: se decide QUÉ SE PINTA AHORA. Las reglas
// están en `motor/evaluacion.js`, el estado en `motor/partida.js` y el
// contenido en `datos/`. Este archivo es el pasillo entre despachos.
//
// EL RECORRIDO DE UNA JORNADA
//
//   portada ─▶ [boletín de evento] ─▶ memorando ─▶ escritorio ─┐
//                                                    ▲         │
//                                                    │      informe
//                                                    │         │
//                                            [boletín Buencán] │
//                                                    └─────────┘
//                                                              │
//                            ┌─────────────────────────────────┘
//                            ▼
//                     fin de jornada ─▶ (siguiente día · despido · contrato)
//
// Se guarda después de cada pieza. Se pinta una pantalla cada vez y siempre
// entera: no hay actualización parcial en ningún sitio, y por eso no hay estado
// de interfaz que pueda quedarse desincronizado del estado del juego.
// ============================================================================

import { DATOS } from '../datos/index.js';
import { EVENTOS, DESPIDO } from '../datos/textos.js';
import * as Partida from './motor/partida.js';
import * as Archivo from './motor/archivo.js';
import { iconos } from './ui/pintar.js';
import { portada } from './pantallas/portada.js';
import { memorando } from './pantallas/memorando.js';
import { abrirEscritorio } from './pantallas/escritorio.js';
import { informe as pantallaInforme } from './pantallas/informe.js';
import { jornada as pantallaJornada } from './pantallas/jornada.js';
import { boletin } from './pantallas/boletin.js';
import { contrato as pantallaContrato } from './pantallas/contrato.js';

let p = null;
let escritorio = null;   // el que esté abierto, para poder pararle el reloj

/* ─── portada ─────────────────────────────────────────────────────────── */
function inicio() {
  const guardado = Archivo.leer();
  p = Partida.nueva(DATOS, { conReloj: guardado ? guardado.conReloj : true });

  portada({
    conReloj: p.conReloj,
    version: DATOS.VERSION_DS,
    alCambiarReloj: (v) => { p.conReloj = v; },
    alEmpezar: () => {
      // El interruptor de la portada manda sobre lo guardado: si alguien lo
      // acaba de tocar, es porque quiere jugar ASÍ, no como jugó ayer.
      const conReloj = p.conReloj;
      if (guardado && Archivo.restaurar(p, guardado, Partida.abrirDia)) {
        p.conReloj = conReloj;
        // Se retoma donde se dejó. Tres sitios posibles, y solo tres:
        //   contrato terminado      → la resolución
        //   jornada a medias        → la pieza siguiente, sin memorando
        //   día cerrado o sin abrir → el día siguiente entero, con su boletín
        //                             y su memorando, porque todavía no ha
        //                             empezado
        if (p.despedido || p.dia >= DATOS.CAMPANA.length) return resolucion();
        if (p.jornada && p.jornada.i > 0) return siguientePieza();
        return abrirJornada({ yaAbierta: !!p.jornada });
      }
      Archivo.borrar();
      p = Partida.nueva(DATOS, { conReloj });
      abrirJornada();
    },
  });
}

/* ─── un día ──────────────────────────────────────────────────────────── */
function abrirJornada({ yaAbierta = false } = {}) {
  if (!yaAbierta) Partida.abrirDia(p);
  const guion = p.jornada.guion;

  // El boletín solo la primera vez: quien vuelve a una jornada ya abierta ya
  // se enteró de que compraron LA PLENA.
  const evento = guion.evento ? EVENTOS[guion.evento] : null;
  if (evento && evento.cuando === 'antes' && !yaAbierta) {
    return boletin({ evento, alSeguir: leerMemorando });
  }
  leerMemorando();
}

function leerMemorando() {
  memorando({
    guion: p.jornada.guion,
    reglas: p.jornada.reglas,
    alSeguir: siguientePieza,
  });
}

/* ─── una pieza ───────────────────────────────────────────────────────── */
function siguientePieza() {
  if (escritorio) { escritorio.detener(); escritorio = null; }
  if (!Partida.pieza(p)) return cerrarJornada();

  escritorio = abrirEscritorio({
    p,
    alDecidir: (decision, porTiempo) => {
      const inf = Partida.resolver(p, decision, porTiempo);
      Archivo.guardar(p);
      // Un respiro entre el botón y el informe: el sello tiene que caer sobre
      // algo, y si la pantalla cambia en el mismo fotograma no cae en ninguna.
      setTimeout(() => verInforme(inf), 260);
    },
  });
}

function verInforme(inf) {
  pantallaInforme({
    p,
    informe: inf,
    alSeguir: () => {
      // El operativo Buencán se dispara DESPUÉS del informe: primero se sella
      // la pieza y luego llega la consecuencia, que es como funciona.
      if (inf.protocolo) {
        return boletin({
          evento: EVENTOS[inf.protocolo],
          hora: Partida.hora(p),
          alSeguir: siguientePieza,
        });
      }
      siguientePieza();
    },
  });
}

/* ─── cerrar el día ───────────────────────────────────────────────────── */
function cerrarJornada() {
  const reporte = Partida.cerrarDia(p);
  Archivo.guardar(p);

  pantallaJornada({
    reporte,
    alSeguir: () => {
      if (p.despedido) {
        return boletin({
          evento: DESPIDO,
          hora: '05:30 PM',
          alSeguir: resolucion,
        });
      }
      if (reporte.ultimo) return resolucion();
      abrirJornada();
    },
  });
}

function resolucion() {
  Archivo.borrar();
  pantallaContrato({
    resolucion: Partida.contrato(p),
    alReiniciar: () => { p = Partida.nueva(DATOS, { conReloj: p.conReloj }); abrirJornada(); },
  });
}

/* ─── arranque ────────────────────────────────────────────────────────── */
// El sprite primero: si los iconos entran después de pintar, la portada
// parpadea con huecos. Y si no entra —sin red, servidor caído—, el juego
// arranca igual: un `<use>` que no resuelve no rompe nada.
iconos().finally(inicio);
