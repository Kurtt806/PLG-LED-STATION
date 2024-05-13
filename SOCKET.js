var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
const api = new API();
// ----------------------------------------------------------------------------
// Initialization
// ----------------------------------------------------------------------------

window.addEventListener('load', onLoad);

function onLoad(event) {
    initWebSocket();
    startTime = Date.now();
}

// ----------------------------------------------------------------------------
// WebSocket handling
// ----------------------------------------------------------------------------

function initWebSocket() {
    console.log('[SOCKET]- Try Connect WebSocket');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {
    console.log('[SOCKET]- Open WebSocket');
    api.TX(BOARD.LED_OTO, TYPE.CONFIG, 1, "BEGIN");
}

function onClose(event) {
    console.log('[SOCKET]- Close WebSocket');
    setTimeout(initWebSocket, 2000);
}

function onMessage(event) {
    api.RX(event.data);
    processRX();
}

// ----------------------------------------------------------------------------
// DOMContentLoaded handling
// ----------------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function () {
    var sections = document.getElementById('sections').children;
    var sections1 = document.getElementById('sections1');
    var progressBar = document.getElementById('BEGIN-progress');
    var elementsWithOnClick = document.querySelectorAll("[onclick]");
    var elementsWithOnInput = document.querySelectorAll("[oninput]");
    var elementsWithOnChange = document.querySelectorAll("[onchange]");

    elementsWithOnClick.forEach(function (element) {
        element.style.userSelect = "none";
    });
    elementsWithOnInput.forEach(function (element) {
        element.style.userSelect = "none";
    });
    elementsWithOnChange.forEach(function (element) {
        element.style.userSelect = "none";
    });

    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.add('hidden');
    }
    sections1.classList.remove('hidden');
    var value = 0;
    var interval = setInterval(function () {
        value += 0.26; 
        progressBar.value = value;
        if (value >= 100) {
            clearInterval(interval);
            showElement('sections2');
        }
    }, 5);
});

document.addEventListener('touchmove', function (event) {
    if (!isInsideSlider(event.target)) {
        event.preventDefault();
    }
}, { passive: false });
function isInsideSlider(element) {
    if (element.classList.contains('slider') ||
        element.classList.contains('WIFI')) {
        return true;
    } else if (element.parentElement) {
        return isInsideSlider(element.parentElement);
    } else {
        return false;
    }
}