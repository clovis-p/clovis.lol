"use strict"

class VisualElement {
    constructor(x, y, w, h) {
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get w() {
        return this._w;
    }

    get h() {
        return this._h;
    }

    setPosition(x, y) {
        if (!isNaN(x)) {
            this._x = x;
        }

        if (!isNaN(y)) {
            this._y = y;
        }
    }

    setSize(w, h) {
        if (!isNaN(w)) {
            this._w = w;
        }

        if (!isNaN(h)) {
            this._h = h;
        }
    }
}
