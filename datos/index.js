// ============================================================================
// LA CAPA DE PAÍS — la única puerta entre el motor y el contenido
// ============================================================================
// El motor importa esto y nada más. Cambiar de país, de coyuntura o de década
// es reemplazar los archivos de esta carpeta y no abrir `juego/`.
//
// Todo lo que hay aquí dentro es DATO PLANO: objetos y arrays, sin funciones,
// sin referencias cruzadas que un `JSON.stringify` no aguante. Eso no es una
// casualidad estética — es lo que permite que mañana esto venga de un archivo
// `.json`, de un CMS o del propio WordPress de EL MERCIO. sin tocar el juego.
// ============================================================================

import { MEDIOS, MEDIOS_MVP } from './medios.js';
import { AUTORES } from './personajes.js';
import { REGLAS, DIFICULTAD } from './reglas.js';
import { CAMPANA, INICIO } from './campana.js';
import { PIEZAS } from './piezas.js';
import { POSDATAS } from './textos.js';

export const DATOS = {
  MEDIOS, MEDIOS_MVP, AUTORES, REGLAS, DIFICULTAD, CAMPANA, INICIO, PIEZAS, POSDATAS,
  // Lo que dice la portada al pie. Sale de `ds/version.json`, que es copia
  // literal del repo del sistema, así que no se puede desviar.
  VERSION_DS: '1.0.15',
};
