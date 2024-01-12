
var preguntas = [
  {
    pregunta: "¿Cómo calificaría la calidad del servicio recibido?",
    opciones: ["1 - Mala", "2 - Regular", "3 - Buena"],
  },
  {
    pregunta: "¿Con qué frecuencia utiliza nuestros productos/servicios?",
    opciones: ["1 - Raramente", "2 - Ocasionalmente", "3 - Frecuentemente"],
  },
  {
    pregunta: "¿Recomendaría nuestros productos/servicios a otras personas?",
    opciones: ["1 - No lo recomendaría", "2 - Tal vez lo recomendaría", "3 - Definitivamente lo recomendaría"],
  },
  {
    pregunta: "¿Cómo valora la amabilidad del personal?",
    opciones: ["1 - Poco amable", "2 - Amable", "3 - Muy amable"],
  },
  {
    pregunta: "¿Qué tan satisfecho/a está con la rapidez del servicio?",
    opciones: ["1 - Insatisfecho/a", "2 - Satisfecho/a", "3 - Muy satisfecho/a"],
  }
];

function mostrarPreguntas() {
  preguntas.forEach(function(pregunta, index) {
    var preguntaElemento = document.getElementById("pregunta" + (index + 1));
    var opcionesElemento = document.getElementById("opciones" + (index + 1));

    preguntaElemento.innerText = pregunta.pregunta;

    pregunta.opciones.forEach(function(opcion, opcionIndex) {
      var radioBtn = document.createElement("input");
      radioBtn.type = "radio";
      radioBtn.name = "respuesta" + (index + 1);
      radioBtn.value = opcion.split(" ")[0]; // Obtener el número del inicio de la opción
      radioBtn.id = "opcion" + (index + 1) + "-" + opcionIndex;

      var label = document.createElement("label");
      label.innerHTML = opcion;
      label.setAttribute("for", "opcion" + (index + 1) + "-" + opcionIndex);

      opcionesElemento.appendChild(radioBtn);
      opcionesElemento.appendChild(label);
    });
  });
}

function verificarRespuestas() {
  var todasLasRespuestasSeleccionadas = true;
  var puntaje = 0;

  preguntas.forEach(function(pregunta, index) {
    var opciones = document.getElementsByName("respuesta" + (index + 1));
    var respuestaUsuario = "";

    var alMenosUnaSeleccionada = false;

    opciones.forEach(function(opcion) {
      if (opcion.checked) {
        respuestaUsuario = parseInt(opcion.value); // Convertir a número
        alMenosUnaSeleccionada = true;
      }
    });

    if (!alMenosUnaSeleccionada) {
      todasLasRespuestasSeleccionadas = false;
      return;
    }

    puntaje += respuestaUsuario;
  });

  if (!todasLasRespuestasSeleccionadas) {
    alert("Por favor, seleccione una opción en cada pregunta.");
    return;
  }

  var resultadoElemento = document.getElementById("resultado");
  resultadoElemento.style.fontWeight = "bold";
  resultadoElemento.style.color = "green";
  resultadoElemento.innerText = "Puntaje final: " + puntaje + " de 15";

  // Desactivar el botón después de verificar
  document.getElementById("verificarBtn").disabled = true;
}

// Mostrar todas las preguntas al cargar la página
mostrarPreguntas();