// --- VARIABLES DE LOS DIALES ---

// Seleccionamos los elementos del HTML que vamos a usar
const apertureDial = document.getElementById('aperture-dial');
const dialValue = apertureDial.querySelector('.dial-value');

const shutterDial = document.getElementById('shutter-dial');
const shutterValue = shutterDial.querySelector('.dial-value');

const isoDial = document.getElementById('iso-dial');
const isoValue = isoDial.querySelector('.dial-value');

const focusDial = document.getElementById('focus-dial');

// Variables para rastrear el estado de los diales
let isDragging = false;
let startAngle = 0;
let currentRotation = 0;

let isShutterDragging = false;
let shutterStartAngle = 0;
let shutterCurrentRotation = 0;

let isIsoDragging = false;
let isoStartAngle = 0;
let isoCurrentRotation = 0;

let isFocusDragging = false;
let focusStartAngle = 0;
let focusCurrentRotation = 0;

// Función para calcular el ángulo (reutilizamos la misma)
function getAngle(event, element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    return angle * (180 / Math.PI) + 90;
}

// --- LÓGICA DEL DIAL DE APERTURA ---
apertureDial.addEventListener('mousedown', function(event) {
    isDragging = true;
    startAngle = getAngle(event, apertureDial);
    currentRotation = parseFloat(apertureDial.style.transform?.match(/rotate\(([^)]+)\)/)?.[1] || 0);
    event.preventDefault();
});

document.addEventListener('mousemove', function(event) {
    if (!isDragging) return;

    const currentAngle = getAngle(event, apertureDial);
    let rotation = currentAngle - startAngle + currentRotation;

    rotation = Math.max(-180, Math.min(180, rotation));

    apertureDial.style.transform = `rotate(${rotation}deg)`;

    const apertureValues = ['f/1.8', 'f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11', 'f/16'];
    const index = Math.round((rotation + 180) / (360 / apertureValues.length));
    const clampedIndex = Math.max(0, Math.min(apertureValues.length - 1, index));
    dialValue.textContent = apertureValues[clampedIndex];
    currentAperture = apertureValues[clampedIndex]; // Guarda el valor actual
});

document.addEventListener('mouseup', function() {
    isDragging = false;
});

// --- LÓGICA DEL DIAL DE VELOCIDAD ---
shutterDial.addEventListener('mousedown', function(event) {
    isShutterDragging = true;
    shutterStartAngle = getAngle(event, shutterDial);
    shutterCurrentRotation = parseFloat(shutterDial.style.transform?.match(/rotate\(([^)]+)\)/)?.[1] || 0);
    event.preventDefault();
});

document.addEventListener('mousemove', function(event) {
    if (!isShutterDragging) return;

    const currentAngle = getAngle(event, shutterDial);
    let rotation = currentAngle - shutterStartAngle + shutterCurrentRotation;

    rotation = Math.max(-180, Math.min(180, rotation));

    shutterDial.style.transform = `rotate(${rotation}deg)`;

    const shutterValues = ['1/8', '1/15', '1/30', '1/60', '1/125', '1/250', '1/500', '1/1000'];
    const index = Math.round((rotation + 180) / (360 / shutterValues.length));
    const clampedIndex = Math.max(0, Math.min(shutterValues.length - 1, index));
    shutterValue.textContent = shutterValues[clampedIndex];
    currentShutter = shutterValues[clampedIndex]; // Guarda el valor actual
});

document.addEventListener('mouseup', function() {
    isShutterDragging = false;
});

// --- LÓGICA DEL DIAL DE ISO ---
isoDial.addEventListener('mousedown', function(event) {
    isIsoDragging = true;
    isoStartAngle = getAngle(event, isoDial);
    isoCurrentRotation = parseFloat(isoDial.style.transform?.match(/rotate\(([^)]+)\)/)?.[1] || 0);
    event.preventDefault();
});

document.addEventListener('mousemove', function(event) {
    if (!isIsoDragging) return;

    const currentAngle = getAngle(event, isoDial);
    let rotation = currentAngle - isoStartAngle + isoCurrentRotation;

    rotation = Math.max(-180, Math.min(180, rotation));

    isoDial.style.transform = `rotate(${rotation}deg)`;

    const isoValues = ['100', '200', '400', '800', '1600', '3200'];
    const index = Math.round((rotation + 180) / (360 / isoValues.length));
    const clampedIndex = Math.max(0, Math.min(isoValues.length - 1, index));
    isoValue.textContent = isoValues[clampedIndex];
    currentIso = isoValues[clampedIndex]; // Guarda el valor actual
});

document.addEventListener('mouseup', function() {
    isIsoDragging = false;
});

// --- LÓGICA DEL DIAL DE ENFOQUE ---
focusDial.addEventListener('mousedown', function(event) {
    isFocusDragging = true;
    focusStartAngle = getAngle(event, focusDial);
    focusCurrentRotation = parseFloat(focusDial.style.transform?.match(/rotate\(([^)]+)\)/)?.[1] || 0);
    event.preventDefault();
});

document.addEventListener('mousemove', function(event) {
    if (!isFocusDragging) return;

    const currentAngle = getAngle(event, focusDial);
    let rotation = currentAngle - focusStartAngle + focusCurrentRotation;

    rotation = Math.max(-180, Math.min(180, rotation));

    focusDial.style.transform = `rotate(${rotation}deg)`;
});

document.addEventListener('mouseup', function() {
    isFocusDragging = false;
});


// --- VARIABLES DE AJUSTES ACTUALES Y LÓGICA DEL JUEGO ---

// Variables para guardar los ajustes actuales del usuario
let currentAperture = 'f/4.5';
let currentShutter = '1/125';
let currentIso = '200';
let currentFocus = 'niña'; // Valor por defecto

// 1. Definir los ajustes ideales para cada escena
const idealSettings = {
    'nina_palomas.jpg': {
        aperture: 'f/4.5',
        shutter: '1/80',
        iso: '200',
        focus: 'niña'
    },
    'mariposa.jpg': {
        aperture: 'f/2.8',
        shutter: '1/250',
        iso: '100',
        focus: 'flores'
    },
    'perro_catedral.jpg': {
        aperture: 'f/8',
        shutter: '1/125',
        iso: '100',
        focus: 'perro'
    },
    'estatua.jpg': {
        aperture: 'f/5.6',
        shutter: '1/30',
        iso: '800',
        focus: 'rostro'
    }
};

// 2. Definir los consejos para cada escena
const sceneAdvice = {
    'nina_palomas.jpg': 'Consejo: Para capturar el movimiento de las palomas con un efecto de barrido, usa una velocidad de obturación más lenta (como 1/80s) mientras mantienes a la niña nítida.',
    'mariposa.jpg': 'Consejo: En macrofotografía, una apertura grande (f/2.8) es clave para aislar al sujeto (la mariposa) del fondo y crear un bokeh hermoso.',
    'perro_catedral.jpg': 'Consejo: Para una foto de paisaje urbano, una apertura más pequeña (f/8) te dará una mayor profundidad de campo, asegurando que tanto el perro como la catedral estén nítidos.',
    'estatua.jpg': 'Consejo: En escenas con poca luz, como esta, es normal subir el ISO (a 800) para capturar la luz de la ventana sin que la imagen quede oscura.'
};

// 3. Guardar y cargar el progreso del usuario
let userProgress = JSON.parse(localStorage.getItem('cameraSimulatorProgress')) || {
    'nina_palomas.jpg': false,
    'mariposa.jpg': false,
    'perro_catedral.jpg': false,
    'estatua.jpg': false
};

function saveProgress() {
    localStorage.setItem('cameraSimulatorProgress', JSON.stringify(userProgress));
}

function updateProgressUI() {
    for (const scene in userProgress) {
        const iconElement = document.getElementById(`progress-${scene.split('.')[0]}`);
        if (iconElement) {
            if (userProgress[scene]) {
                iconElement.classList.add('completed');
                iconElement.innerHTML = '⭐'; // Emoji de estrella
            } else {
                iconElement.classList.remove('completed');
                iconElement.innerHTML = '';
            }
        }
    }
}

// 4. Lógica del botón de disparar
const shootButton = document.getElementById('shoot-button');
const adviceText = document.getElementById('advice-text');

shootButton.addEventListener('click', function() {
    // Obtenemos el nombre del archivo de la imagen actual
    const currentSceneImage = document.getElementById('scene-image');
    const sceneSrc = currentSceneImage.src.split('/').pop(); // Ej: 'nina_palomas.jpg'

    // Obtenemos los ajustes ideales para la escena actual
    const sceneIdealSettings = idealSettings[sceneSrc];

    if (!sceneIdealSettings) {
        adviceText.textContent = 'Por favor, selecciona una escena primero.';
        return;
    }

    // --- LÓGICA DE RETROALIMENTACIÓN DETALLADA ---
    let feedbackDetails = [];
    let correctCount = 0;

    // Creamos una lista de los ajustes que vamos a comprobar
    const settingsToCheck = [
        { user: currentAperture, ideal: sceneIdealSettings.aperture, name: 'Apertura' },
        { user: currentShutter, ideal: sceneIdealSettings.shutter, name: 'Velocidad' },
        { user: currentIso, ideal: sceneIdealSettings.iso, name: 'ISO' }
    ];

    // Recorremos la lista para comparar y generar el feedback
    settingsToCheck.forEach(setting => {
        if (setting.user === setting.ideal) {
            feedbackDetails.push(`✅ ${setting.name}: Correcto`);
            correctCount++;
        } else {
            feedbackDetails.push(`❌ ${setting.name}: Intenta "${setting.ideal}"`);
        }
    });

    // Generamos el mensaje principal basado en cuántos acertó
    let mainFeedback = '';
    if (correctCount === settingsToCheck.length) {
        mainFeedback = '¡Perfecto! Has capturado la escena ideal.';
        // Marca la escena como completada
        userProgress[sceneSrc] = true;
        saveProgress();
        updateProgressUI();
    } else if (correctCount >= 1) {
        mainFeedback = 'Casi... ¡inténtalo de nuevo!';
    } else {
        mainFeedback = 'Sigue practicando. Revisa los consejos.';
    }

    // Combinamos el mensaje principal con los detalles
    const finalFeedback = `${mainFeedback}\n\n${feedbackDetails.join('\n')}`;

    // Mostramos el mensaje en la pantalla
    adviceText.textContent = finalFeedback;
});

// 5. Lógica del selector de escenas
const sceneSelector = document.getElementById('scene-selector');

sceneSelector.addEventListener('change', function() {
    // Obtenemos el valor seleccionado (el nombre del archivo de la imagen)
    const selectedScene = this.value;
    const sceneImage = document.getElementById('scene-image');

    // Cambiamos la imagen en la vista previa
    sceneImage.src = selectedScene;

    // --- RESETEAR LOS AJUSTES A UN ESTADO POR DEFECTO ---
    currentAperture = 'f/4.5';
    currentShutter = '1/125';
    currentIso = '400';
    currentFocus = 'medio';

    // 2. Reseteamos la visualización de los diales
    apertureDial.style.transform = 'rotate(0deg)';
    dialValue.textContent = currentAperture;

    shutterDial.style.transform = 'rotate(0deg)';
    shutterValue.textContent = currentShutter;

    isoDial.style.transform = 'rotate(0deg)';
    isoValue.textContent = currentIso;

    focusDial.style.transform = 'rotate(0deg)'; // Las guías se resetean visualmente

    // 3. Reseteamos el texto de retroalimentación y mostramos el consejo
    adviceText.textContent = sceneAdvice[selectedScene];
});

// 6. Lógica del botón de reiniciar progreso
const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', function() {
    if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso? Esta acción no se puede deshacer.')) {
        userProgress = {
            'nina_palomas.jpg': false,
            'mariposa.jpg': false,
            'perro_catedral.jpg': false,
            'estatua.jpg': false
        };
        saveProgress();
        updateProgressUI();
        adviceText.textContent = '¡Progreso reiniciado! Ahora puedes empezar de nuevo.';
    }
});

// --- INICIALIZACIÓN DE LA APLICACIÓN ---
updateProgressUI(); // Carga el progreso guardado al iniciar la app