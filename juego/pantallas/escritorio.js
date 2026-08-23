// ============================================================================
// EL ESCRITORIO — la pieza encima de la mesa
// ============================================================================
// La pantalla donde se juega. Tiene dos caras y un solo reloj:
//
//   compacta   lo que se ve al llegar la pieza. Rótulo, titular, entradilla,
//              firma y expediente. Con eso BASTA para decidir casi siempre, y
//              esa es la trampa: casi.
//   expandida  el cuerpo entero, con la banda roja de regla vigente arriba.
//              Leerla cuesta segundos del mismo reloj. Ese es el precio.
//
// EL RELOJ NO SE PARA AL EXPANDIR. Si se parara, expandir sería gratis y no
// habría decisión: se abriría todo. Un turno es un presupuesto de atención y el
// juego consiste en repartirlo mal.
//
// CUANDO SE ACABA, LA PIEZA SE APRUEBA. No se pierde, no se salta, no avisa:
// se archiva aprobada y sigue la siguiente. El silencio administrativo aprueba,
// aquí y en la vida real, y descubrirlo tarde es parte del trabajo.
// ============================================================================

import { html, montar, chrome, subrayar, sello, icono } from '../ui/pintar.js';
import { INTERFAZ } from '../../datos/textos.js';
import * as Partida from '../motor/partida.js';

export function abrirEscritorio({ p, alDecidir }) {
  const j = p.jornada;
  const pz = Partida.pieza(p);
  const medio = p.datos.MEDIOS[pz.medio];
  const autor = p.datos.AUTORES[pz.autor];
  const guion = j.guion;

  let expandido = false;
  let restante = p.conReloj ? guion.segundos : null;
  let reloj = null;
  let cerrado = false;
  let ultimoAncho = -1;

  // La regla que se recuerda arriba en la lectura expandida. Se elige por el
  // índice de la pieza, no al azar: así no cambia si el jugador entra y sale, y
  // no delata nada — es un recordatorio del memorando, no una pista.
  const recordada = j.reglas[j.i % j.reglas.length];
  const nRecordada = (j.i % j.reglas.length) + 1;

  function pintar() {
    montar(expandido ? vistaExpandida() : vistaCompacta(), { ancha: expandido });
    engancharBotones();
    dibujarReloj(true);
  }

  /* ─── la cara compacta ─────────────────────────────────────────────── */
  function vistaCompacta() {
    return html`
      <section class="pantalla">
        ${chrome(Partida.hora(p), 'RED-CENSOR-V3.2')}
        ${barraTurno()}

        <article class="pliego">
          <div class="pliego__cabecera">
            <span class="pliego__seccion">${pz.seccion} · ${medio.nombre}</span>
            <span class="pliego__fecha">Edición diaria</span>
          </div>
          <h1 class="pliego__titular">${pz.titular}</h1>
          <p class="pliego__texto">${subrayar(pz.entradilla, pz.marcas)}</p>
          <p class="pliego__texto" style="color:var(--em-pliego-meta)">Autor: ${autor.nombre}</p>
          <div class="pliego__pie">
            <span>${pz.expediente}</span>
            <span>Pendiente</span>
          </div>
        </article>

        <p style="margin:var(--mal-e3) 0 0">
          <button class="btn btn--fantasma btn--sm" type="button" id="expandir">
            ${icono('ojo', 'icono--s')} ${INTERFAZ.expandir}
          </button>
        </p>

        ${recordatorio()}
        ${relojHTML()}
        ${botones()}
      </section>`;
  }

  /* ─── la cara expandida ────────────────────────────────────────────── */
  function vistaExpandida() {
    return html`
      <section class="pantalla">
        ${chrome(Partida.hora(p), 'RED-CENSOR-V3.2')}
        <p class="vigente">Regla vigente #${nRecordada}: ${recordada.corto}</p>

        <div class="turno" style="grid-template-columns:1fr auto">
          <span class="turno__dia">${INTERFAZ.expandir}</span>
          <button class="btn btn--fantasma btn--sm" type="button" id="volver">
            ${icono('flecha-izq', 'icono--s')} ${INTERFAZ.volver}
          </button>
        </div>

        <article class="pliego">
          <h1 class="pliego__titular">${pz.titular}</h1>
          <div class="pliego__cabecera">
            <span class="pliego__seccion">${pz.seccion}</span>
            <span class="pliego__fecha">Autor: ${autor.nombre}</span>
          </div>
          ${pz.cuerpo.map((parrafo) => html`<p class="pliego__texto">${subrayar(parrafo, pz.marcas)}</p>`)}
          <div class="pliego__pie">
            <span>${medio.nombre}</span>
            <span>${pz.expediente}</span>
          </div>
        </article>

        ${relojHTML()}
        ${botones()}
      </section>`;
  }

  /* ─── piezas compartidas ───────────────────────────────────────────── */
  function barraTurno() {
    const total = j.piezas.length;
    const bien = (j.correctas / total) * 100;
    const mal = ((j.procesadas - j.correctas) / total) * 100;
    return html`
      <div class="turno">
        <span class="turno__dia">Día ${guion.dia}</span>
        <span class="turno__medio">
          <span class="turno__etiqueta">Aprobación:</span>
          <span class="aprobacion" role="img" aria-label="${j.correctas} correctas de ${j.procesadas} procesadas">
            <i class="bien" style="width:${bien}%"></i><i class="mal" style="width:${mal}%"></i>
          </span>
        </span>
        <span class="turno__restantes">Restantes: ${Partida.quedan(p)}</span>
      </div>`;
  }

  function recordatorio() {
    return html`
      <div class="accordion-item recordar">
        <details>
          <summary>${INTERFAZ.recordar}</summary>
          <div class="accordion-content">
            <ol>${j.reglas.map((r) => html`<li><b>${r.corto}.</b> ${r.texto}</li>`)}</ol>
          </div>
        </details>
      </div>`;
  }

  function relojHTML() {
    if (!p.conReloj) return '';
    return html`
      <div class="reloj" id="reloj">
        <p class="reloj__rotulo"><span>Tiempo límite</span><span id="reloj-cifra">${restante} s</span></p>
        <div class="reloj__carril"><i id="reloj-barra" style="width:100%"></i></div>
      </div>`;
  }

  function botones() {
    const sinSellos = !Partida.puedeCensurar(p);
    return html`
      <div class="decidir">
        <button class="decidir__btn decidir__btn--aprobar" type="button" data-decision="aprobar" data-foco>
          ${INTERFAZ.aprobar}<small>Sellar [A]</small>
        </button>
        <button class="decidir__btn decidir__btn--censurar" type="button" data-decision="censurar"
                ${sinSellos ? 'disabled' : ''}>
          ${INTERFAZ.censurar}<small>${sinSellos ? INTERFAZ.sinSellos : 'Sellar [S]'}</small>
        </button>
      </div>
      ${j.sellos !== null
        ? html`<p class="rotulo" style="text-align:center;margin-top:var(--mal-e3)">
            Sellos restantes: ${j.sellos}${guion.cuota ? ` · Cuota del día: ${j.censuradas}/${guion.cuota}` : ''}
          </p>`
        : ''}`;
  }

  /* ─── el reloj ─────────────────────────────────────────────────────── */
  function dibujarReloj(forzar) {
    if (!p.conReloj || cerrado) return;
    const caja = document.getElementById('reloj');
    const barra = document.getElementById('reloj-barra');
    const cifra = document.getElementById('reloj-cifra');
    if (!caja || !barra) return;
    const pct = Math.max(0, (restante / guion.segundos) * 100);
    // No se toca el DOM si el valor no cambió: el reloj late diez veces por
    // segundo y cada escritura recalcula la maqueta.
    const ancho = Math.round(pct);
    if (!forzar && ancho === ultimoAncho) return;
    ultimoAncho = ancho;
    barra.style.width = `${pct}%`;
    cifra.textContent = `${Math.max(0, Math.ceil(restante))} s`;
    caja.classList.toggle('reloj--medio', pct <= 50 && pct > 22);
    caja.classList.toggle('reloj--poco', pct <= 22);
  }

  function arrancarReloj() {
    if (!p.conReloj) return;
    reloj = setInterval(() => {
      restante -= 0.1;
      if (restante <= 0) {
        restante = 0;
        dibujarReloj(true);
        decidir('aprobar', true);
        return;
      }
      dibujarReloj(false);
    }, 100);
  }

  /* ─── enganches ────────────────────────────────────────────────────── */
  function engancharBotones() {
    for (const b of document.querySelectorAll('[data-decision]')) {
      b.addEventListener('click', () => decidir(b.dataset.decision, false));
    }
    const expandir = document.getElementById('expandir');
    if (expandir) expandir.addEventListener('click', () => { expandido = true; pintar(); });
    const volver = document.getElementById('volver');
    if (volver) volver.addEventListener('click', () => { expandido = false; pintar(); });
  }

  function teclado(e) {
    if (cerrado || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
    const k = e.key.toLowerCase();
    if (k === 'a') { e.preventDefault(); decidir('aprobar', false); }
    else if (k === 's') { if (Partida.puedeCensurar(p)) { e.preventDefault(); decidir('censurar', false); } }
    else if (k === 'e') { e.preventDefault(); expandido = !expandido; pintar(); }
    else if (k === 'escape' && expandido) { e.preventDefault(); expandido = false; pintar(); }
  }

  function decidir(decision, porTiempo) {
    if (cerrado) return;
    cerrado = true;
    detener();
    const boton = document.querySelector(`[data-decision="${decision}"]`);
    if (boton) boton.classList.add('pulsado');
    alDecidir(decision, porTiempo);
  }

  function detener() {
    if (reloj) { clearInterval(reloj); reloj = null; }
    document.removeEventListener('keydown', teclado);
  }

  pintar();
  document.addEventListener('keydown', teclado);
  arrancarReloj();

  return { detener };
}
