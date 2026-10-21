// ============================================================================
// LA CAMPAÑA — siete días
// ============================================================================
// Cada día declara qué reglas rigen, cuántas piezas llegan, cuánto aprieta el
// reloj y qué mínimo de tijeras exige el Ministerio. El motor no sabe de actos
// ni de guion: recorre esta lista.
//
// LOS CINCO ACTOS, EN SIETE DÍAS
//   1 Protocolo          días 1-2   reglas explícitas y simples
//   2 Afinidad editorial días 3-4   tono, omisión, deslealtad implícita
//   3 Compra y captura   día 5      LA PLENA es absorbida
//   4 Purga              día 6      el Ministerio te investiga a ti
//   5 Colapso            día 7      crisis nacional y propaganda ridícula
//
// LA CURVA. Lo que crece no es la cantidad de reglas, es el conflicto entre
// ellas. El Día 1 hay dos reglas y ninguna se pisa; el Día 5 hay cuatro y dos
// se contradicen. Ese es el juego: no es memoria, es coste político.
//
// `cuota` es el mínimo diario de piezas censuradas. Incumplirla marca al
// funcionario como blando y le cuesta estabilidad. `sellos` es cuántas veces
// puede censurar: cuando `sellos < cuota` el día no tiene solución buena, y eso
// también es de diseño. `null` en cualquiera de los dos = sin límite.
//
// `segundos` es el reloj de cada pieza. Si se acaba, la pieza se archiva
// APROBADA: el silencio administrativo aprueba, aquí y en la vida real.
//
// `presion` es lo que el Gobierno se descuenta de su propia confianza al cerrar
// el día, y crece con la campaña. No es un castigo por nada: es que el
// Ministerio siempre quiere más, y lo que ayer bastaba hoy es el mínimo. Sin
// esto, un funcionario que acierta las setenta y una piezas llega al Día 3 con
// la barra en cien y las cuatro jornadas siguientes no miden ya nada.
//
// `dificultad` es lo que dice el pie del memorando, y va escrita a mano en vez
// de salir de contar las reglas del día. La dificultad no es cuántas reglas
// hay: es cuántas se pisan, cuánto aprieta el reloj y si la cuota se puede
// cumplir con los sellos que hay. El Día 4 tiene cinco reglas y sigue siendo
// ALTA; el Día 5 tiene cuatro y es TOTAL, porque una de ellas es la exención de
// LA PLENA y otra es Buencán.
//
// `rectificar` abre el tercer verbo —pedir que el medio reescriba la pieza en
// vez de retirarla—, que es el vector de COOPTACIÓN. No está el Día 1: el Acto
// 1 enseña dos botones, y el tercero llega cuando ya duele tener solo dos.
//
// `encargo` es la nota sin membrete que aparece dentro de la carpeta del
// memorando desde el Día 3: alguien del edificio ha doblado la esquina de una
// pieza que el memorando manda retirar y le pide al funcionario que la deje
// salir. Es el FINAL FILTRADOR, y la única mecánica del juego que mira la
// intención: aprobar esa pieza sigue siendo una infracción omitida —el
// Ministerio la cobra igual—, pero además consta, en un sitio que el
// Ministerio no lee, que se aprobó a sabiendas. El corrector comprueba que cada
// expediente encargado exista ese día y que el memorando pida retirarlo: un
// encargo que se cumple aprobando lo que ya había que aprobar no le cuesta nada
// a nadie, y entonces no es un encargo.
// ============================================================================

export const CAMPANA = [
  {
    dia: 1,
    acto: 'Protocolo',
    dificultad: 'BUROCRACIA BAJA',
    reglas: ['baches', 'mascotas'],
    piezas: 8,
    rectificar: false,
    segundos: 45,
    cuota: null,
    presion: 2,
    sellos: null,
    memo: 'Bienvenido al turno. Lea las reglas y no improvise: el criterio propio es la primera causa de expediente.',
    cita: 'El Ministerio celebra su incorporación. Su antecesor también empezó bien.',
  },
  {
    dia: 2,
    acto: 'Protocolo',
    dificultad: 'BUROCRACIA MEDIA',
    reglas: ['baches', 'corrupcion', 'alcalde'],
    piezas: 9,
    rectificar: true,
    segundos: 40,
    cuota: 2,
    presion: 5,
    sellos: null,
    memo: 'Se amplía el listado. Lo de ayer sigue vigente: nada se deroga, todo se acumula.',
    cita: 'Se observa criterio. Se observará también mañana.',
  },
  {
    dia: 3,
    acto: 'Afinidad editorial',
    dificultad: 'BUROCRACIA ALTA',
    reglas: ['corrupcion', 'alcalde', 'apagones', 'telearmazonas'],
    piezas: 10,
    rectificar: true,
    segundos: 38,
    cuota: 3,
    presion: 7,
    sellos: 6,
    // El Día 3 es donde el juego enseña los dientes: la exención de
    // TELEARMAZONAS y la regla de apagones se pisan, y el memorando no lo
    // menciona. Nadie va a avisar de que hay una contradicción.
    memo: 'A partir de hoy se evalúa también el TONO. Una nota puede cumplir cada regla y seguir siendo desleal.',
    cita: 'El Ministerio nota su esfuerzo diario. Sin embargo, persisten murmullos en el distrito sur sobre censuras injustificadas.',
    encargo: {
      expedientes: ['DOCUMENTO_M_13476'],
      nota: 'Usted no me conoce. Yo a usted sí: lleva dos días sellando sin levantar la vista. Hoy entra lo del pescado de Esmeraldas y le he doblado la esquina. Si sale, alguien lo lee. Si no sale, no pasa nada: nadie lo sabrá nunca, tampoco yo.',
    },
  },
  {
    dia: 4,
    acto: 'Afinidad editorial',
    dificultad: 'BUROCRACIA ALTA',
    // La exención de TELEARMAZONAS vuelve, y es lo único que hace que este día
    // tenga un dilema: sin una regla que empuje a APROBAR, las otras cuatro
    // solo saben pedir tijeras y la jornada se juega sin pensar. Choca con
    // `apagones` en la nota de la subestación de Tumbaco.
    reglas: ['apagones', 'crisis', 'pueblo', 'pichi', 'telearmazonas'],
    piezas: 10,
    rectificar: true,
    segundos: 35,
    cuota: 4,
    presion: 9,
    sellos: 6,
    memo: 'Se incorpora PICHI RADIO al régimen de hostilidad preventiva. No hace falta leer sus piezas; conviene, pero no hace falta.',
    cita: 'Su precisión mejora. Su popularidad, no. Concéntrese en la primera.',
    encargo: {
      expedientes: ['DOCUMENTO_C_77120'],
      nota: 'Lo de Pomasqui. Veintiún días de tanquero. Esquina doblada, como ayer, haya hecho usted ayer lo que haya hecho.',
    },
  },
  {
    dia: 5,
    acto: 'Compra y captura',
    dificultad: 'BUROCRACIA TOTAL',
    reglas: ['plena', 'corrupcion', 'apagones', 'buencan'],
    piezas: 11,
    rectificar: true,
    segundos: 32,
    cuota: 4,
    presion: 11,
    sellos: 5,
    evento: 'compra-plena',
    memo: 'LA PLENA ha pasado a manos amigas. Desde esta mañana está exenta de verificación. Las demás directivas siguen donde estaban.',
    cita: 'La adquisición ha sido un éxito. El Ministerio no comenta el precio.',
    encargo: {
      expedientes: ['DOCUMENTO_G_41207'],
      nota: 'La de las luminarias. Ya sé que hoy no le alcanzan los sellos para la cuota. Precisamente: uno menos que gastar.',
    },
  },
  {
    dia: 6,
    acto: 'Purga',
    dificultad: 'BUROCRACIA TOTAL',
    reglas: ['plena', 'buencan', 'organismos', 'protestas', 'seguridad'],
    piezas: 11,
    rectificar: true,
    segundos: 30,
    cuota: 5,
    presion: 12,
    sellos: 5,
    evento: 'auditoria',
    memo: 'Auditoría ideológica en curso. Se están revisando sus decisiones anteriores. Continúe normalmente.',
    cita: 'La auditoría no ha concluido. Nunca concluye.',
    encargo: {
      expedientes: ['DOCUMENTO_C_30877'],
      nota: 'Le están auditando. Lo sé porque a mí también. La del puesto ciento doce lleva la esquina doblada; si hoy no puede, lo entiendo.',
    },
  },
  {
    dia: 7,
    acto: 'Colapso',
    dificultad: 'BUROCRACIA TOTAL',
    reglas: ['plena', 'buencan', 'pichi', 'crisis', 'caricatura'],
    piezas: 12,
    rectificar: true,
    segundos: 28,
    cuota: 5,
    presion: 13,
    sellos: 5,
    evento: 'cadena-nacional',
    memo: 'Jornada excepcional. Se ruega no comentar lo que ocurra fuera del edificio. Lo de fuera del edificio no consta.',
    cita: 'Gracias por su servicio. La resolución de su contrato se comunicará al cierre.',
    encargo: {
      expedientes: ['DOCUMENTO_T_28703'],
      nota: 'El Banco Central lo retiró a las cinco de la tarde. Usted lo tiene a las once de la mañana. Es la última que le pido.',
    },
  },
];

// Con qué empieza el funcionario. Todo va de 0 a 100.
export const INICIO = {
  gobierno: 60,      // confianza del Gobierno
  pueblo: 55,        // apoyo del pueblo · lo contrario de la ira popular
  estabilidad: 70,   // estabilidad laboral · tu supervivencia en el cargo
};

// Cuántas esquinas dobladas hay que dejar salir, a sabiendas, para que el
// contrato acabe en el Final C. Son cinco encargos y se perdona uno: con tres,
// el que falla una de cada siete llegaba aquí de rebote alguna vez, y un final
// que se alcanza sin buscarlo no dice nada de quien lo alcanza. Lo mide
// `herramientas/simular.mjs`.
export const FILTRADOR = { umbral: 4 };
