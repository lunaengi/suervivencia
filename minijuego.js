//js
let vida = 5;
let miembros = 3;
let mochila = [];

const texto = document.getElementById('texto');
const opciones = document.getElementById('opciones');
const vidaDisplay = document.getElementById('vida');
const miembrosDisplay = document.getElementById('miembros');
const mochilaDisplay = document.getElementById('mochila');

function actualizarStats() {
  vidaDisplay.textContent = vida;
  miembrosDisplay.textContent = miembros;
  mochilaDisplay.textContent = JSON.stringify(mochila);
}

function mostrarEscenario(descripcion, botones) {
  texto.textContent = descripcion;
  opciones.innerHTML = '';
  botones.forEach(({ texto, efecto }) => {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.onclick = () => {
      efecto();
      actualizarStats();
    };
    opciones.appendChild(btn);
  });
}

function Bienvenida() {
  mostrarEscenario("Te despiertas entre escombros. El cielo es rojo, y la ciudad está en ruinas...", [
    {
      texto: "Empezar Aventura",
      efecto: () => {
        escenario1();
      },
    }
  ]);
}

// 1 decisión
function escenario1() {
  mostrarEscenario("¿Dónde buscar recursos vitales?", [
    {
      texto: "Ir al supermercado abandonado",
      efecto: () => {
        mochila.push("comida", "agua");
        vida--;
        escenario2();
      },
    },
    {
      texto: "Robar mochila a un sobreviviente",
      efecto: () => {
        mochila.push("linterna");
        miembros--;
        escenario2();
      },
    }
  ]);
}

// Segunda decisión
function escenario2() {
  mostrarEscenario("Necesitan un lugar seguro. ¿Dónde refugiarse?", [
    {
      texto: "Farmacia",
      efecto: () => {
        mochila.push("botiquin");
        vida++;
        escenario3();
      }
    },
    {
      texto: "Estación de buses",
      efecto: () => {
        vida--;
        escenario3();
      }
    },
    {
      texto: "Tienda de campaña abandonada",
      efecto: () => {
        mochila.push("bateria");
        vida--;
        escenario3();
      }
    }
  ]);
}

// Tercera decisión
function escenario3() {
  mostrarEscenario("Escuchan gritos desde un callejón...", [
    {
      texto: "Ayudar a la familia",
      efecto: () => {
        miembros++;
        mochila.push("mapa");
        escenario4();
      }
    },
    {
      texto: "Ignorar y seguir",
      efecto: () => {
        miembros--;
        escenario4();
      }
    },
    {
      texto: "Liberarlos a distancia",
      efecto: () => {
        mochila.push("linterna");
        vida--;
        escenario4();
      }
    },
    {
      texto: "Robar sus recursos",
      efecto: () => {
        mochila.push("comida");
        miembros -= 2;
        escenario4();
      }
    }
  ]);
}

// Cuarta decisión
function escenario4() {
  mostrarEscenario("Ves una columna de humo a lo lejos...", [
    {
      texto: "Investigar la señal",
      efecto: () => {
        mochila.push("llave", "gasolina");
        escenario5();
      }
    },
    {
      texto: "Evitar la zona",
      efecto: () => {
        escenario5();
      }
    }
  ]);
}

// Quinta decisión
function escenario5() {
  mostrarEscenario("¿Cómo moverse?", [
    {
      texto: "Subir a un edificio",
      efecto: () => {
        mochila.push("intel");
        escenario6();
      }
    },
    {
      texto: "Moverse por callejones",
      efecto: () => {
        vida--;
        escenario6();
      }
    },
    {
      texto: "Entrar por alcantarilla",
      efecto: () => {
        mochila.push("tarjeta-acceso");
        escenario6();
      }
    }
  ]);
}

// Sexta decisión
function escenario6() {
  mostrarEscenario("Debes decidir cómo moverte rápidamente antes del anochecer...", [
    {
      texto: "Reparar una bicicleta",
      efecto: () => {
        mochila.push("medicinas", "bateria");
        finDelJuego();
      }
    },
    {
      texto: "Ir a pie",
      efecto: () => {
        vida--;
        finDelJuego();
      }
    }
  ]);
}

// Evaluación final
function finDelJuego() {
  let resultado;
  const tieneMapa = mochila.includes("mapa");
  if (vida >= 3 && mochila.length >= 2 && tieneMapa) {
    resultado = "✅ Han logrado llegar al túnel del metro. <<Comienza una nueva etapa de supervivencia bajo tierra.>> ¡Chiiiiijuuu!";
  } else {
    resultado = "❌ ¡Oh rayos! no cumplieron los requisitos. <<La ciudad los atrapa... y desaparecen entre las ruinas.>>";
  }


  mostrarEscenario(resultado, [
    {
      texto: "Reiniciar juego",
      efecto: () => {
        vida = 5;
        miembros = 3;
        mochila = [];
        escenario1();
      }
    }
  ]);
}

// Iniciar juego
actualizarStats();
escenario1();
