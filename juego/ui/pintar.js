// ============================================================================
// PINTAR — las cuatro cosas que hacen falta para escribir HTML desde JS
// ============================================================================
// No hay framework y no hace falta: el juego pinta una pantalla entera cada
// vez y no re-renderiza nada. Lo que sí hace falta es no concatenar cadenas a
// mano, porque ahí es donde se cuela el primer `<` de un titular y se rompe la
// página.
//
//   html`…`      plantilla que ESCAPA todo lo interpolado
//   crudo(s)     marca una cadena como HTML ya hecho (y solo entonces pasa)
//   montar(...)  vacía la escena, pinta y arranca los componentes del sistema
//   $ / $$       los dos atajos de siempre
//
// POR QUÉ ESCAPAR SI EL TEXTO ES NUESTRO. Porque el contenido vive en
// `datos/`, que es la capa que se cambia entera para hacer otro país, y quien
// escriba esa capa no tiene por qué saber que aquí se concatena HTML. Un
// titular con un `&` no debería poder romper el juego.
// ============================================================================

const CRUDO = Symbol('crudo');

export function crudo(texto) {
  return { [CRUDO]: String(texto) };
}

function pieza(v) {
  if (v == null || v === false) return '';
  if (Array.isArray(v)) return v.map(pieza).join('');
  if (typeof v === 'object' && CRUDO in v) return v[CRUDO];
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function html(cachos, ...valores) {
  return crudo(cachos.reduce((acc, cacho, i) => acc + pieza(valores[i - 1]) + cacho));
}

export const $ = (sel, raiz = document) => raiz.querySelector(sel);
export const $$ = (sel, raiz = document) => Array.from(raiz.querySelectorAll(sel));

const escena = () => document.getElementById('escena');

/* Vacía la escena y pinta una pantalla. Devuelve el nodo por si quien la pinta
   necesita colgarle escuchas.

   La llamada a `malDS.init` NO es opcional y es la trampa clásica de meter un
   sistema de diseño en algo que pinta por JS: mal.js arranca sus componentes
   al cargar la página, y todo lo que se pinte DESPUÉS —o sea, el juego entero—
   se queda sin acordeones, sin modales y sin iconos. Cada pantalla vuelve a
   presentarse. */
export function montar(contenido, { ancha = false } = {}) {
  const raiz = escena();
  raiz.classList.toggle('escena--ancha', ancha);
  raiz.innerHTML = pieza(contenido);
  raiz.scrollIntoView({ block: 'start', behavior: 'instant' });
  window.scrollTo(0, 0);
  if (window.malDS) window.malDS.init(raiz);
  // El foco va al TITULAR de la pantalla nueva —marcado con `data-foco`—, no a
  // su botón principal. Enfocar el botón es más rápido para quien ya sabe lo
  // que va a hacer, pero deja a quien navega con lector de pantalla oyendo
  // «Aprobar, botón» sin haber oído la noticia. Aquí la lectura es el juego.
  const foco = raiz.querySelector('[data-foco]');
  if (foco) foco.focus({ preventScroll: true });
  return raiz;
}

// El sprite de iconos, una vez y para toda la partida.
export function iconos() {
  return window.malDS ? window.malDS.iconos() : Promise.resolve(false);
}

export function icono(nombre, tamano = '') {
  return html`<svg class="icono ${tamano}" aria-hidden="true"><use href="#i-${nombre}"/></svg>`;
}

/* ─── el marco del terminal ───────────────────────────────────────────────
   La franja de arriba. Aparece en todas las pantallas y por eso vive aquí y no
   en cada una. */
export function chrome(izquierda = '08:00 AM', derecha = 'RED-CENSOR-V3.2') {
  return html`
    <div class="chrome">
      <span>${izquierda}</span>
      <span>${derecha}
        <span class="chrome__senal" aria-hidden="true"><i></i><i></i><i></i></span>
      </span>
    </div>`;
}

// El membrete de un documento del Ministerio: rótulo, titular y línea de trámite.
export function membrete(titulo, tramite, rotulo = 'Ministerio de la Verdad y la Cooperación') {
  return html`
    <header class="membrete">
      <span class="membrete__rotulo">${rotulo}</span>
      <h1 class="membrete__titulo" tabindex="-1" data-foco>${titulo}</h1>
      ${tramite ? html`<p class="membrete__tramite">${tramite}</p>` : ''}
    </header>`;
}

/* Una barra con rótulo y porcentaje. El color no es decorativo: verde por
   encima de 60, ámbar entre 30 y 60, rojo por debajo. Quien mire de reojo
   tiene que saber si va bien sin leer la cifra. */
export function medida(rotulo, valor, { invertido = false } = {}) {
  const v = Math.max(0, Math.min(100, Math.round(valor)));
  const salud = invertido ? 100 - v : v;
  const clase = salud >= 60 ? 'medida--ok' : salud >= 30 ? 'medida--aviso' : '';
  return html`
    <div class="medida ${clase}">
      <p class="medida__rotulo"><span>${rotulo}</span><span>${v} %</span></p>
      <div class="medida__carril" role="img" aria-label="${rotulo}: ${v} por ciento">
        <i style="width:${v}%"></i>
      </div>
    </div>`;
}

// Un sello de caucho. `cae` lo hace aterrizar.
export function sello(texto, pie, { ok = false, cae = false, flotante = false } = {}) {
  return html`
    <span class="sello ${ok ? 'sello--ok' : ''} ${cae ? 'sello--cae' : ''} ${flotante ? 'sello--flotante' : ''}">
      <span class="sello__grande">${texto}</span>
      ${pie ? html`<span class="sello__chico">${pie}</span>` : ''}
    </span>`;
}

/* ─── subrayar lo que la regla señala ─────────────────────────────────────
   Busca cada `marca.texto` en el párrafo y lo envuelve. Se hace sobre el texto
   YA ESCAPADO y se escapan también las marcas antes de buscarlas, porque si
   no, un titular con comillas no encontraría su propia frase.

   Se marcan todas las apariciones, no solo la primera: si una nota repite
   «bache» cuatro veces, las cuatro son la prueba. */
export function subrayar(texto, marcas = []) {
  let salida = pieza(texto);
  for (const marca of marcas) {
    const aguja = pieza(marca.texto);
    if (!aguja || !salida.includes(aguja)) continue;
    salida = salida.split(aguja).join(
      `<mark class="marcado" title="Tema sensible: ${pieza(marca.tema)}">${aguja}</mark>`
    );
  }
  return crudo(salida);
}
