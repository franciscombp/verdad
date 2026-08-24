# Sistema de estilo — EL CENSOR

> **El juego no tiene sistema de diseño propio.** Usa
> [`mal-ds`](https://github.com/franciscombp/mal/tree/main/ds), el de la casa, con
> el tema del periódico **en oscuro**. Lo que hay en este documento es lo que el
> juego añade ENCIMA de ese sistema, y —al final— la lista de lo que hay que
> devolverle.

## Cómo se enchufa

```html
<html lang="es-EC" data-marca="mercio" data-tema="oscuro">
```

| | |
|---|---|
| Dónde vive | `ds/` — copia literal, versionada, de `ds/` del repo `mal` |
| Cómo se actualiza | `node herramientas/traer-ds.mjs /ruta/al/clon/de/mal` |
| Qué versión hay | `ds/version.json` (hoy **1.0.15**) |
| Cómo se carga | `ds-capa.css` → `@import url("./ds/mal/mal.css") layer(ds)` |

**Va dentro de `@layer ds`, y eso es lo que hace que el juego pueda adoptar
componentes del sistema uno a uno.** Una regla sin capa le gana SIEMPRE a una
regla en capa, tenga la especificidad que tenga: con el sistema en su capa y
`juego/estilo.css` fuera, el sistema se ve únicamente donde el juego no ha dicho
nada. Adoptar un componente del sistema es, literalmente, **borrar** la regla del
juego que lo estaba tapando.

## El oscuro es fijo, y no es una preferencia

El juego hermano —[Estado de Excepción](https://github.com/franciscombp/estadodecepcion)—
fija `data-tema="claro"` porque su mundo 3D es una calle a mediodía. Aquí pasa lo
contrario y por la misma razón: **el juego transcurre de noche en un cubículo del
Ministerio**, y toda la hoja está escrita dando por hecho una mesa oscura con una
sola cosa clara encima.

Si esto siguiera al sistema operativo, media humanidad jugaría con el escritorio
del censor iluminado como una panadería.

## Qué le pasa al tema en oscuro

`mal.css` resuelve la cascada en tres pasos, y conviene saber en qué queda cada
token porque el resultado no es «lo mismo pero invertido»:

| | `:root[data-tema="oscuro"]` | `[data-marca="mercio"]` | **queda en** |
|---|---|---|---|
| `--ref-n0` fondo | `#151514` | `#ffffff` | **`#1a1a1a`** |
| `--ref-n1` relleno | `#1D1D1C` | `#f3f3f3` | **`#222222`** |
| `--ref-t0` tinta | `#ECECEA` | `#141414` | **`#f2f2f2`** |
| `--ref-marca` rojo | `#EF4F41` | `#c53b2b` | **`#e8604f`** |
| `--ref-elev-1/2` | sombras | `none` | **`none`** — el papel no flota |
| `--ref-radio` | 1 | 0 | **0** — a escuadra |
| `--ref-borde` | 1px | **`0px`** | **`0px`** — sin líneas |
| `--mal-ok / warn / danger` | valores de oscuro | *(no los toca)* | los de oscuro |

### Cuatro huecos, y cómo se tapan

Leyendo `mal.css` entera aparecen cuatro cosas que el bloque
`:root[data-marca="mercio"][data-tema="oscuro"]` no declara y que en una página
oscura sí hacen falta. El juego las tapa **en la capa 1 y por token** —que es
como el sistema dice que se hace un tema— en un solo bloque al principio de
`juego/estilo.css`. Están también en «lo que hay que devolverle al sistema», al
final de este documento, porque el sitio donde deben acabar es `mal.css`.

| Hueco | Qué pasa | Lo que declara el juego |
|---|---|---|
| **La rampa neutra está plana y al revés** | `--ref-n2` (#141414) es más oscura que la página (#1a1a1a) y `--ref-n3` es **exactamente** la página: 1,00 : 1. La pista de `.progreso`, la cebra de `.tabla` y el `.esqueleto` desaparecen | `--ref-n1:#262626` · `--ref-n2:#202020` · `--ref-n3:#2c2c2c` |
| **Los bordes miden cero** | `--ref-borde: 0px` deja `--mal-borde` y `--mal-separador` en `0px solid …`: `.tabla` sin rayas entre filas, `.accordion-item` sin filete | `--ref-borde: 1px` |
| **Los cuatro avisos son iguales** | `.aviso--ok/--atencion/--peligro/--info` solo cambian el **color** de un filete de 3 px que con `--ref-acento-linea: 0` no existe. Un aviso de peligro y uno informativo son el mismo párrafo gris | `--ref-acento-linea: 1` |
| **El rojo se vuelve negro al pulsarlo** | `--ref-marca-2` se queda con el valor claro (#141414), así que `--mal-primary-hover` es casi negro | `--ref-marca-2: #f07a6b` |

**En una página blanca, el aire separa. En una página de carbón, no.** Ese es el
resumen de los dos primeros: el periódico impreso puede permitirse no tener
líneas porque el papel ya es un fondo distinto de todo lo que hay encima; dos
bloques del mismo carbón sin una raya entre medias son un bloque.

### Lo que NO se toca

`--ref-radio` (a escuadra), `--ref-elev-1/2` (sin sombras), `--ref-salto` y
`--ref-presion` (ni salta al pasar por encima ni se hunde al pulsar). Eso no son
huecos: es **la expresión del periódico**, y se adopta entera. Un impreso no
rebota, y esto es un impreso aunque sea un juego.

Cuesta algo: en táctil, donde no hay `:hover`, un botón del sistema no confirma
el toque con nada. Lo que confirma aquí es que la pantalla cambia en 260 ms —y
en lo único que de verdad importa, los dos botones de decisión, el juego pone su
propia respuesta (`.decidir__btn.pulsado`), porque son suyos y puede.

## Los colores no se escriben, se piden

Con una excepción, y está documentada abajo. Todo lo demás sale de los tokens del
sistema, que ya traen su pareja en oscuro. Si EL MERCIO. ajusta su rojo en su
`theme.json`, el juego se entera al actualizar el sistema.

## La excepción: el pliego

El tema del periódico en oscuro invierte la página: el papel se vuelve mesa. Pero
este juego necesita **las dos cosas a la vez** —una mesa oscura y, encima, un
pliego de periódico que todavía es papel—, porque de eso trata: hay una hoja
impresa delante de ti y tú decides si existió.

El sistema ya resuelve el caso **espejo**: `.em-dark` es una franja oscura sobre
una página blanca, y para hacerlo declara tres literales (`--em-franja`,
`--em-franja-txt`, `--em-franja-meta`), porque una isla que no sigue al tema no
puede salir de los tokens del tema. Esto es lo mismo del revés, se declara igual y
se llama igual de claro:

| Token | Valor | De dónde sale | Contraste |
|---|---|---|---|
| `--em-pliego` | `#f5f2ea` | blanco del tema con tinte de papel prensa | — |
| `--em-pliego-2` | `#e9e5d9` | el recuadro de tono dentro del papel | — |
| `--em-pliego-txt` | `#141414` | `--ref-t0` del tema **en claro** | 16,1 : 1 |
| `--em-pliego-txt-2` | `#3d3d3d` | la tinta floja | 9,7 : 1 |
| `--em-pliego-meta` | `#646464` | `--ref-t2` del tema **en claro** | 5,1 : 1 |
| `--em-pliego-linea` | `#d5cfbf` | el filete impreso | — |
| `--em-pliego-acento` | `#c53b2b` | `--ref-marca` del tema **en claro** | 6,6 : 1 |

Los valores **no son inventados**: son los del propio tema del periódico en claro.
Lo único que el juego añade es el tinte de papel.

## Lo que pone el sistema y lo que pone el juego

| | Quién manda |
|---|---|
| Color, tipografía, espaciado, radios, sombras | el sistema |
| Botones, interruptores, acordeones, avisos, tablas | el sistema, adoptados tal cual |
| El pliego de papel sobre la mesa | el juego · `.pliego` — ver arriba |
| El sello de caucho | el juego · `.sello` |
| El marco del terminal y la barra del turno | el juego · `.chrome`, `.turno` |
| Los dos botones de decisión | el juego · `.decidir` |

### Componentes del sistema adoptados sin tocar nada

`.btn` · `.btn--rojo` · `.btn--fantasma` · `.btn--sm` · `.btn-block` ·
`.interruptor` · `.accordion-item` + `<details>` · `.aviso` (`--peligro`,
`--atencion`) · `.tabla` · `.tabla-env` · `.icono` + el sprite · `.em-logo`

De estos, solo dos llevan un ajuste, y ninguno por selector de más peso:

- `.recordar summary` baja el aire de 20 px a `--mal-e3`. El sistema le da el
  ritmo de una página de preguntas frecuentes; aquí es un cajón de consulta
  apretado entre la noticia y los botones.
- `.em-logo` de la portada usa `--mal-mono` (Montserrat) en vez de la serif,
  porque el logotipo tachado de la portada es la marca en su versión de rótulo,
  que es como la usa el propio periódico en su cabecera.

### Los iconos

Del sprite del sistema (`ds/mal/iconos.svg`, 81 símbolos de trazo). **Nada de
emojis en la interfaz**, que es la regla de la casa. Se usan cinco: `i-ojo`,
`i-flecha-izq`, `i-trofeo`, `i-huella` y `i-info`.

`mal.js` inyecta el sprite la primera vez que ve un `.icono`, pero el juego pinta
todo por JS **después** de que mal.js haya arrancado, así que el sprite se pide a
mano una vez al empezar (`malDS.iconos()`) y cada pantalla vuelve a presentarse
con `malDS.init(raiz)`. Sin esa segunda llamada, el juego entero se quedaría sin
acordeones, sin interruptores y sin iconos: es la trampa clásica de meter un
sistema de diseño en algo que repinta.

## Movimiento

Duraciones cortas y una sola curva con rebote, la del sello que cae. **Esto es una
oficina, no un juguete**: las pantallas entran deslizándose diez píxeles y ya.

| Token | Duración | Para |
|---|---|---|
| `--t-rapido` | 160 ms | confirmación de toque |
| `--t-medio` | 280 ms | entrada de pantalla, el sello |
| `--t-lento` | 450 ms | las barras del reporte |

La curva de juego es `--golpe: cubic-bezier(.2,1.6,.4,1)` y se usa en **una sola
cosa**: el sello. Las demás salen de `--mal-ease`, la del sistema.

### Excepción obligatoria

Todo se desactiva bajo `@media (prefers-reduced-motion: reduce)` — el sistema
apaga lo suyo, el juego apaga lo suyo. **El reloj de la pieza sigue funcionando**:
es mecánica, no animación. Quien no lo quiera lo apaga en la portada, que es un
control distinto y a propósito.

## Añadir algo nuevo

Antes de escribir una regla de CSS, **la primera pregunta es si el sistema ya la
tiene**. `componentes.json` lleva los 83 componentes con su HTML y el escaparate
está en [una.red/ds](https://una.red/ds/).

- [ ] ¿Existe ya en `mal-ds`? Si existe, se usa su clase y no se escribe nada.
- [ ] Si NO existe: ¿es del juego, o le serviría a cualquier otro producto? Si es
      lo segundo, va al sistema.
- [ ] ¿El color sale de un token, o hay un hexadecimal escrito? Fuera del bloque
      del pliego no debe haber ninguno.
- [ ] Si hay que cambiar cómo se ve un componente del sistema: **por token, nunca
      por selector.** Un override con más especificidad le gana a sus
      modificadores y rompe el sistema para todos.
- [ ] ¿La clase nueva choca con alguna de las 472 del sistema?
- [ ] ¿La etiqueta va en versales con tracking, y el valor en su cuerpo?
- [ ] Las cifras, ¿llevan `tabular-nums`?
- [ ] ¿Lo pulsable mide 44 px como mínimo (`--mal-tap`)?
- [ ] ¿Se ve bien con el notch y la barra de gestos encima (`env(safe-area-inset-*)`)?
- [ ] ¿Sigue siendo legible con `prefers-reduced-motion`?

---

## Lo que hay que devolverle al sistema

La regla de la casa: *si el juego tiene algo que el sistema no tiene, se le añade
al sistema sin romper lo que ya hay.* Ordenado por lo que más falta hace.

### 1 · `.em-pliego`, el espejo de `.em-dark`

El sistema tiene la franja oscura sobre página blanca. Le falta el papel sobre
fondo oscuro, y le sirve a **cualquier producto que hable de prensa** en modo
oscuro: una vista de lectura, una previsualización de impresión, una portada de
edición. Lo que se comparte es la maqueta y los siete tokens, no el dibujo.

Con él dentro, este juego borraría cincuenta líneas de su hoja.

### 2 · El bloque oscuro del periódico, completo

Los cuatro huecos de arriba (`--ref-n1/n2/n3`, `--ref-borde`,
`--ref-acento-linea`, `--ref-marca-2`). Ninguno es de este juego: son del tema,
y cualquier producto que ponga `data-marca="mercio" data-tema="oscuro"` se los
va a encontrar iguales. Las siete líneas ya están escritas y probadas; van tal
cual al bloque `:root[data-marca="mercio"][data-tema="oscuro"]` de `mal.css`.

Y con ellas, dos cosas que sí necesitan más que un token:

- **`--em-franja` es un `#141414` literal en un `:root` sin condición de tema.**
  La franja de destacados de `.em-dark` se pinta sobre una página #1a1a1a:
  1,06 : 1. La banda oscura desaparece en el modo oscuro, que es donde más
  falta hace que se distinga. Se arregla por token declarándolo en el bloque
  oscuro, y de paso `.em-dark .em-card{border-color:#3a3a3a}` (`mal.css:1555`)
  debería salir de `--em-border` como todo lo demás.
- **`::selection` usa el rojo de MAL, no el del periódico.** `mal.css:525`
  escribe `rgba(214,56,43,.24)` a mano —el #D6382B de la casa— en los cuatro
  temas. Debería ser `color-mix(in srgb, var(--mal-primary) 24%, transparent)`.

### 3 · `--ref-marca-rgb`

Lo pedía ya Estado de Excepción y sigue haciendo falta. El sistema publica
`--ref-borde-rgb` para poder graduar el filete, pero no el color de marca. Sin él
no se puede escribir un rojo al 12 % sin volver a escribir el hexadecimal, que es
justo lo que los tokens vienen a evitar. Aquí se ha esquivado con `color-mix`,
que funciona pero es más verboso y no dice lo que quiere decir.

### 4 · Un sello

`.sello` —rectángulo torcido, doble filete, letras apretadas— no es de este juego:
es de cualquier cosa que tenga que parecer un trámite. Un recibo pagado, un
pedido enviado, un documento caducado. Va con su animación de caída y su variante
de color por estado.

### 5 · Una barra con rótulo y cifra

El sistema tiene `.progreso` (carril + relleno) y `.medidor` (segmentos), pero no
la fila completa **rótulo a la izquierda · cifra a la derecha · carril debajo**,
que es lo que pide cualquier panel de estado. El juego la tiene en `.medida`, con
el color derivado del valor: verde por encima de 60, ámbar entre 30 y 60, rojo por
debajo. Ese último detalle es lo que la hace legible de reojo, y es lo que un
componente debería traer resuelto.

### 6 · La banda de aviso a sangre

`.vigente` es una franja de color que rompe el margen de la página para ocupar
todo el ancho. El sistema tiene `.aviso`, que es una caja dentro del flujo. Los
dos hacen falta y no son el mismo componente: uno informa, el otro interrumpe.
