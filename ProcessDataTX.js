
/* ProcessDataTX.js */

// Hàm xử lý khi thay đổi slider PWM
function Send_SliderPWM(element) {
    var number = element.id.charAt(element.id.length - 1);
    var value = element.value;
    api.TX(BOARD.LED_OTO, TYPE.SLIDER, number, value);
}

// Hàm xử lý khi chọn hiệu ứng
function Send_SelectEffect(element) {
    var value = element.value;
    api.TX(BOARD.LED_OTO, TYPE.EFFECT, 1, value);
}

// Hàm xử lý khi chọn Config
function Send_SelectConfig() {
    const value = "scansWIFI";
    api.TX(BOARD.LED_OTO, TYPE.CONFIG, 8, value);
}

function Send_rescanWIFI() {
    const value = "scansWIFI";
    api.TX(BOARD.LED_OTO, TYPE.CONFIG, 8, value);
}

function Send_resetWIFI() {
    const value = "RESET";
    api.TX(BOARD.LED_OTO, TYPE.CONFIG, 9, value);
}



