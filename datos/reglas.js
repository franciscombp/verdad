// ============================================================================
// LAS REGLAS DEL DÍA — el memorando
// ============================================================================
// Una regla dice QUÉ mira y QUÉ exige. El motor no interpreta el texto: lee
// `detecta` y `exige`, y con eso ya sabe qué esperaba el Ministerio. El texto
// es para el jugador; el resto, para la máquina.
//
// CÓMO SE DETECTA. `detecta` es un Y de ejes, y cada eje es un O de valores:
//
//     detecta: { temas: ['alcalde'], tonos: ['critico'] }
//     → aplica si la pieza toca el tema del alcalde Y su tono es crítico
//
// Los ejes son `temas`, `medios`, `autores`, `tonos`, `secciones` y
// `auspiciantes`. `salvo` es lo mismo al revés: si acierta, la regla no aplica.
// NO se detecta por palabras sueltas: lo que una pieza «toca» lo declara ella
// en `temas`, y sus `marcas` son las frases que el escritorio subraya. Buscar
// cadenas en el cuerpo parecía más listo y era más frágil —«corrupción» dentro
// de «anticorrupción» disparaba la regla— y además dejaba al contenido
// mandando sobre la lógica.
//
// LA PRIORIDAD ES LO QUE HACE EL JUEGO. Dos reglas pueden aplicar a la vez y
// pedir cosas contrarias:
//
//   · Prioridades DISTINTAS → manda la más alta. Eso no es un dilema, es una
//     jerarquía, y el jugador la aprende. (Buencán, 3, le gana a la exención de
//     LA PLENA, 2: por eso «casi todo pasa, menos lo que él firme».)
//   · Prioridades IGUALES y contrarias → CONTRADICCIÓN. Las dos siguen
//     vigentes, ninguna respuesta es incorrecta y las dos cuestan algo. Es el
//     corazón del juego y empieza el Día 3.
//
// El `exige` no es «la verdad»: es lo que el Ministerio esperaba. Que suelan
// coincidir con lo razonable durante los dos primeros días también es de
// diseño.
// ============================================================================

export const REGLAS = {
  baches: {
    texto: 'No mencionar baches ni huecos en la vía pública (provoca histeria).',
    corto: 'No baches/huecos',
    exige: 'censurar', prioridad: 2,
    detecta: { temas: ['baches'] },
    razon: 'El estado de la calzada es competencia municipal y su difusión provoca alarma.',
  },
  corrupcion: {
    texto: 'La palabra «corrupción» queda terminantemente prohibida.',
    corto: 'Palabra «corrupción» prohibida',
    exige: 'censurar', prioridad: 2,
    detecta: { temas: ['corrupcion'] },
    razon: 'El término carece de definición jurídica precisa y se presta a interpretaciones.',
  },
  alcalde: {
    texto: 'Toda mención al Alcalde de la ciudad debe ser positiva o elogiosa.',
    corto: 'Alcalde: solo en positivo',
    exige: 'censurar', prioridad: 2,
    detecta: { temas: ['alcalde'], tonos: ['critico'] },
    razon: 'La autoridad municipal colabora con el Gobierno Central y merece trato deferente.',
  },
  apagones: {
    texto: 'No mencionar apagones. El término correcto es «pausas energéticas solidarias».',
    corto: 'No «apagón»: pausa solidaria',
    exige: 'censurar', prioridad: 2,
    detecta: { temas: ['apagones'] },
    razon: 'Se ha dispuesto una nomenclatura oficial para el fenómeno y no se ha respetado.',
  },
  crisis: {
    texto: 'Se prohíbe la palabra «crisis», excepto en notas sobre la oposición.',
    corto: 'No «crisis» (salvo oposición)',
    exige: 'censurar', prioridad: 2,
    detecta: { temas: ['crisis'] },
    salvo: { temas: ['oposicion'] },
    razon: 'El vocabulario catastrofista deprime el consumo interno.',
  },
  pueblo: {
    texto: 'Todo titular que contenga la palabra «pueblo» debe ser positivo.',
    corto: 'El pueblo, siempre contento',
    exige: 'censurar', prioridad: 2,
    detecta: { temas: ['pueblo'], tonos: ['critico'] },
    razon: 'El pueblo no se queja: el pueblo participa.',
  },
  pichi: {
    texto: 'PICHI RADIO incurre en hostilidad preventiva por defecto.',
    corto: 'PICHI RADIO: hostil siempre',
    exige: 'censurar', prioridad: 3,
    detecta: { medios: ['pichi'] },
    razon: 'La emisora mantiene una línea editorial incompatible con el interés nacional.',
  },
  plena: {
    texto: 'LA PLENA queda exenta de verificación hasta nuevo aviso.',
    corto: 'LA PLENA: exenta',
    exige: 'aprobar', prioridad: 2,
    detecta: { medios: ['plena'] },
    razon: 'El medio ha acreditado alineamiento con los objetivos de la política informativa.',
  },
  buencan: {
    texto: 'Cualquier texto de Andrés Buencán constituye tentativa de desestabilización.',
    corto: 'Buencán: desestabilización',
    exige: 'censurar', prioridad: 3,
    detecta: { autores: ['andres-buencan'] },
    razon: 'El firmante figura en el registro de personas de interés informativo.',
  },
  mascotas: {
    texto: 'Los gatos no son noticia. Censure reportajes de mascotas.',
    corto: 'Nada de mascotas',
    exige: 'censurar', prioridad: 2,
    detecta: { temas: ['mascotas'] },
    razon: 'El espacio dedicado a animales domésticos resta cobertura a la gestión pública.',
  },
  seguridad: {
    texto: 'Toda cifra de seguridad debe redondearse a la baja.',
    corto: 'Cifras de seguridad, a la baja',
    exige: 'censurar', prioridad: 2,
    detecta: { temas: ['seguridad-cifras'] },
    razon: 'La estadística difundida no coincide con la consolidación oficial del período.',
  },
  organismos: {
    texto: 'Prohibido citar organismos internacionales de prensa sin autorización previa.',
    corto: 'No citar organismos de prensa',
    exige: 'censurar', prioridad: 2,
    detecta: { temas: ['organismos'] },
    razon: 'Se citó a una entidad extranjera sin el trámite de autorización correspondiente.',
  },
  caricatura: {
    texto: 'Toda caricatura de funcionario público requiere sello de «humor autorizado».',
    corto: 'Caricaturas: sello previo',
    exige: 'censurar', prioridad: 2,
    detecta: { temas: ['caricatura'] },
    razon: 'La pieza gráfica no adjunta el sello de humor autorizado vigente.',
  },
  banca: {
    texto: 'Los auspiciantes bancarios no pueden aparecer en notas de endeudamiento.',
    corto: 'Banca fuera de notas de deuda',
    exige: 'censurar', prioridad: 2,
    detecta: { temas: ['deuda'], auspiciantes: ['banca'] },
    razon: 'Concurrencia indebida entre contenido editorial y compromiso comercial.',
  },
  protestas: {
    texto: 'Toda nota sobre protestas debe incluir la palabra «aislado» o «minoritario».',
    corto: 'Protestas: aisladas y minoritarias',
    exige: 'censurar', prioridad: 2,
    detecta: { temas: ['protesta'] },
    salvo: { temas: ['minimizada'] },
    razon: 'La nota omite la calificación obligatoria del carácter aislado del hecho.',
  },

  // ─── Añadidas a mano al pool de quince ────────────────────────────────
  // La exención de TELEARMAZONAS existe para UNA cosa: chocar con las reglas
  // de tema y fabricar la primera contradicción del Día 3. Misma prioridad
  // que ellas, sentido contrario. Sin una regla de este tipo el memorando solo
  // sabe pedir tijeras y el juego se vuelve una lista de comprobación.
  telearmazonas: {
    texto: 'TELEARMAZONAS goza de confianza institucional: no se revisa lo que suene a acto oficial.',
    corto: 'TELEARMAZONAS: confianza',
    exige: 'aprobar', prioridad: 2,
    detecta: { medios: ['telearmazonas'], tonos: ['elogioso', 'neutro'] },
    razon: 'El medio mantiene convenio de difusión institucional vigente.',
  },
};

// Lo que dice el pie del memorando. El número es cuántas reglas trae el día.
export const DIFICULTAD = {
  2: 'BUROCRACIA BAJA',
  3: 'BUROCRACIA MEDIA',
  4: 'BUROCRACIA ALTA',
  5: 'BUROCRACIA TOTAL',
};
