

function event_click_logo() {

}

function event_click_connectToWifi() {
    var wifiNameInput = document.getElementById("wifiName");
    var wifiPasswordInput = document.getElementById("wifiPassword");

    if (wifiNameInput && wifiPasswordInput && wifiNameInput.value && wifiPasswordInput.value) {
        var wifiName = wifiNameInput.value;
        var wifiPassword = wifiPasswordInput.value;

        // Gọi hàm API
        API(KEY, BOARD.LED_OTO, TYPE.CONFIG, 2, wifiName);
        API(KEY, BOARD.LED_OTO, TYPE.CONFIG, 3, wifiPassword);
    } else {
        console.log("Please fill in both WiFi name and password.");
    }
}

function handleWiFiClick(value) {
    var wifiNames = value.textContent.trim();
    var wifiinput = document.getElementById("wifiName");

    wifiinput.value = wifiNames;
}

function popup_restart() {

}


function showElement(sectionId) {
    var sections = document.getElementById('sections').children;
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        if (section.id !== sectionId) {
            section.classList.add('hidden');
        } else {
            section.classList.remove('hidden');
        }
    }
}

function Update_Progress_RSSI(percent) {
    const meter_rssi = document.getElementById("meter_rssi");
    const newHeight = (percent / 100) * meter_rssi.parentNode.offsetHeight;
    meter_rssi.style.height = `${newHeight}px`;
    let color = "#00ff00";

    if (percent > 70) {
        color = "#56b75a";
        setTimeout(changeColor(color), 1000);
    }
    else if (percent < 70 && percent > 25) {
        color = "#b79f56";
        setTimeout(changeColor(color), 1000);

    } else if (percent < 25) {
        color = "#b75856";
        setTimeout(changeColor(color), 1000);
    }
    document.getElementById("val_rssi").innerHTML = percent + "%";
}

function changeColor(color) {
    const contentBoxState = document.querySelector('.content_box_state');
    contentBoxState.style.boxShadow = `1px 6px 10px ${color}`; // Sử dụng biến color cho màu shadow
    const meter_rssi = document.getElementById("meter_rssi");
    meter_rssi.style.backgroundColor = color; // Thay đổi màu nền thành màu xanh
}


function getColorForSignalStrength(rssi) {
    if (rssi > -50) {
        return "green";
    } else if (rssi > -70) {
        return "yellow";
    } else {
        return "red";
    }
}

function Update_SliderPWM(element) {
    var sliderNumber = element.id.charAt(element.id.length - 1);
    var sliderValue = element.value;
    // Hiển thị giá trị của thanh trượt
    document.getElementById("slider_" + sliderNumber).innerHTML = sliderValue;
}



// Lựa chọn tất cả các phần tử img có class là "IMG_CONTENT"
const images = document.querySelectorAll('.IMG_CONTENT, .IMG_LOGO_APP, .IMG_ICON, .IMG_LOGO');

// Thêm sự kiện ngăn chặn nhấn giữ cho mỗi phần tử img
images.forEach(img => {
  img.addEventListener('contextmenu', e => {
    e.preventDefault();
  });
  img.addEventListener('dragstart', e => {
    e.preventDefault();
  });
});
