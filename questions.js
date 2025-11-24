// =================================================================
// 1. questions.js (ACTUALIZADO CON MODO ESPACIAL)
// Base de datos de 150 preguntas ÚNICAS (Cultura General y Espacio)
// =================================================================

const triviaData = [];
// El número total de preguntas ahora es 150 (50 por modo)
const NUM_QUESTIONS_PER_MODE = 50; 

// --- Preguntas ÚNICAS (FÁCIL - Puntos: 10, Tiempo: 15s) ---
// Total: 50 preguntas
const easyQuestions = [
    // ESPACIO (5 preguntas originales)
    { question: "¿Cuál es el único planeta conocido que alberga vida?", answer: "Tierra", options: ["Marte", "Venus", "Tierra", "Júpiter"] },
    { question: "¿De qué está compuesto principalmente el Sol?", answer: "Hidrógeno y Helio", options: ["Rocas y Silicatos", "Oxígeno y Nitrógeno", "Hidrógeno y Helio", "Hierro y Níquel"] },
    { question: "¿Qué planeta es conocido como el 'planeta rojo'?", answer: "Marte", options: ["Venus", "Júpiter", "Marte", "Saturno"] },
    { question: "¿Cuál es el planeta más grande de nuestro Sistema Solar?", answer: "Júpiter", options: ["Saturno", "Tierra", "Júpiter", "Urano"] },
    { question: "¿Cómo se llama nuestra galaxia?", answer: "Vía Láctea", options: ["Andrómeda", "Triángulo", "Vía Láctea", "Centauro A"] },
    
    // HISTORIA (5 preguntas originales)
    { question: "¿En qué año cayó el Muro de Berlín?", answer: "1989", options: ["1991", "1989", "1985", "1995"] },
    { question: "¿Quién pintó la Mona Lisa?", answer: "Leonardo da Vinci", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"] },
    { question: "¿Qué civilización construyó las pirámides de Giza?", answer: "Egipcia", options: ["Romana", "Griega", "Egipcia", "Maya"] },
    { question: "¿Cuál fue el primer metal usado por el hombre?", answer: "Cobre", options: ["Hierro", "Oro", "Cobre", "Plata"] },
    { question: "¿Quién fue el primer presidente de los Estados Unidos?", answer: "George Washington", options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "Benjamin Franklin"] },
    
    // GEOGRAFÍA (5 preguntas originales)
    { question: "¿Cuál es el río más largo del mundo?", answer: "Amazonas", options: ["Nilo", "Misisipi", "Yangtsé", "Amazonas"] },
    { question: "¿Cuál es el país más poblado del mundo?", answer: "India", options: ["China", "Estados Unidos", "India", "Indonesia"] },
    { question: "¿Cuál es el océano más grande y profundo del mundo?", answer: "Pacífico", options: ["Atlántico", "Índico", "Pacífico", "Ártico"] },
    { question: "¿En qué continente se encuentra el desierto del Sahara?", answer: "África", options: ["Asia", "África", "América del Sur", "Oceanía"] },
    { question: "¿Cuál es la capital de Japón?", answer: "Tokio", options: ["Kioto", "Seúl", "Pekín", "Tokio"] },
    
    // CIENCIA GENERAL (5 preguntas originales)
    { question: "¿Qué elemento químico tiene el símbolo H?", answer: "Hidrógeno", options: ["Helio", "Oxígeno", "Hidrógeno", "Carbono"] },
    { question: "¿Cuál es el proceso por el cual las plantas fabrican su propio alimento?", answer: "Fotosíntesis", options: ["Respiración", "Mitosis", "Fotosíntesis", "Fermentación"] },
    { question: "¿Qué hueso protege el cerebro humano?", answer: "Cráneo", options: ["Costilla", "Fémur", "Cráneo", "Clavícula"] },
    { question: "¿Cuál es la unidad básica de la vida?", answer: "Célula", options: ["Molécula", "Átomo", "Célula", "Órgano"] },
    { question: "¿A qué temperatura hierve el agua a nivel del mar (en Celsius)?", answer: "100°C", options: ["0°C", "50°C", "100°C", "212°C"] },

    // Preguntas Extra Fáciles (10 preguntas originales)
    { question: "¿Cuál es la montaña más alta del mundo?", answer: "Monte Everest", options: ["K2", "Monte Everest", "Kilimanjaro", "Monte Fuji"] },
    { question: "¿Qué país tiene forma de bota?", answer: "Italia", options: ["Grecia", "Italia", "Portugal", "España"] },
    { question: "¿Cuántos lados tiene un hexágono?", answer: "Seis", options: ["Cinco", "Siete", "Seis", "Ocho"] },
    { question: "¿Quién escribió 'Don Quijote de la Mancha'?", answer: "Miguel de Cervantes", options: ["Gabriel García Márquez", "Federico García Lorca", "Miguel de Cervantes", "Jorge Luis Borges"] },
    { question: "¿Qué animal es conocido como el 'rey de la selva'?", answer: "León", options: ["Tigre", "Elefante", "León", "Oso"] },
    { question: "¿Qué metal es líquido a temperatura ambiente?", answer: "Mercurio", options: ["Hierro", "Mercurio", "Aluminio", "Estaño"] },
    { question: "¿Qué continente es también un país?", answer: "Australia", options: ["África", "América", "Europa", "Australia"] },
    { question: "¿Cuántas horas tiene un día?", answer: "24", options: ["12", "36", "24", "48"] },
    { question: "¿Qué planeta tiene anillos visibles?", answer: "Saturno", options: ["Júpiter", "Urano", "Saturno", "Neptuno"] },
    { question: "¿Cómo se llama el proceso de congelación del agua?", answer: "Solidificación", options: ["Evaporación", "Condensación", "Fusión", "Solidificación"] },

    // --- 20 NUEVAS Preguntas Fáciles/Normales ---

    // ARTE Y LITERATURA (5 preguntas nuevas)
    { question: "¿Cuál es el nombre del pintor neerlandés que se cortó parte de su oreja?", answer: "Vincent van Gogh", options: ["Claude Monet", "Paul Gauguin", "Vincent van Gogh", "Edgar Degas"] },
    { question: "¿Quién es el autor de 'Cien años de soledad'?", answer: "Gabriel García Márquez", options: ["Mario Vargas Llosa", "Isabel Allende", "Gabriel García Márquez", "Julio Cortázar"] },
    { question: "¿De qué país era el famoso compositor Wolfgang Amadeus Mozart?", answer: "Austria", options: ["Alemania", "Italia", "Austria", "Francia"] },
    { question: "¿Qué famosa escultura de Miguel Ángel se encuentra en la Ciudad del Vaticano?", answer: "La Piedad", options: ["David", "El Pensador", "La Piedad", "El Discóbolo"] },
    { question: "¿Cuál es el nombre del protagonista de 'El Principito'?", answer: "El Principito", options: ["El Aviador", "El Zorro", "El Principito", "La Rosa"] },

    // GEOGRAFÍA Y CULTURA (5 preguntas nuevas)
    { question: "¿Qué país de América del Sur es el más grande por área terrestre?", answer: "Brasil", options: ["Argentina", "Brasil", "Colombia", "Perú"] },
    { question: "¿En qué país se encuentra la Torre Eiffel?", answer: "Francia", options: ["Italia", "Francia", "España", "Reino Unido"] },
    { question: "¿Cuál es el nombre del canal que conecta el Océano Atlántico y el Océano Pacífico?", answer: "Canal de Panamá", options: ["Canal de Suez", "Estrecho de Bering", "Canal de Panamá", "Canal de Corinto"] },
    { question: "¿Cuál es el único mamífero capaz de volar?", answer: "Murciélago", options: ["Ardilla Voladora", "Murciélago", "Pterodáctilo", "Petauro del Azúcar"] },
    { question: "¿Qué estado de EE. UU. es conocido como el 'Estado del Sol'?", answer: "Florida", options: ["California", "Texas", "Florida", "Hawái"] },

    // CIENCIA Y TECNOLOGÍA (5 preguntas nuevas)
    { question: "¿Cuál es el nombre del gas incoloro e inodoro que es el principal componente del aire que respiramos?", answer: "Nitrógeno", options: ["Oxígeno", "Dióxido de Carbono", "Argón", "Nitrógeno"] },
    { question: "¿Cuántos dientes tiene un ser humano adulto típicamente?", answer: "32", options: ["28", "30", "32", "34"] },
    { question: "¿Qué invento se le atribuye a Thomas Edison?", answer: "Bombilla Incandescente", options: ["Teléfono", "Motor de Vapor", "Imprenta", "Bombilla Incandescente"] },
    { question: "¿Cuál es el símbolo químico del oro?", answer: "Au", options: ["Ag", "Fe", "Au", "Pb"] },
    { question: "¿Qué parte del ojo humano regula la cantidad de luz que entra?", answer: "Iris", options: ["Retina", "Cristalino", "Iris", "Córnea"] },
    
    // MISCELÁNEA Y DEPORTES (5 preguntas nuevas)
    { question: "¿En qué deporte se utiliza la expresión 'ace'?", answer: "Tenis", options: ["Golf", "Fútbol", "Baloncesto", "Tenis"] },
    { question: "¿Qué color se obtiene al mezclar azul y amarillo?", answer: "Verde", options: ["Naranja", "Morado", "Verde", "Marrón"] },
    { question: "¿Cuál es la bebida alcohólica nacional de Escocia?", answer: "Whisky", options: ["Ron", "Vino", "Whisky", "Ginebra"] },
    { question: "¿Cuántos anillos tiene el logo de los Juegos Olímpicos?", answer: "Cinco", options: ["Cuatro", "Cinco", "Seis", "Siete"] },
    { question: "¿Cuál es el nombre del personaje de Disney conocido por robar miel?", answer: "Winnie the Pooh", options: ["Mickey Mouse", "Pato Donald", "Winnie the Pooh", "Bambi"] },
];

// --- Preguntas ÚNICAS (DIFÍCIL - Puntos: 25, Tiempo: 10s) ---
// Total: 50 preguntas
const hardQuestions = [
    // FÍSICA Y QUÍMICA AVANZADA (5 preguntas originales)
    { question: "¿Qué fenómeno describe la curvatura del espacio-tiempo por la masa?", answer: "Relatividad General", options: ["Mecánica Cuántica", "Principio de Incertidumbre", "Relatividad General", "Relatividad Especial"] },
    { question: "¿Qué ley de Kepler describe que los planetas barren áreas iguales en tiempos iguales?", answer: "Segunda Ley", options: ["Primera Ley", "Segunda Ley", "Tercera Ley", "Ley de la Gravitación Universal"] },
    { question: "¿Qué tipo de partícula media la fuerza gravitacional en la teoría cuántica de campos?", answer: "Gravitón", options: ["Fotón", "Bosón de Higgs", "Neutrino", "Gravitón"] },
    { question: "¿Cuál es el proceso que evita el colapso gravitatorio de una enana blanca?", answer: "Presión de degeneración de electrones", options: ["Presión de degeneración de neutrones", "Fusión de helio", "Presión de degeneración de electrones", "Fuerza electromagnética"] },
    { question: "¿Cuál es la temperatura aproximada del fondo cósmico de microondas?", answer: "2.7 Kelvin", options: ["0 Kelvin", "100 Kelvin", "2.7 Kelvin", "10 Kelvin"] },
    
    // HISTORIA Y ARTE AVANZADO (5 preguntas originales)
    { question: "¿Qué conflicto terminó con el Tratado de Versalles en 1919?", answer: "Primera Guerra Mundial", options: ["Segunda Guerra Mundial", "Guerra Fría", "Guerra Civil Americana", "Primera Guerra Mundial"] },
    { question: "¿Quién escribió la obra 'Hamlet'?", answer: "William Shakespeare", options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Oscar Wilde"] },
    { question: "¿Qué movimiento artístico se originó en Italia y se centró en el redescubrimiento de la cultura clásica?", answer: "Renacimiento", options: ["Barroco", "Romanticismo", "Renacimiento", "Impresionismo"] },
    { question: "¿Qué emperador romano legalizó el cristianismo?", answer: "Constantino I", options: ["Nerón", "Augusto", "Constantino I", "Diocleciano"] },
    { question: "¿En qué año se firmó la Declaración de Independencia de los Estados Unidos?", answer: "1776", options: ["1789", "1776", "1783", "1801"] },
    
    // BIOLOGÍA Y MEDICINA (5 preguntas originales)
    { question: "¿Qué vitamina se produce en la piel por la exposición a la luz solar?", answer: "Vitamina D", options: ["Vitamina C", "Vitamina A", "Vitamina B12", "Vitamina D"] },
    { question: "¿Qué estructura celular es responsable de la producción de energía (ATP)?", answer: "Mitocondria", options: ["Núcleo", "Ribosoma", "Mitocondria", "Vacuola"] },
    { question: "¿Cuál es el tipo de sangre considerado el 'donante universal'?", answer: "O negativo", options: ["A positivo", "AB negativo", "O negativo", "B positivo"] },
    { question: "¿Qué enfermedad viral fue erradicada globalmente en 1980?", answer: "Viruela", options: ["Polio", "Sarampión", "Viruela", "Tuberculosis"] },
    { question: "¿Qué hormona es liberada en situaciones de estrés o peligro?", answer: "Adrenalina", options: ["Insulina", "Dopamina", "Adrenalina", "Tiroxina"] },
    
    // GEOGRAFÍA Y CULTURA MUNDIAL (5 preguntas originales)
    { question: "¿Cuál es el país más pequeño del mundo por área terrestre?", answer: "Ciudad del Vaticano", options: ["Mónaco", "Nauru", "Ciudad del Vaticano", "San Marino"] },
    { question: "¿Cuál es el punto más bajo de la Tierra a nivel del mar?", answer: "Mar Muerto", options: ["Fosa de las Marianas", "Mar Caspio", "Mar Muerto", "Lago Baikal"] },
    { question: "¿Cuántos husos horarios tiene Rusia (antes de la última reducción)?", answer: "11", options: ["8", "11", "9", "12"] },
    { question: "¿Qué idioma es el más hablado en el mundo como lengua materna?", answer: "Mandarín", options: ["Inglés", "Español", "Mandarín", "Hindi"] },
    { question: "¿Qué ciudad es conocida como la 'Cuna de la Civilización Occidental'?", answer: "Atenas", options: ["Roma", "Jerusalén", "Atenas", "Alejandría"] },

    // Preguntas Extra Difíciles (10 preguntas originales)
    { question: "¿Qué es el 'Efecto Doppler' en el contexto de la luz estelar?", answer: "Cambio de color por velocidad", options: ["Brillo variable", "Cambio de color por velocidad", "Aumento de temperatura", "Distorsión de la imagen"] },
    { question: "¿Quién fue el químico que organizó los elementos en la tabla periódica?", answer: "Dmitri Mendeléyev", options: ["Marie Curie", "John Dalton", "Dmitri Mendeléyev", "Ernest Rutherford"] },
    { question: "¿Qué tratado estableció la OTAN?", answer: "Tratado de Washington", options: ["Tratado de Versalles", "Pacto de Varsovia", "Tratado de Maastricht", "Tratado de Washington"] },
    { question: "¿Cuál es la moneda de Suiza?", answer: "Franco Suizo", options: ["Euro", "Corona", "Franco Suizo", "Zloty"] },
    { question: "¿Qué concepto matemático es clave en la Relatividad General de Einstein?", answer: "Tensores", options: ["Vectores", "Matrices", "Números Complejos", "Tensores"] },
    { question: "¿Cómo se llama la luna de Saturno conocida por su densa atmósfera de metano?", answer: "Titán", options: ["Encélado", "Ío", "Titán", "Rea"] },
    { question: "¿Qué es la 'Materia Oscura'?", answer: "Materia que no emite ni refleja luz", options: ["Agujeros Negros", "Gas Ionizado", "Materia que no emite ni refleja luz", "Cúmulos de Estrellas"] },
    { question: "¿En qué país se originó el arte del origami?", answer: "Japón", options: ["China", "Corea", "Japón", "Vietnam"] },
    { question: "¿Qué proceso biológico describe el paso de información genética del ADN al ARN mensajero?", answer: "Transcripción", options: ["Traducción", "Replicación", "Transcripción", "Mitosis"] },
    { question: "¿Qué fenómeno óptico causa que el cielo sea azul?", answer: "Dispersión de Rayleigh", options: ["Refracción", "Difracción", "Dispersión de Rayleigh", "Reflexión"] },
    
    // --- 20 NUEVAS Preguntas Difíciles ---

    // FÍSICA Y ASTRONOMÍA AVANZADA (5 preguntas nuevas)
    { question: "¿Cuál es el nombre de la paradoja que cuestiona la aparente contradicción entre la alta probabilidad de existencia de civilizaciones extraterrestres y la falta de evidencia?", answer: "Paradoja de Fermi", options: ["Paradoja de Olbers", "Paradoja de D’Alembert", "Paradoja de Fermi", "Paradoja del Viajero"] },
    { question: "¿Qué es la 'Singularidad' en el contexto de un agujero negro?", answer: "Punto de densidad infinita", options: ["Horizonte de Sucesos", "Estrella de Neutrones", "Punto de densidad infinita", "Disco de Acreción"] },
    { question: "¿Cuál es el valor de la Constante de Planck (h) en unidades de J·s (Joule por segundo), redondeado a dos cifras significativas en notación científica?", answer: "6.63 x 10^-34", options: ["3.00 x 10^8", "6.63 x 10^-34", "1.38 x 10^-23", "9.8"] },
    { question: "¿Qué proceso astrofísico es la principal fuente de energía de las estrellas de secuencia principal?", answer: "Fusión nuclear de Hidrógeno a Helio", options: ["Fisión nuclear de Uranio", "Contracción gravitacional", "Fusión nuclear de Hidrógeno a Helio", "Combustión de carbono"] },
    { question: "¿Cómo se llama la partícula elemental que media la fuerza electromagnética?", answer: "Fotón", options: ["Gluón", "Bosón W/Z", "Fotón", "Leptón"] },

    // HISTORIA MUNDIAL AVANZADA (5 preguntas nuevas)
    { question: "¿Qué dinastía fue responsable de construir gran parte de la Gran Muralla China?", answer: "Dinastía Ming", options: ["Dinastía Qin", "Dinastía Tang", "Dinastía Ming", "Dinastía Han"] },
    { question: "¿Quién fue el último Zar de Rusia, ejecutado junto a su familia en 1918?", answer: "Nicolás II", options: ["Alejandro III", "Pedro el Grande", "Nicolás II", "Iván el Terrible"] },
    { question: "¿Cuál fue el nombre del filósofo griego autor de 'La República' y de la alegoría de la caverna?", answer: "Platón", options: ["Aristóteles", "Sócrates", "Platón", "Diógenes"] },
    { question: "¿Qué evento marcó el inicio de la Edad Media en el año 476 d.C.?", answer: "Caída del Imperio Romano de Occidente", options: ["Coronación de Carlomagno", "Batalla de Hastings", "Caída del Imperio Romano de Occidente", "Inicio de las Cruzadas"] },
    { question: "¿Qué país acuñó la palabra 'robot' en la década de 1920 en una obra de teatro?", answer: "Checoslovaquia", options: ["Alemania", "Estados Unidos", "Japón", "Checoslovaquia"] },

    // BIOLOGÍA Y QUÍMICA AVANZADA (5 preguntas nuevas)
    { question: "¿Qué biomolécula es el componente principal de las membranas celulares, formando una bicapa?", answer: "Fosfolípido", options: ["Proteína", "Carbohidrato", "Fosfolípido", "Ácido Nucleico"] },
    { question: "¿Cuál es la función principal de la enzima 'Amilasa' en el cuerpo humano?", answer: "Descomponer almidones (carbohidratos)", options: ["Digerir proteínas", "Descomponer grasas", "Descomponer almidones (carbohidratos)", "Sintetizar ADN"] },
    { question: "¿Qué ley química establece que 'la materia no se crea ni se destruye, solo se transforma'?", answer: "Ley de Conservación de la Masa", options: ["Ley de Boyle", "Ley de la Termodinámica", "Ley de Conservación de la Masa", "Ley de Avogadro"] },
    { question: "¿Qué tipo de enlace químico se forma por la transferencia de electrones entre átomos?", answer: "Iónico", options: ["Covalente", "Metálico", "Iónico", "Puente de Hidrógeno"] },
    { question: "¿Cuál es el nombre del proceso por el cual una célula envuelve y digiere partículas grandes?", answer: "Fagocitosis", options: ["Exocitosis", "Pinocitosis", "Fagocitosis", "Ósmosis"] },

    // GEOPOLÍTICA Y ECONOMÍA (5 preguntas nuevas)
    { question: "¿Qué ciudad es la sede principal del Banco Mundial y el Fondo Monetario Internacional (FMI)?", answer: "Washington D.C.", options: ["Nueva York", "Londres", "Bruselas", "Washington D.C."] },
    { question: "¿Qué nombre recibe la zona de libre tránsito y moneda única de muchos países europeos?", answer: "Zona Euro y Schengen", options: ["Commonwealth", "Bloque del Este", "Mercosur", "Zona Euro y Schengen"] },
    { question: "¿Qué país es el único que limita por tierra con Portugal?", answer: "España", options: ["Francia", "Marruecos", "España", "Andorra"] },
    { question: "¿Qué término económico describe una subida general y continua de precios?", answer: "Inflación", options: ["Deflación", "Estanflación", "Recesión", "Inflación"] },
    { question: "¿Qué península está formada por España y Portugal?", answer: "Península Ibérica", options: ["Península Balcánica", "Península Itálica", "Península Escandinava", "Península Ibérica"] },
];


// --- NUEVAS Preguntas ÚNICAS (MODO ESPACIAL - Racha, Título) ---
// Total: 50 preguntas temáticas de ESPACIO
const spaceQuestions = [
    // 1-10 (Sistema Solar)
    { question: "¿Qué planeta tiene la mayor inclinación axial, lo que le hace 'rodar' sobre su órbita?", answer: "Urano", options: ["Neptuno", "Urano", "Júpiter", "Venus"] },
    { question: "¿Cuál es el satélite más grande del Sistema Solar, siendo más grande que Mercurio?", answer: "Ganímedes", options: ["Titán", "Europa", "Ío", "Ganímedes"] },
    { question: "¿Qué cinturón de asteroides se encuentra entre Marte y Júpiter?", answer: "Cinturón Principal", options: ["Cinturón de Kuiper", "Nube de Oort", "Cinturón Principal", "Disco Disperso"] },
    { question: "¿Cuál es el nombre de la sonda espacial que más lejos ha llegado (aún operativa)?", answer: "Voyager 1", options: ["New Horizons", "Pioneer 10", "Voyager 1", "Cassini"] },
    { question: "¿Qué planeta es conocido por el fenómeno de 'lluvia de diamantes'?", answer: "Neptuno y Urano", options: ["Júpiter", "Saturno", "Neptuno y Urano", "Marte"] },
    { question: "¿Cómo se llama el punto más lejano de la órbita de un planeta alrededor del Sol?", answer: "Afelio", options: ["Perihelio", "Eclíptica", "Afelio", "Solsticio"] },
    { question: "¿Qué planeta del Sistema Solar tiene la rotación más lenta?", answer: "Venus", options: ["Mercurio", "Venus", "Tierra", "Marte"] },
    { question: "¿Qué capa de la atmósfera solar es visible durante un eclipse total?", answer: "Corona", options: ["Fotosfera", "Cromosfera", "Corona", "Núcleo"] },
    { question: "¿Cuál es el elemento más abundante en la corteza de la Tierra?", answer: "Oxígeno", options: ["Silicio", "Hierro", "Aluminio", "Oxígeno"] },
    { question: "¿Quién fue el primer ser humano en el espacio?", answer: "Yuri Gagarin", options: ["Neil Armstrong", "Alan Shepard", "Yuri Gagarin", "Valentina Tereshkova"] },
    
    // 11-20 (Astros y Estructuras)
    { question: "¿Qué nombre recibe el remanente estelar ultradenso que queda después del colapso de una estrella masiva?", answer: "Agujero Negro", options: ["Enana Blanca", "Estrella de Neutrones", "Agujero Negro", "Gigante Roja"] },
    { question: "¿Qué es una 'Nebulosa de Cangrejo'?", answer: "Remanente de Supernova", options: ["Galaxia Enana", "Agujero de Gusano", "Remanente de Supernova", "Cúmulo Estelar"] },
    { question: "¿Qué clasificación estelar tiene el Sol (tipo espectral)?", answer: "G2V", options: ["A0V", "M5III", "G2V", "K0V"] },
    { question: "¿Cuál es el límite teórico más allá del cual la presión de degeneración de neutrones no puede soportar la gravedad?", answer: "Límite de Chandrasekhar", options: ["Límite de Roche", "Límite de Chandrasekhar", "Límite de Eddington", "Límite de Hawking"] },
    { question: "¿Qué fenómeno causa el 'efecto de lente gravitacional'?", answer: "Curvatura del Espacio-Tiempo", options: ["Intensa Magnetosfera", "Interacción de Vientos Solares", "Curvatura del Espacio-Tiempo", "Dispersión de la Luz"] },
    { question: "¿Qué galaxia es la más cercana a la Vía Láctea?", answer: "Andrómeda", options: ["Triángulo", "Centauro A", "Andrómeda", "Nube Grande de Magallanes"] },
    { question: "¿Qué término describe el momento de nacimiento de una estrella a partir de una nube de gas y polvo?", answer: "Protoestrella", options: ["Enana Marrón", "Supergigante", "Protoestrella", "Pulsar"] },
    { question: "¿Qué tipo de explosión estelar ocurre cuando una enana blanca excede su límite de masa?", answer: "Supernova Tipo Ia", options: ["Supernova Tipo II", "Nova Clásica", "Supernova Tipo Ia", "Estallido de Rayos Gamma"] },
    { question: "¿Qué se forma cuando una estrella de neutrones gira rápidamente emitiendo haces de radiación?", answer: "Pulsar", options: ["Cuásar", "Magnetar", "Blazar", "Pulsar"] },
    { question: "¿Qué instrumento principal utiliza el Telescopio Espacial Hubble para observar la luz visible?", answer: "Espejo Primario", options: ["Lente Barlow", "Espejo Primario", "Sensor CCD", "Prisma Dispersor"] },

    // 21-30 (Historia y Misiones)
    { question: "¿Cuál fue el nombre del primer satélite artificial puesto en órbita por la URSS en 1957?", answer: "Sputnik 1", options: ["Vostok 1", "Explorer 1", "Sputnik 1", "Luna 1"] },
    { question: "¿Qué misión de la NASA llevó al primer aterrizaje tripulado en la Luna?", answer: "Apolo 11", options: ["Apolo 8", "Apolo 13", "Apolo 11", "Gemini 4"] },
    { question: "¿Quién fue la primera mujer en el espacio?", answer: "Valentina Tereshkova", options: ["Sally Ride", "Svetlana Savitskaya", "Valentina Tereshkova", "Eileen Collins"] },
    { question: "¿Cuál es el nombre de la estación espacial actualmente en órbita baja de la Tierra?", answer: "Estación Espacial Internacional (ISS)", options: ["Mir", "Skylab", "Estación Espacial Internacional (ISS)", "Tiangong"] },
    { question: "¿Qué transbordador espacial se desintegró al reingresar a la atmósfera en 2003?", answer: "Columbia", options: ["Challenger", "Discovery", "Columbia", "Atlantis"] },
    { question: "¿Qué vehículo de exploración está actualmente en la superficie de Marte (el más avanzado)?", answer: "Perseverance", options: ["Curiosity", "Sojourner", "Opportunity", "Perseverance"] },
    { question: "¿Cuál es el nombre del primer módulo habitacional que fue lanzado para la ISS?", answer: "Zarya", options: ["Unity", "Destiny", "Zarya", "Columbus"] },
    { question: "¿Qué tratado internacional prohíbe las armas de destrucción masiva en el espacio exterior?", answer: "Tratado del Espacio Exterior", options: ["Tratado de la Luna", "Tratado de No Proliferación", "Tratado del Espacio Exterior", "Acuerdos de Artemis"] },
    { question: "¿Qué científico fue el primero en observar la Luna y Júpiter con un telescopio?", answer: "Galileo Galilei", options: ["Nicolás Copérnico", "Johannes Kepler", "Isaac Newton", "Galileo Galilei"] },
    { question: "¿En qué año se lanzó el Telescopio Espacial James Webb (JWST)?", answer: "2021", options: ["2018", "2020", "2021", "2023"] },

    // 31-40 (Conceptos Cosmología y Física)
    { question: "¿Qué teoría explica el origen del universo como una rápida expansión inicial?", answer: "Big Bang", options: ["Teoría del Estado Estacionario", "Big Crunch", "Big Bang", "Universo Oscilante"] },
    { question: "¿Qué tipo de energía se cree que está causando la aceleración de la expansión del universo?", answer: "Energía Oscura", options: ["Materia Oscura", "Energía Cinética", "Energía Oscura", "Energía Potencial"] },
    { question: "¿Qué se conoce como el 'Horizonte de Sucesos' de un agujero negro?", answer: "Límite donde nada puede escapar", options: ["El centro del agujero", "La órbita de las estrellas", "Límite donde nada puede escapar", "La capa exterior del disco"] },
    { question: "¿Cuál es el concepto que describe la distancia donde un cuerpo celeste, sostenido solo por su propia gravedad, se desintegra por las fuerzas de marea de otro cuerpo?", answer: "Límite de Roche", options: ["Límite de Chandrasekhar", "Límite de Roche", "Radio de Schwarzschild", "Límite de Olbers"] },
    { question: "¿Qué son los 'Quásares' (Quasi-Stellar Objects)?", answer: "Núcleos galácticos activos muy luminosos", options: ["Planetas errantes", "Súper novas antiguas", "Núcleos galácticos activos muy luminosos", "Regiones de formación estelar"] },
    { question: "¿Qué fenómeno se utiliza para medir distancias a galaxias lejanas mediante el uso de estrellas variables?", answer: "Cefeidas (Ley Período-Luminosidad)", options: ["Ley de Hubble", "Efecto Doppler", "Cefeidas (Ley Período-Luminosidad)", "Paralaje Estelar"] },
    { question: "¿Cómo se llama la fuerza que evita que los protones y neutrones en el núcleo atómico se separen?", answer: "Fuerza Nuclear Fuerte", options: ["Fuerza Gravitacional", "Fuerza Electromagnética", "Fuerza Nuclear Débil", "Fuerza Nuclear Fuerte"] },
    { question: "¿Qué ley de la física se aplica cuando un cohete expulsa gases hacia abajo para elevarse (acción y reacción)?", answer: "Tercera Ley de Newton", options: ["Primera Ley de Newton", "Segunda Ley de Newton", "Tercera Ley de Newton", "Ley de Gravitación Universal"] },
    { question: "¿Qué es una 'Línea de Fraunhofer' en el espectro solar?", answer: "Línea de absorción oscura", options: ["Línea de emisión brillante", "Una mancha solar", "Línea de absorción oscura", "Una explosión solar"] },
    { question: "¿Cuál es la última etapa de la vida de una estrella de baja a media masa como el Sol?", answer: "Enana Blanca", options: ["Agujero Negro", "Estrella de Neutrones", "Enana Roja", "Enana Blanca"] },

    // 41-50 (Curiosidades y Planetas Enanos)
    { question: "¿Cuál es el nombre del cráter de impacto más grande conocido en la Luna?", answer: "Cuenca Aitken del Polo Sur", options: ["Mar de la Tranquilidad", "Cuenca Aitken del Polo Sur", "Cráter Tycho", "Cráter Copernicus"] },
    { question: "¿Qué planeta enano fue reclasificado en 2006?", answer: "Plutón", options: ["Ceres", "Eris", "Makemake", "Plutón"] },
    { question: "¿Cuál es el planeta enano más grande conocido en el Cinturón de Kuiper?", answer: "Eris", options: ["Ceres", "Plutón", "Haumea", "Eris"] },
    { question: "¿Qué se requiere para que un objeto sea clasificado como planeta enano (además de orbitar el Sol y tener forma esférica)?", answer: "No haber limpiado su órbita", options: ["Tener al menos una luna", "Estar en el Cinturón de Kuiper", "No haber limpiado su órbita", "Tener atmósfera"] },
    { question: "¿Qué forma de agua se ha detectado bajo la superficie de la luna Europa de Júpiter?", answer: "Océano líquido", options: ["Vapor de agua", "Hielo seco", "Océano líquido", "Plasma"] },
    { question: "¿Qué telescopio espacial es famoso por descubrir la mayor cantidad de exoplanetas por el método de tránsito?", answer: "Telescopio Kepler", options: ["Telescopio Hubble", "Telescopio Chandra", "Telescopio Spitzer", "Telescopio Kepler"] },
    { question: "¿Cuál es el componente principal de la cola de un cometa cuando se acerca al Sol?", answer: "Hielo, polvo y gas sublimado", options: ["Rocas sólidas", "Metales pesados", "Hielo, polvo y gas sublimado", "Magma incandescente"] },
    { question: "¿Qué nombre recibe un meteorito que sobrevive al impacto con la Tierra y es recuperado?", answer: "Meteorito", options: ["Meteoroide", "Meteoro", "Asteroide", "Meteorito"] },
    { question: "¿Cuál es el nombre de la misión que está trayendo muestras de asteroides a la Tierra (OSIRIS-REx)?", answer: "Bennu", options: ["Vesta", "Hyabusa", "Bennu", "Ryugu"] },
    { question: "¿Qué característica de la Luna causa las mareas en la Tierra?", answer: "Fuerza gravitacional", options: ["Su composición química", "Su reflejo de la luz solar", "Fuerza gravitacional", "Su campo magnético"] },
];

// ------------------------------------------------------------------

// 1. Añadir todas las preguntas FÁCILES al array principal
easyQuestions.forEach((q, index) => {
    triviaData.push({ ...q, id: `E${index + 1}`, mode: 'easy', points: 10, time: 15 });
});

// 2. Añadir todas las preguntas DIFÍCILES al array principal
hardQuestions.forEach((q, index) => {
    triviaData.push({ ...q, id: `H${index + 1}`, mode: 'hard', points: 25, time: 10 });
});

// 3. Añadir todas las preguntas ESPACIALES al array principal
spaceQuestions.forEach((q, index) => {
    // Para el modo espacial, los puntos y el tiempo son irrelevantes, pero se mantienen con valores estándar.
    triviaData.push({ ...q, id: `S${index + 1}`, mode: 'space', points: 5, time: 5 }); 
});

// El array triviaData contiene ahora 150 preguntas (50 fáciles, 50 difíciles, 50 espaciales).