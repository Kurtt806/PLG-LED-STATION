/* ProcessDataRX.js */

function processRX() {

    // Kiểm tra UUID
    if (api.KEY() === UUID) {
        switch (api.BOARD()) {
            case 1:
                switch (api.TYPE()) {
                    case 0:

                        break;
                    case 1:

                        break;
                    case 2:
                        // Xử lý SLIDER
                        handleSlider(api.RANK(), api.VALUE());
                        break;
                    case 3:
                        handleEffect(api.VALUE());
                        break;
                    case 4:

                        break;
                    case 5:
                        handleConfig(api.RANK(), api.VALUE());
                        break;
                    default:
                        console.warn(`Ignoring data for TYPE: ${api.TYPE()}`);
                        break;
                }
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                console.warn(`Ignoring data for BOARD: ${api.BOARD()}`);
                break;
        }
    } else {
        console.warn(`Ignoring data for UUID: ${api.KEY()}`);
    }
}

// Hàm xử lý SLIDER
function handleSlider(RANK, VALUE) {
    const sliderId = "slider" + RANK;
    const sliderElement = document.getElementById(sliderId);
    if (sliderElement) {
        sliderElement.innerHTML = VALUE;
    } else {
        console.warn(`Slider element not found for RANK: ${RANK}`);
    }
}
// Hàm xử lý EFECT
function handleEffect(VALUE) {
    document.getElementById("valueState4").innerHTML = VALUE;
}

// Hàm xử lý CONFIG
function handleConfig(RANK, VALUE) {
    if (RANK === 1) {
        const progressValue = parseFloat(VALUE);
        Update_Progress_RSSI(progressValue);
    } else if (RANK === 2) {
        // Ẩn danh sách wifi và hiển thị biểu tượng loading
        document.getElementById("wifi-list").classList.add('hidden');
        document.getElementById("loading-spinner").classList.remove('hidden');

        var wifiNameInput = document.getElementById("wifiName");
        wifiNameInput.value = "";
        var wifiPasswordInput = document.getElementById("wifiPassword");
        wifiPasswordInput.value = "";

        // Parse dữ liệu JSON và trích xuất tên và giá trị RSSI
        const dataArray = JSON.parse(VALUE)[0];
        const names = [];
        const rssi_values = [];

        dataArray.forEach(obj => {
            names.push(obj.name);
            rssi_values.push(obj.rssi);
        });
        console.log("Tên:", names);
        console.log("Giá trị RSSI:", rssi_values);

        // Gán tên wifi cho từng phần tử trong danh sách wifi
        for (let i = 0; i < 6; i++) {
            document.getElementById("wifi_" + (i + 1)).innerHTML = names[i];
        }

        // Gán màu cho các thanh màu tín hiệu dựa trên giá trị RSSI
        for (let i = 0; i < 6; i++) {
            document.getElementById("signal-strength-" + (i + 1)).style.backgroundColor = getColorForSignalStrength(rssi_values[i]);
        }
        // Hiển thị danh sách wifi và ẩn biểu tượng loading
        document.getElementById("wifi-list").classList.remove('hidden');
        document.getElementById("loading-spinner").classList.add('hidden');

    }
}


