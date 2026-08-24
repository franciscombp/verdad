// ============================================================================
// FIN DE CONTRATO — la resolución
// ============================================================================
// Los dos finales, uno encendido y otro apagado, y el historial. Que se vea el
// que NO tocó es deliberado: el jugador tiene que saber que había otra forma de
// acabar esto, y no cuál era.
// ============================================================================

import { html, montar, chrome, membrete, icono, medida } from '../ui/pintar.js';
import { FINALES, CONTRATO } from '../../datos/textos.js';

export function contrato({ resolucion, alReiniciar }) {
  const orden = ['modelo', 'chivo'];
  const datos = {
    dias: resolucion.dias,
    procesadas: resolucion.total.procesadas,
    correctas: resolucion.total.correctas,
    omitidas: resolucion.total.omitidas,
    precision: `${resolucion.precision} %`,
  };

  montar(html`
    <section class="pantalla">
      ${chrome('06:00 PM', 'RED-CENSOR-V3.2')}
      ${membrete(CONTRATO.titulo, CONTRATO.tramite)}

      <div class="finales">
        ${orden.map((id) => {
          const f = FINALES[id];
          const suyo = id === resolucion.id;
          return html`
            <article class="final ${suyo ? 'final--obtenido' : ''} ${f.bueno ? 'final--bueno' : ''}">
              <span class="final__icono">${icono(f.icono)}</span>
              <div>
                <h2 class="final__titulo">${f.titulo}</h2>
                <p class="final__texto">${suyo ? f.texto : f.resumen}</p>
              </div>
            </article>`;
        })}
      </div>

      ${resolucion.despedido
        ? html`<p class="aviso aviso--peligro">
            <span><b>Contrato terminado antes de tiempo.</b> Sobrevivió ${resolucion.dias}
            ${resolucion.dias === 1 ? 'día' : 'días'} de siete.</span></p>`
        : ''}

      <div style="margin-top:var(--mal-e6)">
        ${medida('Confianza del Gobierno', resolucion.gobierno)}
        ${medida('Apoyo del pueblo (lealtad)', resolucion.pueblo)}
      </div>

      <h2 class="rotulo" style="margin:var(--mal-e7) 0 var(--mal-e3);text-align:center">
        ${CONTRATO.historial}
      </h2>
      <div class="tabla-env">
        <table class="tabla">
          <tbody>
            ${CONTRATO.filas.map(([rotulo, clave]) => html`
              <tr><td>${rotulo}</td><td class="num tabular">${datos[clave]}</td></tr>`)}
          </tbody>
        </table>
      </div>

      <div class="acciones">
        <button class="btn btn--rojo btn-block" type="button" id="reiniciar">
          ${CONTRATO.reiniciar}
        </button>
      </div>
    </section>`);

  document.getElementById('reiniciar').addEventListener('click', alReiniciar);
}
