"use strict";

class CollideableVisualElement extends VisualElement {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    adjustPosition(deltaX, deltaY, collideableElements) {
        let incrementalDeltaX = 0;
        let incrementalDeltaY = 0;

        let iterationCount;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                incrementalDeltaX = 1;
            }
            else if (deltaX < 0) {
                incrementalDeltaX = -1;
            }

            incrementalDeltaY = deltaY / Math.abs(deltaX);
            iterationCount = Math.abs(deltaX);
        }
        else if (Math.abs(deltaX) < Math.abs(deltaY)) {
            if (deltaY > 0) {
                incrementalDeltaY = 1;
            }
            else if (deltaY < 0) {
                incrementalDeltaY = -1;
            }

            incrementalDeltaX = deltaX / Math.abs(deltaY);
            iterationCount = Math.abs(deltaY);
        }
        else if (Math.abs(deltaX) === Math.abs(deltaY)) {
            if (deltaX > 0) {
                incrementalDeltaX = 1;
            }
            else if (deltaX < 0) {
                incrementalDeltaX = -1;
            }

            if (deltaY > 0) {
                incrementalDeltaY = 1;
            }
            else if (deltaY < 0) {
                incrementalDeltaY = -1;
            }

            iterationCount = Math.abs(deltaX);
        }

        for (let i = 0; i < iterationCount; i++) {
            let futurePosition = new CollideableVisualElement(this.x, this.y, this.w, this.h);
            futurePosition.setPosition(futurePosition.x + incrementalDeltaX, futurePosition.y + incrementalDeltaY);

            for (const collideableElement of collideableElements) {
                if (this._checkCollision(futurePosition, collideableElement)) {
                    let overlapX = Math.min(this.x + this.w - collideableElement.x,
                        collideableElement.x + collideableElement.w - this.x);
                    let overlapY = Math.min(this.y + this.h - collideableElement.y,
                        collideableElement.y + collideableElement.h - this.y);

                    if (overlapX < overlapY) {
                        incrementalDeltaX = 0;
                    }
                    else if (overlapY < overlapX) {
                        incrementalDeltaY = 0;
                    }
                    else if (overlapX === overlapY) {
                        incrementalDeltaX = 0;
                        incrementalDeltaY = 0;
                    }
                }
            }

            super.setPosition(super.x + incrementalDeltaX, super.y);
            super.setPosition(super.x, super.y + incrementalDeltaY);
        }
    }

    _checkCollision(e1, e2) {
        if (e1.y + e1.h >= e2.y &&
            e1.y <= e2.y + e2.h &&
            e1.x + e1.w >= e2.x &&
            e1.x <= e2.x + e2.w) {
                return true;
        }
        else {
            return false;
        }
    }
}