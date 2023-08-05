//Posicao da bolinha
let xBolinha =  250;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2

//variavéis raquete
let xRaq = 5
let yRaq = 160
let wRaq = 5
let hRaq = 80

//velocidade da Bolinha
let vehX = 5;
let vehY = 4;

//Posição da Raquete do oponente
let xRaqOP = 490;
let yRaqOP = 160;
let vehYOP;

let colide = false;

//variaveis do placar
let pnts = 0;
let pntsOP = 0;

//variaveis dos sons
let pontoSom;
let raqueteSom;


function setup() {
  createCanvas(500, 400);
}

function draw() {
  background(0);
  mostraBolinha();
  velocidadeBolinha();
  colisaoBolinha();
  mostraRaquete(xRaq,yRaq);
  mostraRaquete(xRaqOP,yRaqOP);
  movimentaRaquete();
  colidiuBiblioteca(xRaq, yRaq);
  colidiuBiblioteca(xRaqOP, yRaqOP);
  movimentaOponente();
  funcionaPlacar();
  bolinhaBug();
  limiteRaq();
  
  
  //verificaColisao();
  //Essa função verifica a colisão a partir de um teste lógico, sem biblioteca.
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
  }

function velocidadeBolinha(){
  xBolinha += vehX;
  yBolinha += vehY;
}

function colisaoBolinha() {
  if (xBolinha + raio > width || 
      xBolinha - raio < 0) {
        vehX *= -1
  }
  if (yBolinha + raio > height ||
      yBolinha - raio < 0) {
        vehY *= -1
  }
}
function mostraRaquete(x,y) {
  rect(x,y,wRaq,hRaq)
}
function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yRaq -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaq += 5;
  }
}

function limiteRaq() {
  if (yRaq >= height-75) {
    yRaq -= 5;
  }
  if (yRaq <= 0) {
    yRaq += 5;
  }
  if (yRaqOP <= 0) {
    yRaqOP -= vehYOP;
  }
}

function verificaColisao() {
  if (xBolinha - raio < xRaq + wRaq && yBolinha - raio < yRaq + hRaq && yBolinha + raio > yRaq) {
    vehX *= -1
  }
}
function colidiuBiblioteca(x,y){
  colide = collideRectCircle(x, y, wRaq, hRaq, xBolinha, yBolinha, raio);
  if (colide) {
    vehX *= -1;
    raqueteSom.play()
    if (vehX >= 9 || vehX <= -9) {
      vehX *= 0.8
    }
    else {
      vehX *= 1.005;
    }
  }
}

function movimentaOponente(){
  vehYOP = yBolinha - yRaqOP - wRaq /2 - 70
  yRaqOP += vehYOP
}

function funcionaPlacar() {
  stroke(255)
  textAlign(CENTER);
  fill(color(255, 140, 0));
  rect(130,37,40,20,10);
  rect(330,37,40,20,10);
  fill(255);
  text(pntsOP,350,50);
  text(pnts,150,50);
  if (xBolinha + raio >= width) {
    pnts += 1;
    pontoSom.play();
  }
  if (xBolinha - raio <= 0) {
    pntsOP += 1;
    pontoSom.play();
  }
}
function bolinhaBug(){
  if(xBolinha - raio < 0 || xBolinha + raio > width) {
    xBolinha = 200
    vehY *= -1
  }
}

function preload() {
  pontoSom = loadSound("ponto.mp3")
  raqueteSom = loadSound("raquetada.mp3")
}

