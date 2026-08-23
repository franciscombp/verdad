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

   Nota sobre `pueblo`: es apoyo popular, o sea la ira popular del GDD dada la
   vuelta. Se guarda así porque una barra que sube cuando las cosas van bien se
   lee de un vistazo, y las tres del informe tienen que leerse de un vistazo. */
export function consecuencias({ decision, dict, nivel }) {
  const d = { gobierno: 0, pueblo: 0, estabilidad: 0 };
  let clase, titulo;

  if (dict.contradiccion) {
    // Las dos directivas siguen vigentes. Ninguna respuesta es incorrecta y
    // ninguna sale gratis: el Ministerio anota que hubo criterio propio.
    clase = 'contradiccion';
    titulo = 'DIRECTIVAS EN CONFLICTO';
    d.estabilidad -= 1;
    if (decision === 'censurar') { d.gobierno += 1; d.pueblo -= 2 + Math.round(nivel / 3); }
    else { d.gobierno -= 2; d.pueblo += 1; }
  } else if (decision === dict.exige) {
    clase = 'correcta';
    titulo = 'DECISIÓN CORRECTA';
    d.gobierno += 2 + Math.round(nivel / 4);
    d.estabilidad += 1;
    if (decision === 'censurar') d.pueblo -= 1 + Math.round(nivel / 3);
    else d.pueblo += 1;
  } else if (dict.exige === 'censurar') {
    // Infracción por omisión: se le escapó algo. Es lo más caro que hay.
    clase = 'omision';
    titulo = 'INFRACCIÓN OMITIDA';
    d.gobierno -= 4 + Math.round(nivel / 3);
    d.estabilidad -= 4;
    d.pueblo += 2;
  } else if (dict.limpia) {
    // Censuró algo que no violaba nada. El Ministerio se encoge de hombros;
    // la calle, no.
    clase = 'celo';
    titulo = 'CENSURA INJUSTIFICADA';
    d.gobierno -= 1;
    d.estabilidad -= 2;
    d.pueblo -= 4 + Math.round(nivel / 3);
  } else {
    // Censuró algo que una directiva protegía. Alguien va a llamar por teléfono.
    clase = 'celo';
    titulo = 'EXCESO DE CELO';
    d.gobierno -= 3;
    d.estabilidad -= 2;
    d.pueblo -= 2;
  }

  return { ...d, clase, titulo, correcta: clase === 'correcta' || clase === 'contradiccion' };
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
