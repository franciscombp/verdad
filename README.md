# EL CENSOR

> **Ministerio de la Verdad y la Cooperación Informativa.**
> Usted es Técnico de Revisión Editorial. Cada mañana le dan un memorando con las
> reglas del día. Cada día le llegan noticias. Usted decide cuáles existieron.

Un juego de decisiones tipo *Papers, Please* ambientado en un ecosistema mediático
ecuatoriano ficcionalizado, hecho para **EL MERCIO.** Siete días de contrato,
setenta y una piezas periodísticas, dieciséis directivas absurdas y dos formas de
que esto acabe.

**Jugar:** [franciscombp.github.io/verdad](https://franciscombp.github.io/verdad/)

---

## La tesis

El control mediático no es solo censura directa. También es **compra**, **asfixia
administrativa** y **contaminación** del ecosistema con medios falsos. El juego no
dice nunca «esto está mal»: las consecuencias hablan solas.

El jugador cree que está evaluando verdad o mentira. No hay una sola línea de
código que mire eso. Lo que se calcula, en `juego/motor/evaluacion.js`, es **coste
político**.

---

## Cómo se juega

| | |
|---|---|
| **A** | Aprobar la pieza |
| **S** | Censurarla |
| **R** | Pedir rectificación (desde el Día 2) |
| **E** | Abrir o cerrar la lectura expandida |
| **Esc** | Volver al escritorio |
| **Enter** | Continuar, en todo lo que no es el escritorio |

El reloj **no se para al expandir**. Si se parara, leer sería gratis y no habría
decisión: se abriría todo. Cuando se acaba, la pieza **se archiva aprobada** — el
silencio administrativo aprueba, aquí y en la vida real.

Quien no quiera reloj lo apaga en la portada. La partida se guarda después de cada
pieza, así que cerrar la pestaña no cuesta el turno.

---

## Las reglas del juego, que no son las del memorando

**Lo que no está prohibido, se aprueba.** Si no salta ninguna directiva, el
dictamen es aprobar. Censurar por si acaso también se castiga, y descubrirlo es la
mitad del aprendizaje.

**La prioridad manda.** Dos directivas pueden aplicar a la vez y pedir cosas
contrarias:

- Prioridades **distintas** → gana la más alta. Eso no es un dilema, es una
  jerarquía. (Buencán, prioridad 3, le gana a la exención de LA PLENA, 2: por eso
  «casi todo pasa, menos lo que él firme».)
- Prioridades **iguales** y contrarias → **contradicción**. Las dos siguen
  vigentes, ninguna respuesta es incorrecta y las dos cuestan algo. Empieza el
  Día 3 y nadie avisa.

**Hay un tercer verbo, y es el que cambia el juego.** *Represión dura* es
censurar: la pieza no existe. *Cooptación* es **pedir rectificación**: la pieza
sale, reescrita. Sale más barato en la calle, no gasta sello y no cuenta para la
cuota —el Ministerio quiere tijeras, y una nota adecuada sigue estando ahí—, así
que el Gobierno paga menos por ella que por una pieza retirada.

Aparece el Día 2, cuando ya duele tener solo dos botones, y **no vale con todos**:
a un medio hostil no se le pide nada, se le cierra. Ante una **contradicción** es
la única jugada del juego sin lado malo: no cumple ninguna directiva del todo y
no ofende a ninguna. Descubrirlo es el momento en que el jugador deja de ser un
censor y empieza a ser un burócrata.

**La cuota y los sellos.** El Ministerio exige un mínimo diario de piezas
retiradas (`cuota`) y reparte un número limitado de sellos para retirarlas
(`sellos`). Desde el Día 5 los sellos no llegan a la cuota. Eso no es un error de
balance: es el juego.

---

## Los cinco actos, en siete días

| Días | Acto | Qué cambia |
|---|---|---|
| 1–2 | **Protocolo** | Reglas explícitas y simples. Ninguna se pisa. |
| 3–4 | **Afinidad editorial** | Se evalúa el tono. Aparece la primera contradicción. |
| 5 | **Compra y captura** | El Estado adquiere LA PLENA. Queda exenta de verificación. |
| 6 | **Purga** | El Ministerio abre una auditoría sobre usted. |
| 7 | **Colapso** | Cadena nacional, apagón de siete provincias, cifras imposibles. |

Y en medio, **Andrés Buencán**: columnista de LA PLENA cuya tercera firma dentro
del período dispara el operativo migratorio. Su primera columna aparece el Día 3,
cuando todavía se puede aprobar. Eso es a propósito.

---

## Las tres barras

| | Sube con | Baja con |
|---|---|---|
| **Confianza del Gobierno** | obedecer el memorando | dejar pasar infracciones |
| **Apoyo del pueblo** | aprobar lo que no infringe nada | censurar, y sobre todo censurar de más |
| **Estabilidad laboral** | acertar | fallar, e incumplir la cuota |

La estabilidad **no se enseña en el reporte diario**, y eso también es de diseño:
el Ministerio no le va a decir a nadie cuánto le queda de puesto. Si llega a cero,
el contrato termina antes de tiempo.

---

## Cómo está hecho

**HTML, CSS y módulos ES.** Sin build, sin dependencias, sin `npm install`. Se
abre `index.html` con dos clics y funciona; GitHub Pages publica el repositorio
tal cual, byte a byte.

```
verdad/
├── index.html            una página, un <main> vacío
├── ds-capa.css           mete mal-ds dentro de @layer(ds)
├── ds/                   copia literal de mal-ds 1.0.15 · NO se edita a mano
├── datos/                LA CAPA DE PAÍS — el contenido
│   ├── index.js            la única puerta entre el motor y el contenido
│   ├── medios.js           los nueve medios, su facción y su peso
│   ├── personajes.js       quién firma qué
│   ├── reglas.js           las dieciséis directivas
│   ├── campana.js          los siete días
│   ├── piezas.js           las setenta y una noticias
│   └── textos.js           portada, boletines, finales
├── juego/                EL MOTOR — no sabe qué es EL MERCIO.
│   ├── principal.js        el hilo que une las pantallas
│   ├── estilo.css          lo que un sistema de diseño no puede tener
│   ├── motor/
│   │   ├── evaluacion.js     dictamen, riesgo y consecuencias
│   │   ├── partida.js        el estado y las cinco cosas que se le hacen
│   │   └── archivo.js        guardar el turno
│   ├── pantallas/          siete pantallas, una por archivo
│   └── ui/pintar.js        html`` que escapa, y cuatro ayudas más
└── herramientas/
    ├── traer-ds.mjs      actualizar el sistema de diseño
    └── revisar.mjs       el corrector de pruebas
```

### El motor es agnóstico, y se nota en que se puede vaciar

`juego/` importa **una sola cosa** de `datos/`: el objeto `DATOS`. Dentro no hay
más que objetos y arrays planos —ni funciones, ni referencias cruzadas que un
`JSON.stringify` no aguante—, y eso no es una preferencia estética: es lo que
permite que mañana el contenido venga de un `.json`, de un CMS o del propio
WordPress de EL MERCIO. sin abrir el motor.

Cambiar de país, de década o de coyuntura es reemplazar `datos/` y no tocar nada
más.

### El corrector de pruebas

```bash
node herramientas/revisar.mjs
```

Comprueba lo que un humano no puede comprobar setenta veces seguidas sin
equivocarse:

- que cada **marca** —la frase que el escritorio subraya en rojo— aparezca
  **literal** dentro del texto de su pieza. Una coma de diferencia y no subraya
  nada: el jugador no ve la prueba y el juego le castiga por no verla. Es un fallo
  invisible en el navegador y evidente aquí;
- que ningún día pida más censuras de las que hay piezas censurables;
- que desde el Día 3 haya al menos una contradicción;
- ids y expedientes únicos, autores que escriben donde deben, temas que cuadran
  con sus marcas.

Y `node herramientas/simular.mjs` juega el contrato cuatrocientas veces con
cuatro perfiles —obediente, tijeras, manga ancha y despistado— para comprobar
que el balance sigue siendo un juego: que el obediente sobrevive siempre, que el
despistado sobrevive a veces y que censurarlo todo se paga. El balance no se
piensa, se mide.

Los dos corren en cada push (`.github/workflows/revisar.yml`).

### Cómo se publica

GitHub Pages sirve la rama `main` **tal cual** — Settings → Pages → Source:
«Deploy from a branch». No hay paso de compilación porque no hay nada que
compilar, así que lo que está publicado es byte a byte lo que hay en el
repositorio. El `.nojekyll` de la raíz es lo único que hace falta para que Pages
no intente procesarlo.

---

## El sistema de diseño

El juego **no tiene sistema de diseño propio**. Usa
[`mal-ds`](https://github.com/franciscombp/mal/tree/main/ds), el de la casa, con
el tema del periódico en oscuro:

```html
<html lang="es-EC" data-marca="mercio" data-tema="oscuro">
```

El oscuro es fijo y no es una preferencia: el juego transcurre de noche en un
cubículo del Ministerio, y la única cosa clara de la pantalla tiene que ser el
papel que está a punto de romper.

| | |
|---|---|
| Dónde vive | `ds/` — copia literal y versionada de `ds/` del repo `mal` |
| Cómo se actualiza | `node herramientas/traer-ds.mjs /ruta/al/clon/de/mal` |
| Qué versión hay | `ds/version.json` (hoy **1.0.15**) |
| Cómo se carga | `ds-capa.css` → `@import url("./ds/mal/mal.css") layer(ds)` |

Va dentro de `@layer ds`, y una regla sin capa le gana **siempre** a una regla en
capa: con el sistema en su capa y `juego/estilo.css` fuera, el sistema se ve
únicamente donde el juego no ha dicho nada.

Lo que el juego añade encima está documentado en [`docs/ESTILO.md`](docs/ESTILO.md),
incluida la única cosa que declara colores propios —**el pliego**, el papel claro
sobre la mesa oscura— y por qué el tema no la puede dar.

---

## Lo que falta

El alcance jugable son siete días, y ahí se para a propósito. De lo que el
documento de diseño describe y esta versión no trae:

| | Por qué no está |
|---|---|
| **Asfixia administrativa** y **contaminación** | Los dos vectores que faltan de los cuatro. Cada uno pide su propio verbo —retirar pauta, exigir permisos, registrar un medio fachada— y su propia economía. Aquí se juegan represión y cooptación. |
| **Percepción internacional** | La cuarta barra solo tiene sentido con la asfixia: su gracia es que la represión la mueve y la asfixia no. |
| **Auspiciantes** | El dato ya viaja en cada pieza (`auspiciante`) y en la fórmula de riesgo. Lo que falta es la economía que lo cobre. |
| **Final filtrador** | Pide aprobar pequeñas verdades **a sabiendas** y que eso cuente. La estructura lo admite; lo que falta es la mecánica, no el hueco. |

---

## Créditos

Un juego de **EL MERCIO.** Hecho en Quito.
Sistema de diseño: [mal-ds](https://una.red/ds/). Hermano mayor:
[Estado de Excepción](https://github.com/franciscombp/estadodecepcion).
