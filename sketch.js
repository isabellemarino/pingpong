// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 25;
let raioBolinha = dBolinha / 2;

// variáveis de movimento
let velXBolinha = 6;
let velYBolinha = 6;

// variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 90;

//variáveis da raquete do oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 150;
let velYRaqueteOponente;

let chanceDeErrar = 0;

//variáveis de pontos
let meusPontos = 0;
let pontosOponente = 0;

// variáveis de som
let trilhaSonora;
let raquetada;
let pontos;

let colidiu = false;

function preload() {
  trilhaSonora = loadSound("trilha.mp3");
  pontos = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}
function setup() {
  createCanvas(600, 400);
  trilhaSonora.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  colisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentoRaquete();
  //colisaoRaquete();
  movimentoRaqueteOponente();
  //colisaoBibliotecaOponente();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostrarPlacar();
  marcarPontos();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, dBolinha);
}

function movimentaBolinha() {
  xBolinha += velXBolinha;
  yBolinha += velYBolinha;
}

function colisaoBorda() {
  if (xBolinha + raioBolinha > width || xBolinha - raioBolinha < 0) {
    velXBolinha *= -1;
  }

  if (yBolinha + raioBolinha > height || yBolinha - raioBolinha < 0) {
    velYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, wRaquete, hRaquete);
}

function movimentoRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

//function colisaoRaquete(){
//  if (xBolinha - raioBolinha < xRaquete + wRaquete && yBolinha - raioBolinha < yRaquete + hRaquete && yBolinha + raioBolinha > yRaquete){
//      velXBolinha *= -1;
//   }

//}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    wRaquete,
    hRaquete,
    xBolinha,
    yBolinha,
    raioBolinha
  );

  if (colidiu) {
    velXBolinha *= -1;
    raquetada.play();
  }
}

function movimentoRaqueteOponente() {
  velYRaqueteOponente = yBolinha - yRaqueteOponente - wRaquete / 2 - 50;
  yRaqueteOponente += velYRaqueteOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1;

    if (chanceDeErrar >= 39) {
      chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35;
    }
  }
}

function mostrarPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(0, 0, 255));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(0, 0, 255));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcarPontos() {
  if (xBolinha > 585) {
    meusPontos += 1;
    pontos.play();
  }

  if (xBolinha < 15) {
    pontosOponente += 1;
    pontos.play();
  }
}
