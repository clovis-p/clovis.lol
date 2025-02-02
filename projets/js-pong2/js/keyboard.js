"use strict";

class Keyboard {
    constructor() {
        this._keyStates = [];

        document.addEventListener("keydown", event => {
            this._setKeyState(event.key, true);
        });

        document.addEventListener("keyup", event => {
            this._setKeyState(event.key, false);
        });
    }

    _setKeyState(key, boolState) {
        if (typeof boolState == "boolean" && typeof key == "string") {
            this._keyStates[key] = boolState;
        }
        else {
            console.error("setKeyState parameter type error");
        }
    }

    getKeyState(key) {
        if (typeof key == "string") {
            return this._keyStates[key];
        }
    }
}