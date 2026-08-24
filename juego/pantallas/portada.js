// ============================================================================
// PORTADA — el logotipo tachado
// ============================================================================
// La marca del periódico, cruzada por una raya roja, y debajo el nombre del
// puesto. No hay menú, no hay ajustes, no hay créditos: hay un botón para
// fichar y un interruptor para el reloj. Un Ministerio no te da opciones.
// ============================================================================

import { html, montar, icono, chrome } from '../ui/pintar.js';
import { PORTADA } from '../../datos/textos.js';

export function portada({ alEmpezar, conReloj, alCambiarReloj, version }) {
  montar(html`
    ${chrome('08:00 AM', 'RED-CENSOR-V3.2')}
    <section class="pantalla portada">
      <div class="cabecera-marca">
        <span class="marca-tachada">
          <span class="em-logo">${PORTADA.marca}<i>.</i></span>
        </span>
        <span class="decreto">${PORTADA.decreto}</span>
      </div>

      <div>
        <div class="ojo">${icono('ojo')}</div>
      </div>

      <div>
        <h1 class="portada__titulo" tabindex="-1" data-foco>${PORTADA.titulo}</h1>
        <p class="portada__lema">«${PORTADA.lema}»</p>
      </div>

      <div class="acciones">
        <button class="btn btn--rojo btn-block" type="button" id="empezar" data-avanzar>
          ${PORTADA.entrar}
        </button>
        <p style="margin:0;display:flex;justify-content:center">
          <label class="interruptor">
            <input type="checkbox" id="reloj" ${conReloj ? 'checked' : ''}>
            <span class="rotulo">${PORTADA.reloj}</span>
          </label>
        </p>
      </div>

      <p class="portada__pie">${PORTADA.pie}${version ? ` · mal-ds ${version}` : ''}</p>
    </section>`);

  document.getElementById('empezar').addEventListener('click', alEmpezar);
  document.getElementById('reloj').addEventListener('change', (e) => alCambiarReloj(e.target.checked));
}
