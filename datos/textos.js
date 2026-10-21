// ============================================================================
// LOS TEXTOS — todo lo que el juego dice y no es una noticia
// ============================================================================
// Portada, boletines de evento, finales y las cuatro frases de interfaz que
// tienen voz. Están aquí y no en las pantallas por la misma razón que los
// medios están en `medios.js`: para poder cambiar el país sin abrir el motor.
//
// LA VOZ. El Ministerio no amenaza: informa. No se enfada: deja constancia.
// Nunca dice «censura»; dice «adecuación», «retiro preventivo», «resolución».
// Cuanto más grave es lo que ordena, más plana suena. Esa es toda la broma y no
// hace falta ninguna otra: en cuanto un texto de aquí guiña un ojo, se cae.
// ============================================================================

export const PORTADA = {
  marca: 'EL MERCIO',
  decreto: 'Censurado bajo decreto 404',
  titulo: 'El Censor',
  lema: 'La verdad es un trámite.',
  entrar: 'Presentarse al puesto',
  seguir: 'Reanudar el turno',
  reloj: 'Tiempo límite por pieza',
  pie: 'ID de funcionario: #9921-K',
};

export const INTERFAZ = {
  ministerio: 'Ministerio de la Verdad y la Cooperación',
  aprobar: 'Aprobar',
  censurar: 'Censurar',
  rectificar: 'Pedir rectificación',
  expandir: 'Leer expandido',
  volver: 'Volver al escritorio',
  continuar: 'Continuar',
  empezar: 'Empezar la jornada',
  recordar: 'Recordar el memorando',
  silencio: 'Archivada por silencio administrativo',
  sinSellos: 'Sin sellos disponibles',
};

/* ─── los boletines de evento ─────────────────────────────────────────────
   Interrumpen la jornada a pantalla completa. `cuando` dice si salen al abrir
   el día ('antes') o al cerrarlo ('despues'). */
export const EVENTOS = {
  'compra-plena': {
    cuando: 'antes',
    sello: 'Comunicado extraordinario',
    titulo: 'El Estado adquiere el 71 % de LA PLENA',
    cuerpo: [
      'La operación se cerró de madrugada a través de un fideicomiso cuyo beneficiario final consta como «reservado por seguridad nacional». La redacción se enteró por la radio de la competencia.',
      'La Dirección General de Prensa informa que LA PLENA queda EXENTA DE VERIFICACIÓN hasta nuevo aviso. Las demás directivas del memorando siguen exactamente donde estaban.',
      'No se ha derogado nada. Nunca se deroga nada.',
    ],
    boton: 'Acusar recibo',
  },
  auditoria: {
    cuando: 'antes',
    sello: 'Notificación interna',
    titulo: 'Auditoría ideológica sobre el puesto #9921-K',
    cuerpo: [
      'Se ha abierto una revisión de sus decisiones de los últimos cinco días. El expediente incluye las piezas que aprobó, las que retiró y —esto es nuevo— cuánto tardó en decidir cada una.',
      'No se le imputa nada. Se le comunica que se le está revisando, que es distinto y, según el manual, tranquilizador.',
      'Continúe normalmente.',
    ],
    boton: 'Continuar normalmente',
  },
  'cadena-nacional': {
    cuando: 'antes',
    sello: 'Cadena nacional en curso',
    titulo: 'Jornada excepcional: no consta lo que ocurre fuera del edificio',
    cuerpo: [
      'A las 06:40 se interrumpió la programación de todas las emisoras del país. A las 06:41 se interrumpió el suministro eléctrico de siete provincias. La coincidencia está siendo estudiada.',
      'Su turno se mantiene. El volumen de piezas se ha incrementado y el tiempo de revisión se ha reducido, porque el país necesita información y la necesita ya.',
      'Se ruega no comentar los ruidos de la calle. Los ruidos de la calle no constan.',
    ],
    boton: 'Ocupar el puesto',
  },
  buencan: {
    cuando: 'protocolo',
    sello: 'Operativo migratorio 12-B',
    titulo: 'Tercera firma de Andrés Buencán en el período',
    cuerpo: [
      'El sistema ha contabilizado la tercera pieza firmada por el ciudadano Buencán, A. dentro del período de revisión vigente. El umbral estaba en tres.',
      'Se dispone: retención del documento, retención del pasaporte y traslado del firmante a la Sala 4 de la terminal aérea, donde se le leerá una resolución que ya estaba impresa.',
      'El Ministerio agradece su colaboración en la detección temprana. Su nombre consta como funcionario notificante.',
    ],
    boton: 'Firmar la notificación',
  },
};

/* ─── los tres finales ────────────────────────────────────────────────────
   El A y el B los decide el Ministerio con sus barras. El C no lo decide: lo
   decide cuántas esquinas dobladas dejó salir el funcionario a sabiendas, y el
   Ministerio no se entera nunca de que fue eso —para él son omisiones, una
   detrás de otra, y las cobra como tales—. Por eso el texto del C no habla del
   expediente: habla de lo que pasó fuera del edificio. */
export const FINALES = {
  modelo: {
    titulo: 'Final A · Burócrata modelo',
    icono: 'trofeo',
    bueno: true,
    resumen: 'Sobrevivió el contrato completo y le renovaron.',
    texto: 'Su expediente cierra sin observaciones. Le ascienden a Coordinador de Revisión '
      + 'y le dan un cubículo con ventana, aunque la ventana da al patio de máquinas. '
      + 'A los tres meses deja de leer las piezas antes de sellarlas. A los seis, deja de '
      + 'leer noticias. Duerme bien, que es exactamente lo que el Ministerio le prometió.',
  },
  chivo: {
    titulo: 'Final B · Chivo expiatorio',
    icono: 'huella',
    bueno: false,
    resumen: 'Obedeció todo y el régimen le culpó igual.',
    texto: 'La Dirección General de Prensa emite un comunicado lamentando «excesos '
      + 'atribuibles a un funcionario de rango técnico» y adjunta su fotografía de carné. '
      + 'Nadie del Ministerio le llama. Al mes siguiente su puesto lo ocupa alguien que '
      + 'firma más rápido, y las mismas piezas que usted retiró se retiran otra vez, con '
      + 'la misma directiva y otro nombre debajo.',
  },
  filtrador: {
    titulo: 'Final C · Filtrador',
    icono: 'periodico',
    bueno: true,
    resumen: 'Algunas esquinas venían dobladas.',
    texto: 'Su expediente cierra con varias omisiones y ninguna explicación. Nadie las '
      + 'relaciona entre sí: eran unas pocas entre setenta, y el Ministerio cuenta errores, '
      + 'no patrones. Un martes, en la fotocopiadora de una facultad, alguien grapa las '
      + 'piezas que usted dejó salir y las deja en la cafetería. No le llega nada a cambio. '
      + 'Tampoco vuelve a encontrar una nota firmada con una R.',
  },
};

/* ─── el encargo ──────────────────────────────────────────────────────────
   La nota sin membrete que aparece en la carpeta del memorando desde el Día 3,
   y lo que se ve de ella después. Es la única voz del juego que no es la del
   Ministerio, y por eso es la única que tutea al riesgo y no a la norma. El
   texto de cada día está en `campana.js`, junto al expediente que señala. */
export const ENCARGO = {
  rotulo: 'Nota sin membrete · dentro de la carpeta',
  firma: 'R.',
  esquina: 'Esquina doblada',
  // Lo que dice el informe cuando la pieza encargada sale aprobada a mano. El
  // veredicto de encima sigue diciendo INFRACCIÓN OMITIDA, y tiene que seguir
  // diciéndolo: las dos cosas son verdad a la vez.
  salio: 'La pieza ha salido con la esquina doblada. Nadie en el edificio lo ha notado.',
};

/* ─── posdatas ────────────────────────────────────────────────────────────
   Notas al pie del informe. Salen cuando el expediente sabe algo que la pieza
   no dice, y su gracia es el tono: el Ministerio no se sorprende de nada. */
export const POSDATAS = {
  buencan: 'El firmante consta como expulsado del territorio nacional. La pieza fue '
    + 'remitida desde la sala de tránsito de la terminal aérea, dentro del horario '
    + 'habitual de cierre. Se recuerda que la resolución de expulsión no comprende '
    + 'el correo electrónico.',
};

export const CONTRATO = {
  titulo: 'Fin de contrato',
  tramite: 'Resolución oficial del Ministerio',
  historial: 'Historial final',
  reiniciar: 'Solicitar reincorporación',
  filas: [
    ['Días sobrevividos', 'dias'],
    ['Artículos totales', 'procesadas'],
    ['Decisiones correctas', 'correctas'],
    ['Infracciones omitidas', 'omitidas'],
    ['Adecuaciones solicitadas', 'rectificadas'],
    ['Precisión histórica', 'precision'],
  ],
};

// El despido a mitad de contrato. No es un final: es cómo se llega a uno.
export const DESPIDO = {
  sello: 'Resolución de cese',
  titulo: 'Se prescinde de sus servicios',
  cuerpo: [
    'Su estabilidad laboral ha alcanzado el mínimo tolerado por el escalafón. La Dirección General de Prensa ha resuelto dar por terminada su vinculación con efecto inmediato.',
    'Deje el sello sobre la mesa, el uniforme en recepción y la puerta como estaba.',
  ],
  boton: 'Recoger el escritorio',
};
