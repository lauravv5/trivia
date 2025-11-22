// =================================================================
// 3. app.js
// Lógica principal del juego Trivia Galáctica (Código Completo y Corregido)
// =================================================================

// --- Elementos del DOM ---
const startMenu = document.getElementById('start-menu');
const modeSelectionMenu = document.getElementById('mode-selection-menu');
const gameScreen = document.getElementById('game-screen');
const pauseMenu = document.getElementById('pause-menu');
const gameOverScreen = document.getElementById('game-over-screen');
const loadingScreen = document.getElementById('loading-screen');

const startButton = document.getElementById('start-button');
const easyModeButton = document.getElementById('easy-mode-button');
const hardModeButton = document.getElementById('hard-mode-button');
const backToStartButton = document.getElementById('back-to-start-button');

const questionText = document.getElementById('question-text');
const optionButtons = document.querySelectorAll('.option-button');
const currentScoreElement = document.getElementById('current-score');
const highScoreValueElement = document.getElementById('high-score-value');
const gameOverHighScoreValueElement = document.getElementById('game-over-high-score-value');
const finalScoreValueElement = document.getElementById('final-score-value');
const startMenuHighScoreValueElement = document.getElementById('start-menu-high-score-value');
const livesBar = document.getElementById('lives-bar');
const feedbackMessage = document.getElementById('feedback-message');
const questionTimerValueElement = document.getElementById('question-timer-value');

const pauseButton = document.getElementById('pause-button');
const soundToggleButton = document.getElementById('sound-toggle-button');
const resumeButton = document.getElementById('resume-button');
const restartFromPauseButton = document.getElementById('restart-from-pause-button');
const quitButton = document.getElementById('quit-button');
const playAgainButton = document.getElementById('play-again-button');
const backToMenuButton = document.getElementById('back-to-menu-button');


// --- Variables del Juego ---
const allQuestions = triviaData; // Carga las 60 preguntas desde questions.js
let questionsPool = []; // Pool de preguntas filtrado y mezclado para la sesión
let currentQuestionIndex = 0; // Índice para recorrer el pool mezclado
let score = 0;
let lives = 3;
const MAX_LIVES = 3;
let highScore = 0;
let gamePaused = false;
let soundEnabled = true;
let gameMode = 'easy';

let questionTimer;

// --- Audios ---
// NOTA: Debes tener estos archivos en una carpeta 'assets/sounds/'
// Las rutas deben ser corregidas si los archivos no están en esas ubicaciones.
const correctSound = new Audio('assets/sounds/correct.mp3'); 
const incorrectSound = new Audio('assets/sounds/incorrect.mp3');
const gameOverSound = new Audio('assets/sounds/game-over.mp3');
const backgroundMusic = new Audio('assets/sounds/background-music.mp3'); 
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3; 


// --- Funciones de Control y Utilidad ---

function showScreen(screenToShow) {
    const screens = [startMenu, modeSelectionMenu, gameScreen, pauseMenu, gameOverScreen, loadingScreen];
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    screenToShow.classList.add('active');
}

function playSound(audio) {
    if (soundEnabled) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Audio playback blocked:", e)); 
    }
}

function stopSound(audio) {
    audio.pause();
    audio.currentTime = 0;
}

// 💾 Persistencia de la Puntuación Máxima
function loadHighScore() {
    const storedHighScore = localStorage.getItem('triviaGalacticaHighScore');
    if (storedHighScore) {
        highScore = parseInt(storedHighScore);
    }
    
    // Actualiza todos los elementos de High Score
    if (highScoreValueElement) highScoreValueElement.textContent = highScore;
    if (gameOverHighScoreValueElement) gameOverHighScoreValueElement.textContent = highScore;
    if (startMenuHighScoreValueElement) startMenuHighScoreValueElement.textContent = highScore;
}

function saveHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('triviaGalacticaHighScore', highScore);
    }
    
    // Actualiza todos los elementos de High Score
    if (highScoreValueElement) highScoreValueElement.textContent = highScore;
    if (gameOverHighScoreValueElement) gameOverHighScoreValueElement.textContent = highScore;
    if (startMenuHighScoreValueElement) startMenuHighScoreValueElement.textContent = highScore;
}

// 📊 Actualización de la Interfaz (Score, Vidas)
function updateHUD() {
    currentScoreElement.textContent = score;
    const lifeSegments = livesBar.querySelectorAll('.life-segment');
    lifeSegments.forEach((segment, index) => {
        if (index < lives) {
            segment.classList.add('active');
        } else {
            segment.classList.remove('active');
        }
    });
}

// 🔊 Control de Sonido
function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundIconOn = document.getElementById('sound-icon-on');
    const soundIconOff = document.getElementById('sound-icon-off');

    if (soundEnabled) {
        if (soundIconOn) soundIconOn.style.display = 'block';
        if (soundIconOff) soundIconOff.style.display = 'none';
        
        // Reanuda la música solo si NO está pausado el juego
        if (gameScreen.classList.contains('active') && !gamePaused) {
             backgroundMusic.play();
        } else if (startMenu.classList.contains('active') || modeSelectionMenu.classList.contains('active')) {
             backgroundMusic.play();
        }
    } else {
        if (soundIconOn) soundIconOn.style.display = 'none';
        if (soundIconOff) soundIconOff.style.display = 'block';
        stopSound(backgroundMusic);
    }
    localStorage.setItem('triviaGalacticaSound', soundEnabled); 
}


// --- Lógica del Temporizador ---

function clearTimer() {
    clearInterval(questionTimer);
    questionTimerValueElement.classList.remove('time-low');
}

function startTimer(timeLimit) {
    clearTimer();
    let timeLeft = timeLimit;
    questionTimerValueElement.textContent = `${timeLeft}s`;
    
    questionTimer = setInterval(() => {
        timeLeft--;
        questionTimerValueElement.textContent = `${timeLeft}s`;

        if (timeLeft <= 5) {
            questionTimerValueElement.classList.add('time-low');
        } else {
            questionTimerValueElement.classList.remove('time-low');
        }

        if (timeLeft <= 0) {
            clearTimer();
            handleTimeout(); 
        }
    }, 1000);
}

function handleTimeout() {
    optionButtons.forEach(button => button.disabled = true);
    
    playSound(incorrectSound);
    lives--; 
    feedbackMessage.textContent = "¡Tiempo agotado! Pierdes una vida.";
    feedbackMessage.classList.add('show', 'incorrect');
    
    // Marcar la respuesta correcta antes de la transición
    const correctAnswer = gameScreen.currentQuestion.answer;
    optionButtons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        }
    });
    
    updateHUD();

    setTimeout(() => {
        if (lives <= 0) {
            gameOver(false); 
        } else {
            loadNewQuestion();
        }
    }, 1500);
}


// --- Lógica de Preguntas y Juego ---

/**
 * Filtra las preguntas por el modo actual y las mezcla aleatoriamente.
 */
function prepareQuestions() {
    // 1. Filtrar el pool por el modo de juego seleccionado (ej: 'easy' o 'hard')
    const filteredQuestions = allQuestions.filter(q => q.mode === gameMode);
    
    // 2. Mezclar el pool de preguntas usando el algoritmo Fisher-Yates
    questionsPool = [...filteredQuestions]; 
    
    for (let i = questionsPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionsPool[i], questionsPool[j]] = [questionsPool[j], questionsPool[i]];
    }
    
    // 3. Reiniciar el índice para empezar desde la primera pregunta mezclada
    currentQuestionIndex = 0; 
}

function resetGame(mode) {
    gameMode = mode; 
    prepareQuestions(); // Genera un nuevo orden aleatorio de preguntas
    currentQuestionIndex = 0;
    score = 0;
    lives = MAX_LIVES;
    gamePaused = false;
    updateHUD();
    loadNewQuestion();
    feedbackMessage.classList.remove('show', 'correct', 'incorrect');
    stopSound(gameOverSound);
    
    if (soundEnabled) {
        backgroundMusic.play();
    }
}

/**
 * Carga la siguiente pregunta del pool ya mezclado de forma secuencial.
 */
function loadNewQuestion() {
    optionButtons.forEach(button => {
        button.disabled = true;
        // Limpiar estilos de retroalimentación
        button.classList.remove('correct', 'incorrect'); 
    });
    clearTimer();

    // Revisa si se han agotado las preguntas del pool mezclado
    if (currentQuestionIndex >= questionsPool.length) {
        gameOver(true); 
        return;
    }

    // Carga la siguiente pregunta en el orden aleatorio
    const questionData = questionsPool[currentQuestionIndex];
    gameScreen.currentQuestion = questionData; 

    questionText.textContent = questionData.question;

    // Mezclar las OPCIONES de respuesta
    const mixedOptions = [...questionData.options].sort(() => Math.random() - 0.5);

    optionButtons.forEach((button, index) => {
        button.textContent = mixedOptions[index];
        button.onclick = () => {
            clearTimer();
            checkAnswer(button, questionData.answer);
        };
        button.disabled = false;
    });
    
    feedbackMessage.classList.remove('show', 'correct', 'incorrect');
    
    startTimer(questionData.time); 
}

/**
 * Comprueba la respuesta seleccionada y actualiza el estado del juego.
 * @param {HTMLButtonElement} selectedButton El botón que el usuario ha pulsado.
 * @param {string} correctAnswer La respuesta correcta.
 */
function checkAnswer(selectedButton, correctAnswer) {
    clearTimer(); 
    optionButtons.forEach(button => button.disabled = true);
    
    const isCorrect = selectedButton.textContent === correctAnswer;
    const questionData = gameScreen.currentQuestion;
    
    if (isCorrect) {
        playSound(correctSound);
        score += questionData.points;
        // Aplica el estilo correcto al botón seleccionado
        selectedButton.classList.add('correct');
        feedbackMessage.textContent = `¡Respuesta Correcta! (+${questionData.points} pts)`;
        feedbackMessage.classList.add('show', 'correct');
    } else {
        playSound(incorrectSound);
        lives--; 
        // Aplica el estilo incorrecto al botón seleccionado
        selectedButton.classList.add('incorrect');
        feedbackMessage.textContent = "¡Respuesta Incorrecta!";

        // Muestra la respuesta correcta con neón verde
        optionButtons.forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct'); // <-- Muestra la respuesta correcta
            }
        });
    }

    updateHUD();
    saveHighScore(); 

    currentQuestionIndex++; // Avanza al siguiente índice de la lista mezclada

    // Espera 1.5 segundos para la retroalimentación visual antes de cargar la siguiente pregunta
    setTimeout(() => {
        if (lives <= 0) {
            gameOver(false); 
        } else {
            loadNewQuestion();
        }
    }, 1500); 
}

function gameOver(completed = false) {
    stopSound(backgroundMusic);
    clearTimer();
    saveHighScore(); 
    
    if (completed) {
        document.querySelector('.game-over-title').textContent = "¡Galaxia Completada!";
    } else {
        playSound(gameOverSound);
        document.querySelector('.game-over-title').textContent = "¡Viaje Interrumpido!";
    }
    
    finalScoreValueElement.textContent = score;
    gameOverHighScoreValueElement.textContent = highScore; 
    showScreen(gameOverScreen);
}


function togglePause() {
    if (gameScreen.classList.contains('active')) {
        gamePaused = true;
        clearTimer();
        stopSound(backgroundMusic);
        showScreen(pauseMenu);
    } else if (pauseMenu.classList.contains('active')) {
        gamePaused = false;
        // Reinicia el temporizador de la pregunta actual al reanudar
        const questionData = questionsPool[currentQuestionIndex - 1]; // Obtener la pregunta anterior
        if (questionData) {
            startTimer(questionData.time); 
        }
        
        if (soundEnabled) {
            backgroundMusic.play();
        }
        showScreen(gameScreen);
    }
}


// --- Event Listeners ---
startButton.addEventListener('click', () => {
    showScreen(modeSelectionMenu);
});

easyModeButton.addEventListener('click', () => {
    showScreen(gameScreen);
    resetGame('easy');
});

hardModeButton.addEventListener('click', () => {
    showScreen(gameScreen);
    resetGame('hard');
});

backToStartButton.addEventListener('click', () => {
    showScreen(startMenu);
    loadHighScore(); 
});

pauseButton.addEventListener('click', togglePause);
soundToggleButton.addEventListener('click', toggleSound);

resumeButton.addEventListener('click', togglePause);

restartFromPauseButton.addEventListener('click', () => {
    showScreen(gameScreen);
    resetGame(gameMode);
});

quitButton.addEventListener('click', () => {
    stopSound(backgroundMusic);
    clearTimer();
    showScreen(startMenu);
    loadHighScore(); 
});

playAgainButton.addEventListener('click', () => {
    showScreen(modeSelectionMenu); 
});

backToMenuButton.addEventListener('click', () => {
    stopSound(backgroundMusic);
    clearTimer();
    showScreen(startMenu);
    loadHighScore(); 
});


// --- Inicialización del Juego ---
document.addEventListener('DOMContentLoaded', () => {
    showScreen(loadingScreen); 
    loadHighScore(); 
    
    // Carga de la preferencia de sonido
    const storedSoundPref = localStorage.getItem('triviaGalacticaSound');
    if (storedSoundPref !== null) {
        soundEnabled = (storedSoundPref === 'true');
    }
    toggleSound(); // Llama para establecer el ícono correcto al inicio

    // Simular carga y mostrar menú inicial
    setTimeout(() => {
        showScreen(startMenu);
        // La música se inicia aquí o se reanuda en toggleSound si se habilitó
        if (soundEnabled) {
            backgroundMusic.play().catch(e => console.log("Música iniciada en el menú, necesita interacción:", e));
        }
    }, 1000); 
});