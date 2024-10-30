const simbolos = ['🍎', '🍊', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍' ]; 
let cartas = [...simbolos, ...simbolos]; 
cartas = cartas.sort(() => 0.5 - Math.random()); 

let cartaVolteada = false;
let primeraCarta, segundaCarta;
let bloqueoTablero = false; 

const tablero = document.getElementById('tablero');

cartas.forEach(simbolo => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.simbolo = simbolo; 
    carta.addEventListener('click', voltearCarta);
    tablero.appendChild(carta);
});

function voltearCarta() {
    if (bloqueoTablero) return; 
    if (this === primeraCarta) return; 
    this.classList.add('volteada');
    this.textContent = this.dataset.simbolo; 
    if (!cartaVolteada) {
        cartaVolteada = true;
        primeraCarta = this;
    } else {
        cartaVolteada = false;
        segundaCarta = this;

        verificarPareja();
    }
}

function verificarPareja() {
    let esPareja = primeraCarta.dataset.simbolo === segundaCarta.dataset.simbolo;

    esPareja ? deshabilitarCartas() : desvoltearCartas();
}

function deshabilitarCartas() {
    primeraCarta.removeEventListener('click', voltearCarta);
    segundaCarta.removeEventListener('click', voltearCarta);
    resetearTablero();
}

function desvoltearCartas() {
    bloqueoTablero = true;

    setTimeout(() => {
        primeraCarta.classList.remove('volteada');
        segundaCarta.classList.remove('volteada');
        primeraCarta.textContent = '';
        segundaCarta.textContent = '';

        resetearTablero();
    }, 1000);
}

function resetearTablero() {
    [cartaVolteada, bloqueoTablero] = [false, false];
    [primeraCarta, segundaCarta] = [null, null];
}
