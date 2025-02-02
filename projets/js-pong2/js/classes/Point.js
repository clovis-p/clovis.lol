"use strict";

class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    setX(x) {
        if (!isNaN(x)) {
            this._x = x;
        }
    }

    setY(y) {
        if (!isNaN(y)) {
            this._y = y;
        }
    }
}