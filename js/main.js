// 1. BASE DE DATOS DE PREGUNTAS
// 'correcta' es el índice de la respuesta en el array (0, 1, 2 o 3)
const PREGUNTAS = [
    {
        pregunta: "¿En qué videojuego hizo su primera aparición Mario (como Jumpman)?",
        respuestas: ["Super Mario Bros", "Donkey Kong", "Mario Bros", "Pong"],
        correcta: 1 
    },
    {
        pregunta: "¿Cuál es el videojuego más vendido creado por un ingeniero soviético?",
        respuestas: ["Pac-Man", "Minecraft", "Space Invaders", "Tetris"],
        correcta: 3
    },
    {
        pregunta: "¿Qué consola introdujo el stick analógico con Super Mario 64?",
        respuestas: ["Super Nintendo", "GameCube", "Nintendo 64", "Wii"],
        correcta: 2
    },
    {
        pregunta: "¿Qué Final Fantasy popularizó los RPG en Occidente?",
        respuestas: ["Final Fantasy VI", "Final Fantasy VII", "Final Fantasy X", "Final Fantasy XV"],
        correcta: 1
    },
    {
        pregunta: "¿Quién es el creador de la saga Metal Gear?",
        respuestas: ["Shigeru Miyamoto", "Hideo Kojima", "Shinji Mikami", "Todd Howard"],
        correcta: 1
    },
    {
        pregunta: "¿En qué ciudad se desarrollan los primeros Resident Evil?",
        respuestas: ["Silent Hill", "Liberty City", "Vice City", "Raccoon City"],
        correcta: 3
    },
    {
        pregunta: "¿Qué FPS de 1993 revolucionó el género?",
        respuestas: ["Quake", "Half-Life", "DOOM", "Wolfenstein 3D"],
        correcta: 2
    },
    {
        pregunta: "¿Qué Zelda de N64 es considerado uno de los mejores juegos de la historia?",
        respuestas: ["Ocarina of Time", "Majora's Mask", "Breath of the Wild", "Wind Waker"],
        correcta: 0
    },
    {
        pregunta: "¿Qué saga de Rockstar tiene el producto de entretenimiento más rentable?",
        respuestas: ["Red Dead Redemption", "Grand Theft Auto", "Max Payne", "Bully"],
        correcta: 1
    },
    {
        pregunta: "¿Qué juego de bloques fue creado por Markus 'Notch' Persson?",
        respuestas: ["Roblox", "Minecraft", "Terraria", "LEGO Worlds"],
        correcta: 1
    }
];

// 2. VARIABLES ESTADO
let preguntaActual = 0;
let puntuacion = 0;

// 3. FUNCIONES DEL JUEGO

// Iniciar o Reiniciar el juego
function iniciarJuego() {
    preguntaActual = 0;
    puntuacion = 0;
    document.getElementById('juego-container').classList.remove('oculto');
    document.getElementById('resultados-container').classList.add('oculto');
    mostrarPregunta();
}

// Mostrar la pregunta actual y actualizar barras
function mostrarPregunta() {
    // Resetear feedback previo
    document.getElementById('feedback').classList.add('oculto');
    document.getElementById('feedback-texto').innerText = "";
    
    // Obtener datos de la pregunta
    const datos = PREGUNTAS[preguntaActual];
    
    // 1. Actualizar textos
    document.getElementById('pregunta').innerText = datos.pregunta;
    document.getElementById('texto-progreso').innerText = `Pregunta ${preguntaActual + 1} de ${PREGUNTAS.length}`;
    
    // 2. Actualizar barra de progreso (Ancho en %)
    const porcentajeBarra = ((preguntaActual + 1) / PREGUNTAS.length) * 100;
    document.getElementById('barra-progreso').style.width = `${porcentajeBarra}%`;

    // 3. Generar botones de respuesta
    const contenedorOpciones = document.getElementById('opciones-container');
    contenedorOpciones.innerHTML = ""; // Limpiar anteriores

    datos.respuestas.forEach((respuesta, index) => {
        const boton = document.createElement('button');
        boton.classList.add('btn-opcion');
        boton.innerText = respuesta;
        // Al hacer click, llamamos a la función de verificar pasando el índice elegido
        boton.onclick = () => verificarRespuesta(index, boton);
        contenedorOpciones.appendChild(boton);
    });
}

// Verificar si acertó o falló
function verificarRespuesta(indiceElegido, botonClickado) {
    const datos = PREGUNTAS[preguntaActual];
    const botones = document.querySelectorAll('.btn-opcion');
    const feedbackBox = document.getElementById('feedback');
    const feedbackTexto = document.getElementById('feedback-texto');

    // Deshabilitar todos los botones para que no pulse más
    botones.forEach(btn => btn.disabled = true);

    if (indiceElegido === datos.correcta) {
        // ACIERTO
        botonClickado.classList.add('correcto');
        feedbackTexto.innerText = "¡Correcto! ✅";
        feedbackTexto.style.color = "green";
        puntuacion++;
    } else {
        // FALLO
        botonClickado.classList.add('incorrecto');
        feedbackTexto.innerText = "¡Incorrecto! ❌";
        feedbackTexto.style.color = "red";
        
        // Iluminar la correcta para que aprenda
        botones[datos.correcta].classList.add('correcto');
    }

    // Mostrar el botón de siguiente
    feedbackBox.classList.remove('oculto');
}

// Pasar a la siguiente o terminar
function siguientePregunta() {
    preguntaActual++;

    if (preguntaActual < PREGUNTAS.length) {
        mostrarPregunta();
    } else {
        mostrarResultados();
    }
}

// Pantalla final
function mostrarResultados() {
    document.getElementById('juego-container').classList.add('oculto');
    document.getElementById('resultados-container').classList.remove('oculto');

    // Cálculos
    const porcentaje = (puntuacion / PREGUNTAS.length) * 100;
    let mensaje = "";

    if (puntuacion <= 4) {
        mensaje = "Necesitas repasar más 📚";
    } else if (puntuacion <= 7) {
        mensaje = "¡Bien hecho! Vas por buen camino 👍";
    } else {
        mensaje = "¡Excelente! Dominas el tema 🏆";
    }

    // Insertar datos en HTML
    document.getElementById('puntuacion-final').innerText = `${puntuacion} de ${PREGUNTAS.length} respuestas correctas`;
    document.getElementById('porcentaje').innerText = `Porcentaje de aciertos: ${porcentaje}%`;
    document.getElementById('mensaje-resultado').innerText = mensaje;
}

// Función para el botón reiniciar (simplemente llama a iniciar de nuevo)
function reiniciarJuego() {
    iniciarJuego();
}

// Arrancar al cargar la página
window.onload = iniciarJuego;