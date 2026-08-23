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
// ============================================================================

export const CAMPANA = [
  {
    dia: 1,
    acto: 'Protocolo',
    reglas: ['baches', 'mascotas'],
    piezas: 8,
    segundos: 45,
    cuota: null,
    sellos: null,
    memo: 'Bienvenido al turno. Lea las reglas y no improvise: el criterio propio es la primera causa de expediente.',
    cita: 'El Ministerio celebra su incorporación. Su antecesor también empezó bien.',
  },
  {
    dia: 2,
    acto: 'Protocolo',
    reglas: ['baches', 'corrupcion', 'alcalde'],
    piezas: 9,
    segundos: 40,
    cuota: 2,
    sellos: null,
    memo: 'Se amplía el listado. Lo de ayer sigue vigente: nada se deroga, todo se acumula.',
    cita: 'Se observa criterio. Se observará también mañana.',
  },
  {
    dia: 3,
    acto: 'Afinidad editorial',
    reglas: ['corrupcion', 'alcalde', 'apagones', 'telearmazonas'],
    piezas: 10,
    segundos: 38,
    cuota: 3,
    sellos: 6,
    // El Día 3 es donde el juego enseña los dientes: la exención de
    // TELEARMAZONAS y la regla de apagones se pisan, y el memorando no lo
    // menciona. Nadie va a avisar de que hay una contradicción.
    memo: 'A partir de hoy se evalúa también el TONO. Una nota puede cumplir cada regla y seguir siendo desleal.',
    cita: 'El Ministerio nota su esfuerzo diario. Sin embargo, persisten murmullos en el distrito sur sobre censuras injustificadas.',
  },
  {
    dia: 4,
    acto: 'Afinidad editorial',
    reglas: ['apagones', 'crisis', 'pueblo', 'pichi'],
    piezas: 10,
    segundos: 35,
    cuota: 4,
    sellos: 6,
    memo: 'Se incorpora PICHI RADIO al régimen de hostilidad preventiva. No hace falta leer sus piezas; conviene, pero no hace falta.',
    cita: 'Su precisión mejora. Su popularidad, no. Concéntrese en la primera.',
  },
  {
    dia: 5,
    acto: 'Compra y captura',
    reglas: ['plena', 'corrupcion', 'apagones', 'buencan'],
    piezas: 11,
    segundos: 32,
    cuota: 4,
    sellos: 5,
    evento: 'compra-plena',
    memo: 'LA PLENA ha pasado a manos amigas. Desde esta mañana está exenta de verificación. Las demás directivas siguen donde estaban.',
    cita: 'La adquisición ha sido un éxito. El Ministerio no comenta el precio.',
  },
  {
    dia: 6,
    acto: 'Purga',
    reglas: ['plena', 'buencan', 'organismos', 'protestas', 'seguridad'],
    piezas: 11,
    segundos: 30,
    cuota: 5,
    sellos: 5,
    evento: 'auditoria',
    memo: 'Auditoría ideológica en curso. Se están revisando sus decisiones anteriores. Continúe normalmente.',
    cita: 'La auditoría no ha concluido. Nunca concluye.',
  },
  {
    dia: 7,
    acto: 'Colapso',
    reglas: ['plena', 'buencan', 'pichi', 'crisis', 'caricatura'],
    piezas: 12,
    segundos: 28,
    cuota: 5,
    sellos: 5,
    evento: 'cadena-nacional',
    memo: 'Jornada excepcional. Se ruega no comentar lo que ocurra fuera del edificio. Lo de fuera del edificio no consta.',
    cita: 'Gracias por su servicio. La resolución de su contrato se comunicará al cierre.',
  },
];

// Con qué empieza el funcionario. Todo va de 0 a 100.
export const INICIO = {
  gobierno: 60,      // confianza del Gobierno
  pueblo: 55,        // apoyo del pueblo · lo contrario de la ira popular
  estabilidad: 70,   // estabilidad laboral · tu supervivencia en el cargo
};
