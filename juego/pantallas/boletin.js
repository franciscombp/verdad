// ============================================================================
// BOLETÍN — los eventos, a pantalla completa
// ============================================================================
// La compra de LA PLENA, la auditoría, la cadena nacional, el operativo
// migratorio. Interrumpen la jornada y solo se salen por un botón que está
// abajo del todo: no hay atajo de teclado y no se cierra con Escape.
//
// Es a propósito. El resto del juego se juega con dos teclas y a toda prisa;
// esto hay que leerlo. Un boletín que se pudiera saltar con la misma tecla con
// la que se sella se saltaría siempre.
// ============================================================================

import { html, montar, chrome } from '../ui/pintar.js';

export function boletin({ evento, hora = '08:00 AM', alSeguir }) {
  montar(html`
    <section class="pantalla boletin">
      ${chrome(hora, 'RED-CENSOR-V3.2')}
      <span class="boletin__sello">${evento.sello}</span>
      <h1 class="boletin__titulo" tabindex="-1" data-foco>${evento.titulo}</h1>
      <div class="boletin__cuerpo">
        ${evento.cuerpo.map((parrafo) => html`<p>${parrafo}</p>`)}
      </div>
      <div class="acciones">
        <button class="btn btn--rojo btn-block" type="button" id="seguir">
          ${evento.boton}
        </button>
      </div>
    </section>`);

  document.getElementById('seguir').addEventListener('click', alSeguir);
}
