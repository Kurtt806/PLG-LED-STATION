const UUID = "6134297e"; // Đặt UUID là hằng số

const BOARD = {
    LED_OTO: 1,
    LED_RC: 2,
    CONTROL_RC: 3,
    BOCAP_RC: 4
};

const TYPE = {
    BUTTON: 1,
    SLIDER: 2,
    EFFECT: 3,
    COLOR: 4,
    CONFIG: 5
};

let startTime;

class API {
    constructor() {
        this._KEY = "";
        this._BOARD = "";
        this._TYPE = "";
        this._RANK = "";
        this._VALUE = "";
        this._TIME = 0;
    }

    TX(board, type, rank, value) {
        const elapsedTimeSeconds = Math.floor((Date.now() - startTime) / 1000);
        const data = { KEY: UUID, BOARD: board, TYPE: type, RANK: rank, VALUE: value, TIME: elapsedTimeSeconds }; // Sử dụng UUID thay thế cho biến uuid
        const jsonData = JSON.stringify(data);
        console.log('[API_TX]-' + jsonData);
        websocket.send(jsonData);
    }

    RX(message) {
        console.log('[API_RX]-' + message);
        try {
            const jsonData = JSON.parse(message);
            this._KEY = jsonData.KEY || "";
            this._TYPE = jsonData.TYPE || "";
            this._BOARD = jsonData.BOARD || "";
            this._RANK = jsonData.RANK || "";
            this._VALUE = jsonData.VALUE || "";
            this._TIME = jsonData.TIME || 0;
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }

    KEY() {
        return this._KEY;
    }

    BOARD() {
        return this._BOARD;
    }

    TYPE() {
        return this._TYPE;
    }

    RANK() {
        return this._RANK;
    }

    VALUE() {
        return this._VALUE;
    }

    TIME() {
        return this._TIME;
    }
}
