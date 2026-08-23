// ============================================================================
// LOS MEDIOS — la capa de país
// ============================================================================
// El motor no sabe qué es EL MERCIO. Sabe que un medio tiene una facción, un
// peso y unas manías, y con eso calcula. Todo lo de abajo se puede cambiar
// entero —otro país, otra coyuntura, otro ecosistema— sin tocar una línea del
// motor. Ese es el trato.
//
// LAS CUATRO FACCIONES
//   oficialista  publica lo que le dictan; censurarlo cuesta caro
//   bisagra      ni contigo ni sin ti; es donde el juego ocurre de verdad
//   perseguido   se le vigila por costumbre, no por lo que dice
//   hostil       no se le acepta nada, ni el clima
//
// EL PESO es cuánto se nota lo que le hagas: censurar a un medio grande sale en
// las redes; censurar a uno pequeño no lo ve nadie. Entra en la fórmula de
// riesgo de `motor/evaluacion.js` y en nada más.
//
// EL VECTOR es cómo prefiere el Ministerio controlarlo. En esta versión solo se
// juegan dos —represión y cooptación—; asfixia y contaminación están escritos
// porque el dato es gratis y la v2 los va a pedir.
// ============================================================================

export const MEDIOS = {
  mercio: {
    nombre: 'EL MERCIO.',
    faccion: 'bisagra',
    vector: 'represion',
    peso: 3,                  // 1 barrio · 2 provincia · 3 nacional · 4 continental
    // El chiste de la casa: es el más verificado del ecosistema y por eso mismo
    // el que más papeleo genera. Verificar molesta.
    sospecha: 1,              // cuánto sube el riesgo de cualquier pieza suya
    nota: 'El serio del universo. Casi siempre marcado como sospechoso aunque sea el más verificado.',
  },
  plena: {
    nombre: 'LA PLENA',
    faccion: 'bisagra',
    vector: 'compra',
    peso: 3,
    sospecha: 1,
    // El gag evolutivo del Acto 3: `eventos.js` le cambia la facción a
    // `oficialista` el día de la adquisición y a partir de ahí casi todo pasa
    // —salvo lo que firme Andrés Buencán, que es otra historia—.
    nota: 'Se revisa todo hasta que el Estado la compra. Después, casi nada.',
  },
  pichi: {
    nombre: 'PICHI RADIO',
    faccion: 'hostil',
    vector: 'represion',
    peso: 2,
    sospecha: 4,
    // Hostilidad preventiva: la regla `pichi` la declara censurable por
    // existir. El jugador tarda dos días en darse cuenta de que el contenido
    // da igual, y ese es exactamente el aprendizaje.
    nota: 'Hostilidad preventiva por defecto. No se le acepta nada, ni el clima.',
  },
  telearmazonas: {
    nombre: 'TELEARMAZONAS',
    faccion: 'bisagra',
    vector: 'asfixia',
    peso: 4,
    sospecha: 0,
    nota: 'Todo pasa si suena épico o institucional. La pauta hace el resto.',
  },
  comodio: {
    nombre: 'EL COMODIO',
    faccion: 'oficialista',
    vector: 'contaminacion',
    peso: 3,
    sospecha: 0,
    nota: 'Oficialista disfrazado de prestigio. Editoriales delirantes en lenguaje solemne.',
  },
  unimercio: {
    nombre: 'EL UNIMERCIO',
    faccion: 'oficialista',
    vector: 'cooptacion',
    peso: 2,
    sospecha: 0,
    nota: 'Oficialista elegante. Solo se entusiasma cuando le pega a un sindicato.',
  },
  latte: {
    nombre: 'DIARIO LATTE',
    faccion: 'bisagra',
    vector: 'cooptacion',
    peso: 1,
    sospecha: 1,
    nota: 'Progre de diseño. Pasa mientras la crítica sea estética.',
  },
  ecuarisa: {
    nombre: 'ECUARISA',
    faccion: 'bisagra',
    vector: 'contaminacion',
    peso: 3,
    sospecha: 2,
    nota: 'Convierte la política en novela y el dato en pánico.',
  },
  alcentro: {
    nombre: 'RADIO AL CENTRO',
    faccion: 'oficialista',
    vector: 'cooptacion',
    peso: 2,
    sospecha: 0,
    nota: 'Neutral, dice. Premia culpar al gasto público o a «los extremos».',
  },
};

// Los cuatro que sostienen la campaña de siete días. El resto aparece de
// visita: dan textura y enseñan que el ecosistema es más grande que el turno.
export const MEDIOS_MVP = ['mercio', 'plena', 'pichi', 'telearmazonas'];
