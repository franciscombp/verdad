// ============================================================================
// FIN DE JORNADA — el reporte de rendimiento
// ============================================================================
// La evaluación oficial en un pliego, las dos barras que el Ministerio deja
// ver, y una frase suya al pie. La tercera barra —la estabilidad laboral— NO
// se enseña aquí a propósito: el Ministerio no le va a decir a nadie cuánto le
// queda de puesto. Se intuye por lo que dice la frase, y esa incertidumbre es
// justo la que hace que un funcionario obedezca de más.
// ============================================================================

import { html, montar, chrome, membrete, medida } from '../ui/pintar.js';
import { INTERFAZ } from '../../datos/textos.js';

export function jornada({ reporte, alSeguir }) {
  montar(html`
    <section class="pantalla">
      ${chrome('05:00 PM', 'RED-CENSOR-V3.2')}
      ${membrete('Fin de jornada', `Reporte de rendimiento diario · Día ${reporte.dia} · ${reporte.acto}`)}

      <article class="pliego">
        <h2 class="memo__intro">Evaluación oficial:</h2>
        <div class="evaluacion">
          ${fila('Artículos procesados', reporte.procesadas)}
          ${fila('Decisiones correctas', reporte.correctas)}
          ${fila('Infracciones omitidas', reporte.omitidas)}
          ${fila('Censuras injustificadas', reporte.injustificadas)}
          ${reporte.conflictos ? fila('Conflictos de directiva', reporte.conflictos) : ''}
          ${fila('Precisión de censura', `${reporte.precision} %`)}
          ${reporte.cuota != null
            ? fila('Cuota de censura', `${reporte.censuradas} / ${reporte.cuota}`)
            : ''}
        </div>
      </article>

      ${reporte.cuotaIncumplida
        ? html`<p class="aviso aviso--peligro" style="margin-top:var(--mal-e4)">
            <span><b>Cuota incumplida.</b> No alcanzó el mínimo diario de piezas retiradas.
            Consta en su expediente como criterio blando.</span></p>`
        : ''}

      <div style="margin-top:var(--mal-e6)">
        ${medida('Confianza del Gobierno', reporte.gobierno)}
        ${medida('Apoyo del pueblo (lealtad)', reporte.pueblo)}
      </div>

      <p class="dictamen">${reporte.cita}</p>

      <div class="acciones">
        <button class="btn btn--rojo btn-block" type="button" id="seguir">
          ${reporte.ultimo ? 'Ver la resolución' : `${INTERFAZ.continuar} · Día ${reporte.dia + 1}`}
        </button>
      </div>
    </section>`);

  document.getElementById('seguir').addEventListener('click', alSeguir);
}

function fila(rotulo, valor) {
  return html`
    <div class="evaluacion__fila">
      <span>${rotulo}</span><span class="evaluacion__valor">${valor}</span>
    </div>`;
}
