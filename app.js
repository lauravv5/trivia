// =================================================================
// 3. app.js (MODIFICADO: Modo Espacial SIN TEMPORIZADOR + Aspecto Dinámico)
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
const spaceModeButton = document.getElementById('space-mode-button'); 
const backToStartButton = document.getElementById('back-to-start-button');

const questionText = document.getElementById('question-text');
const optionButtons = document.querySelectorAll('.option-button');
const currentScoreElement = document.getElementById('current-score');
const highScoreValueElement = document.getElementById('high-score-value');
const gameOverHighScoreValueElement = document.getElementById('game-over-high-score-value');
const finalScoreValueElement = document.getElementById('final-score-value');
const startMenuHighScoreValueElement = document.getElementById('start-menu-high-score-value');

// Elementos del Modo Espacial
const maxSpaceTitleElement = document.getElementById('max-space-title'); 
const spaceModeResultMessage = document.getElementById('space-mode-result-message'); 

const livesBar = document.getElementById('lives-bar');
const gameHudMain = document.getElementById('game-hud-main'); 
const powerUpHud = document.getElementById('power-up-hud'); 
const feedbackMessage = document.getElementById('feedback-message');
const questionTimerValueElement = document.getElementById('question-timer-value');

const pauseButton = document.getElementById('pause-button');
const soundToggleButton = document.getElementById('sound-toggle-button');
const resumeButton = document.getElementById('resume-button');
const restartFromPauseButton = document.getElementById('restart-from-pause-button');
const quitButton = document.getElementById('quit-button');
const playAgainButton = document.getElementById('play-again-button');
const backToMenuButton = document.getElementById('back-to-menu-button');

// --- Elementos de Power-ups ---
const pu5050Button = document.getElementById('power-up-5050');
const puTimeButton = document.getElementById('power-up-time');
const puShieldButton = document.getElementById('power-up-shield');
const pu5050CountElement = document.getElementById('pu-5050-count');
const puTimeCountElement = document.getElementById('pu-time-count');
const puShieldCountElement = document.getElementById('pu-shield-count');


// --- Variables del Juego ---
let allQuestions = typeof triviaData !== 'undefined' ? triviaData : []; 
let questionsPool = []; 
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
const MAX_LIVES = 3; 
let highScore = 0;
let gamePaused = false;
let soundEnabled = true;
let gameMode = 'easy';

let questionTimer;

// --- Variables de RACHA Y TÍTULOS ---
let currentStreak = 0;
const STREAK_BONUS_THRESHOLD = 5; 
let maxSpaceTitle = 'Ninguno'; 

// Mapeo de Rachas a Títulos
const SPACE_TITLES = {
    0: 'Ninguno',
    5: 'Cadete Estelar',
    10: 'Explorador Cósmico',
    15: 'Navegante Galáctico',
    20: 'Astrónomo Élite',
    25: 'Comandante Universal',
    30: 'Leyenda del Cosmos' 
};
function getSpaceTitle(streak) {
    let title = SPACE_TITLES[0];
    const tiers = Object.keys(SPACE_TITLES).map(Number).sort((a, b) => b - a);
    
    for (const tier of tiers) {
        if (streak >= tier) {
            title = SPACE_TITLES[tier];
            break;
        }
    }
    return title;
}
// -------------------------

// --- Variables de Power-ups ---
const MAX_PU_USES = 1; 
let pu5050Uses = MAX_PU_USES; 
let puTimeUses = MAX_PU_USES; 
let puShieldUses = MAX_PU_USES; 
let shieldActive = false; 

// --- Audios ---
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
        if (screen) screen.classList.remove('active');
    });
    if (screenToShow) screenToShow.classList.add('active');
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

// 💾 Persistencia
function loadHighScore() {
    const storedHighScore = localStorage.getItem('triviaGalacticaHighScore');
    if (storedHighScore) {
        highScore = parseInt(storedHighScore);
    }
    
    const storedSpaceTitle = localStorage.getItem('triviaGalacticaSpaceTitle'); 
    if (storedSpaceTitle) {
        maxSpaceTitle = storedSpaceTitle;
    }
    
    [highScoreValueElement, gameOverHighScoreValueElement, startMenuHighScoreValueElement].forEach(el => {
        if (el) el.textContent = highScore;
    });
    
    if (maxSpaceTitleElement) maxSpaceTitleElement.textContent = maxSpaceTitle;
}

function saveHighScore() {
    if (gameMode !== 'space' && score > highScore) {
        highScore = score;
        localStorage.setItem('triviaGalacticaHighScore', highScore);
    }
    
    if (gameMode === 'space') {
        const currentTitle = getSpaceTitle(currentStreak);
        
        const currentTier = Object.keys(SPACE_TITLES).find(key => SPACE_TITLES[key] === currentTitle);
        const maxTitleTier = Object.keys(SPACE_TITLES).find(key => SPACE_TITLES[key] === maxSpaceTitle);
        
        const currentTierValue = currentTier ? parseInt(currentTier) : 0;
        const maxTitleTierValue = maxTitleTier ? parseInt(maxTitleTier) : 0;
        
        if (currentTierValue > maxTitleTierValue) {
            maxSpaceTitle = currentTitle;
            localStorage.setItem('triviaGalacticaSpaceTitle', maxSpaceTitle);
        }
    }
    
    [highScoreValueElement, gameOverHighScoreValueElement, startMenuHighScoreValueElement].forEach(el => {
        if (el) el.textContent = highScore;
    });
    if (maxSpaceTitleElement) maxSpaceTitleElement.textContent = maxSpaceTitle;
}

// 📊 Actualización de la Interfaz y Estilo (MODIFICADO PARA EL ESTILO ESPACIAL)
function updateHUD() {
    const isSpaceMode = gameMode === 'space';
    
    // 🚀 Control del Aspecto Visual del Modo
    const body = document.body;
    if (isSpaceMode) {
        body.classList.add('space-mode-active');
    } else {
        body.classList.remove('space-mode-active');
    }
    
    if (gameHudMain) {
        gameHudMain.style.display = isSpaceMode ? 'none' : 'flex'; 
    }
    
    if (powerUpHud) {
        powerUpHud.style.display = isSpaceMode ? 'none' : 'flex'; 
    }
    
    if (!isSpaceMode) {
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

    // Racha (Es la métrica principal, debe estar visible en ambos si se desea, 
    // pero su relevancia es mayor en modo 'space')
    const streakElement = document.getElementById('streak-count-value');
    if (streakElement) {
        streakElement.textContent = currentStreak;
    }

    updatePowerUpHUD();
}

function updatePowerUpHUD() {
    if (gameMode !== 'space') {
        pu5050CountElement.textContent = pu5050Uses;
        pu5050Button.disabled = pu5050Uses <= 0 || gamePaused;
        
        puTimeCountElement.textContent = puTimeUses;
        puTimeButton.disabled = puTimeUses <= 0 || gamePaused;

        puShieldCountElement.textContent = puShieldUses;
        puShieldButton.disabled = puShieldUses <= 0 || gamePaused || shieldActive;

        if (shieldActive) {
            puShieldButton.style.boxShadow = '0 0 20px #FF0064';
            puShieldButton.style.borderColor = '#FF0064';
        } else {
            puShieldButton.style.boxShadow = '0 0 5px rgba(0, 229, 255, 0.5)';
            puShieldButton.style.borderColor = 'transparent';
        }
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundIconOn = document.getElementById('sound-icon-on');
    const soundIconOff = document.getElementById('sound-icon-off');

    if (soundEnabled) {
        if (soundIconOn) soundIconOn.style.display = 'block';
        if (soundIconOff) soundIconOff.style.display = 'none';
        
        if (gameScreen.classList.contains('active') || startMenu.classList.contains('active')) {
             backgroundMusic.play();
        }
    } else {
        if (soundIconOn) soundIconOn.style.display = 'none';
        if (soundIconOff) soundIconOff.style.display = 'block';
        stopSound(backgroundMusic);
    }
    localStorage.setItem('triviaGalacticaSound', soundEnabled); 
}


// --- Lógica del Temporizador (MODIFICADA) ---

function clearTimer() {
    clearInterval(questionTimer);
    if (questionTimerValueElement) questionTimerValueElement.classList.remove('time-low');
}

function startTimer(timeLimit) {
    // 🛑 En Modo Espacial: No se inicia el temporizador y se oculta el elemento.
    if (gameMode === 'space') {
        if (questionTimerValueElement) questionTimerValueElement.style.display = 'none';
        return;
    }
    // 🛑 Modo Clásico: El temporizador es visible y funciona.
    if (questionTimerValueElement) questionTimerValueElement.style.display = 'inline'; 

    clearTimer();
    let timeLeft = timeLimit;
    if (questionTimerValueElement) questionTimerValueElement.textContent = `${timeLeft}s`;
    
    gameScreen.timeLeft = timeLeft;

    questionTimer = setInterval(() => {
        gameScreen.timeLeft--;
        timeLeft = gameScreen.timeLeft;

        if (questionTimerValueElement) questionTimerValueElement.textContent = `${timeLeft}s`;

        if (timeLeft <= 5) {
            if (questionTimerValueElement) questionTimerValueElement.classList.add('time-low');
        } else {
            if (questionTimerValueElement) questionTimerValueElement.classList.remove('time-low');
        }

        if (timeLeft <= 0) {
            clearTimer();
            handleTimeout(); 
        }
    }, 1000);
}

function handleTimeout() {
    optionButtons.forEach(button => button.disabled = true);
    
    // 🛑 En Modo Espacial: No hay timeout ya que no hay temporizador.
    if (gameMode === 'space') {
        return; // No hace nada en modo espacial
    }
    
    // Lógica para Modos Clásicos ('easy'/'hard')
    playSound(incorrectSound);
    currentStreak = 0; 

    if (shieldActive) {
        shieldActive = false;
        feedbackMessage.textContent = "¡Tiempo agotado! El Blindaje de Escudos te salvó.";
    } else {
        lives--; 
        feedbackMessage.textContent = "¡Tiempo agotado! Pierdes una vida.";
    }
    
    feedbackMessage.classList.add('show', 'incorrect');
    updateHUD();

    setTimeout(() => {
        if (lives <= 0) {
            gameOver(false); 
        } else {
            transitionToNextQuestion();
        }
    }, 1500);
}


// --- Lógica de Power-ups ---

function activate5050() {
    if (pu5050Uses <= 0 || gamePaused || gameMode === 'space') return;
    
    pu5050Uses--; 
    updatePowerUpHUD();

    const questionData = gameScreen.currentQuestion;
    if (!questionData) return;

    const correctAnswer = questionData.answer;
    let incorrectOptions = [];

    optionButtons.forEach(button => {
        if (button.textContent !== correctAnswer) {
            incorrectOptions.push(button);
        }
    });

    const optionsToEliminate = [];
    while (optionsToEliminate.length < 2 && incorrectOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * incorrectOptions.length);
        optionsToEliminate.push(incorrectOptions[randomIndex]);
        incorrectOptions.splice(randomIndex, 1);
    }

    optionsToEliminate.forEach(button => {
        button.disabled = true;
        button.style.visibility = 'hidden';
    });

    feedbackMessage.textContent = "Poder del Astro activado. Dos opciones eliminadas.";
    feedbackMessage.classList.add('show');
    setTimeout(() => feedbackMessage.classList.remove('show'), 1500);
}

function activateTimeBoost() {
    if (puTimeUses <= 0 || gamePaused || gameMode === 'space') return;
    
    // 🛑 En Modo Espacial, este Power-up no hace nada.
    if (gameMode === 'space') return;

    puTimeUses--; 
    updatePowerUpHUD();

    const currentQuestion = questionsPool[currentQuestionIndex];
    const newTime = Math.min(gameScreen.timeLeft + 5, currentQuestion.time + 5); 
    gameScreen.timeLeft = newTime;

    feedbackMessage.textContent = "¡Recarga Solar! +5 segundos al reloj.";
    feedbackMessage.classList.add('show', 'correct');
    setTimeout(() => feedbackMessage.classList.remove('show', 'correct'), 1500);
}

function activateShield() {
    if (puShieldUses <= 0 || gamePaused || shieldActive || gameMode === 'space') return;
    
    shieldActive = true; 
    puShieldUses--; 
    
    updatePowerUpHUD();

    feedbackMessage.textContent = "¡Blindaje de Escudos activado! Protegido del siguiente error.";
    feedbackMessage.classList.add('show', 'incorrect');
    setTimeout(() => feedbackMessage.classList.remove('show', 'incorrect'), 1500);
}


// --- Lógica de Preguntas y Juego ---

function prepareQuestions() {
    const filteredQuestions = allQuestions.filter(q => q.mode === gameMode || q.mode === 'all'); 
    
    questionsPool = [...filteredQuestions]; 
    
    for (let i = questionsPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionsPool[i], questionsPool[j]] = [questionsPool[j], questionsPool[i]];
    }
    
    currentQuestionIndex = 0; 
}

function transitionToNextQuestion() {
    const gameScreenContent = document.querySelector('#game-screen'); 

    gameScreenContent.classList.remove('hyperspace-jump'); 
    gameScreenContent.classList.add('fade-out'); 

    setTimeout(() => {
        if (currentQuestionIndex < questionsPool.length) {
            loadNewQuestion();
            
            gameScreenContent.classList.remove('fade-out');
            gameScreenContent.classList.add('hyperspace-jump'); 
        } else {
            if (gameMode === 'space') {
                endSpaceMode(true); 
            } else {
                gameOver(true);
            }
        }
    }, 300); 
}


function resetGame(mode) {
    gameMode = mode; 
    prepareQuestions();
    currentQuestionIndex = 0;
    
    if (gameMode === 'space') {
        score = 0; 
        lives = MAX_LIVES; 
        currentStreak = 0; 
        // 🛑 Asegura que el timer esté oculto al inicio
        if (questionTimerValueElement) questionTimerValueElement.style.display = 'none'; 
    } else {
        score = 0;
        lives = MAX_LIVES;
        currentStreak = 0; 
        if (questionTimerValueElement) questionTimerValueElement.style.display = 'inline'; 
    }
    
    gamePaused = false;
    
    // Reinicio de Power-ups
    pu5050Uses = MAX_PU_USES; 
    puTimeUses = MAX_PU_USES; 
    puShieldUses = MAX_PU_USES; 
    shieldActive = false; 

    updateHUD(); // Aplica el nuevo estilo
    
    const gameScreenContent = document.querySelector('#game-screen');
    gameScreenContent.classList.add('hyperspace-jump'); 
    
    loadNewQuestion();
    feedbackMessage.classList.remove('show', 'correct', 'incorrect');
    stopSound(gameOverSound);
    
    if (soundEnabled && !gamePaused) {
        backgroundMusic.play();
    }
}

function loadNewQuestion() {
    optionButtons.forEach(button => {
        button.disabled = true;
        button.classList.remove('correct', 'incorrect'); 
        button.style.visibility = 'visible'; 
    });
    
    clearTimer();

    if (currentQuestionIndex >= questionsPool.length) {
        if (gameMode === 'space') {
            endSpaceMode(true); 
        } else {
            gameOver(true); 
        }
        return;
    }

    const questionData = questionsPool[currentQuestionIndex];
    gameScreen.currentQuestion = questionData; 

    questionText.textContent = questionData.question;

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
    
    updatePowerUpHUD(); 
    // 🛑 Sólo llama a startTimer si NO estamos en modo espacial.
    if (gameMode !== 'space') {
        startTimer(questionData.time); 
    }
}

function checkAnswer(selectedButton, correctAnswer) {
    clearTimer(); 
    optionButtons.forEach(button => button.disabled = true);
    
    const isCorrect = selectedButton.textContent === correctAnswer;
    const questionData = gameScreen.currentQuestion;
    
    if (isCorrect) {
        // --- RESPUESTA CORRECTA ---
        playSound(correctSound);
        selectedButton.classList.add('correct');
        
        currentStreak++; 
        let feedbackText;
        
        if (gameMode === 'space') {
            feedbackText = `¡Acertaste! Racha: ${currentStreak}`;
        } else {
            score += questionData.points;
            feedbackText = `¡Respuesta Correcta! (+${questionData.points} pts)`;

            if (currentStreak >= STREAK_BONUS_THRESHOLD) {
                if (lives < MAX_LIVES) {
                    lives++;
                    feedbackText = `¡Racha (${STREAK_BONUS_THRESHOLD})! ¡+1 Vida Extra!`; 
                } else {
                    score += 10; 
                    feedbackText = `¡Racha Máxima! +10 Puntos de Bonificación`;
                }
                currentStreak = 0; 
            }
        }
        
        feedbackMessage.textContent = feedbackText;
        feedbackMessage.classList.add('show', 'correct');

    } else {
        // --- RESPUESTA INCORRECTA ---
        playSound(incorrectSound);
        selectedButton.classList.add('incorrect');
        
        optionButtons.forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            }
        });
        
        // 🛑 Lógica Específica del Modo Espacial: Game Over inmediato
        if (gameMode === 'space') {
            feedbackMessage.textContent = "¡ERROR! Racha interrumpida.";
            feedbackMessage.classList.add('show', 'incorrect');
            
            setTimeout(() => endSpaceMode(false), 1500); 
            return; 
            
        } else {
            // Lógica de Modos Clásicos
            currentStreak = 0; 
            
            if (shieldActive) {
                shieldActive = false;
                feedbackMessage.textContent = "¡Respuesta Incorrecta! (Escudo Consumido)";
            } else {
                lives--; 
                feedbackMessage.textContent = "¡Respuesta Incorrecta! Pierdes una vida.";
            }
            feedbackMessage.classList.add('show', 'incorrect');
        }
    }

    updateHUD();
    saveHighScore(); 

    currentQuestionIndex++; 

    setTimeout(() => {
        if (lives <= 0 && gameMode !== 'space') {
            gameOver(false); 
        } else if (currentQuestionIndex >= questionsPool.length) {
            if (gameMode === 'space') {
                endSpaceMode(true); 
            } else {
                gameOver(true);
            }
        } else if (gameMode !== 'space' || isCorrect) {
            transitionToNextQuestion(); 
        }
    }, 1500); 
}

function endSpaceMode(completed) {
    stopSound(backgroundMusic);
    clearTimer();
    saveHighScore(); 

    const gameScreenContent = document.querySelector('#game-screen');
    if (gameScreenContent) gameScreenContent.classList.remove('hyperspace-jump', 'fade-out');
    document.body.classList.remove('space-mode-active'); // Limpiar el estilo

    if (finalScoreValueElement) finalScoreValueElement.style.display = 'none';
    if (gameOverHighScoreValueElement && gameOverHighScoreValueElement.parentElement) {
        gameOverHighScoreValueElement.parentElement.style.display = 'none'; 
    }

    const finalTitle = getSpaceTitle(currentStreak);
    const gameOverTitle = document.querySelector('.game-over-title');
    
    if (gameOverTitle) gameOverTitle.textContent = completed ? "¡Misión Cumplida!" : "¡Colisión Estelar!";
    
    if (spaceModeResultMessage) {
        spaceModeResultMessage.style.display = 'block';
        const maxTitleElement = document.getElementById('max-space-title');
        const maxTitle = maxTitleElement ? maxTitleElement.textContent : 'Ninguno';
        
        spaceModeResultMessage.innerHTML = `
            <p class="text-xl mb-2">Racha Final: <span class="text-[#00E5FF] font-extrabold">${currentStreak}</span></p>
            <p class="text-3xl font-extrabold text-purple-400">Título Obtenido: ${finalTitle}</p>
            <p class="text-lg mt-3">Récord de Título: ${maxTitle}</p>
        `;
    }
    
    showScreen(gameOverScreen);
}

function gameOver(completed = false) {
    stopSound(backgroundMusic);
    clearTimer();
    saveHighScore(); 
    
    if (finalScoreValueElement) finalScoreValueElement.style.display = 'block';
    if (gameOverHighScoreValueElement && gameOverHighScoreValueElement.parentElement) {
        gameOverHighScoreValueElement.parentElement.style.display = 'block';
    }
    if (spaceModeResultMessage) spaceModeResultMessage.style.display = 'none'; 

    const gameScreenContent = document.querySelector('#game-screen');
    if (gameScreenContent) gameScreenContent.classList.remove('hyperspace-jump', 'fade-out');
    document.body.classList.remove('space-mode-active'); // Limpiar el estilo

    const gameOverTitle = document.querySelector('.game-over-title');

    if (completed) {
        if (gameOverTitle) gameOverTitle.textContent = "¡Galaxia Completada!";
    } else {
        playSound(gameOverSound);
        if (gameOverTitle) gameOverTitle.textContent = "¡Viaje Interrumpido!";
    }
    
    if (finalScoreValueElement) finalScoreValueElement.textContent = score;
    if (gameOverHighScoreValueElement) gameOverHighScoreValueElement.textContent = highScore; 
    showScreen(gameOverScreen);
}


function togglePause() {
    if (gameScreen && gameScreen.classList.contains('active')) {
        gamePaused = true;
        // 🛑 Sólo borra el timer si no es modo espacial
        if (gameMode !== 'space') clearTimer();
        
        stopSound(backgroundMusic);
        updatePowerUpHUD();
        showScreen(pauseMenu);
    } else if (pauseMenu && pauseMenu.classList.contains('active')) {
        gamePaused = false;
        // 🛑 Sólo reinicia el timer si no es modo espacial
        loadNewQuestion(); 
        
        if (soundEnabled) {
            backgroundMusic.play();
        }
        updatePowerUpHUD();
        showScreen(gameScreen);
    }
}


// --- Event Listeners ---
if (startButton) startButton.addEventListener('click', () => {
    showScreen(modeSelectionMenu);
});

if (easyModeButton) easyModeButton.addEventListener('click', () => {
    showScreen(gameScreen);
    resetGame('easy');
});

if (hardModeButton) hardModeButton.addEventListener('click', () => {
    showScreen(gameScreen);
    resetGame('hard');
});

if (spaceModeButton) spaceModeButton.addEventListener('click', () => {
    showScreen(gameScreen);
    resetGame('space');
});

if (backToStartButton) backToStartButton.addEventListener('click', () => {
    stopSound(backgroundMusic);
    clearTimer();
    document.body.classList.remove('space-mode-active'); // Limpiar el estilo
    showScreen(startMenu);
    loadHighScore(); 
});

if (pauseButton) pauseButton.addEventListener('click', togglePause);
if (soundToggleButton) soundToggleButton.addEventListener('click', toggleSound);

if (resumeButton) resumeButton.addEventListener('click', togglePause);

if (restartFromPauseButton) restartFromPauseButton.addEventListener('click', () => {
    showScreen(gameScreen);
    resetGame(gameMode);
});

if (quitButton) quitButton.addEventListener('click', () => {
    stopSound(backgroundMusic);
    clearTimer();
    document.body.classList.remove('space-mode-active'); // Limpiar el estilo
    showScreen(startMenu);
    loadHighScore(); 
});

if (playAgainButton) playAgainButton.addEventListener('click', () => {
    showScreen(modeSelectionMenu); 
});

if (backToMenuButton) backToMenuButton.addEventListener('click', () => {
    stopSound(backgroundMusic);
    clearTimer();
    document.body.classList.remove('space-mode-active'); // Limpiar el estilo
    showScreen(startMenu);
    loadHighScore(); 
});

// --- Event Listeners de Power-ups (solo activos en modos clásicos) ---
if (pu5050Button) pu5050Button.addEventListener('click', activate5050);
if (puTimeButton) puTimeButton.addEventListener('click', activateTimeBoost);
if (puShieldButton) puShieldButton.addEventListener('click', activateShield);


// --- Inicialización del Juego ---
document.addEventListener('DOMContentLoaded', () => {
    showScreen(loadingScreen); 
    loadHighScore(); 
    
    const storedSoundPref = localStorage.getItem('triviaGalacticaSound');
    if (storedSoundPref !== null) {
        soundEnabled = (storedSoundPref === 'true');
    }
    const soundIconOn = document.getElementById('sound-icon-on');
    const soundIconOff = document.getElementById('sound-icon-off');
    if (!soundEnabled) {
        if (soundIconOn) soundIconOn.style.display = 'none';
        if (soundIconOff) soundIconOff.style.display = 'block';
    }

    setTimeout(() => {
        showScreen(startMenu);
        if (soundEnabled) {
             backgroundMusic.play().catch(e => console.log("Música iniciada en el menú, necesita interacción:", e));
        }
    }, 1000); 
});