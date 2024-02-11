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
  var preguntasContainer = document.getElementById("preguntas-container");

  preguntas.forEach(function(pregunta, index) {
    var preguntaElemento = document.createElement("div");
    preguntaElemento.className = "pregunta";
    preguntaElemento.innerText = pregunta.pregunta;

    var opcionesElemento = document.createElement("div");
    opcionesElemento.className = "opciones";

    pregunta.opciones.forEach(function(opcion, opcionIndex) {
      var radioBtn = document.createElement("input");
      radioBtn.type = "radio";
      radioBtn.name = "respuesta" + (index + 1);
      radioBtn.value = opcion.split(" ")[0];
      radioBtn.id = "opcion" + (index + 1) + "-" + opcionIndex;

      var label = document.createElement("label");
      label.innerHTML = opcion;
      label.setAttribute("for", "opcion" + (index + 1) + "-" + opcionIndex);

      opcionesElemento.appendChild(radioBtn);
      opcionesElemento.appendChild(label);
    });

    preguntasContainer.appendChild(preguntaElemento);
    preguntasContainer.appendChild(opcionesElemento);
  });
}

function verificarRespuestas() {
  var puntaje = 0;
  var respuestas = {};

  preguntas.forEach(function(pregunta, index) {
    var opciones = document.getElementsByName("respuesta" + (index + 1));
    var respuestaUsuario = "";

    opciones.forEach(function(opcion) {
      if (opcion.checked) {
        respuestaUsuario = parseInt(opcion.value);
        puntaje += respuestaUsuario;
        respuestas[pregunta.pregunta] = opcion.nextSibling.textContent;
      }
    });
  });

  mostrarResultado(puntaje);
  guardarRespuestasLocalStorage(respuestas);
}

function mostrarResultado(puntaje) {
  var resultadoElemento = document.getElementById("resultado");
  resultadoElemento.style.fontWeight = "bold";
  resultadoElemento.style.color = "green";
  resultadoElemento.innerText = "Puntaje final: " + puntaje + " de 15";
}

function guardarRespuestasLocalStorage(respuestas) {
  localStorage.setItem('encuestaRespuestas', JSON.stringify(respuestas));
}

function cargarRespuestasLocalStorage() {
  var respuestas = localStorage.getItem('encuestaRespuestas');
  if (respuestas) {
    respuestas = JSON.parse(respuestas);
    console.log("Respuestas almacenadas:", respuestas);
  } else {
    console.log("No hay respuestas almacenadas.");
  }
}

mostrarPreguntas();

cargarRespuestasLocalStorage();