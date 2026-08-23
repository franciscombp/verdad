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

/* ─── los dos finales ─────────────────────────────────────────────────────
   El GDD trae tres. El tercero —el filtrador— pide una mecánica que esta
   versión no tiene y por eso no está: un final que no se puede jugar no es un
   final, es un texto. */
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
