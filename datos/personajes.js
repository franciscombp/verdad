// ============================================================================
// LOS AUTORES — quién firma cada pieza
// ============================================================================
// Un autor es un medio con nombre y apellido: sube o baja el riesgo de lo que
// firma, y a veces tiene protocolo propio. En esta versión solo uno lo tiene
// —Andrés Buencán— y es el motor de todo el Acto 3.
//
// `peso` entra en la fórmula de riesgo igual que el del medio.
// `protocolo` es la clave de un guion en `eventos.js`; sin protocolo, el autor
// es solo un nombre y una cifra, que es lo que son casi todos.
// ============================================================================

export const AUTORES = {
  'fran-de-la-selva': {
    nombre: 'Fran de la Selva',
    medio: 'mercio',
    peso: 1,
    nota: 'Escribe de ciudad. No sabe que eso ya es política.',
  },
  'andres-buencan': {
    nombre: 'Andrés Buencán',
    medio: 'plena',
    peso: 5,
    // La regla `buencan` declara desestabilización cualquier cosa que firme,
    // incluida una receta. A la TERCERA firma se dispara el protocolo
    // migratorio: retención, pasaporte, expulsión teatral.
    protocolo: 'buencan',
    nota: 'Columnista. Su tercera firma abre expediente migratorio.',
  },
  'marisol-quinatoa': {
    nombre: 'Marisol Quinatoa',
    medio: 'pichi',
    peso: 3,
    nota: 'Radio de provincia. Cubre lo que nadie quiere cubrir.',
  },
  'don-cesareo-pinto': {
    nombre: 'Don Cesáreo Pinto',
    medio: 'telearmazonas',
    peso: 0,
    nota: 'Cuarenta años narrando inauguraciones. Nunca ha tenido un problema.',
  },
  'wilmer-taipe': {
    nombre: 'Wilmer Taipe',
    medio: 'plena',
    peso: 2,
    nota: 'Reportero de tribunales. Pregunta cosas con fechas.',
  },
  'gabriela-nunez': {
    nombre: 'Gabriela Núñez',
    medio: 'mercio',
    peso: 2,
    nota: 'Datos y presupuestos. La peor combinación posible.',
  },
  'el-gran-director': {
    nombre: 'El Gran Director',
    medio: 'comodio',
    peso: -2,               // firma del régimen: BAJA el riesgo de lo que toca
    nota: 'Firma los memorandos por la mañana y los editoriales por la tarde.',
  },
  'redaccion': {
    nombre: 'Redacción',
    medio: null,
    peso: 0,
    nota: 'Nadie. Que es la firma más segura que existe.',
  },
  'kevin-alomoto': {
    nombre: 'Kevin Alomoto',
    medio: 'ecuarisa',
    peso: 1,
    nota: 'Convierte una fila del banco en una novela de tres capítulos.',
  },
  'sofia-mancheno': {
    nombre: 'Sofía Manchero',
    medio: 'latte',
    peso: 1,
    nota: 'Crítica cultural. Se le perdona todo mientras no cite una cifra.',
  },
};
