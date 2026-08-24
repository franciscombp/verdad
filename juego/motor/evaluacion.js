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
   Cuatro desenlaces, y solo uno es «bien».

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
  'correcta-censurar':      { gobierno: [2, 5], pueblo: [-1, -8], estabilidad: [1, 0] },
  'correcta-aprobar':       { gobierno: [1, 8], pueblo: [1, 0],   estabilidad: [1, 0] },
  // la contradicción no tiene salida buena: las dos directivas siguen vigentes
  'contradiccion-censurar': { gobierno: [1, 0], pueblo: [-2, -6], estabilidad: [-1, 0] },
  'contradiccion-aprobar':  { gobierno: [-2, 0], pueblo: [1, 0],  estabilidad: [-1, 0] },
  // dejar pasar una infracción es lo más caro que hay
  omision:                  { gobierno: [-4, -4], pueblo: [2, 0], estabilidad: [-4, 0] },
  // censurar algo que no infringía nada: al Ministerio le da igual, a la calle no
  'celo-limpia':            { gobierno: [-1, 0], pueblo: [-4, -5], estabilidad: [-2, 0] },
  // censurar algo que una directiva protegía: alguien va a llamar por teléfono
  'celo-protegida':         { gobierno: [-3, 0], pueblo: [-2, 0], estabilidad: [-2, 0] },
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
};

export function consecuencias({ decision, dict, nivel }) {
  let clave;
  if (dict.contradiccion) clave = `contradiccion-${decision}`;
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
    correcta: clase === 'correcta' || clase === 'contradiccion',
  };
}

// El Ministerio siempre tiene una explicación, y siempre es la del papel.
export function motivo(dict, resultado, decision) {
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
