// ============================================================================
// INFORME DE ACCIÓN — el registro automático de la decisión
// ============================================================================
// La pieza ya sellada, el veredicto del Ministerio y lo que se movió. Es la
// única pantalla donde el juego habla claro, y aun así no dice si estuvo bien:
// dice si estuvo CONFORME.
//
// La diferencia importa y es toda la tesis. El día que el jugador censura un
// reportaje de gatos y lee «DECISIÓN CORRECTA», el juego ya no tiene que
// explicar nada más.
// ============================================================================

import { html, montar, chrome, membrete, sello, subrayar } from '../ui/pintar.js';
import { INTERFAZ } from '../../datos/textos.js';
import * as Partida from '../motor/partida.js';

const CLASES = {
  correcta: '',
  contradiccion: 'veredicto--contradiccion',
  omision: 'veredicto--falla',
  celo: 'veredicto--falla',
};

export function informe({ p, informe: inf, alSeguir }) {
  const pz = inf.pieza;
  const res = inf.resultado;
  const censurada = inf.decision === 'censurar';

  montar(html`
    <section class="pantalla">
      ${chrome(Partida.hora(p), 'RED-CENSOR-V3.2')}
      ${membrete('Informe de acción', 'Registro automático de decisión')}

      <article class="pliego pliego--apretado pliego--sellado">
        <div class="pliego__cabecera">
          <span class="pliego__seccion">${inf.medio.nombre}</span>
          <span class="pliego__fecha">${pz.expediente}</span>
        </div>
        <h2 class="pliego__titular">${pz.titular}</h2>
        <p class="pliego__texto" style="color:var(--em-pliego-txt-2)">${subrayar(recortar(pz.entradilla), pz.marcas)}</p>
        ${sello(censurada ? 'Censurado' : 'Aprobado', inf.porTiempo ? 'Silencio administrativo' : 'Puesto #9921-K',
                { ok: !censurada, cae: true, flotante: true })}
      </article>

      ${inf.porTiempo
        ? html`<p class="aviso aviso--atencion" style="margin-top:var(--mal-e4)">
            <span><b>Se acabó el tiempo.</b> ${INTERFAZ.silencio}.</span></p>`
        : ''}

      <div class="veredicto ${CLASES[res.clase]}">
        <p class="veredicto__titulo">${res.correcta && res.clase === 'correcta' ? '✓' : res.clase === 'contradiccion' ? '≠' : '✕'} ${res.titulo}</p>
        <p class="veredicto__texto">${inf.motivo}</p>

        <div class="deltas">
          ${delta('Gobierno', res.gobierno)}
          ${delta('Pueblo', res.pueblo)}
          ${delta('Estabilidad', res.estabilidad)}
        </div>
      </div>

      <div class="acciones">
        <button class="btn btn--rojo btn-block" type="button" id="seguir" data-foco>
          ${Partida.quedan(p) > 0 ? `${INTERFAZ.continuar} · quedan ${Partida.quedan(p)}` : 'Cerrar la jornada'}
        </button>
      </div>
    </section>`);

  document.getElementById('seguir').addEventListener('click', alSeguir);
}

function delta(rotulo, n) {
  const clase = n > 0 ? 'delta--sube' : n < 0 ? 'delta--baja' : 'delta--nada';
  const signo = n > 0 ? '+' : n < 0 ? '−' : '±';
  return html`<span class="delta ${clase}">${rotulo}: <b>${signo}${Math.abs(n)} %</b></span>`;
}

// La entradilla, cortada. El informe enseña la pieza para que se reconozca, no
// para releerla: si cupiera entera, el jugador la leería AQUÍ y no allí, que es
// donde cuesta tiempo.
function recortar(texto, tope = 130) {
  if (texto.length <= tope) return texto;
  const corte = texto.lastIndexOf(' ', tope);
  return `${texto.slice(0, corte > 0 ? corte : tope)}…`;
}
