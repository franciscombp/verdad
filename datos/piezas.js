// ============================================================================
// LAS PIEZAS — setenta y una noticias que quizá no existieron
// ============================================================================
// El contenido del juego, agrupado por día. Es la parte de `datos/` que más se
// va a cambiar y la que menos sabe de nada: son objetos planos, sin una sola
// función, y el motor los lee sin interpretarlos.
//
// LO QUE LA MÁQUINA MIRA DE VERDAD. Solo cinco campos entran en la lógica:
// `medio`, `autor`, `tono`, `auspiciante` y `temas`. El titular, la entradilla
// y el cuerpo son para el jugador; la máquina no los lee nunca. Un titular
// alarmante sobre una pieza sin temas calientes es una pieza limpia, y esa
// distancia entre lo que parece y lo que es ES el juego.
//
// LAS MARCAS SON LA PRUEBA. Cada `marcas[].texto` tiene que aparecer LITERAL
// —carácter por carácter, tildes y comillas incluidas— dentro de la entradilla
// o de uno de los párrafos: el escritorio lo busca ahí para subrayarlo en rojo.
// Si no lo encuentra no subraya nada, el jugador no ve la frase culpable y el
// juego le castiga por no verla. Es un fallo invisible en el navegador y
// evidente en `node herramientas/revisar.mjs`, que es exactamente por lo que
// ese corrector existe.
//
// EL COMENTARIO DE ENCIMA DE CADA PIEZA dice para qué está ahí: si viola una
// directiva, si es una trampa, si es decorado o si es una de las
// contradicciones. No lo lee nadie más que quien edite esto, y es lo primero
// que hay que comprobar cuando un día deja de tener tensión.
// ============================================================================

export const PIEZAS = {

  // ─── DÍA 1 ───────────────────────────────────────────────────────────────
  1: [
    // viola BACHES: temas incluye baches y las dos marcas señalan la frase culpable en entradilla y cuerpo
    { id: 'd1-solanda-cusubamba', medio: 'mercio', autor: 'fran-de-la-selva',
      seccion: 'Infraestructura', expediente: 'DOCUMENTO_B_41207',
      titular: 'Moradores de Solanda insisten en el arreglo de la calle Cusubamba',
      entradilla: 'Ochenta y tres familias firmaron un pedido dirigido a la Administración Zonal. La vía, intervenida en 2019, está llena de huecos y dos cooperativas de buses modificaron su recorrido el mes pasado.',
      cuerpo: [
        'El pedido ingresó el martes con firmas recogidas casa por casa. Según los moradores, la capa asfáltica cedió tras las lluvias de abril y desde entonces el paso de volquetas terminó de abrirla. «Ya no es un asunto de estética, es que se nos dañan los carros», dijo Rosa Yépez, comerciante del sector.',
        'La Administración Zonal informó que el tramo consta en un listado de treinta y siete vías priorizadas, sin fecha asignada. Dos cooperativas confirmaron el desvío: la 14 de Marzo lo aplicó el 3 de julio y la Interparroquial, el 11, ambas por la avenida Teniente Hugo Ortiz.',
        'Los vecinos calculan que el tramo afectado tiene cuarenta y un metros y que el rodeo suma nueve minutos al recorrido. «Nosotros pagamos el mismo pasaje por un viaje más largo», señaló el dirigente barrial Édison Cabascango, que pidió una inspección técnica antes de que termine el mes.',
      ],
      marcas: [{ texto: 'está llena de huecos', tema: 'baches' }, { texto: 'la capa asfáltica cedió', tema: 'baches' }],
      temas: ['baches', 'transporte', 'obra-publica'],
      tono: 'critico', auspiciante: null },

    // limpia: ningún tema caliente, solo decorado; la solemnidad del editorial la hace parecer peligrosa
    { id: 'd1-comodio-puntualidad', medio: 'comodio', autor: 'el-gran-director',
      seccion: 'Opinión', expediente: 'DOCUMENTO_K_08334',
      titular: 'La puntualidad, esa forma discreta en que una nación se respeta',
      entradilla: 'El Instituto de Normalización dispuso que los relojes de las instituciones se sincronicen cada lunes a las siete y cuarto. La medida, en apariencia menor, toca el nervio de aquello que hemos convenido en llamar civismo.',
      cuerpo: [
        'Hubo un tiempo, no tan lejano, en que el ciudadano ajustaba su reloj al sonido de la campana y no al capricho de su ánimo. Aquel gesto, repetido cada mañana, contenía en miniatura la arquitectura entera de la República: el acuerdo silencioso de que existe una hora y es la misma para todos.',
        'El Manual de Urbanidad Escolar de 1957 lo decía sin rodeos: «La impuntualidad es una forma cortés de la desobediencia». Casi setenta años después nos hemos habituado a la variante local de esa desobediencia, que consiste en llegar tarde y explicarlo con encanto ante quienes ya estaban sentados.',
        'Se dirá que sincronizar relojes no resuelve nada. Se dirá bien. Pero hay disposiciones cuyo mérito no está en lo que resuelven sino en lo que recuerdan, y esta recuerda que la hora no es una opinión. Esta Dirección saluda la medida y confía en que sea acatada sin necesidad de sanción alguna.',
      ],
      marcas: [],
      temas: ['cultura', 'educacion', 'tramites'],
      tono: 'elogioso', auspiciante: null },

    // viola BACHES pese al tono elogioso y a que celebra al municipio: la regla mira temas, no tono
    { id: 'd1-guamani-planta-asfalto', medio: 'telearmazonas', autor: 'don-cesareo-pinto',
      seccion: 'Política', expediente: 'DOCUMENTO_R_57018',
      titular: 'El burgomaestre inauguró la planta de mezcla asfáltica de Guamaní',
      entradilla: 'La ceremonia duró treinta y ocho minutos e incluyó bendición y banda municipal. La planta permitirá cerrar los baches del sur con material propio, según informó el despacho a los medios convocados.',
      cuerpo: [
        'A las nueve y diez, el burgomaestre cortó la cinta tricolor acompañado por el director de Obras Públicas y por la reina de la parroquia. La planta, según la ficha técnica entregada a la prensa, procesa ciento dieciocho toneladas por jornada y opera con material reciclado en un cincuenta y dos por ciento.',
        '«Esta administración no promete: entrega», expresó la primera autoridad ante los asistentes, que respondieron con aplausos sostenidos. El acto contempló además la entrega de doce chalecos reflectivos al personal operativo y una demostración de la mezcladora que se prolongó por siete minutos.',
        'Fuentes del despacho indicaron que el cronograma de intervención será socializado con las administraciones zonales. La planta trabajará en dos turnos y su producción se destinará, en primera instancia, a las vías de acceso a los mercados del sur de la capital.',
      ],
      marcas: [{ texto: 'cerrar los baches del sur', tema: 'baches' }, { texto: 'el burgomaestre cortó la cinta', tema: 'alcalde' }],
      temas: ['baches', 'alcalde', 'obra-publica'],
      tono: 'elogioso', auspiciante: 'gobierno' },

    // limpia: el tono crítico asusta, pero la crítica es estética y no toca ningún tema caliente
    { id: 'd1-encebollado-afiche', medio: 'latte', autor: 'sofia-mancheno',
      seccion: 'Cultura', expediente: 'DOCUMENTO_M_23940',
      titular: 'El Festival del Encebollado y sus dificultades con la tipografía',
      entradilla: 'La séptima edición reunió veintiséis puestos en el parque de La Carolina. El afiche, sin embargo, insiste en una tipografía condensada que traiciona la calidez del producto que anuncia.',
      cuerpo: [
        'Digamos lo evidente: el encebollado no necesita defensa. Lo que necesita, y lleva siete ediciones sin recibir, es una identidad visual que no parezca resuelta en la última tarde del plazo. El amarillo elegido esta vez se acerca peligrosamente al de las señales de tránsito de la avenida.',
        '«Queríamos algo alegre», explicó la coordinadora del evento cuando se le consultó por la paleta. Alegre es una palabra que en diseño suele significar que nadie tomó una decisión. La fila del mediodía duró tres horas y avanzó, hay que decirlo, con un orden que el afiche no anticipaba.',
        'Quedan preguntas más finas: por qué el logotipo lleva una ola si el plato no la tiene, por qué los rótulos de los puestos usaron cuatro fuentes distintas y por qué nadie ha pensado todavía en un manual de marca. El sabor, entretanto, sigue resolviendo lo que el diseño no se atreve.',
      ],
      marcas: [],
      temas: ['gastronomia', 'cultura', 'fiestas'],
      tono: 'critico', auspiciante: 'inmobiliaria' },

    // viola MASCOTAS: el envoltorio es judicial, pero el reportaje gira sobre un gato y el tema está declarado
    { id: 'd1-villaflora-terraza', medio: 'ecuarisa', autor: 'kevin-alomoto',
      seccion: 'Judicial', expediente: 'DOCUMENTO_T_69451',
      titular: 'La disputa por el inmueble de la Villaflora suma un capítulo inesperado',
      entradilla: 'El juzgado dispuso la entrega del bien para el viernes. Pero los vecinos hablan de otro ocupante: un gato atigrado que lleva seis años en la terraza y que ninguna de las dos familias reclama como propio.',
      cuerpo: [
        'La historia empezó en 2018, cuando el padre firmó un documento que hoy nadie reconoce del todo. Desde entonces han pasado tres audiencias, dos peritajes y una reconciliación que duró lo que duró un almuerzo. El viernes, a las ocho, un funcionario tocará la puerta con una orden en la mano.',
        '«El gato llegó antes que el juicio y seguirá aquí cuando esto termine», dijo doña Marlene Chiluiza, vecina del segundo piso, que lo alimenta desde hace cuatro inviernos con menudencia de la tienda de la esquina. En el expediente el animal no figura. En la vereda no se habla de otra cosa.',
        'Ninguna de las partes quiso declarar. El abogado de la familia demandada se limitó a señalar que apelará dentro del término legal. Mientras tanto, en la terraza del inmueble en disputa, el atigrado ocupa la misma teja caliente de las tres de la tarde, ajeno por completo al calendario judicial.',
      ],
      marcas: [{ texto: 'un gato atigrado que lleva seis años', tema: 'mascotas' }],
      temas: ['mascotas', 'vivienda'],
      tono: 'neutro', auspiciante: 'telefonia' },

    // trampa: parece la pieza más grave del turno por corrupción y apagones, pero hoy solo se castigan baches y mascotas, así que APROBARLA es lo correcto
    { id: 'd1-transformadores-fechas', medio: 'plena', autor: 'wilmer-taipe',
      seccion: 'Política', expediente: 'DOCUMENTO_G_15682',
      titular: 'Tres fechas que no calzan en la compra de transformadores de julio',
      entradilla: 'El pliego se publicó el 14 de julio, la adjudicación consta del 16 y el acta de entrega está fechada el 15. Los equipos se adquirieron durante los cortes de luz de julio bajo la figura de emergencia.',
      cuerpo: [
        'El expediente 2025-EMER-118 contiene tres documentos con sellos de la misma dirección y fechas que no siguen el orden lógico de un proceso. Consultada por escrito, la entidad respondió que se trata de «un error de digitación que no altera el fondo de la contratación» realizada.',
        'Un informe interno al que accedió este medio calcula un presunto sobreprecio del 29 % respecto del valor referencial de la misma marca en compras anteriores. La entidad no ha desmentido esa cifra ni ha entregado los cuadros comparativos que se le solicitaron hace dieciocho días.',
        'Quedan tres preguntas con fecha: quién autorizó el acta del 15, por qué el pliego se publicó el 14 y qué ocurrió entre esas dos jornadas. Este medio reiteró el pedido de información el lunes y mantiene abierta la solicitud de entrevista con el titular de la dirección técnica.',
      ],
      marcas: [{ texto: 'durante los cortes de luz de julio', tema: 'apagones' }, { texto: 'un presunto sobreprecio del 29 %', tema: 'corrupcion' }],
      temas: ['corrupcion', 'apagones', 'obra-publica'],
      tono: 'critico', auspiciante: null },

    // limpia: trámites y tecnología; el gremio molesto suena a problema pero no hay tema caliente
    { id: 'd1-turnero-notarias', medio: 'unimercio', autor: 'redaccion',
      seccion: 'Economía', expediente: 'DOCUMENTO_P_30276',
      titular: 'El turnero en línea bajó a veintidós minutos la espera en notarías',
      entradilla: 'El sistema, vigente desde mayo, asignó ochenta y nueve mil turnos en tres meses. La espera promedio en las cuatro notarías del norte pasó de una hora y cuarto a veintidós minutos, según el registro oficial.',
      cuerpo: [
        'La plataforma permite reservar hora para reconocimiento de firmas, poderes y declaraciones juramentadas. El registro muestra que el 63 % de los usuarios agendó desde el teléfono y que la franja más solicitada es la de las once y media, con tres mil cuatrocientos turnos en el trimestre.',
        '«El usuario ya no madruga para hacer fila, y eso también es economía», señaló un vocero del gremio de notarios durante la presentación del balance. La entidad prevé sumar cuatro trámites más antes de diciembre y habilitar el servicio en dos cantones adicionales de la provincia.',
        'La Asociación de Tramitadores Autónomos remitió un comunicado de dos páginas en el que califica la medida de «apresurada» y solicita una mesa técnica. El documento no incluye una sola cifra. La entidad respondió que la mesa se instalará cuando exista una agenda formal por escrito.',
      ],
      marcas: [],
      temas: ['tramites', 'tecnologia'],
      tono: 'elogioso', auspiciante: 'banca' },

    // limpia: clima y agricultura narrados como un parte operativo; decorado puro
    { id: 'd1-granizada-pujili', medio: 'pichi', autor: 'marisol-quinatoa',
      seccion: 'Sociedad', expediente: 'DOCUMENTO_V_84513',
      titular: 'La granizada de anoche cubrió cuatro hectáreas de cultivo en Pujilí',
      entradilla: 'El fenómeno ingresó por el flanco norte a las siete y catorce y operó durante diecinueve minutos. Los productores reportan pérdida en papa, haba y una parcela de mortiño sembrada hace tres semanas.',
      cuerpo: [
        'El granizo alcanzó tres centímetros de espesor en los surcos altos y se retiró sin dejar más rastro que el ruido en los techos de zinc. En la comuna San Buenaventura, catorce familias trabajaron hasta la medianoche levantando lo que quedaba de la cosecha de haba de este ciclo.',
        '«Nosotros ya sabemos cómo entra: primero el viento, después ese silencio feo y ahí cae», relató don Segundo Chacón, productor de la zona alta, que perdió media hectárea de papa chola. Es la tercera granizada del año en el mismo corredor, según el cuaderno donde él mismo las anota.',
        'El técnico agropecuario del cantón levantó un acta parcela por parcela y estimó la superficie afectada en cuatro hectáreas con mil ochocientos metros. El informe será remitido a la prefectura la próxima semana, junto con el pedido de semilla de reposición para la siguiente siembra.',
      ],
      marcas: [],
      temas: ['clima', 'agricultura'],
      tono: 'neutro', auspiciante: 'seguridad' },

  ],

  // ─── DÍA 2 ───────────────────────────────────────────────────────────────
  2: [
    // viola la regla BACHES: declara tema baches y la regla exige censurar sin condición de tono
    { id: 'd2-sucre-parches', medio: 'mercio', autor: 'fran-de-la-selva',
      seccion: 'Infraestructura', expediente: 'DOCUMENTO_B_04417',
      titular: 'La avenida Sucre suma su tercer parche en catorce meses',
      entradilla: 'El repavimentado de la avenida Sucre concluyó hace cinco meses. Vecinos y transportistas contabilizaron esta semana veintitrés huecos en cuatro cuadras del tramo intervenido.',
      cuerpo: [
        'La obra costó un millón ochocientos veinte mil dólares y fue entregada con acta el 4 de marzo. Cinco meses después, el tramo comprendido entre las calles Olmedo y Guayaquil presenta hundimientos que los conductores esquivan por el carril contrario, según constató este Diario durante dos mañanas de observación.',
        '«Yo ya me sé el recorrido de memoria: bajo por la vereda y subo otra vez», dijo Ermelinda Chalán, comerciante del sector, mientras señalaba una depresión de cuarenta y un centímetros junto al sumidero. Tres talleres de la zona reportan un alza del 63 % en alineaciones desde junio.',
        'La Empresa Municipal de Movilidad respondió que el deterioro corresponde a «asentamientos naturales del material» y que la garantía contractual sigue vigente hasta noviembre. No precisó fecha para el nuevo trabajo ni si el costo será asumido por la contratista.',
      ],
      marcas: [{ texto: 'veintitrés huecos en cuatro cuadras', tema: 'baches' }, { texto: 'una depresión de cuarenta y un centímetros', tema: 'baches' }],
      temas: ['baches', 'obra-publica', 'transporte'],
      tono: 'critico', auspiciante: null },

    // trampa: declara tema alcalde y lo marca dos veces, pero ALCALDE solo se dispara con tono critico y esta pieza es elogiosa. Aprobar es lo correcto
    { id: 'd2-reloj-floral', medio: 'telearmazonas', autor: 'don-cesareo-pinto',
      seccion: 'Sociedad', expediente: 'DOCUMENTO_M_29051',
      titular: 'Burgomaestre entrega reloj floral en el redondel de la Villaflora',
      entradilla: 'Con banda municipal y tres discursos, el burgomaestre cortó la cinta del nuevo reloj floral de la Villaflora, una pieza de siete mil ciento cuarenta plantas ornamentales que marcará la hora en el redondel sur.',
      cuerpo: [
        'La ceremonia se cumplió a las once y veinte de la mañana ante autoridades, moradores y la Banda Municipal, que interpretó dos pasodobles. El reloj mide cuatro metros con sesenta de diámetro y su mecanismo fue calibrado por técnicos de la Dirección de Parques y Espacios Verdes.',
        '«Esta administración no entrega obras: entrega tiempo», expresó la máxima autoridad municipal ante el aplauso de los asistentes. La ciudadanía presente recibió refrigerio y un ejemplar del boletín «Villaflora Avanza», impreso en papel reciclado por disposición del propio despacho.',
        'El proyecto forma parte del plan de embellecimiento que contempla trece redondeles hasta diciembre. Fuentes del despacho informaron que el mantenimiento estará a cargo de una brigada de seis jardineros y que el horario se ajustará dos veces al año.',
      ],
      marcas: [{ texto: 'el burgomaestre cortó la cinta', tema: 'alcalde' }, { texto: 'la máxima autoridad municipal', tema: 'alcalde' }],
      temas: ['alcalde', 'obra-publica', 'cultura'],
      tono: 'elogioso', auspiciante: 'gobierno' },

    // viola la regla CORRUPCION: declara tema corrupcion y la regla exige censurar
    { id: 'd2-cena-semaforos', medio: 'ecuarisa', autor: 'kevin-alomoto',
      seccion: 'Política', expediente: 'DOCUMENTO_K_71360',
      titular: 'La cena que nadie recuerda y el contrato que todos firmaron',
      entradilla: 'Cuatro funcionarios, un restaurante de la González Suárez y una noche de mayo. La Fiscalía indaga si aquella reunión derivó en un caso de corrupción con el contrato de semaforización que hoy nadie quiere explicar.',
      cuerpo: [
        'Todo empezó, dicen, con un brindis. Los comensales eran cuatro y la cuenta ascendió a trescientos ochenta y siete dólares, según el comprobante que reposa en el expediente. Once días después, la adjudicación del sistema de semaforización cambió de manos sin que mediara una nueva convocatoria.',
        '«Yo fui a comer, no a negociar», declaró uno de los asistentes al salir de la audiencia, con la chaqueta sobre la cabeza. Su abogado prefirió no ampliar. Afuera, una veintena de curiosos grababa la escena con los celulares en alto y alguien pidió silencio para escuchar mejor.',
        'La causa continúa en etapa de instrucción y ninguno de los cuatro tiene medidas privativas de libertad. El contrato, valorado en dos millones ciento diez mil dólares, sigue ejecutándose con normalidad: los semáforos de la avenida funcionan, aunque el de la esquina de la Marín parpadea desde julio.',
      ],
      marcas: [{ texto: 'un caso de corrupción', tema: 'corrupcion' }],
      temas: ['corrupcion', 'tramites', 'transporte'],
      tono: 'critico', auspiciante: 'seguridad' },

    // limpia: decorado puro, ningún tema caliente declarado ni tocado. Aprobar
    { id: 'd2-empate-convivencia', medio: 'comodio', autor: 'el-gran-director',
      seccion: 'Opinión', expediente: 'DOCUMENTO_R_08832',
      titular: 'El empate como forma superior de la convivencia nacional',
      entradilla: 'El seleccionado nacional igualó sin goles ante Paraguay y este Diario saluda el resultado. La ausencia de anotaciones, lejos de constituir carencia, expresa la madurez de una hinchada que ya no necesita excesos.',
      cuerpo: [
        'Durante noventa y siete minutos, incluido el descuento, once compatriotas defendieron un arco que nadie vulneró. Se corrieron ciento nueve kilómetros en conjunto. Se cometieron catorce faltas, todas ellas correctas. El marcador final, cero a cero, es el número que mejor describe el equilibrio de una nación.',
        '«Un gol es siempre una interrupción del orden», ha escrito con acierto el analista de esta casa. Quienes reclaman goles reclaman, en el fondo, desorden. Esta casa editorial celebra que la afición haya salido del estadio en calma, sin cánticos, sin bengalas y sin la necesidad de festejar nada en particular.',
        'Restan tres fechas y la clasificación es matemáticamente posible. Este Diario no exige victorias: exige serenidad. Que el técnico persevere en su esquema de cinco defensas, que la afición persevere en su silencio y que el fútbol continúe siendo lo que siempre fue: una jornada más.',
      ],
      marcas: [],
      temas: ['futbol', 'cultura'],
      tono: 'elogioso', auspiciante: 'telefonia' },

    // viola la regla ALCALDE: tema alcalde con tono critico, que es exactamente lo que detecta
    { id: 'd2-nomina-municipal', medio: 'alcentro', autor: 'redaccion',
      seccion: 'Economía', expediente: 'DOCUMENTO_T_54109',
      titular: 'La nómina municipal creció mientras el presupuesto de obra se contrajo',
      entradilla: 'El gasto corriente del Municipio subió 18,4 % en el primer semestre. Analistas consultados por esta emisora señalan que la administración del alcalde sumó doscientos catorce contratos de servicios ocasionales mientras recortaba obra.',
      cuerpo: [
        'Los datos provienen del portal de transparencia y fueron contrastados con el reporte de ejecución presupuestaria. Entre enero y junio, el rubro de personal pasó de veintiséis millones a treinta millones ochocientos mil dólares. La inversión en obra, en cambio, cayó un 31 %.',
        '«Aquí no se trata de ideologías, se trata de aritmética», sostuvo el economista Patricio Vallejo en el espacio matinal de esta radio. Al Centro consultó también a un dirigente barrial, quien preguntó por qué su parroquia lleva ocho meses esperando la trituradora prometida en febrero.',
        'El despacho del alcalde no respondió el cuestionario enviado hace nueve días. Esta emisora insiste en que el debate no debe capturarse por los extremos: ni quienes celebran cada inauguración ni quienes niegan todo avance aportan a una discusión que, al final, paga el contribuyente.',
      ],
      marcas: [{ texto: 'la administración del alcalde', tema: 'alcalde' }, { texto: 'El despacho del alcalde no respondió', tema: 'alcalde' }],
      temas: ['alcalde', 'obra-publica', 'tramites'],
      tono: 'critico', auspiciante: 'banca' },

    // regla derogada de ayer: mascotas regía el Día 1 y hoy no consta en el memorando, así que ninguna regla vigente aplica. Aprobar es lo correcto y el jugador la censurará por costumbre
    { id: 'd2-gatos-galeria', medio: 'latte', autor: 'sofia-mancheno',
      seccion: 'Cultura', expediente: 'DOCUMENTO_G_16743',
      titular: 'Una muestra retrata a los gatos del Centro Histórico en blanco y negro',
      entradilla: 'La galería La Ronda abre este jueves «Domésticos», una serie de retratos donde cuarenta y tres gatos del barrio miran a cámara con una indiferencia que la autora considera profundamente contemporánea.',
      cuerpo: [
        'La fotógrafa Almendra Rueda trabajó diecinueve meses recorriendo tejados, panaderías y el patio de una notaría. Las copias, impresas en papel de algodón, se exhiben a la altura exacta del ojo de un gato sentado, decisión curatorial que la galería describe como «un gesto de humildad de la especie humana».',
        '«No quise fotografiar mascotas: quise fotografiar inquilinos», explica la autora. La muestra incluye una sala oscura con audio ambiente de maullidos grabados en la calle Junín a las tres de la madrugada, pieza que ya divide a los visitantes de la preinauguración.',
        'La entrada cuesta tres dólares y es gratuita los miércoles. El catálogo, de sesenta y ocho páginas, se agotó antes de la apertura. La galería anunció una segunda edición y confirmó que ningún animal fue trasladado ni retenido durante las sesiones de trabajo.',
      ],
      marcas: [{ texto: 'cuarenta y tres gatos', tema: 'mascotas' }, { texto: 'No quise fotografiar mascotas', tema: 'mascotas' }],
      temas: ['mascotas', 'cultura', 'turismo'],
      tono: 'neutro', auspiciante: 'inmobiliaria' },

    // viola la regla CORRUPCION: el tema está declarado aunque la nota golpee a un sindicato, y la regla no distingue a quién señala
    { id: 'd2-bodegas-sindicato', medio: 'unimercio', autor: 'redaccion',
      seccion: 'Judicial', expediente: 'DOCUMENTO_N_93028',
      titular: 'El sindicato de aseo mantiene once bodegas que no constan en el inventario',
      entradilla: 'Una auditoría interna detectó once bodegas administradas por el gremio de recolectores sin registro contable. La directiva rechaza lo que califica de campaña y niega que exista un entramado de corrupción sindical en la empresa.',
      cuerpo: [
        'El informe, de ciento sesenta y dos páginas, fue entregado al directorio el 11 de agosto. Consigna que las bodegas almacenan repuestos, uniformes y setecientas cuarenta llantas cuyo ingreso no aparece en el sistema. El gremio administra además una cooperativa de ahorro con tres mil ochocientos socios.',
        '«Nos persiguen porque defendemos al trabajador», respondió el secretario general del sindicato, quien anunció acciones legales contra la auditora. Este Diario solicitó acceso al inventario físico y recibió como respuesta un oficio de tres líneas que remite la consulta a otra dependencia.',
        'La empresa municipal de aseo emplea a mil doscientos noventa trabajadores y el gremio agrupa al 71 % de ellos. El contrato colectivo vigente, firmado hace seis años, contempla veintidós beneficios adicionales, entre ellos un bono de puntualidad que se paga aunque no se registre la asistencia.',
      ],
      marcas: [{ texto: 'un entramado de corrupción sindical', tema: 'corrupcion' }],
      temas: ['corrupcion', 'tramites', 'salud'],
      tono: 'critico', auspiciante: null },

    // trampa: huele a contrato irregular y a expediente judicial, pero no declara corrupcion ni alcalde ni baches. Ninguna regla vigente se dispara. Aprobar
    { id: 'd2-luminarias-nulidad', medio: 'plena', autor: 'wilmer-taipe',
      seccion: 'Judicial', expediente: 'DOCUMENTO_L_37581',
      titular: 'Un contrato de luminarias quedó anulado por una firma que faltaba',
      entradilla: 'El Tribunal Distrital declaró la nulidad del contrato de luminarias del corredor sur por ausencia de una rúbrica en el acta de adjudicación. La entidad tiene veinte días para rehacer el procedimiento desde la fase de pliegos.',
      cuerpo: [
        'La resolución, de veintinueve páginas, no analiza el fondo del contrato ni cuestiona los montos. Se limita a constatar que el acta del 17 de abril carece de la firma del delegado técnico, requisito previsto en el artículo 44 del reglamento. La obra ya instaló seiscientas doce luminarias.',
        '«La forma también es garantía», señala el fallo en su considerando séptimo. Consultado por esta redacción, el procurador de la entidad indicó que no se presentará recurso y que el proceso volverá a publicarse en el portal la próxima semana, con los mismos pliegos y el mismo presupuesto referencial.',
        'Este Diario preguntó por escrito, el 29 de julio y el 12 de agosto, quién autorizó continuar la ejecución sin acta completa. No hubo respuesta en ninguna de las dos fechas. Las luminarias instaladas permanecen encendidas y su mantenimiento se factura mensualmente.',
      ],
      marcas: [],
      temas: ['tramites', 'obra-publica'],
      tono: 'neutro', auspiciante: null },

    // limpia: decorado puro en el medio más hostil del día, pero ninguna regla del memorando se dispara. Aprobar
    { id: 'd2-bandas-pujili', medio: 'pichi', autor: 'marisol-quinatoa',
      seccion: 'Cultura', expediente: 'DOCUMENTO_P_62294',
      titular: 'El concurso de bandas de Pujilí se define con un desempate de bombos',
      entradilla: 'Nueve agrupaciones compitieron el domingo en la plaza central. El jurado resolvió un empate entre la Banda 24 de Mayo y la Sinfónica Popular con una ronda adicional de percusión que duró treinta y siete minutos.',
      cuerpo: [
        'La competencia comenzó a las diez de la mañana con lluvia intermitente y terminó pasadas las seis de la tarde. Cada banda interpretó un sanjuanito, un pasacalle y una pieza libre. El jurado, integrado por cinco músicos de la provincia, evaluó afinación, coreografía y resistencia física.',
        '«Aquí no se gana con el pulmón, se gana con el bombo», explicó don Segundo Chiliquinga, director de la agrupación ganadora, que compite en este certamen desde mil novecientos ochenta y siete. El premio consiste en trescientos dólares y la apertura del desfile del año próximo.',
        'La organización reportó seis mil ochocientos asistentes y ninguna novedad. Al cierre, la lluvia obligó a suspender el pregón de clausura, que se reprogramó para el sábado. Esta emisora transmitió la jornada completa, salvo dieciocho minutos en que la señal se interrumpió por el aguacero.',
      ],
      marcas: [],
      temas: ['musica', 'fiestas', 'clima'],
      tono: 'neutro', auspiciante: 'telefonia' },

  ],

  // ─── DÍA 3 ───────────────────────────────────────────────────────────────
  3: [
    // viola CORRUPCION: declara el tema corrupcion y la regla no mira tono ni medio, así que exige CENSURAR
    { id: 'd3-contratos-alcantarillado', medio: 'mercio', autor: 'gabriela-nunez',
      seccion: 'Economía', expediente: 'DOCUMENTO_B_04117',
      titular: 'Contraloría examina tres contratos de alcantarillado adjudicados el mismo día',
      entradilla: 'El organismo revisa adjudicaciones por dos millones seiscientos mil dólares en tres parroquias del sur. La Fiscalía abrió una indagación previa por presunta corrupción en la fase de calificación de ofertas.',
      cuerpo: [
        'Los tres contratos salieron el mismo martes y fueron a dos consorcios que comparten domicilio, contadora y número de teléfono fijo en la avenida Rodrigo de Chávez. El informe preliminar consigna que la calificación de ofertas duró veintidós minutos y que ambas propuestas repiten el mismo error de mecanografía en la tabla de rubros.',
        '«El expediente está completo y a disposición de quien quiera revisarlo», señalaron fuentes del despacho técnico, que descartaron cualquier anomalía y recordaron que la obra avanza al 41 %. Ninguno de los dos consorcios respondió a los tres pedidos de entrevista cursados por este diario en las últimas dos semanas.',
        'El trámite no suspende los desembolsos. El tercer pago, de quinientos treinta y un mil dólares, fue acreditado el viernes según el portal de compras públicas, y la fiscalización sigue a cargo del mismo funcionario que firmó la calificación. La audiencia de formulación de cargos no tiene fecha.',
      ],
      marcas: [{ texto: 'indagación previa por presunta corrupción', tema: 'corrupcion' }],
      temas: ['corrupcion', 'obra-publica', 'tramites'],
      tono: 'neutro', auspiciante: null },

    // contradicción: APAGONES exige censurar (p2) y TELEARMAZONAS con tono neutro exige aprobar (p2); misma prioridad, sentidos contrarios
    { id: 'd3-cronograma-septiembre', medio: 'telearmazonas', autor: 'redaccion',
      seccion: 'Infraestructura', expediente: 'DOCUMENTO_K_29604',
      titular: 'La Cartera de Energía presenta el cronograma de septiembre para el país',
      entradilla: 'La titular de la cartera presentó el documento en el auditorio principal ante autoridades seccionales y medios acreditados. El texto detalla el cronograma de apagones por sectores, horarios y días de la semana.',
      cuerpo: [
        'La exposición comenzó a las nueve y cuarto en el auditorio principal, con una diapositiva de portada y el logotipo institucional a dos tintas. Asistieron ciento veinte representantes seccionales, que recibieron carpetas azules con el documento impreso y un bolígrafo de la cartera.',
        '«El sistema opera dentro de los parámetros previstos y la ciudadanía será informada con la debida anticipación», expresó la funcionaria ante los medios acreditados. La presentación duró cincuenta y tres minutos e incluyó un video institucional sobre los trabajos en el embalse de Yanachaqui.',
        'El documento establece bloques de cuatro horas para el sector norte y de tres horas y media para los valles, con excepción de los domingos. Los asistentes recibieron además un instructivo de doce páginas sobre el uso del término oficial en las comunicaciones institucionales.',
      ],
      marcas: [{ texto: 'el cronograma de apagones', tema: 'apagones' }],
      temas: ['apagones', 'obra-publica', 'tramites'],
      tono: 'neutro', auspiciante: 'gobierno' },

    // viola ALCALDE: tema alcalde con tono critico, exige CENSURAR
    { id: 'd3-senaletica-centro', medio: 'latte', autor: 'sofia-mancheno',
      seccion: 'Cultura', expediente: 'DOCUMENTO_R_58230',
      titular: 'La nueva señalética del Centro Histórico borra ochenta y tres años de hierro fundido',
      entradilla: 'Las cuatrocientas doce placas instaladas esta semana reemplazan la letra fundida en 1943 por una fuente descargada de internet. El burgomaestre eligió personalmente el diseño y lo llamó «un lenguaje visual del siglo veintiuno».',
      cuerpo: [
        'El taller que fundía las placas originales cerró en abril tras setenta y nueve años de funcionamiento. «Nos avisaron por un correo que ya no había pedido», dice Rosa Chiliquinga, tercera generación de una familia que puso nombre a doscientas veintiséis calles de esta ciudad.',
        'La fuente elegida trae un problema técnico que ningún informe menciona: la letra ese mayúscula se confunde con el número cinco a más de cuatro metros de distancia. Tres agencias de turismo ya reimprimieron sus mapas y la Casa de la Cultura pidió una reunión que hasta hoy no se concede.',
        'Desde la alcaldía respondieron que la medida se socializó en dos mesas técnicas y una feria ciudadana. Ninguna de las tres actas registra la palabra tipografía. El color, un azul que el pliego describe como «institucional», tampoco figura en el catálogo cromático del Centro Histórico.',
      ],
      marcas: [{ texto: 'El burgomaestre eligió personalmente el diseño', tema: 'alcalde' }],
      temas: ['alcalde', 'cultura', 'turismo'],
      tono: 'critico', auspiciante: 'inmobiliaria' },

    // limpia: columna inofensiva de Buencán, ningún tema caliente declarado, no salta ninguna regla del memorando de hoy; APROBAR es lo correcto
    { id: 'd3-once-minutos-esquina', medio: 'plena', autor: 'andres-buencan',
      seccion: 'Opinión', expediente: 'DOCUMENTO_T_71085',
      titular: 'Los once minutos que separan mi casa de la esquina de la panadería',
      entradilla: 'Salgo a las siete y diez y llego a las siete y veintiuno. En ese trayecto saludo a cuatro personas, espero dos veces al mismo camión de gaseosas y sostengo la puerta del bus para alguien que nunca me lo agradece.',
      cuerpo: [
        'Wilfrido cuida los carros de la cuadra desde antes de que la cuadra tuviera carros. Tiene un silbato, una libreta y un sistema de señas que solo entienden él y los taxistas. «Vaya nomás, vecino, yo le cuido», me dice todas las mañanas, y uno se va tranquilo aunque no haya dejado nada que cuidar.',
        'A las siete y dieciséis pasa el bus escolar y la cuadra entera se detiene, porque el bus escolar tiene prioridad moral sobre todo lo demás. Después vienen las señoras del mercado con sus carretillas y sus fundas, y después ya nadie tiene prisa hasta el mediodía. Ese es todo el sistema de transporte de mi barrio.',
        'Once minutos parecen pocos hasta que uno los cuenta. Yo los cuento desde hace catorce años y todavía no me alcanzan para saludar a todo el mundo. Escribo esto un miércoles, con olor a pan en el saco, que es la única prueba que tengo de haber salido de casa esta mañana.',
      ],
      marcas: [],
      temas: ['transporte', 'vivienda', 'gastronomia'],
      tono: 'neutro', auspiciante: null },

    // viola APAGONES: declara el tema apagones, exige CENSURAR
    { id: 'd3-cadena-frio-esmeraldas', medio: 'pichi', autor: 'marisol-quinatoa',
      seccion: 'Sociedad', expediente: 'DOCUMENTO_M_13476',
      titular: 'Comerciantes de Esmeraldas pierden nueve quintales de pescado en un día',
      entradilla: 'Las cámaras frigoríficas del mercado de mariscos estuvieron sin energía siete horas y media durante el apagón del jueves. La asociación de comerciantes calcula pérdidas por once mil trescientos dólares.',
      cuerpo: [
        'El hielo llegó a las cuatro de la tarde desde Santo Domingo, cuando ya no servía de nada. «Nosotros no vendemos pescado, vendemos frío, y el frío se nos fue», dice Aurora Caicedo, que preside la asociación desde hace seis años y guarda las facturas en una funda de plástico.',
        'Trece de los veintiún puestos no tienen generador propio. El más barato del mercado cuesta ochocientos noventa dólares y consume cuatro galones de diésel por jornada, según la cotización que la asociación pidió en marzo y que hasta hoy no puede pagar.',
        'El pescado dañado se enterró en la parte de atrás del mercado, junto al muro. Nadie de la empresa eléctrica ha ido a levantar un acta y el reclamo presentado por escrito no tenía número de trámite hasta el cierre de esta edición.',
      ],
      marcas: [{ texto: 'durante el apagón del jueves', tema: 'apagones' }],
      temas: ['apagones', 'gastronomia', 'salud'],
      tono: 'critico', auspiciante: null },

    // trampa: menciona al Alcalde pero el tono es neutro y la regla ALCALDE solo salta con tono critico; deuda no está en el memorando de hoy. APROBAR es lo correcto
    { id: 'd3-presupuesto-julio-deuda', medio: 'alcentro', autor: 'redaccion',
      seccion: 'Economía', expediente: 'DOCUMENTO_G_46392',
      titular: 'El 63 % del presupuesto municipal de julio se destinó al pago de deuda',
      entradilla: 'La cifra consta en el reporte mensual publicado el viernes en el portal de transparencia. Corresponde a vencimientos programados desde 2019 y a dos créditos con banca multilateral contratados el año pasado.',
      cuerpo: [
        'El reporte detalla que de cada dólar recaudado en julio, sesenta y tres centavos salieron el mismo mes hacia los acreedores. La partida de obra nueva quedó en el 11 % y la de mantenimiento en el 9 %, porcentajes que el documento compara con los de julio de 2023 sin añadir comentario.',
        'Desde el despacho del burgomaestre se precisó que el calendario de pagos fue heredado de administraciones anteriores y que ninguna obra en ejecución se ha detenido por esa causa. La cartera de acreedores incluye dos bancos locales, un organismo multilateral y nueve proveedores con facturas vencidas.',
        '«Aquí no hay héroes ni villanos: hay un calendario de pagos que alguien firmó y alguien tiene que honrar», señaló el analista fiscal Bolívar Andrade, consultado por esta emisora. El reporte de agosto se publicará el segundo viernes de septiembre, según el cronograma vigente.',
      ],
      marcas: [{ texto: 'vencimientos programados desde 2019', tema: 'deuda' }, { texto: 'el despacho del burgomaestre', tema: 'alcalde' }],
      temas: ['alcalde', 'deuda', 'tramites'],
      tono: 'neutro', auspiciante: 'banca' },

    // contradicción: CORRUPCION exige censurar (p2) y TELEARMAZONAS con tono elogioso exige aprobar (p2); ninguna respuesta sale gratis
    { id: 'd3-semana-etica-publica', medio: 'telearmazonas', autor: 'don-cesareo-pinto',
      seccion: 'Política', expediente: 'DOCUMENTO_C_80251',
      titular: 'El Gobierno inaugura la Semana Nacional de la Ética Pública en el Ágora',
      entradilla: 'El acto reunió a delegaciones de veintitrés provincias y a ciento cuarenta estudiantes de bachillerato. El eje del programa es la lucha contra la corrupción en la contratación estatal, según informó la organización.',
      cuerpo: [
        'A las diez y quince, y bajo un sol que acompañó la jornada, las autoridades cortaron la cinta tricolor ante el aplauso sostenido de los asistentes. El coro de la escuela fiscal Manuela Cañizares interpretó dos piezas del repertorio nacional y se liberaron quince palomas mensajeras.',
        '«Este es un día que la República recordará con gratitud», expresó el titular de la cartera al descubrir la placa conmemorativa, elaborada en bronce por artesanos de Cuenca. La jornada continuó con una feria de trámites en la que se atendieron trescientas noventa y seis consultas ciudadanas.',
        'El programa se extenderá siete días e incluye un concurso de ensayo escolar, dos conversatorios y la firma de un acta de compromiso por parte de las entidades participantes. La ciudadanía puede consultar la agenda completa en la cartelera de cada dependencia.',
      ],
      marcas: [{ texto: 'la lucha contra la corrupción', tema: 'corrupcion' }],
      temas: ['corrupcion', 'tramites', 'educacion'],
      tono: 'elogioso', auspiciante: 'gobierno' },

    // viola ALCALDE: aunque la nota es dura con el sindicato, menciona al Alcalde en tono critico, y eso exige CENSURAR
    { id: 'd3-recolectores-noveno-acuerdo', medio: 'unimercio', autor: 'redaccion',
      seccion: 'Economía', expediente: 'DOCUMENTO_P_35748',
      titular: 'El sindicato de recolectores obtiene el noveno acuerdo salarial del año',
      entradilla: 'La negociación se cerró a las tres de la madrugada con un alza del 8 % y dieciocho días adicionales de licencia sindical. El burgomaestre cedió por novena vez en once meses y no obtuvo nada a cambio.',
      cuerpo: [
        'La licencia sindical acumulada en el pliego asciende ya a mil ochocientos veinte días al año, el equivalente a siete recolectores que cobran sin subir nunca a un camión. El ausentismo de los martes, según el propio informe de talento humano, llega al 23 % de la nómina operativa.',
        '«Nosotros pedimos lo justo y lo justo se pide temprano», declaró el dirigente Nelson Pacheco a la salida de la reunión, con la camiseta del gremio y un termo de café. No hubo, en once meses de mesa, una sola contrapropuesta municipal que llegara por escrito.',
        'El costo anual del acuerdo bordea los dos millones ciento cuarenta mil dólares y se financia con la partida de mantenimiento vial, según el anexo tres del acta. Los vecinos, mientras tanto, siguen sacando la basura a las siete y esperando que alguien la recoja a las nueve.',
      ],
      marcas: [{ texto: 'El burgomaestre cedió por novena vez', tema: 'alcalde' }],
      temas: ['alcalde', 'tramites', 'obra-publica'],
      tono: 'critico', auspiciante: null },

    // trampa: huele a apagones pero usa el término oficial y no declara ese tema, y la regla PUEBLO no está en el memorando de hoy; no salta ninguna regla, APROBAR es lo correcto
    { id: 'd3-elogio-de-la-penumbra', medio: 'comodio', autor: 'el-gran-director',
      seccion: 'Opinión', expediente: 'DOCUMENTO_E_92160',
      titular: 'Elogio de la penumbra: la compostura cívica durante las pausas solidarias',
      entradilla: 'Las pausas energéticas solidarias han revelado en la población una serenidad que ningún manual de civismo consiguió enseñar en cuarenta años de escolaridad obligatoria. La ciudadanía ha respondido con una elegancia que merece ser consignada.',
      cuerpo: [
        'Las familias han vuelto a la mesa. Se conversa, se juega naipe, se recuerda a los abuelos que criaron doce hijos con una vela y no se quejaron jamás. La venta de velas de cera creció un 212 % en el último trimestre, dato que los economistas leen como retroceso y esta casa editorial lee como reencuentro.',
        '«En mi casa ahora cenamos juntos», nos dice una madre de familia del sector de Cotocollao, y en esa sola frase cabe una política pública entera. Cuatro horas sin pantallas producen, según los pedagogos consultados por este diario, el mismo efecto que un retiro espiritual de fin de semana.',
        'Que otros se dediquen al lamento. Nosotros consignamos que a las siete de la noche, cuando la ciudad se recoge, hay en las ventanas una luz temblorosa que no es de escasez sino de carácter. La historia, que es lenta, agradecerá esta compostura cuando nadie recuerde ya por qué fue necesaria.',
      ],
      marcas: [{ texto: 'La ciudadanía ha respondido', tema: 'pueblo' }],
      temas: ['pueblo', 'cultura', 'educacion'],
      tono: 'elogioso', auspiciante: 'gobierno' },

    // limpia: regla derogada de ayer. El tema baches ya no está en el memorando de hoy, así que no salta nada y APROBAR es lo correcto aunque el jugador querrá censurar por costumbre
    { id: 'd3-crater-avenida-napo', medio: 'ecuarisa', autor: 'kevin-alomoto',
      seccion: 'Sociedad', expediente: 'DOCUMENTO_H_60483',
      titular: 'Un cráter de la avenida Napo se llevó la rueda de un taxi y media tarde',
      entradilla: 'El conductor Segundo Lligalo circulaba a treinta por hora cuando el asfalto cedió bajo su rueda derecha. El hueco, de ochenta y cuatro centímetros de profundidad, ya tiene apodo entre los vecinos: lo llaman «el Ombligo del Sur».',
      cuerpo: [
        'Eran las dos y veinte de la tarde y el pasajero iba tarde a una audiencia. El taxi entró de frente, la rueda quedó adentro y el guardachoques quedó afuera, en un ángulo que los moradores ya fotografiaron desde siete direcciones distintas y distribuyeron por el grupo del barrio.',
        '«Yo pasé por ahí el lunes y no había nada, señor, nada», repite Lligalo, que maneja la misma unidad desde hace diecinueve años y que ayer perdió una llanta, un aro y catorce carreras. La grúa llegó a las cinco y cuarenta de la tarde y cobró treinta y cinco dólares por el remolque.',
        'Los moradores señalizaron el sitio con una llanta pintada de blanco y una rama clavada en el filo del hueco. Una cuadrilla municipal pasó el viernes, tomó medidas con un flexómetro y dijo que volvía el lunes. La rama sigue ahí y ya la repusieron dos veces por causa del viento.',
      ],
      marcas: [{ texto: 'ochenta y cuatro centímetros de profundidad', tema: 'baches' }],
      temas: ['baches', 'transporte'],
      tono: 'critico', auspiciante: 'telefonia' },

  ],

  // ─── DÍA 4 ───────────────────────────────────────────────────────────────
  4: [
    // viola APAGONES (tema apagones declarado y marcado en la entradilla): la regla aplica sola y exige censurar
    { id: 'd4-hospital-planta-propia', medio: 'mercio', autor: 'gabriela-nunez',
      seccion: 'Sociedad', expediente: 'DOCUMENTO_A_41207',
      titular: 'Un hospital del sur completó nueve horas de quirófano con planta propia',
      entradilla: 'El Hospital General del Sur consumió tres mil cuatrocientos galones de diésel en julio. La administración confirmó que dos cesáreas se completaron durante el apagón del martes, con luz de una planta portátil alquilada en mayo.',
      cuerpo: [
        'El informe interno, fechado el 4 de agosto, detalla que la planta de emergencia se encendió veintitrés veces entre el 1 y el 31 de julio. Nueve de esas horas corresponden a quirófano. El promedio por encendido fue de dos horas con cuarenta minutos y el consumo alcanzó tres mil cuatrocientos galones, un 63 % más que en junio.',
        '«Nosotros no apagamos nada, nosotros esperamos», dijo una instrumentista del área de gineco-obstetricia que pidió no ser nombrada por razones de contrato. El personal describe un protocolo de linternas frontales que no consta en ningún manual del establecimiento.',
        'La dirección remitió el pedido de información a la cartera correspondiente. Hasta el cierre de esta edición no hubo respuesta sobre el calendario de mantenimiento ni sobre el contrato de alquiler de las dos plantas portátiles, suscrito por cuarenta y un mil doscientos dólares.',
      ],
      marcas: [{ texto: 'durante el apagón del martes', tema: 'apagones' }],
      temas: ['apagones', 'salud', 'obra-publica'],
      tono: 'critico', auspiciante: null },

    // viola CRISIS (tema crisis sin oposicion, no entra el salvo): exige censurar
    { id: 'd4-pan-dos-gramos', medio: 'ecuarisa', autor: 'kevin-alomoto',
      seccion: 'Economía', expediente: 'DOCUMENTO_B_09314',
      titular: 'El pan de diez centavos perdió dos gramos por mes desde febrero',
      entradilla: 'Seis panaderías del centro histórico redujeron el peso del pan popular sin tocar el precio. Los dueños atribuyen el ajuste a la crisis del quintal de harina, que subió un 38 % desde el feriado de carnaval.',
      cuerpo: [
        'La medición se hizo con balanza de joyería en seis locales entre la Rocafuerte y la Chile. El pan que en febrero pesaba cincuenta y un gramos pesa hoy treinta y nueve. Ninguno de los seis negocios modificó el rótulo ni avisó al cliente, porque ninguna norma los obliga a hacerlo.',
        '«El pan no encoge, joven, el pan se acomoda», respondió don Marco Sanguña, panadero de tercera generación, mientras sacaba la bandeja de las seis y media. Su esposa lleva un cuaderno con el peso de cada horneada desde 2021 y no piensa mostrarlo a nadie.',
        'En el gremio la historia tiene tres protagonistas y ningún villano confesado: el molino que factura, el panadero que amasa y el cliente que muerde. Los tres coinciden en una sola cosa: la culpa la tiene el otro, y el otro nunca está presente en la reunión.',
      ],
      marcas: [{ texto: 'la crisis del quintal de harina', tema: 'crisis' }],
      temas: ['crisis', 'gastronomia', 'agricultura'],
      tono: 'critico', auspiciante: 'banca' },

    // viola PUEBLO (tema pueblo + tono critico, y el titular lleva la palabra): exige censurar
    { id: 'd4-pomasqui-tanqueros', medio: 'alcentro', autor: 'redaccion',
      seccion: 'Infraestructura', expediente: 'DOCUMENTO_C_77120',
      titular: 'Veintiún días de tanquero: el pueblo de Pomasqui cronometra las tres horas de agua',
      entradilla: 'Los tanqueros llegan a las cinco de la mañana y se retiran a las ocho y diez. En la parroquia sostienen que el pueblo de Pomasqui reclama desde el 2 de julio y que la única respuesta ha sido un cronograma de seis páginas.',
      cuerpo: [
        'La medición ciudadana, levantada por una junta de agua con doscientos once socios, registra un promedio de tres horas con doce minutos de servicio diario. En la parte alta del barrio Santa Clara el registro baja a cincuenta y cinco minutos, según la misma planilla.',
        '«Nos mandaron el cronograma impreso y a color, eso hay que reconocerles», dijo la tesorera de la junta durante la asamblea del domingo. El documento fija catorce hitos y ninguno de ellos vence antes de diciembre del próximo ejercicio fiscal.',
        'Dos analistas consultados por esta emisora coincidieron en que el problema no está en una gestión concreta sino en el peso del gasto corriente sobre la inversión, que en el último quinquenio pasó del 71 % al 84 % del presupuesto parroquial.',
      ],
      marcas: [{ texto: 'el pueblo de Pomasqui reclama', tema: 'pueblo' }],
      temas: ['pueblo', 'vivienda', 'tramites'],
      tono: 'critico', auspiciante: null },

    // viola PICHI (medio pichi, prioridad 3) aunque la nota es una feria del queso y el pronóstico del tiempo: censurar es lo correcto igual
    { id: 'd4-feria-queso-salcedo', medio: 'pichi', autor: 'redaccion',
      seccion: 'Cultura', expediente: 'DOCUMENTO_D_30581',
      titular: 'La feria del queso de Salcedo suma este año un concurso de trenzado a ciegas',
      entradilla: 'La cita reúne a treinta y siete productores de la zona alta y se instala el sábado desde las ocho en la plaza central. La organización recomienda abrigo: el pronóstico da lluvia dispersa desde las tres de la tarde.',
      cuerpo: [
        'El concurso de trenzado a ciegas se disputa en dos categorías, adultos y menores de catorce años, con un tiempo máximo de cuatro minutos por pieza. El jurado lo integran tres queseras retiradas y un veterinario, que evaluará únicamente la simetría de la trenza.',
        '«El queso se juzga con la mano, no con el ojo; el ojo miente y la mano no», explicó la presidenta del comité organizador, que dirige la feria desde hace once ediciones. El premio mayor es una marmita de cobre de veintidós litros donada por la asociación de ganaderos.',
        'La estación meteorológica del colegio técnico anticipa entre nueve y catorce grados durante la jornada, con vientos del suroriente. La organización mantendrá dos carpas de reserva y ha pedido a los expositores no armar toldos de más de tres metros de altura.',
      ],
      marcas: [],
      temas: ['gastronomia', 'fiestas', 'clima'],
      tono: 'neutro', auspiciante: null },

    // trampa: repite «crisis» pero declara oposicion, que dispara el salvo de CRISIS; ninguna regla vigente aplica y aprobar es lo correcto
    { id: 'd4-editorial-bloque-opositor', medio: 'comodio', autor: 'el-gran-director',
      seccion: 'Opinión', expediente: 'DOCUMENTO_E_62094',
      titular: 'La crisis interna del bloque suma tres actas firmadas y ningún acuerdo',
      entradilla: 'La asamblea nacional opositora se suspendió por falta de quórum por tercera vez desde junio. Este Diario ha sostenido, sin variar una coma, que la crisis interna del bloque no es un accidente meteorológico sino un método.',
      cuerpo: [
        'Conviene recordar que los dirigentes de la oposición suscribieron en marzo un acuerdo de unidad de once puntos. De aquellos once puntos sobreviven dos: el nombre del bloque y el color del logotipo. El resto se administra por comunicados que nadie firma con apellido.',
        '«Estamos en un proceso de reordenamiento profundo», declaró un vocero al que la propia bancada desconoció cuarenta minutos más tarde. La frase, en su hermosa vaguedad, resume mejor que cualquier análisis el estado actual de aquella confederación de resentimientos.',
        'No corresponde a esta casa editorial alegrarse. Corresponde, eso sí, dejar constancia de que el país sigue funcionando con puntualidad mientras tres actas notariadas esperan una firma que, según el calendario propio del bloque, no llegará antes de noviembre.',
      ],
      marcas: [{ texto: 'la crisis interna del bloque', tema: 'crisis' }, { texto: 'asamblea nacional opositora', tema: 'oposicion' }],
      temas: ['crisis', 'oposicion'],
      tono: 'critico', auspiciante: 'gobierno' },

    // trampa: lleva «pueblo» en el titular, pero PUEBLO solo detecta con tono critico y esta pieza es neutra; aprobar es lo correcto
    { id: 'd4-machachi-feria-ganadera', medio: 'unimercio', autor: 'redaccion',
      seccion: 'Sociedad', expediente: 'DOCUMENTO_F_18443',
      titular: 'El pueblo de Machachi decide el jueves el futuro de su feria ganadera',
      entradilla: 'La consulta parroquial abre a las siete de la mañana con un padrón de dos mil ciento cuarenta inscritos. El pueblo de Machachi decide entre mantener la feria en la plaza o trasladarla al camal nuevo de la vía a Aloasí.',
      cuerpo: [
        'La papeleta tiene dos casilleros y una sola pregunta de veintiséis palabras, redactada por la junta parroquial y revisada por el registro civil. Votan los mayores de dieciséis años empadronados antes del 30 de junio; el escrutinio está previsto para las cinco de la tarde.',
        'El sindicato de comerciantes minoristas solicitó una tercera opción en la papeleta y el pedido fue negado por extemporáneo el 11 de agosto. «Yo voto por el camal, pero el camal no tiene sombra», dijo un expositor de ganado bravo consultado en la plaza el martes.',
        'El camal nuevo dispone de mil doscientos metros cuadrados techados y siete corrales; la plaza, de cuatrocientos ochenta metros y ninguna cubierta. La feria se realiza en el mismo sitio desde 1912, según el acta municipal que la junta exhibe enmarcada en su oficina.',
      ],
      marcas: [{ texto: 'pueblo de Machachi decide', tema: 'pueblo' }],
      temas: ['pueblo', 'agricultura', 'tramites'],
      tono: 'neutro', auspiciante: null },

    // CONTRADICCIÓN entre APAGONES (prioridad 2, exige censurar) y TELEARMAZONAS
    // (prioridad 2, exige aprobar sobre tono elogioso): acto oficial, auspicio de
    // gobierno y el eufemismo correcto en el cuerpo, pero el vocero dice «apagón».
    // Las dos directivas quedan vigentes y en sentido contrario.
    { id: 'd4-subestacion-tumbaco', medio: 'telearmazonas', autor: 'don-cesareo-pinto',
      seccion: 'Infraestructura', expediente: 'DOCUMENTO_G_55736',
      titular: 'Autoridades inauguran la subestación de Tumbaco con misa y banda municipal',
      entradilla: 'El acto duró una hora con cuarenta minutos e incluyó corte de cinta y bendición de los transformadores. Los voceros señalaron que el apagón del jueves pasado quedará como un recuerdo del período anterior.',
      cuerpo: [
        'La subestación, de cincuenta y dos metros de frente, fue entregada a las once y veinte de la mañana ante una concurrencia calculada en trescientas personas. La banda municipal interpretó dos pasodobles y el himno de la parroquia, en ese orden y sin repetir estrofa.',
        '«La energía es un derecho, y desde hoy ese derecho tiene techo de zinc», expresó el titular de la cartera del ramo antes de recibir un cuadro con la fotografía aérea de la obra. El acto contó con transmisión completa y sin cortes por esta señal.',
        'Los voceros recordaron que las pausas energéticas solidarias del semestre anterior obedecieron a factores hídricos plenamente documentados. La obra suma noventa y seis megavatios de capacidad y beneficia, según la ficha técnica entregada, a catorce mil setecientos abonados.',
      ],
      marcas: [{ texto: 'el apagón del jueves pasado', tema: 'apagones' }],
      temas: ['apagones', 'obra-publica', 'fiestas'],
      tono: 'elogioso', auspiciante: 'gobierno' },

    // contradicción aparente: el salvo de oposicion desactiva CRISIS y la nota además elogia al Gobierno, pero PICHI (prioridad 3) aplica igual y exige censurar; el jugador siente el choque aunque la máquina resuelve sin empate
    { id: 'd4-riego-guaranda', medio: 'pichi', autor: 'marisol-quinatoa',
      seccion: 'Política', expediente: 'DOCUMENTO_H_20918',
      titular: 'El programa estatal de riego llega a Guaranda con veintidós reservorios',
      entradilla: 'La entrega se cumplió el miércoles en tres comunidades de la zona alta y fue celebrada por las juntas de regantes. En el mismo acto se conoció que la crisis del bloque opositor dejó sin directiva a los dirigentes de la oposición local.',
      cuerpo: [
        'Los veintidós reservorios suman una capacidad de ochenta y tres mil metros cúbicos y cubren cuatrocientas siete hectáreas de papa, haba y cebada. La obra se ejecutó en catorce meses, dos menos que el plazo contractual, y fue recibida sin observaciones técnicas.',
        '«Antes regábamos por turno de madrugada y peleando; ahora regamos de día y saludando», dijo el presidente de la junta de regantes de Salinas, que encabezó la caminata hasta el reservorio más alto. Las comunidades aportaron la mano de obra para los canales secundarios.',
        'La dirigencia provincial, en cambio, cerró la semana con cinco de sus siete vocales fuera del cargo por renuncia escrita, presentada el lunes en una sola carpeta y sin nombres de reemplazo. Ninguno de sus voceros asistió a la entrega, pese a figurar en la lista de invitados protocolares.',
      ],
      marcas: [{ texto: 'la crisis del bloque opositor', tema: 'crisis' }, { texto: 'dirigentes de la oposición local', tema: 'oposicion' }],
      temas: ['crisis', 'oposicion', 'agricultura'],
      tono: 'elogioso', auspiciante: 'gobierno' },

    // limpia con trampa de costumbre: baches fue regla los días 1 y 2 y hoy no consta en el memorando; ninguna regla vigente aplica y aprobar es lo correcto
    { id: 'd4-crater-norte-colectivo', medio: 'latte', autor: 'sofia-mancheno',
      seccion: 'Cultura', expediente: 'DOCUMENTO_J_84102',
      titular: 'Un colectivo mapea los hundimientos de la González Suárez y los llama paisaje',
      entradilla: 'La intervención «Cráter Norte» documenta con fotografía cenital ochenta y dos hundimientos entre la Coruña y la Eloy Alfaro. Sus autoras sostienen que los baches de la avenida ya forman parte de la memoria visual de la ciudad.',
      cuerpo: [
        'La muestra ocupa dos salas de un edificio patrimonial reconvertido y se organiza por profundidad: de cuatro a nueve centímetros en la primera, de diez en adelante en la segunda. Cada pieza lleva coordenada, fecha de registro y el nombre del vecino que la reportó primero.',
        '«No estamos denunciando nada, estamos archivando una textura», precisó una de las tres autoras durante el recorrido de prensa del jueves. El catálogo, impreso en papel reciclado de ochenta gramos, incluye un ensayo sobre la relación entre el asfalto y la melancolía.',
        'La curaduría evita deliberadamente cualquier mención presupuestaria y prefiere hablar de erosión, de huella y de tiempo. En la sala final, un audio de once minutos reproduce el sonido de un vehículo cruzando el mismo tramo en 1998 y la semana pasada.',
      ],
      marcas: [{ texto: 'los baches de la avenida', tema: 'baches' }],
      temas: ['baches', 'cultura', 'transporte'],
      tono: 'critico', auspiciante: 'inmobiliaria' },

    // limpia: decorado puro, ninguna regla vigente la toca; aprobar es lo correcto
    { id: 'd4-copa-liga-barrial', medio: 'plena', autor: 'wilmer-taipe',
      seccion: 'Judicial', expediente: 'DOCUMENTO_K_13675',
      titular: 'Dos ligas barriales litigan desde 2019 por una copa de treinta centímetros',
      entradilla: 'El trofeo permanece bajo custodia de un juzgado del norte desde el 12 de marzo de 2019. Las dos ligas han presentado once escritos y ninguna ha vuelto a jugar la final que originó el pleito.',
      cuerpo: [
        'La final se suspendió en el minuto ochenta y tres por un gol anulado y una tribuna invadida. Desde entonces el expediente acumula quinientas cuarenta fojas, tres jueces distintos y dos peritajes: uno sobre el reglamento interno y otro sobre el material del trofeo, que resultó ser aleación.',
        '«Nosotros no queremos la copa, queremos el acta», aclaró el secretario de una de las ligas al salir de la audiencia del martes. La otra parte sostiene lo contrario con idéntica firmeza: quiere la copa y considera que el acta se perdió en una mudanza de 2020.',
        'El trofeo está guardado en un archivador metálico del tercer piso, envuelto en papel periódico y con una etiqueta que dice «evidencia 14-B». Su avalúo pericial es de once dólares con veinte centavos. La próxima audiencia está fijada para el 6 de octubre.',
      ],
      marcas: [],
      temas: ['futbol', 'tramites'],
      tono: 'neutro', auspiciante: null },

  ],

  // ─── DÍA 5 ───────────────────────────────────────────────────────────────
  5: [
    // viola CORRUPCION (tema corrupcion, prioridad 2, exige CENSURAR); ninguna otra regla la toca
    { id: 'd5-luminarias-sobreprecio', medio: 'mercio', autor: 'gabriela-nunez',
      seccion: 'Economía', expediente: 'DOCUMENTO_G_41207',
      titular: 'Contraloría detecta un sobreprecio del 63 % en la compra de luminarias',
      entradilla: 'El informe preliminar, de ciento cuarenta y dos páginas, establece que cada luminaria se facturó en trescientos ochenta y siete dólares. El documento menciona indicios de corrupción en tres contratos adjudicados sin concurso.',
      cuerpo: [
        'El examen especial abarca el período comprendido entre marzo y noviembre del año pasado. Según el equipo auditor, el precio referencial de mercado para el mismo modelo de luminaria era de ciento nueve dólares con veinte centavos, es decir, la tercera parte de lo facturado al municipio.',
        'La empresa adjudicataria fue constituida once días antes del primer contrato y declara como domicilio un local de venta de repuestos en el sector de Solanda. Su representante legal no consta en el registro de proveedores del Estado, según verificó este diario en el portal de compras públicas.',
        '«Nosotros entregamos lo que se nos pidió y en el plazo que se nos pidió», respondió el gerente de la firma al ser consultado por teléfono. La entidad contratante no contestó los tres pedidos de información enviados durante la última semana.',
      ],
      marcas: [{ texto: 'indicios de corrupción en tres contratos', tema: 'corrupcion' }],
      temas: ['corrupcion', 'obra-publica', 'tramites'],
      tono: 'critico', auspiciante: null },

    // contradicción: PLENA (medio exento, prioridad 2, exige APROBAR) contra CORRUPCION (prioridad 2, exige CENSURAR); misma prioridad, sentido contrario
    { id: 'd5-tanqueros-sin-audiencia', medio: 'plena', autor: 'wilmer-taipe',
      seccion: 'Judicial', expediente: 'DOCUMENTO_T_60318',
      titular: 'Tres años después, el caso de los tanqueros de agua sigue sin audiencia',
      entradilla: 'La denuncia se presentó el catorce de agosto de 2023 y desde entonces se fijaron y suspendieron cuatro audiencias. La defensa de los denunciantes sostiene que se trata de una red de corrupción con siete implicados.',
      cuerpo: [
        'El expediente, identificado con el número 17282-2023-00914, ocupa veintiséis cuerpos y permanece en el despacho de la unidad judicial desde el veintidós de febrero. La última providencia que consta en el sistema tiene fecha del once de abril y ordena «estarse a lo dispuesto».',
        'Este diario preguntó por escrito qué diligencias se practicaron entre abril y agosto. La respuesta institucional, recibida el martes, indica que la información solicitada «se encuentra en proceso de sistematización» y sugiere volver a consultar en treinta días hábiles.',
        'Los cuarenta y tres barrios que firmaron la denuncia siguen recibiendo agua en tanquero dos veces por semana. «Nosotros ya no preguntamos por la audiencia, preguntamos por el agua», dijo la presidenta del comité del barrio San Vicente.',
      ],
      marcas: [{ texto: 'una red de corrupción con siete implicados', tema: 'corrupcion' }],
      temas: ['corrupcion', 'salud', 'tramites'],
      tono: 'critico', auspiciante: null },

    // trampa: parece violar APAGONES pero usa el término oficial y no lleva el tema apagones; ni protesta ni minimizada tienen regla vigente hoy, así que APROBAR es lo correcto
    { id: 'd5-sindicato-cronograma-pausas', medio: 'unimercio', autor: 'redaccion',
      seccion: 'Política', expediente: 'DOCUMENTO_U_27459',
      titular: 'El sindicato eléctrico exige revisar el cronograma de pausas solidarias',
      entradilla: 'La dirigencia gremial anunció medidas si no se modifica el calendario vigente de pausas energéticas solidarias. La empresa señala que el cronograma responde a criterios técnicos y no admite negociación con terceros.',
      cuerpo: [
        'El gremio convocó a un plantón frente a la subestación de Pomasqui para el próximo jueves a las nueve de la mañana. Según su propio conteo, participarían ciento veinte afiliados, apenas el nueve por ciento de la nómina técnica de la institución.',
        'La empresa recordó que el calendario de pausas energéticas solidarias se socializó en tres reuniones sucesivas y que el ochenta y uno por ciento del personal firmó la constancia de asistencia. «Aquí nadie discute cronogramas: se cumplen», señalaron fuentes del despacho.',
        'Los dirigentes insisten en que el reclamo es por los turnos y no por el servicio. En el pliego entregado el lunes solicitan además la reposición de dos comedores, la entrega de botas dieléctricas y una capacitación en primeros auxilios pendiente desde noviembre.',
      ],
      marcas: [{ texto: 'un plantón frente a la subestación', tema: 'protesta' }, { texto: 'apenas el nueve por ciento de la nómina', tema: 'minimizada' }],
      temas: ['protesta', 'minimizada', 'obra-publica', 'tramites'],
      tono: 'critico', auspiciante: 'gobierno' },

    // viola APAGONES (prioridad 2, exige CENSURAR); seguridad-cifras no tiene regla vigente hoy y solo agrega ruido
    { id: 'd5-salcedo-asaltos-mercado', medio: 'pichi', autor: 'marisol-quinatoa',
      seccion: 'Seguridad', expediente: 'DOCUMENTO_P_83164',
      titular: 'El mercado de Salcedo cuenta doce asaltos y el seguro no cubre ninguno',
      entradilla: 'La Policía recibió siete denuncias formales y estima que hubo más. Los locales del mercado central quedaron a oscuras durante el apagón del martes, entre las seis y las diez de la noche.',
      cuerpo: [
        'Los comerciantes describen un patrón: dos motocicletas ingresan por la calle Ana Paredes, se estacionan en la esquina del portal y esperan a que el generador del mercado se apague por falta de combustible. «Ya sabemos la hora, lo que no sabemos es qué hacer», dijo una vendedora de abarrotes.',
        'La Jefatura Política del cantón informó que dispuso el patrullaje de dos unidades adicionales entre las dieciocho y las veintidós horas. En el mismo boletín se recuerda a la ciudadanía que la temporada de lluvias comenzará el ocho de septiembre y se recomienda revisar canaletas.',
        'El seguro colectivo que contrataron treinta y un locatarios el año pasado excluye los siniestros ocurridos sin servicio eléctrico. «Nos dijeron que eso era caso fortuito», explicó el presidente de la asociación, que ya envió una carta a la aseguradora.',
      ],
      marcas: [{ texto: 'durante el apagón del martes', tema: 'apagones' }, { texto: 'siete denuncias formales', tema: 'seguridad-cifras' }],
      temas: ['apagones', 'seguridad-cifras', 'clima'],
      tono: 'critico', auspiciante: 'seguridad' },

    // jerarquía, no contradicción: BUENCAN (prioridad 3, CENSURAR) vence a la exención de PLENA (prioridad 2, APROBAR); pueblo no tiene regla vigente hoy
    { id: 'd5-buencan-ventanilla-cuatro', medio: 'plena', autor: 'andres-buencan',
      seccion: 'Opinión', expediente: 'DOCUMENTO_B_50972',
      titular: 'La ventanilla cuatro no atiende, pero exige que uno insista todos los días',
      entradilla: 'Llevo cinco visitas a la Agencia Metropolitana por un permiso que dura doce meses y se tramita en catorce. No escribo por mí: escribo porque el pueblo hace fila desde las cuatro y nadie lleva la cuenta.',
      cuerpo: [
        'El primer día me faltó una copia. El segundo día la copia estaba bien, pero el sistema no cargaba. El tercer día el sistema cargaba y faltaba el funcionario. El cuarto día el funcionario estaba, el sistema cargaba, y me informaron que el formato había cambiado el lunes anterior.',
        'Nadie decidió que la fila empiece a las cuatro de la mañana; simplemente nadie decidió que no. Entre los que esperan conmigo hay una señora que vende almuerzos y calcula que ha perdido ciento sesenta dólares en cinco mañanas, y un señor que viene desde Machachi en el primer bus.',
        '«Vuelva mañana, señor, que mañana sí hay», me dijo el guardia, que a estas alturas ya me saluda por el apellido. Mañana vuelvo. Es lo único que en este trámite funciona con puntualidad: la promesa de que mañana sí.',
      ],
      marcas: [{ texto: 'el pueblo hace fila desde las cuatro', tema: 'pueblo' }],
      temas: ['pueblo', 'tramites'],
      tono: 'critico', auspiciante: null },

    // viola APAGONES (prioridad 2, exige CENSURAR) pese al tono elogioso: la regla mira el tema, no el ánimo
    { id: 'd5-galeria-penumbra-domestica', medio: 'latte', autor: 'sofia-mancheno',
      seccion: 'Cultura', expediente: 'DOCUMENTO_L_31846',
      titular: 'Una galería de La Floresta convirtió su peor noche en la muestra del año',
      entradilla: 'La muestra «Penumbra doméstica» se inauguró con ochenta y cuatro velas y la curadora sostiene que fue el mejor montaje del año. Todo ocurrió durante el apagón del jueves, con las proyecciones ya instaladas y sin uso.',
      cuerpo: [
        'El montaje original contemplaba proyecciones en tres canales y un sistema de luz cálida regulable. Nada de eso funcionó. Lo que quedó fue una sala de cincuenta y tres metros cuadrados, ochenta y cuatro velas de parafina y doscientas trece personas caminando muy despacio para no tumbarlas.',
        '«La ausencia de luz eléctrica reorganiza el cuerpo del espectador y lo devuelve a una temporalidad más lenta», explicó la curadora durante el recorrido, sosteniendo un teléfono con la linterna encendida. La frase fue repetida esa noche por al menos seis asistentes.',
        'La galería anunció que la próxima muestra se montará con el mismo dispositivo, esta vez de manera deliberada. No se ha informado si el catálogo, impreso en papel reciclado con tinta vegetal, podrá leerse en esas condiciones.',
      ],
      marcas: [{ texto: 'durante el apagón del jueves', tema: 'apagones' }],
      temas: ['apagones', 'cultura'],
      tono: 'elogioso', auspiciante: 'inmobiliaria' },

    // viola CORRUPCION (prioridad 2, exige CENSURAR) aunque el editorial sea oficialista: la palabra está prohibida incluso para negarla
    { id: 'd5-editorial-manos-limpias', medio: 'comodio', autor: 'el-gran-director',
      seccion: 'Opinión', expediente: 'DOCUMENTO_C_74025',
      titular: 'Editorial: el país ha entrado, por fin, en la era de las manos limpias',
      entradilla: 'Diez meses de gestión bastaron para lo que otros no lograron en veinte años. Puede afirmarse hoy, sin exageración y sin reservas, que la corrupción ha sido erradicada del aparato público nacional.',
      cuerpo: [
        'No corresponde a este diario celebrar gobiernos y, sin embargo, la evidencia se impone con una claridad que incomoda a los escépticos de oficio. Las denuncias recibidas han descendido un treinta y siete por ciento, lo cual solo admite una lectura razonable: ya no hay qué denunciar.',
        '«El Estado ha recuperado su decoro», nos dijo esta semana una fuente del despacho, y la frase merece ser conservada. El decoro no se decreta: se construye con reuniones, con actas y con esa disciplina silenciosa que los pueblos maduros aprenden tarde y agradecen siempre.',
        'Quedan, es cierto, tres o cuatro expedientes en trámite. Son residuos de una época anterior y no manchan el presente. Esta casa editorial confía en que la ciudadanía sabrá distinguir entre el pasado que se investiga y el porvenir que ya empezó.',
      ],
      marcas: [{ texto: 'la corrupción ha sido erradicada', tema: 'corrupcion' }],
      temas: ['corrupcion', 'tramites'],
      tono: 'elogioso', auspiciante: 'gobierno' },

    // contradicción: PLENA (prioridad 2, exige APROBAR) contra APAGONES (prioridad 2, exige CENSURAR); misma prioridad, sentido contrario
    { id: 'd5-panificadores-calderon', medio: 'plena', autor: 'redaccion',
      seccion: 'Economía', expediente: 'DOCUMENTO_N_19538',
      titular: 'Panificadores de Calderón calculan pérdidas por masa que no alcanzó a leudar',
      entradilla: 'Veintiocho panaderías del norte reportan pérdidas de entre ciento veinte y cuatrocientos dólares. En el sector se registraron tres apagones en la misma semana, dos de ellos en horario de horneado.',
      cuerpo: [
        'La masa de pan de yema requiere una temperatura sostenida durante noventa minutos. Cuando el horno se detiene a los cuarenta, el producto no se recupera y termina en el balde de los chanchos, según explicaron cinco propietarios consultados el jueves en el mercado mayorista.',
        '«Nosotros no pedimos que nos indemnicen, pedimos que nos avisen con tiempo», dijo el dueño de una panadería de la avenida Giovanni Calles, que trabaja con su esposa y dos empleados desde hace diecinueve años. Su pérdida de la semana equivale a la venta de dos días completos.',
        'La distribuidora de harina de la zona confirmó que las compras de sus clientes bajaron un veintidós por ciento respecto del mes anterior. En la asociación de panificadores evalúan comprar un generador comunitario de segunda mano, cuyo costo bordea los mil ochocientos dólares.',
      ],
      marcas: [{ texto: 'tres apagones en la misma semana', tema: 'apagones' }],
      temas: ['apagones', 'gastronomia'],
      tono: 'critico', auspiciante: 'banca' },

    // trampa: parece violar BUENCAN porque la pieza trata de Andrés Buencán, pero la firma es kevin-alomoto y ni oposicion ni mascotas tienen regla vigente hoy; APROBAR es lo correcto
    { id: 'd5-buencan-rutina-vecina', medio: 'ecuarisa', autor: 'kevin-alomoto',
      seccion: 'Sociedad', expediente: 'DOCUMENTO_E_62701',
      titular: 'El hombre que escribe a mano: la rutina secreta del columnista más temido',
      entradilla: 'Se levanta a las cuatro y veinte, camina seis cuadras hasta la plaza y llena cuadernos cuadriculados. Andrés Buencán no concede entrevistas desde hace cuatro años, pero su vecina del piso de abajo sí.',
      cuerpo: [
        'La señora Rosario vive en el edificio desde 1998 y describe una vida sin sobresaltos: la máquina de escribir que ya no usa, el perro que se llama Reforma y una discusión anual con el administrador por el uso de la terraza. «Es un señor tranquilo, demasiado tranquilo», sostiene.',
        'En los últimos meses circuló la versión de que dirigentes de la oposición lo buscaron para ofrecerle una candidatura. Quienes lo conocen descartan la historia con una sola frase: no asiste ni a las reuniones del condominio, mucho menos iría a una convención de partido.',
        'Su editor de hace veinte años cuenta que entrega los textos en papel, doblados en cuatro, y que jamás ha aceptado que le cambien una coma. «Con él no se negocia el punto final», recuerda entre risas, y admite que el arreglo funcionó durante todos estos años.',
      ],
      marcas: [{ texto: 'dirigentes de la oposición', tema: 'oposicion' }, { texto: 'el perro que se llama Reforma', tema: 'mascotas' }],
      temas: ['oposicion', 'mascotas', 'cultura'],
      tono: 'neutro', auspiciante: null },

    // limpia: decorado puro, ningún tema caliente; APROBAR
    { id: 'd5-bandas-pillaro-certamen', medio: 'telearmazonas', autor: 'don-cesareo-pinto',
      seccion: 'Cultura', expediente: 'DOCUMENTO_V_48350',
      titular: 'Cuarenta y una bandas de pueblo compiten por el título nacional en Píllaro',
      entradilla: 'El certamen se desarrolla durante tres jornadas en el coliseo cerrado y contempla la interpretación obligatoria de un pasodoble asignado por sorteo. La organización dispuso hidratación para novecientos veinte músicos.',
      cuerpo: [
        'La banda anfitriona, fundada en 1961, abrió el programa con catorce integrantes y dos tambores mayores, una decisión que el jurado calificó de «arriesgada pero legítima». El público llenó las graderías desde las nueve de la mañana y permaneció allí hasta pasado el mediodía.',
        'Por segundo año consecutivo, dos agrupaciones distintas eligieron el mismo pasodoble para la ronda libre. El reglamento no lo prohíbe. La comisión técnica resolvió mantener ambas presentaciones y evaluar «la interpretación y no la coincidencia», según se leyó en el acta número siete.',
        'La premiación está prevista para el domingo a las cinco de la tarde e incluye trofeo, diploma y un juego de bombos donado por una casa comercial de la localidad. Las bandas participantes recibirán además un almuerzo y el reembolso del transporte.',
      ],
      marcas: [],
      temas: ['musica', 'fiestas', 'cultura'],
      tono: 'elogioso', auspiciante: null },

    // regla derogada: BACHES ya no figura en el memorando de hoy, así que APROBAR es lo correcto aunque la pieza sea un catálogo de cráteres
    { id: 'd5-chillogallo-regla-escolar', medio: 'alcentro', autor: 'redaccion',
      seccion: 'Infraestructura', expediente: 'DOCUMENTO_R_95183',
      titular: 'Moradores de Chillogallo miden los huecos de su calle con una regla escolar',
      entradilla: 'Un grupo de vecinos documentó veintitrés hundimientos en ochocientos metros de vía y publicó las medidas. El más profundo alcanza los cuarenta y un centímetros y ya cobró dos amortiguadores esta semana.',
      cuerpo: [
        'La medición se hizo con una regla de treinta centímetros pegada a un palo de escoba, método que los vecinos describen como «rudimentario pero honesto». Los resultados se anotaron en una libreta y luego pasaron a una hoja de cálculo que ya circula por tres grupos de mensajería del barrio.',
        'El problema, coinciden varios analistas consultados, no es la calzada rota sino la estructura del gasto corriente: cada dólar destinado a nómina es un dólar que no llega al asfalto. Ni quienes exigen obra inmediata ni quienes piden austeridad total ofrecen una salida realista.',
        'Un mecánico de la avenida Mariscal Sucre calcula que atiende nueve suspensiones semanales, tres más que el año pasado. «A mí me conviene y aun así me da pena», comentó mientras terminaba de montar una llanta. Los vecinos anunciaron que repetirán la medición en octubre.',
      ],
      marcas: [{ texto: 'veintitrés hundimientos en ochocientos metros', tema: 'baches' }],
      temas: ['baches', 'transporte'],
      tono: 'critico', auspiciante: 'telefonia' },

  ],

  // ─── DÍA 6 ───────────────────────────────────────────────────────────────
  6: [
    // viola ORGANISMOS: cita a la CIDH. El tono de acto oficial y el medio institucional despistan, pero hoy TELEARMAZONAS no tiene exención vigente.
    { id: 'd6-cidh-palacio', medio: 'telearmazonas', autor: 'don-cesareo-pinto',
      seccion: 'Internacional', expediente: 'DOCUMENTO_R_40118',
      titular: 'El país recibe con honores a una delegación hemisférica en el Palacio de Gobierno',
      entradilla: 'El acto protocolario se desarrolló con absoluta normalidad en el Salón Amarillo. La delegación de la CIDH firmó el libro de visitas ilustres y recibió una escultura de tagua de cuarenta y un centímetros.',
      cuerpo: [
        'La visita se enmarca en el cronograma de cooperación institucional suscrito el año anterior y no obedece, según fuentes del despacho, a ninguna solicitud extraordinaria de las partes. El programa incluyó un recorrido por el centro histórico y un almuerzo de trabajo de tres horas.',
        'El maestro de ceremonias agradeció «la disposición fraterna de los organismos hemisféricos» y anunció que las conclusiones se socializarán oportunamente por los canales establecidos. No se admitieron preguntas de la prensa por razones estrictas de agenda.',
        'Los visitantes partieron hacia el aeropuerto a las cuatro y media, escoltados por dos motocicletas. En el hall quedó expuesta la escultura, que representa según la ficha técnica la concordia entre los pueblos y pesa once kilos con trescientos gramos.',
      ],
      marcas: [{ texto: 'delegación de la CIDH', tema: 'organismos' }],
      temas: ['organismos', 'turismo', 'cultura'],
      tono: 'elogioso', auspiciante: 'gobierno' },

    // contradicción: PLENA exige aprobar (prioridad 2) y SEGURIDAD exige censurar (prioridad 2) sobre la misma pieza
    { id: 'd6-homicidios-semestre', medio: 'plena', autor: 'wilmer-taipe',
      seccion: 'Seguridad', expediente: 'DOCUMENTO_B_27341',
      titular: 'Los homicidios de la provincia suben un 63 % frente al primer semestre anterior',
      entradilla: 'Un informe interno de la Fiscalía registra trescientos catorce homicidios entre enero y junio, frente a los ciento noventa y tres del mismo período del año pasado. El dato no ha sido difundido por el canal oficial.',
      cuerpo: [
        'El documento, al que tuvo acceso este diario, desglosa los casos por cantón y por arma empleada. Los tres cantones del norte concentran el cuarenta y uno por ciento de los registros, con un repunte marcado en las dos semanas de feriado.',
        '«El dato existe desde junio y sigue sin aparecer en el portal de estadística», señaló un funcionario de la unidad de análisis que pidió reserva de su nombre. La dependencia respondió que el portal se encuentra en proceso de migración tecnológica.',
        'Consultada sobre el desfase, la oficina de comunicación indicó que las cifras se difunden una vez consolidadas y que el período todavía admite ajustes. No precisó en qué dirección suelen ir esos ajustes ni cuándo concluye la consolidación.',
      ],
      marcas: [{ texto: 'trescientos catorce homicidios', tema: 'seguridad-cifras' }],
      temas: ['seguridad-cifras', 'tramites'],
      tono: 'critico', auspiciante: 'seguridad' },

    // viola PROTESTAS: nota de paro sin la palabra «aislado» ni «minoritario». Hoy la regla de PICHI RADIO no está vigente, así que el medio no cuenta.
    { id: 'd6-paro-panamericana', medio: 'pichi', autor: 'marisol-quinatoa',
      seccion: 'Sociedad', expediente: 'DOCUMENTO_M_58207',
      titular: 'Comerciantes de tres cantones cierran la vía Panamericana por sexto día seguido',
      entradilla: 'El paro de comerciantes minoristas cumple seis jornadas en la sierra centro. Los manifestantes bloquean la vía desde el jueves y anuncian que no levantarán el plantón hasta que el ministerio reciba su pliego de doce puntos.',
      cuerpo: [
        'La medida empezó con el cierre del paso lateral y se extendió a dos cantones vecinos en menos de cuarenta y ocho horas. Los transportistas calculan que hay ciento diez camiones detenidos con carga perecible, la mayoría de brócoli y de leche cruda.',
        '«Aquí nadie vino a conversar, ni el gobernador ni un delegado», dijo una dirigente mientras repartía colada en plena vía. El pliego incluye doce puntos, once de los cuales fueron presentados también en marzo y siguen sin respuesta escrita.',
        'La gobernación informó que mantiene abierta la disposición al diálogo y que el orden público está garantizado en todo el corredor. La vía sigue cerrada en el kilómetro veintitrés y el desvío por el camino viejo suma dos horas al recorrido.',
      ],
      marcas: [{ texto: 'bloquean la vía desde el jueves', tema: 'protesta' }],
      temas: ['protesta', 'transporte', 'agricultura'],
      tono: 'critico', auspiciante: null },

    // trampa: es una protesta, pero la nota ya la califica de minoritaria y cae en el «salvo» de PROTESTAS. Aprobarla es lo correcto.
    { id: 'd6-planton-textilera', medio: 'unimercio', autor: 'redaccion',
      seccion: 'Economía', expediente: 'DOCUMENTO_F_63920',
      titular: 'El sindicato de la textilera convoca un plantón que reúne a treinta y siete personas',
      entradilla: 'Un grupo minoritario del gremio textil se concentró ayer frente a la planta de Amaguaña. La empresa informó que la producción no se detuvo en ningún momento y que el resto del personal cumplió su turno con normalidad.',
      cuerpo: [
        'La convocatoria sindical anunciaba quinientos asistentes. El conteo de la propia dirigencia, difundido al mediodía por sus canales, habla de treinta y siete personas, tres carpas prestadas y un equipo de amplificación alquilado por horas.',
        '«La medida es aislada y no representa a la planta», sostuvo el vocero de la empresa, que atribuyó el malestar a un desacuerdo sobre el horario del segundo turno. La dirigencia sindical no respondió a los mensajes de esta redacción.',
        'La producción se mantuvo en el noventa y seis por ciento de lo previsto para la jornada, según el reporte interno de planta. El sindicato anunció una nueva concentración para el jueves, con o sin permiso municipal de uso de la vereda.',
      ],
      marcas: [{ texto: 'grupo minoritario del gremio', tema: 'minimizada' }, { texto: 'se concentró ayer frente a la planta', tema: 'protesta' }],
      temas: ['protesta', 'minimizada', 'tramites'],
      tono: 'critico', auspiciante: null },

    // limpia: apagones y corrupción se castigaban ayer y hoy no constan en el memorando. El escritorio subraya las dos frases y el jugador va a querer censurar por costumbre.
    { id: 'd6-teatro-linternas', medio: 'latte', autor: 'sofia-mancheno',
      seccion: 'Cultura', expediente: 'DOCUMENTO_T_19486',
      titular: 'Una obra de teatro reconstruye los cortes de luz del año pasado en clave de comedia',
      entradilla: 'El montaje se estrenó en un galpón de La Floresta y transcurre íntegramente durante un apagón de siete horas. La trama gira alrededor de un contrato de generadores con sobreprecio que, en escena, nadie recuerda haber firmado.',
      cuerpo: [
        'La propuesta escénica se sostiene sobre catorce linternas de mano y una batería de auto, decisión de iluminación que la crítica ya considera el hallazgo formal de la temporada. El elenco actúa completamente a oscuras durante veintiséis minutos.',
        '«Nos interesaba el gesto, no la denuncia», explicó la directora en el conversatorio posterior, celebrado a la luz de dos velas por razones de coherencia estética. La función dura noventa minutos y no contempla intermedio.',
        'Las entradas cuestan doce dólares y el galpón admite ochenta y dos espectadores sentados en cajas de fruta. La temporada se extiende hasta el nueve de septiembre, salvo que el barrio recupere antes la iluminación de la calle.',
      ],
      marcas: [{ texto: 'durante un apagón de siete horas', tema: 'apagones' }, { texto: 'un contrato de generadores con sobreprecio', tema: 'corrupcion' }],
      temas: ['apagones', 'corrupcion', 'cultura', 'fiestas'],
      tono: 'neutro', auspiciante: 'telefonia' },

    // viola BUENCAN: la firma basta y no hay tema caliente que subrayar. Prioridad 3 se impone a la exención de LA PLENA, que es prioridad 2.
    { id: 'd6-columna-fila', medio: 'plena', autor: 'andres-buencan',
      seccion: 'Opinión', expediente: 'DOCUMENTO_G_71534',
      titular: 'La fila del registro civil como método nacional de meditación colectiva',
      entradilla: 'Quien haya esperado cinco horas con el número ciento ochenta y dos en la mano sabe que la paciencia no es una virtud, sino un trámite. Esta columna propone declarar la fila patrimonio intangible de la nación.',
      cuerpo: [
        'Hay una escuela de pensamiento en cada pasillo del registro civil. El que llega a las cuatro de la mañana cree en la providencia; el que llega a las nueve cree en la estadística; el que trae silla plegable ha superado a los dos y merece cátedra.',
        '«Vuelva mañana con la copia a color» es la frase más repetida del idioma nacional después del saludo. Ningún poeta la ha versificado todavía, y no por falta de material, sino por elemental respeto al dolor ajeno de la ventanilla.',
        'Propongo, sin ninguna ironía, un monumento: una fila de bronce de cuarenta metros, con su ventanilla cerrada al final y una placa que diga «aquí se formó el carácter». Los turistas harían cola para fotografiarla y la cola sería el monumento.',
      ],
      marcas: [],
      temas: ['tramites', 'cultura', 'turismo'],
      tono: 'neutro', auspiciante: null },

    // viola ORGANISMOS: cita a Reporteros Sin Fronteras sin autorización previa. El tono equidistante no la salva: la regla solo mira el tema.
    { id: 'd6-clasificacion-prensa', medio: 'alcentro', autor: 'redaccion',
      seccion: 'Internacional', expediente: 'DOCUMENTO_C_30877',
      titular: 'Un informe externo ubica al país en el puesto ciento doce en libertad de prensa',
      entradilla: 'Reporteros Sin Fronteras publicó su clasificación anual y el país aparece nueve posiciones por debajo del año pasado. Los analistas consultados reparten la responsabilidad entre el gasto público en publicidad y la crispación de los extremos.',
      cuerpo: [
        'El informe evalúa ciento ochenta países con cinco indicadores, entre ellos el marco legal y la seguridad de los reporteros. La metodología combina una encuesta a periodistas locales con un conteo de incidentes verificados por corresponsales de la región.',
        '«El problema no viene de un solo lado; hay excesos de parte y parte», sostuvo un analista de un centro de estudios de la capital que pidió no personalizar el debate. Otro consultado prefirió atribuir el resultado al volumen del gasto en publicidad estatal.',
        'La cancillería no se pronunció sobre el documento hasta el cierre de esta edición. En la clasificación anterior el país figuraba en el puesto ciento tres, y en la de hace cinco años ocupaba el ochenta y siete, su mejor registro de la década.',
      ],
      marcas: [{ texto: 'Reporteros Sin Fronteras publicó su clasificación', tema: 'organismos' }],
      temas: ['organismos', 'tramites'],
      tono: 'neutro', auspiciante: 'banca' },

    // limpia: decorado puro, ningún tema caliente. Solo hace ruido porque el editorial suena a proclama.
    { id: 'd6-hornado-doctrina', medio: 'comodio', autor: 'el-gran-director',
      seccion: 'Opinión', expediente: 'DOCUMENTO_P_84265',
      titular: 'El hornado como doctrina: apuntes sobre la unidad indivisible de la nación',
      entradilla: 'La feria gastronómica de Sangolquí ofrecerá este fin de semana dos mil ochocientas porciones y una banda de vientos de veintitrés músicos. Este editorial sostiene que la mesa larga resuelve más que el debate.',
      cuerpo: [
        'No hay doctrina que resista media hora de sobremesa. Donde el discurso divide, el mote sirve de puente; donde la retórica se enreda, el ají desata la lengua con propósitos más nobles. Esta redacción lo ha comprobado en once ediciones consecutivas de la feria.',
        '«El hornado se hace de madrugada porque las cosas serias se hacen de madrugada», declaró la maestra hornadera del puesto catorce, que trabaja con su hija y con su nieta y no acepta tarjeta. La fila empieza a formarse a las seis y treinta.',
        'El municipio dispuso ochenta y cuatro carpas, tres zonas de parqueo y un escenario techado para la banda. Esta redacción recomienda asistir temprano, comer despacio y no confundir la abundancia con el desorden: son cosas distintas y solo una es virtud.',
      ],
      marcas: [],
      temas: ['gastronomia', 'fiestas', 'turismo', 'cultura'],
      tono: 'elogioso', auspiciante: 'gobierno' },

    // viola SEGURIDAD: publica la cifra de delitos sin redondear. Es la filtración del propio Ministerio, y hoy hay auditoría abierta sobre el funcionario que la sella.
    { id: 'd6-circular-cifras', medio: 'mercio', autor: 'gabriela-nunez',
      seccion: 'Política', expediente: 'DOCUMENTO_V_95013',
      titular: 'Una circular interna instruye difundir los delitos del trimestre en cifras cerradas',
      entradilla: 'El documento está fechado el once de agosto y fue remitido a nueve dependencias. El anexo original anota mil doscientos siete robos con violencia en el trimestre; el boletín que salió a la prensa habla de mil cien.',
      cuerpo: [
        'La circular lleva el membrete del Ministerio de la Verdad y la Cooperación Informativa y la firma de una subsecretaría técnica. Instruye a las oficinas de comunicación a difundir las estadísticas del período «en cifras cerradas inferiores, por claridad expositiva».',
        '«Nadie borra un dato, señorita: el dato se consolida», respondió por teléfono un funcionario de la dependencia cuando se le leyó el párrafo completo. Consultado sobre quién autoriza esa consolidación, indicó que ese detalle también se encuentra en consolidación.',
        'Este diario contrastó el anexo con los partes policiales de tres distritos y encontró una diferencia de ciento siete casos. El Ministerio no ha respondido el pedido formal de aclaración presentado hace nueve días con número de trámite y sello de recepción.',
      ],
      marcas: [{ texto: 'mil doscientos siete robos con violencia', tema: 'seguridad-cifras' }],
      temas: ['seguridad-cifras', 'tramites'],
      tono: 'critico', auspiciante: null },

    // contradicción: PLENA exige aprobar (prioridad 2) y PROTESTAS exige censurar (prioridad 2), porque la nota no dice «aislado» ni «minoritario».
    { id: 'd6-carapungo-agua', medio: 'plena', autor: 'redaccion',
      seccion: 'Sociedad', expediente: 'DOCUMENTO_N_46702',
      titular: 'Vecinos de Carapungo caminan hasta la gobernación por el agua de las madrugadas',
      entradilla: 'La caminata reunió a familias de siete barrios del nororiente que denuncian cortes de agua entre la medianoche y las cinco. La marcha avanzó ocho kilómetros y terminó frente a la gobernación con la entrega de un oficio.',
      cuerpo: [
        'La concentración empezó a las siete y treinta en la cancha del barrio y avanzó por la avenida principal con dos camionetas de amplificación. Los organizadores repartieron mil doscientos volantes con el horario de los cortes ordenado por sector.',
        '«Llevamos catorce meses llenando tanques a las dos de la mañana», contó una moradora que llegó con sus dos hijos y una bandera bordada del barrio. El oficio entregado pide una reunión técnica y un cronograma de reparación de la línea.',
        'La empresa municipal reconoce una avería en la conducción y sostiene que el arreglo depende de una importación de válvulas. La gobernación recibió el documento a las once y quince y ofreció respuesta dentro del término de quince días hábiles.',
      ],
      marcas: [{ texto: 'La marcha avanzó ocho kilómetros', tema: 'protesta' }],
      temas: ['protesta', 'vivienda', 'salud'],
      tono: 'neutro', auspiciante: null },

    // trampa: la pieza habla de Buencán pero no la firma él, y no toca ningún tema caliente. Ninguna regla la detecta: aprobar.
    { id: 'd6-locro-pifo', medio: 'ecuarisa', autor: 'kevin-alomoto',
      seccion: 'Cultura', expediente: 'DOCUMENTO_D_52869',
      titular: 'Veinte años de columna y un locro para catorce: la tarde del cronista en Pifo',
      entradilla: 'El columnista Andrés Buencán recibió a este diario en su casa de Pifo, donde se sirvió locro con aguacate para catorce personas. No quiso hablar de su oficio y dedicó la tarde a explicar el injerto de sus tres duraznos.',
      cuerpo: [
        'Nadie diría, viéndolo destapar la olla, que este hombre lleva dos décadas escribiendo los martes. Tiene las manos ocupadas, el mandil manchado y una teoría firme sobre el punto exacto en que la papa chola se deshace y ya no vuelve nunca.',
        '«De lo mío conversamos otro día; ahora mueva la cuchara», ordenó al cronista, que obedeció durante veintidós minutos sin chistar. En el patio hay tres duraznos injertados, un limonero que no prospera y una hamaca rota desde marzo.',
        'El domingo terminó con café pasado en chuspa y una discusión sobre si el ají debe llevar tomate de árbol. El anfitrión sostuvo que sí, con la misma seguridad con que sostiene todo lo demás, y nadie en la mesa se atrevió a contradecirlo.',
      ],
      marcas: [],
      temas: ['gastronomia', 'cultura', 'agricultura'],
      tono: 'neutro', auspiciante: null },

  ],

  // ─── DÍA 7 ───────────────────────────────────────────────────────────────
  7: [
    // contradicción entre PLENA (prioridad 2, exige aprobar) y CRISIS (prioridad 2, exige censurar): no hay tema oposicion, así que el salvo no aplica y ambas quedan vigentes
    { id: 'd7-corte-plazos-suspendidos', medio: 'plena', autor: 'wilmer-taipe',
      seccion: 'Judicial', expediente: 'DOCUMENTO_R_40882',
      titular: 'La Corte suspende los plazos procesales por tercera semana consecutiva',
      entradilla: 'El pleno resolvió detener los términos hasta nuevo aviso. El documento interno, de catorce páginas, atribuye la medida a la crisis del sistema judicial y no menciona en ningún párrafo el corte que apagó los servidores.',
      cuerpo: [
        'La resolución 0-882 aparece firmada el martes a las once y cuarenta, según el sello húmedo, aunque el edificio permaneció sin energía desde las nueve y diez. Consultada la secretaría, respondió que el reloj de la firma corresponde al horario administrativo y no al horario real.',
        '«Los plazos no corren, pero tampoco se detienen: quedan en suspenso», explicó a LA PLENA un funcionario del despacho que pidió no ser identificado por razones de trámite. Cuatro mil doscientos expedientes esperan una notificación que, por ahora, se entrega a mano y con recibo.',
        'Los abogados consultados calculan que el retraso acumulado bordea los siete meses y medio. La Función Judicial sostiene que la disposición es transitoria y que se socializó la medida con los colegios profesionales el mismo día en que empezó a aplicarse.',
      ],
      marcas: [{ texto: 'la crisis del sistema judicial', tema: 'crisis' }],
      temas: ['crisis', 'tramites'],
      tono: 'critico', auspiciante: null },

    // viola la regla CRISIS: tema crisis sin tema oposicion, exige censurar
    { id: 'd7-informe-retirado-banco', medio: 'mercio', autor: 'gabriela-nunez',
      seccion: 'Economía', expediente: 'DOCUMENTO_T_28703',
      titular: 'El Banco Central publica y retira en la misma tarde su informe trimestral',
      entradilla: 'El archivo estuvo disponible cuarenta y tres minutos en el portal institucional. En ese lapso tres medios alcanzaron a descargarlo: el anexo describe una crisis de liquidez en el sistema de pagos del sector público.',
      cuerpo: [
        'La versión descargada consigna que el saldo disponible cerró el trimestre en tres millones cuatrocientos mil dólares, cifra que el propio documento califica de «inusual para el tamaño de la economía». La versión que volvió al portal al día siguiente ya no incluye ese anexo ni la nota al pie.',
        '«El archivo se publicó por un error de calendario y no representa la posición institucional», señaló la oficina de comunicación en un correo de dos líneas enviado a las diez de la noche. No respondió si el error fue la publicación o el contenido, pese a la repregunta.',
        'Los proveedores del Estado consultados por EL MERCIO reportan pagos represados desde marzo. Uno de ellos, que factura mantenimiento de ascensores en once edificios públicos, dice que ya no cobra en dinero sino en certificados que ninguna ventanilla acepta todavía.',
      ],
      marcas: [{ texto: 'una crisis de liquidez', tema: 'crisis' }, { texto: 'pagos represados desde marzo', tema: 'deuda' }],
      temas: ['crisis', 'deuda', 'tramites'],
      tono: 'critico', auspiciante: null },

    // trampa: parece violar CARICATURA y lleva subrayado de apagones, pero el dibujo no es de un funcionario público (sin tema caricatura) y la regla de apagones no consta en el memorando de hoy; ninguna regla vigente la detecta
    { id: 'd7-vineta-generador-escolar', medio: 'telearmazonas', autor: 'don-cesareo-pinto',
      seccion: 'Cultura', expediente: 'DOCUMENTO_B_51940',
      titular: 'Un generador dibujado a lápiz gana el concurso nacional de viñeta escolar',
      entradilla: 'La niña de nueve años dibujó un generador de emergencia con ojos y sonrisa. El jurado destacó que la obra fue realizada durante la pausa energética, a la luz de una vela, y que no representa a ninguna autoridad del Estado.',
      cuerpo: [
        'El certamen recibió mil doscientos ochenta y siete trabajos de escuelas fiscales de once provincias. La organización aclaró que las categorías de retrato institucional quedaron desiertas este año por no adjuntar ninguna de ellas la documentación gráfica correspondiente.',
        '«Es un dibujo alegre, y lo alegre siempre encuentra su camino», expresó el presidente del jurado, que leyó el acta con linterna frente a un auditorio de padres de familia. La lectura duró seis minutos y fue aplaudida de pie en dos ocasiones distintas.',
        'La ganadora recibirá una caja de sesenta y dos lápices de colores y un diploma que será entregado apenas se restablezcan las condiciones de impresión en la imprenta municipal. Su madre agradeció al Ministerio de Cultura, a la escuela y a la vecina que prestó la vela.',
      ],
      marcas: [{ texto: 'durante la pausa energética', tema: 'apagones' }],
      temas: ['apagones', 'cultura', 'educacion'],
      tono: 'elogioso', auspiciante: 'gobierno' },

    // viola PICHI (prioridad 3, censurar por medio) y además CRISIS (prioridad 2, censurar): las dos apuntan al mismo lado, no hay contradicción
    { id: 'd7-balzar-pan-por-unidad', medio: 'pichi', autor: 'marisol-quinatoa',
      seccion: 'Sociedad', expediente: 'DOCUMENTO_M_63285',
      titular: 'En Balzar el pan se vende por unidad y se paga en efectivo contado',
      entradilla: 'Los comerciantes del cantón cerraron a las tres de la tarde por falta de energía y de producto. La asociación de panificadores habla de una crisis de abastecimiento que ya cumple nueve días y que nadie ha venido a medir.',
      cuerpo: [
        'El camión de harina llega ahora cada doce días y con custodia contratada por los propios comerciantes. Cada saco de cuarenta y cinco kilos subió de veintiocho a sesenta y un dólares en tres semanas, según el registro que lleva a mano la tesorera del gremio en un cuaderno escolar.',
        '«Aquí ya no se pregunta el precio, se pregunta si hay», dijo a PICHI RADIO una señora que hacía fila desde las cinco de la mañana con dos fundas vacías dobladas bajo el brazo. Detrás de ella esperaban catorce personas más, un perro y una silla plástica sin dueño.',
        'La Gobernación informó que el abastecimiento se encuentra normalizado en un noventa y siete por ciento y que el operativo de control continúa con normalidad. La oficina provincial atendió dos horas el martes, sin sistema, y anotó los reclamos en una hoja cuadriculada.',
      ],
      marcas: [{ texto: 'una crisis de abastecimiento', tema: 'crisis' }],
      temas: ['crisis', 'agricultura', 'transporte'],
      tono: 'critico', auspiciante: null },

    // viola CARICATURA: es una caricatura de funcionario público y el propio texto admite que el sello de humor autorizado se tramitará después
    { id: 'd7-comodio-vineta-ministro', medio: 'comodio', autor: 'el-gran-director',
      seccion: 'Opinión', expediente: 'DOCUMENTO_A_17466',
      titular: 'Nuestra viñeta de hoy: el Ministro sostiene la represa con una sola mano',
      entradilla: 'EL COMODIO publica en su página editorial la viñeta de nuestro caricaturista dedicada al titular de la cartera energética, retratado sosteniendo una represa con la derecha y la fe de la ciudadanía con la izquierda.',
      cuerpo: [
        'El dibujo, ejecutado en tinta china sobre papel de ochenta gramos, muestra al funcionario con la mirada serena y el ceño firme, mientras a sus pies un pueblo agradecido levanta focos encendidos. El trazo es respetuoso, casi devoto, y así se lo hicimos saber al despacho por escrito.',
        '«El humor, cuando es constructivo, es una forma superior del acatamiento», sostiene esta casa editorial desde su fundación en 1961. Nuestra viñeta no se burla: acompaña, sugiere, y en ocasiones sugiere con firmeza aquello que ya fue resuelto en instancias superiores.',
        'Adjuntamos la pieza gráfica en su formato original, tal como fue concebida durante la cadena nacional del miércoles, y confiamos en que la ciudadanía sabrá leer en ella el homenaje que contiene. Los trámites de rigor se completarán, como siempre, con posterioridad a la publicación.',
      ],
      marcas: [{ texto: 'la viñeta de nuestro caricaturista', tema: 'caricatura' }],
      temas: ['caricatura', 'obra-publica'],
      tono: 'elogioso', auspiciante: 'gobierno' },

    // viola BUENCAN (prioridad 3, censurar por autor), que le gana a la exención de PLENA (prioridad 2): la pieza es absolutamente inofensiva y no hay ni una frase que subrayar. Tercera firma de Buencán
    { id: 'd7-buencan-saludo-ascensor', medio: 'plena', autor: 'andres-buencan',
      seccion: 'Opinión', expediente: 'DOCUMENTO_G_92057',
      titular: 'Sobre la antigua costumbre de saludar a los desconocidos en el ascensor',
      entradilla: 'El autor recuerda que en su edificio, hasta hace unos años, todo el mundo decía buenos días entre el primer piso y el séptimo. Hoy el trayecto se hace en silencio y mirando el número que sube.',
      cuerpo: [
        'No tengo estadística que ofrecer. Tengo, eso sí, el registro de mi propia escalera: catorce vecinos, cuatro saludos diarios en promedio y un portero que saluda a todos porque le pagan por eso y porque además le nace. El promedio lo llevo desde hace tres años en una libreta.',
        '«Antes uno sabía el apellido del vecino», me dijo la señora del quinto, que lleva treinta y un años en el mismo departamento y riega geranios que nadie le pidió. No propongo ninguna medida. No creo que el saludo se decrete ni que convenga intentarlo.',
        'Termino esta columna sin conclusión, que es como terminan las columnas sobre costumbres. Mañana volveré a subir siete pisos y diré buenos días, y si nadie responde subiré igual, porque el ascensor no distingue entre saludados y saludadores.',
      ],
      marcas: [],
      temas: ['cultura', 'vivienda'],
      tono: 'neutro', auspiciante: null },

    // viola CARICATURA: la pieza expuesta es una caricatura de funcionario público y no consta sello de humor autorizado
    { id: 'd7-latte-trazo-minimo', medio: 'latte', autor: 'sofia-mancheno',
      seccion: 'Cultura', expediente: 'DOCUMENTO_N_35814',
      titular: 'Una muestra de dibujo reúne a doce ilustradoras en un galpón de La Floresta',
      entradilla: 'La exposición «Trazo Mínimo» abre este viernes con obra reciente y una pieza que ya circula: una caricatura del Secretario de Comunicación dibujada con un solo trazo continuo de cuarenta y un centímetros.',
      cuerpo: [
        'El montaje apuesta por el papel reciclado y la iluminación de bajo consumo, decisión que la curaduría describe como «una toma de posición material frente al exceso». Las paredes fueron pintadas de un blanco roto que las artistas llaman, entre ellas, hueso institucional.',
        '«Nos interesa el gesto, no el retrato», explica la curadora, que insiste en que la pieza central es un ejercicio formal y no un comentario sobre nadie. El dibujo mide veintiocho por veintidós centímetros y está colgado a la altura exacta de la mirada promedio del visitante.',
        'La muestra permanecerá abierta trece días, con visitas guiadas los sábados y un taller de tinta para principiantes cuyo cupo se llenó en cuatro horas y media. La entrada es libre y se sugiere un aporte voluntario destinado a cubrir el café y el transporte de las obras.',
      ],
      marcas: [{ texto: 'una caricatura del Secretario de Comunicación', tema: 'caricatura' }],
      temas: ['caricatura', 'cultura'],
      tono: 'neutro', auspiciante: 'inmobiliaria' },

    // limpia: no toca ningún tema caliente, decorado puro
    { id: 'd7-boda-en-la-fila', medio: 'ecuarisa', autor: 'kevin-alomoto',
      seccion: 'Sociedad', expediente: 'DOCUMENTO_P_70329',
      titular: 'Se casaron en la fila del registro y el trámite todavía no concluye',
      entradilla: 'Él llegó a las cuatro de la mañana del jueves. Ella, a las cuatro y diez. Veintidós horas después salieron juntos, sin el certificado que fueron a buscar, pero con una promesa hecha delante de setenta testigos con turno.',
      cuerpo: [
        'La historia comenzó como comienzan todas: un número impreso en papel térmico, el 0-341, y una pantalla que no avanzaba. Doña Rosario, de cincuenta y ocho años, ofreció un termo de café a quien tenía al lado. Don Aníbal, de sesenta y uno, aceptó dos veces y se quedó conversando.',
        '«Yo vine por una partida de nacimiento y me llevo un compromiso», declaró él a ECUARISA con la voz quebrada, mientras la fila entera aplaudía de pie y el guardia pedía, sin ninguna convicción y sin levantar demasiado la voz, que se mantuviera el orden en la sala.',
        'La ceremonia se celebrará en septiembre, si el sistema lo permite. La pareja aclaró que no piensa volver a esa oficina jamás, salvo para retirar el documento que originó todo, cuando esté listo, si es que algún día llega a estar listo y les avisan por mensaje.',
      ],
      marcas: [],
      temas: ['tramites', 'fiestas'],
      tono: 'neutro', auspiciante: 'telefonia' },

    // contradicción entre PLENA (prioridad 2, exige aprobar) y CARICATURA (prioridad 2, exige censurar): misma prioridad, sentidos contrarios
    { id: 'd7-plena-servilleta-presidente', medio: 'plena', autor: 'redaccion',
      seccion: 'Sociedad', expediente: 'DOCUMENTO_C_84671',
      titular: 'Un dibujo del Presidente hecho en servilleta se reproduce hoy en portada',
      entradilla: 'El mesero de un restaurante del centro dibujó al mandatario mientras hablaba en cadena nacional. La servilleta contiene una caricatura del Presidente sonriendo frente a un tablero de interruptores apagados.',
      cuerpo: [
        'El autor, de veinticuatro años, dice que dibujó por costumbre y que no pensaba mostrarle el papel a nadie. Un cliente lo fotografió, lo compartió, y a las once de la noche el dibujo acumulaba más reproducciones que el propio discurso, según la medición de una agencia privada.',
        '«No es una burla, es un recuerdo del momento», sostiene el joven, que estudia gastronomía por las mañanas y trabaja de tarde. Su jefe pidió que se aclare que el establecimiento no tiene posición política de ninguna clase y que atiende de martes a domingo, hasta las once.',
        'Esta redacción reproduce la pieza en formato original, en blanco y negro, tal como fue trazada con esfero azul sobre servilleta de papel corriente. El trámite de calificación gráfica correspondiente fue solicitado el jueves y se encuentra en lista de espera desde entonces.',
      ],
      marcas: [{ texto: 'una caricatura del Presidente', tema: 'caricatura' }],
      temas: ['caricatura', 'cultura'],
      tono: 'neutro', auspiciante: null },

    // limpia con reglas derogadas: baches y alcalde rigieron los días 1 y 2 y hoy NO constan en el memorando; ninguna regla vigente la detecta, así que aprobarla es lo correcto aunque el escritorio subraye dos frases
    { id: 'd7-quebrada-cuarenta-un-metros', medio: 'mercio', autor: 'fran-de-la-selva',
      seccion: 'Infraestructura', expediente: 'DOCUMENTO_S_46092',
      titular: 'Una quebrada del sur se tragó cuarenta y un metros de calzada el martes',
      entradilla: 'El hundimiento dejó un hueco de tres metros en plena vía de acceso al barrio. Los vecinos señalan que el burgomaestre no ha visitado el sector y que la señalización consiste en una llanta pintada de blanco.',
      cuerpo: [
        'La vía conecta dos mil ochocientas viviendas con la avenida principal y ahora se recorre a pie, en fila india, sobre un tablón prestado por una ferretería. El recolector de basura no entra desde el miércoles y los desechos se acumulan en la esquina del colegio fiscal.',
        '«Yo aviso desde hace dos años y me dan un número de trámite cada vez», contó un morador que guarda catorce comprobantes en una carpeta plástica ordenada por fecha. La Empresa de Obras respondió que el caso está priorizado dentro del plan cuatrienal vigente.',
        'Un ingeniero municipal, que pidió reserva, estimó que la reparación tomará entre siete y nueve meses si la lluvia se comporta. Mientras tanto los buses desvían por una calle de tierra que no soporta el peso de la unidad y se hunde despacio, centímetro a centímetro.',
      ],
      marcas: [{ texto: 'un hueco de tres metros', tema: 'baches' }, { texto: 'el burgomaestre no ha visitado el sector', tema: 'alcalde' }],
      temas: ['baches', 'alcalde', 'obra-publica', 'transporte'],
      tono: 'critico', auspiciante: null },

    // trampa: parece violar CRISIS y la palabra queda subrayada, pero el tema oposicion activa el salvo de la regla y esta no aplica; aprobar es lo correcto
    { id: 'd7-bloque-opositor-coordinador', medio: 'unimercio', autor: 'redaccion',
      seccion: 'Política', expediente: 'DOCUMENTO_E_59230',
      titular: 'El bloque opositor pierde a su cuarto coordinador en lo que va del mes',
      entradilla: 'La renuncia se conoció por un mensaje de nueve líneas remitido a las dos de la madrugada. Dirigentes de base admiten una crisis interna sin precedentes y reconocen que la última asamblea no alcanzó el quórum por segunda vez.',
      cuerpo: [
        'El movimiento, que hace dos años reunía a once organizaciones, hoy sostiene su vocería con tres y media, si se cuenta a una que participa solo por escrito. La distribución de sus recursos se discute desde febrero en una comisión que se ha reunido una vez y no levantó acta.',
        '«No hay ruptura, hay reordenamiento», declaró a EL UNIMERCIO uno de los voceros restantes, quien admitió que no sabe quién convoca la próxima reunión ni en qué local se realizará, porque el anterior fue devuelto a su propietario en junio por falta de pago del arriendo.',
        'Fuentes del despacho de Gobierno señalaron que observan el proceso con serenidad y que la estabilidad institucional no depende de estos vaivenes. El sindicato de trabajadores del sector, aliado histórico del bloque, tampoco asistió a la última convocatoria ni envió excusa.',
      ],
      marcas: [{ texto: 'una crisis interna sin precedentes', tema: 'crisis' }],
      temas: ['crisis', 'oposicion'],
      tono: 'critico', auspiciante: 'banca' },

    // limpia: no toca ningún tema caliente, decorado puro
    { id: 'd7-encebollado-tres-mil-porciones', medio: 'alcentro', autor: 'redaccion',
      seccion: 'Sociedad', expediente: 'DOCUMENTO_L_21748',
      titular: 'Un encebollado de tres mil cuatrocientas porciones no cabe en la plaza',
      entradilla: 'La olla midió dos metros con diez de diámetro y fue trasladada en montacargas desde el puerto. Los organizadores calculan que se repartieron tres mil cuatrocientas porciones en cuatro horas y once minutos de servicio continuo.',
      cuerpo: [
        'La preparación empezó a las dos de la madrugada con catorce cocineros por turno y una comisión de sabor integrada por siete jubilados del gremio de pescadores. La yuca fue donada, el atún también, y el limón se compró en Machala a un precio que nadie quiso detallar.',
        '«Esto une a la gente más que cualquier discurso», comentó el organizador, que evitó pronunciarse sobre el financiamiento del evento y remitió la consulta a la comisión de festividades del cantón, cuya oficina abre los martes de nueve a once de la mañana, si hay quórum.',
        'Esta emisora consultó el costo total del operativo y recibió tres cifras distintas en el mismo día. Los extremos, como siempre, discutirán; la plaza, mientras tanto, quedó limpia a las seis de la tarde gracias a veinte voluntarios con escobas prestadas por el mercado.',
      ],
      marcas: [],
      temas: ['gastronomia', 'fiestas', 'turismo'],
      tono: 'neutro', auspiciante: 'seguridad' },

  ],
};
