// =================================================================
// 1. questions.js
// Base de datos de 60 preguntas ÚNICAS (Cultura General y Espacio)
// =================================================================

const triviaData = [];
const NUM_QUESTIONS_PER_MODE = 30;

// --- Preguntas ÚNICAS (FÁCIL - Puntos: 10, Tiempo: 15s) ---
const easyQuestions = [
    // ESPACIO (5 preguntas)
    { question: "¿Cuál es el único planeta conocido que alberga vida?", answer: "Tierra", options: ["Marte", "Venus", "Tierra", "Júpiter"] },
    { question: "¿De qué está compuesto principalmente el Sol?", answer: "Hidrógeno y Helio", options: ["Rocas y Silicatos", "Oxígeno y Nitrógeno", "Hidrógeno y Helio", "Hierro y Níquel"] },
    { question: "¿Qué planeta es conocido como el 'planeta rojo'?", answer: "Marte", options: ["Venus", "Júpiter", "Marte", "Saturno"] },
    { question: "¿Cuál es el planeta más grande de nuestro Sistema Solar?", answer: "Júpiter", options: ["Saturno", "Tierra", "Júpiter", "Urano"] },
    { question: "¿Cómo se llama nuestra galaxia?", answer: "Vía Láctea", options: ["Andrómeda", "Triángulo", "Vía Láctea", "Centauro A"] },
    
    // HISTORIA (5 preguntas)
    { question: "¿En qué año cayó el Muro de Berlín?", answer: "1989", options: ["1991", "1989", "1985", "1995"] },
    { question: "¿Quién pintó la Mona Lisa?", answer: "Leonardo da Vinci", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"] },
    { question: "¿Qué civilización construyó las pirámides de Giza?", answer: "Egipcia", options: ["Romana", "Griega", "Egipcia", "Maya"] },
    { question: "¿Cuál fue el primer metal usado por el hombre?", answer: "Cobre", options: ["Hierro", "Oro", "Cobre", "Plata"] },
    { question: "¿Quién fue el primer presidente de los Estados Unidos?", answer: "George Washington", options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "Benjamin Franklin"] },
    
    // GEOGRAFÍA (5 preguntas)
    { question: "¿Cuál es el río más largo del mundo?", answer: "Amazonas", options: ["Nilo", "Misisipi", "Yangtsé", "Amazonas"] },
    { question: "¿Cuál es el país más poblado del mundo?", answer: "India", options: ["China", "Estados Unidos", "India", "Indonesia"] },
    { question: "¿Cuál es el océano más grande y profundo del mundo?", answer: "Pacífico", options: ["Atlántico", "Índico", "Pacífico", "Ártico"] },
    { question: "¿En qué continente se encuentra el desierto del Sahara?", answer: "África", options: ["Asia", "África", "América del Sur", "Oceanía"] },
    { question: "¿Cuál es la capital de Japón?", answer: "Tokio", options: ["Kioto", "Seúl", "Pekín", "Tokio"] },
    
    // CIENCIA GENERAL (5 preguntas)
    { question: "¿Qué elemento químico tiene el símbolo H?", answer: "Hidrógeno", options: ["Helio", "Oxígeno", "Hidrógeno", "Carbono"] },
    { question: "¿Cuál es el proceso por el cual las plantas fabrican su propio alimento?", answer: "Fotosíntesis", options: ["Respiración", "Mitosis", "Fotosíntesis", "Fermentación"] },
    { question: "¿Qué hueso protege el cerebro humano?", answer: "Cráneo", options: ["Costilla", "Fémur", "Cráneo", "Clavícula"] },
    { question: "¿Cuál es la unidad básica de la vida?", answer: "Célula", options: ["Molécula", "Átomo", "Célula", "Órgano"] },
    { question: "¿A qué temperatura hierve el agua a nivel del mar (en Celsius)?", answer: "100°C", options: ["0°C", "50°C", "100°C", "212°C"] },

    // Preguntas Extra Fáciles (10 preguntas)
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
];

// --- Preguntas ÚNICAS (DIFÍCIL - Puntos: 25, Tiempo: 10s) ---
const hardQuestions = [
    // FÍSICA Y QUÍMICA AVANZADA (5 preguntas)
    { question: "¿Qué fenómeno describe la curvatura del espacio-tiempo por la masa?", answer: "Relatividad General", options: ["Mecánica Cuántica", "Principio de Incertidumbre", "Relatividad General", "Relatividad Especial"] },
    { question: "¿Qué ley de Kepler describe que los planetas barren áreas iguales en tiempos iguales?", answer: "Segunda Ley", options: ["Primera Ley", "Segunda Ley", "Tercera Ley", "Ley de la Gravitación Universal"] },
    { question: "¿Qué tipo de partícula media la fuerza gravitacional en la teoría cuántica de campos?", answer: "Gravitón", options: ["Fotón", "Bosón de Higgs", "Neutrino", "Gravitón"] },
    { question: "¿Cuál es el proceso que evita el colapso gravitatorio de una enana blanca?", answer: "Presión de degeneración de electrones", options: ["Presión de degeneración de neutrones", "Fusión de helio", "Presión de degeneración de electrones", "Fuerza electromagnética"] },
    { question: "¿Cuál es la temperatura aproximada del fondo cósmico de microondas?", answer: "2.7 Kelvin", options: ["0 Kelvin", "100 Kelvin", "2.7 Kelvin", "10 Kelvin"] },
    
    // HISTORIA Y ARTE AVANZADO (5 preguntas)
    { question: "¿Qué conflicto terminó con el Tratado de Versalles en 1919?", answer: "Primera Guerra Mundial", options: ["Segunda Guerra Mundial", "Guerra Fría", "Guerra Civil Americana", "Primera Guerra Mundial"] },
    { question: "¿Quién escribió la obra 'Hamlet'?", answer: "William Shakespeare", options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Oscar Wilde"] },
    { question: "¿Qué movimiento artístico se originó en Italia y se centró en el redescubrimiento de la cultura clásica?", answer: "Renacimiento", options: ["Barroco", "Romanticismo", "Renacimiento", "Impresionismo"] },
    { question: "¿Qué emperador romano legalizó el cristianismo?", answer: "Constantino I", options: ["Nerón", "Augusto", "Constantino I", "Diocleciano"] },
    { question: "¿En qué año se firmó la Declaración de Independencia de los Estados Unidos?", answer: "1776", options: ["1789", "1776", "1783", "1801"] },
    
    // BIOLOGÍA Y MEDICINA (5 preguntas)
    { question: "¿Qué vitamina se produce en la piel por la exposición a la luz solar?", answer: "Vitamina D", options: ["Vitamina C", "Vitamina A", "Vitamina B12", "Vitamina D"] },
    { question: "¿Qué estructura celular es responsable de la producción de energía (ATP)?", answer: "Mitocondria", options: ["Núcleo", "Ribosoma", "Mitocondria", "Vacuola"] },
    { question: "¿Cuál es el tipo de sangre considerado el 'donante universal'?", answer: "O negativo", options: ["A positivo", "AB negativo", "O negativo", "B positivo"] },
    { question: "¿Qué enfermedad viral fue erradicada globalmente en 1980?", answer: "Viruela", options: ["Polio", "Sarampión", "Viruela", "Tuberculosis"] },
    { question: "¿Qué hormona es liberada en situaciones de estrés o peligro?", answer: "Adrenalina", options: ["Insulina", "Dopamina", "Adrenalina", "Tiroxina"] },
    
    // GEOGRAFÍA Y CULTURA MUNDIAL (5 preguntas)
    { question: "¿Cuál es el país más pequeño del mundo por área terrestre?", answer: "Ciudad del Vaticano", options: ["Mónaco", "Nauru", "Ciudad del Vaticano", "San Marino"] },
    { question: "¿Cuál es el punto más bajo de la Tierra a nivel del mar?", answer: "Mar Muerto", options: ["Fosa de las Marianas", "Mar Caspio", "Mar Muerto", "Lago Baikal"] },
    { question: "¿Cuántos husos horarios tiene Rusia (antes de la última reducción)?", answer: "11", options: ["8", "11", "9", "12"] },
    { question: "¿Qué idioma es el más hablado en el mundo como lengua materna?", answer: "Mandarín", options: ["Inglés", "Español", "Mandarín", "Hindi"] },
    { question: "¿Qué ciudad es conocida como la 'Cuna de la Civilización Occidental'?", answer: "Atenas", options: ["Roma", "Jerusalén", "Atenas", "Alejandría"] },

    // Preguntas Extra Difíciles (10 preguntas)
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
];


// 1. Añadir todas las preguntas FÁCILES al array principal
easyQuestions.forEach((q, index) => {
    triviaData.push({ ...q, id: `E${index + 1}`, mode: 'easy', points: 10, time: 15 });
});

// 2. Añadir todas las preguntas DIFÍCILES al array principal
hardQuestions.forEach((q, index) => {
    triviaData.push({ ...q, id: `H${index + 1}`, mode: 'hard', points: 25, time: 10 });
});