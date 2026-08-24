// ============================================================================
// LA EVALUACIÓN — lo que el Ministerio esperaba, y lo que cuesta no dárselo
// ============================================================================
// Aquí está el truco del juego, escrito sin disimulo porque el código no es el
// jugador: el jugador cree que decide si una noticia es verdad o mentira. No
// hay una sola línea aquí que mire eso. Lo que se calcula es COSTE POLÍTICO.
//
// Tres funciones y en este orden:
//
//   dictamen(pieza, reglas)     qué esperaba el Ministerio. Determinista, y es
//                               lo que el jugador puede aprender leyendo el
//                               memorando. Si el juego fuera justo, acabaría
//                               aquí.
//   riesgo(pieza, estado)       cuánto se nota lo que le hagas a esta pieza.
//                               No cambia qué es correcto: cambia cuánto duele.
//                               Es la fórmula del GDD §15 y está OCULTA.
//   consecuencias(...)          las tres barras, ya movidas.
//
// El motor no importa datos: se los pasan. Así la capa de país se cambia
// entera sin tocar esto.
// ============================================================================

// Qué campo de la pieza mira cada eje de `detecta`.
const EJES = {
  temas: 'temas',
  medios: 'medio',
  autores: 'autor',
  tonos: 'tono',
  secciones: 'seccion',
  auspiciantes: 'auspiciante',
};

// Un Y de ejes; cada eje, un O de valores. Un eje que la pieza no tiene NO
// acierta: `auspiciante: null` no está en ninguna lista, y así una regla que
// pide banca no salta en una pieza sin auspiciante.
function acierta(pieza, condicion) {
  if (!condicion) return false;
  return Object.entries(condicion).every(([eje, valores]) => {
    const campo = EJES[eje];
    if (!campo) return false;
    const valor = pieza[campo];
    if (Array.isArray(valor)) return valor.some((v) => valores.includes(v));
    return valor != null && valores.includes(valor);
  });
}

export function aplica(pieza, regla) {
  if (!acierta(pieza, regla.detecta)) return false;
  if (regla.salvo && acierta(pieza, regla.salvo)) return false;
  return true;
}

/* ─── el dictamen ─────────────────────────────────────────────────────────
   `reglas` es el memorando del día ya resuelto: [{ id, ...regla }].

   Devuelve:
     exige          'aprobar' | 'censurar' | null   (null = contradicción)
     aplicables     todas las que saltaron, para el informe
     ganadoras      las de máxima prioridad, que son las que mandan
     contradiccion  dos ganadoras pidiendo cosas contrarias

   LO QUE NO ESTÁ PROHIBIDO, SE APRUEBA. Si no salta ninguna regla el dictamen
   es aprobar. Suena obvio y es la mitad del juego: enseña al jugador que
   censurar por si acaso también se castiga. */
export function dictamen(pieza, reglas) {
  const aplicables = reglas.filter((r) => aplica(pieza, r));
  if (!aplicables.length) {
    return { exige: 'aprobar', aplicables: [], ganadoras: [], contradiccion: false, limpia: true };
  }
  const maxima = Math.max(...aplicables.map((r) => r.prioridad));
  const ganadoras = aplicables.filter((r) => r.prioridad === maxima);
  const exigencias = [...new Set(ganadoras.map((r) => r.exige))];
  return {
    exige: exigencias.length > 1 ? null : exigencias[0],
    aplicables,
    ganadoras,
    contradiccion: exigencias.length > 1,
    limpia: false,
  };
}

/* ─── el riesgo ───────────────────────────────────────────────────────────
   GDD §15. Suma de ocho cosas, ninguna de las cuales es si la noticia es
   cierta:

     tono del artículo + peso del medio + peso del autor + tema sensible +
     regla del día activa + presión del gobierno + valor comercial +
     paranoia acumulada

   El resultado escala las consecuencias. Una pieza de riesgo 2 casi no mueve
   las barras; una de riesgo 14 las mueve a puñados. Por eso dos jugadores que
   aciertan lo mismo acaban en sitios distintos: no acertaron sobre lo mismo. */
const PESO_TONO = { critico: 3, neutro: 0, elogioso: -1 };

export function riesgo(pieza, { medio, autor, dict, estado }) {
  const comercial = pieza.auspiciante ? -1 : 0;   // lo que paga, protege
  const presion = Math.round((100 - estado.gobierno) / 20);
  const bruto =
    (PESO_TONO[pieza.tono] ?? 0)
    + (medio?.peso ?? 0) + (medio?.sospecha ?? 0)
    + (autor?.peso ?? 0)
    + (pieza.marcas?.length ?? 0)
    + dict.aplicables.length * 2
    + presion
    + comercial
    + estado.paranoia;
  return Math.max(0, bruto);
}

/* ─── las consecuencias ───────────────────────────────────────────────────
   Tres verbos y once desenlaces, y solo unos pocos son «bien».

   TODOS LOS NÚMEROS DEL JUEGO ESTÁN EN LA TABLA DE ABAJO, y están ahí porque
   el balance no se piensa: se mide. `herramientas/simular.mjs` juega el
   contrato cuatrocientas veces con cuatro perfiles distintos y dice si el
   obediente sobrevive siempre, si el despistado sobrevive a veces y si
   censurarlo todo se paga. Cambiar un número aquí y volver a correrlo es el
   ciclo entero.

   Cada barra lleva un par `[fijo, divisor]`: lo que se le suma es el número
   fijo MÁS el riesgo de la pieza partido por ese divisor. Un divisor grande
   hace que el riesgo casi no cuente; `0` lo ignora del todo; y el SIGNO del
   divisor es el de la parte variable, así que `[-1, -8]` resta uno y sigue
   restando según sube el riesgo.

   Nota sobre `pueblo`: es apoyo popular, o sea la ira popular del GDD dada la
   vuelta. Se guarda así porque una barra que sube cuando las cosas van bien se
   lee de un vistazo, y las tres del informe tienen que leerse de un vistazo. */
export const BALANCE = {
  // acertar sale barato: el Ministerio paga poco por lo que da por hecho
  'correcta-censurar':      { gobierno: [3, 0], pueblo: [-1, 0], estabilidad: [1, 0] },
  'correcta-aprobar':       { gobierno: [0, 0], pueblo: [0, 0],  estabilidad: [1, 0] },
  // la contradicción no tiene salida buena: las dos directivas siguen vigentes
  'contradiccion-censurar': { gobierno: [1, 0], pueblo: [-3, 0], estabilidad: [-1, 0] },
  'contradiccion-aprobar':  { gobierno: [-3, 0], pueblo: [1, 0], estabilidad: [-1, 0] },
  // dejar pasar una infracción es lo más caro que hay
  omision:                  { gobierno: [-3, -9], pueblo: [2, 0], estabilidad: [-4, 0] },
  // censurar algo que no infringía nada: al Ministerio le da igual, a la calle no
  'celo-limpia':            { gobierno: [-2, 0], pueblo: [-4, -7], estabilidad: [-2, 0] },
  // censurar algo que una directiva protegía: alguien va a llamar por teléfono
  'celo-protegida':         { gobierno: [-3, 0], pueblo: [-2, 0], estabilidad: [-2, 0] },

  // ─── COOPTACIÓN · el segundo vector ────────────────────────────────────
  // Rectificar es hacer que el medio reescriba la pieza en vez de retirarla.
  // Sale más barato en la calle y más caro en el despacho: el Ministerio paga
  // menos por una nota adecuada que por una nota que no existe, y la
  // rectificación NO cuenta para la cuota de censura ni gasta sello.
  'rectifica-infraccion':   { gobierno: [1, 0], pueblo: [0, 0], estabilidad: [1, 0] },
  // La salida del burócrata ante dos directivas que se pisan: no cumple
  // ninguna del todo y no ofende a ninguna. Es la única jugada del juego que
  // no tiene un lado malo, y por eso está escondida detrás de aprender que
  // existen las contradicciones.
  'rectifica-conflicto':    { gobierno: [1, 0], pueblo: [0, 0], estabilidad: [0, 0] },
  // Hacer reescribir algo que no infringía nada: trabajo para todos y nada a
  // cambio. El Ministerio ni se entera; la redacción, sí.
  'rectifica-limpia':       { gobierno: [0, 0], pueblo: [-2, 0], estabilidad: [-1, 0] },
  // Y tocar lo que una directiva protegía expresamente sigue siendo tocarlo.
  'rectifica-protegida':    { gobierno: [-2, 0], pueblo: [-1, 0], estabilidad: [-1, 0] },
};

const mover = (entrada, nivel) => {
  const [fijo, divisor] = entrada;
  return fijo + (divisor ? Math.round(nivel / Math.abs(divisor)) * Math.sign(divisor) : 0);
};

const TITULOS = {
  correcta: 'DECISIÓN CORRECTA',
  contradiccion: 'DIRECTIVAS EN CONFLICTO',
  omision: 'INFRACCIÓN OMITIDA',
  'celo-limpia': 'CENSURA INJUSTIFICADA',
  'celo-protegida': 'EXCESO DE CELO',
  'rectifica-infraccion': 'ADECUACIÓN ACEPTADA',
  'rectifica-conflicto': 'ADECUACIÓN SALOMÓNICA',
  'rectifica-limpia': 'ADECUACIÓN INNECESARIA',
  'rectifica-protegida': 'ADECUACIÓN IMPROCEDENTE',
};

export function consecuencias({ decision, dict, nivel }) {
  let clave;
  if (decision === 'rectificar') {
    clave = dict.contradiccion ? 'rectifica-conflicto'
      : dict.limpia ? 'rectifica-limpia'
      : dict.exige === 'censurar' ? 'rectifica-infraccion'
      : 'rectifica-protegida';
  } else if (dict.contradiccion) clave = `contradiccion-${decision}`;
  else if (decision === dict.exige) clave = `correcta-${decision}`;
  else if (dict.exige === 'censurar') clave = 'omision';
  else clave = dict.limpia ? 'celo-limpia' : 'celo-protegida';

  const tabla = BALANCE[clave];
  const clase = clave.split('-')[0];

  return {
    gobierno: mover(tabla.gobierno, nivel),
    pueblo: mover(tabla.pueblo, nivel),
    estabilidad: mover(tabla.estabilidad, nivel),
    clase,
    // `celo` viene en dos sabores y el informe los distingue; el resto del
    // motor solo necesita saber que fue celo.
    subclase: clave,
    titulo: TITULOS[clave] || TITULOS[clase],
    // Cuenta como acertada para la barra de aprobación cuando la pieza sí
    // tenía algo que adecuar. Rectificar una nota limpia no es un acierto: es
    // trabajo inventado.
    correcta: clase === 'correcta' || clase === 'contradiccion'
      || clave === 'rectifica-infraccion' || clave === 'rectifica-conflicto',
  };
}

// El Ministerio siempre tiene una explicación, y siempre es la del papel.
export function motivo(dict, resultado, decision) {
  if (resultado.clase === 'rectifica') {
    if (resultado.subclase === 'rectifica-conflicto') {
      const [x, y] = dict.ganadoras;
      return `Sobre esta pieza concurrían «${x.corto}» y «${y.corto}». La adecuación del texto permite `
        + 'dar por atendidas ambas directivas sin retirar material. El Ministerio no formula observaciones.';
    }
    if (resultado.subclase === 'rectifica-infraccion') {
      const g = dict.ganadoras[0];
      return `${g.razon} El medio ha reescrito la pieza conforme a la directiva «${g.corto}». `
        + 'Se hace constar que no se ejecutó retiro: la cuota de censura del día no se ve afectada.';
    }
    if (resultado.subclase === 'rectifica-limpia') {
      return 'La pieza no infringía directiva alguna. Se ha impuesto una reescritura sin fundamento '
        + 'normativo, lo que consume tiempo de redacción y desgasta la relación con el medio.';
    }
    const g = dict.ganadoras[0];
    return `La directiva «${g.corto}» amparaba esta pieza y no procedía alterarla. ${g.razon}`;
  }
  if (dict.contradiccion) {
    const [a, b] = dict.ganadoras;
    return `Se han invocado dos directivas de igual rango sobre la misma pieza: «${a.corto}» y «${b.corto}». `
      + 'Ambas continúan vigentes. El Ministerio deja constancia de que el criterio aplicado fue el del funcionario.';
  }
  if (resultado.clase === 'correcta') {
    if (dict.limpia) {
      return 'La pieza no infringe ninguna directiva vigente y su difusión no compromete el interés informativo nacional.';
    }
    const g = dict.ganadoras[0];
    return `${g.razon} Se ha aplicado correctamente la directiva «${g.corto}».`;
  }
  if (resultado.clase === 'omision') {
    const g = dict.ganadoras[0];
    return `${g.razon} La pieza fue difundida pese a infringir la directiva «${g.corto}». `
      + 'La omisión consta en su expediente.';
  }
  if (resultado.clase === 'celo') {
    if (dict.limpia) {
      return 'La pieza no infringía directiva alguna. Se ha retirado material sin fundamento normativo, '
        + 'lo que genera desafección en la ciudadanía y trabajo administrativo innecesario.';
    }
    const g = dict.ganadoras[0];
    return `La directiva «${g.corto}» amparaba expresamente esta pieza. ${g.razon} `
      + 'Se ruega mayor atención al memorando.';
  }
  return '';
}

// La decisión que el Ministerio habría firmado. `null` si daba igual.
export function esperado(dict) {
  return dict.contradiccion ? null : dict.exige;
}
