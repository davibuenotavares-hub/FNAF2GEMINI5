// Estado do Jogo
let musicBox = 100;
let battery = 100;
let currentCam = 1;
let isMaskOn = false;
let foxyFlashCount = 0;

// Localização dos Animatrônicos
let positions = {
    toyFreddy: "cam01",
    toyBonnie: "cam02",
    foxy: "corridor"
};

// Seletores
const musicLabel = document.getElementById('music-val');
const batLabel = document.getElementById('bat-val');
const office = document.getElementById('office');

// Loop Principal (1 segundo)
setInterval(() => {
    // Reduzir Caixa de Música
    if (musicBox > 0) musicBox -= 1;
    musicLabel.innerText = Math.floor(musicBox);
    
    if (musicBox <= 0) alert("GAME OVER: PUPPET SAIU!");

    // IA Simples: Chance de mover
    if (Math.random() > 0.8) moveAnimatronics();
}, 1000);

// Funções de Ação
function moveAnimatronics() {
    // Exemplo: Toy Bonnie vai para o duto
    if (positions.toyBonnie === "cam02") positions.toyBonnie = "duct-left";
}

// Lanterna e Foxy
document.getElementById('flash-btn').addEventListener('click', () => {
    if (battery > 0) {
        battery -= 2;
        batLabel.innerText = Math.floor(battery);
        checkCorridor();
    }
});

function checkCorridor() {
    if (positions.foxy === "corridor") {
        foxyFlashCount++;
        alert("FOXY ESTÁ NO CORREDOR!");
        if (foxyFlashCount >= 2) {
            alert("FOXY FOI EMBORA!");
            positions.foxy = "cam04";
            foxyFlashCount = 0;
        }
    } else {
        alert("CORREDOR VAZIO");
    }
}

// Dutos
document.getElementById('duct-left').addEventListener('click', () => {
    if (positions.toyBonnie === "duct-left") alert("TOY BONNIE NO DUTO!");
    else alert("DUTO LIMPO");
});

// Mecânica da Caixa
document.getElementById('rewind-btn').addEventListener('touchstart', () => {
    if (musicBox < 100) musicBox += 5;
});

// Alternar Máscara
document.getElementById('mask-toggle').addEventListener('click', () => {
    isMaskOn = !isMaskOn;
    office.classList.toggle('mask-on');
});

// Alternar Câmeras
document.getElementById('cam-toggle').addEventListener('click', () => {
    document.getElementById('camera-screen').classList.toggle('hidden');
    document.getElementById('cam-menu').classList.toggle('hidden');
});

function changeCam(num) {
    currentCam = num;
    document.getElementById('cam-label').innerText = "CAM " + num;
}
