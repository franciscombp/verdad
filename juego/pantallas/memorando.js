// ============================================================================
// MEMORANDO DE CENSURA — las reglas del día, en un papel
// ============================================================================
// La única pantalla del juego que no tiene prisa. El memorando se lee entero o
// no se lee, y lo que aquí no se aprenda se va a pagar durante nueve horas.
//
// El sello de APROBADO no aprueba nada del jugador: aprueba el propio
// memorando. Alguien, arriba, ha firmado que estas contradicciones son la
// política informativa del país.
// ============================================================================

import { html, montar, chrome, membrete, sello } from '../ui/pintar.js';
import { INTERFAZ } from '../../datos/textos.js';

export function memorando({ guion, reglas, alSeguir }) {
  montar(html`
    <section class="pantalla">
      ${chrome('08:00 AM', 'RED-CENSOR-V3.2')}
      ${membrete('Memorando de censura', `Remitido por: Dirección General de Prensa · Día ${guion.dia}`)}

      <article class="pliego">
        <div class="memo__archivo">
          <span class="memo__doc">ORDEN_DÍA_${guion.dia}.DOC</span>
          <span class="memo__clasificacion">Confidencial</span>
        </div>

        <h2 class="memo__intro">Reglas de Selección para Hoy:</h2>

        <ol class="memo__reglas">
          ${reglas.map((r) => html`<li>${r.texto}</li>`)}
        </ol>

        <p class="pliego__texto" style="margin-top:var(--mal-e5)">${guion.memo}</p>

        <p class="pliego__firma">
          Firmado digitalmente<br><b>El Gran Director</b>
        </p>

        ${sello('Aprobado', 'Oficina de censura', { flotante: true })}
      </article>

      <div class="acciones">
        <button class="btn btn--rojo btn-block" type="button" id="seguir" data-avanzar>
          ${INTERFAZ.empezar}
        </button>
        <p class="rotulo" style="text-align:center;margin:0">
          Nivel de dificultad: ${guion.dificultad}${guion.cuota ? ` · Cuota de censura: ${guion.cuota}` : ''}${guion.sellos ? ` · Sellos: ${guion.sellos}` : ''}
        </p>
      </div>
    </section>`);

  document.getElementById('seguir').addEventListener('click', alSeguir);
}
