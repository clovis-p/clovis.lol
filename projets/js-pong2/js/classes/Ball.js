"use strict";

class Ball extends CollideableVisualElement {
    constructor(size, speed) {
        super();
        super.setSize(BALL_SIZE, BALL_SIZE);
        super.setPosition(gameArea.w / 2 + super.w / 2, gameArea.h / 2 + super.h / 2);
        this._velocity = new Point(speed, speed);
    }

    updateBall(speed, collideableElements) {
        let incrementalDeltaX = 0;
        let incrementalDeltaY = 0;

        let iterationCount;

        if (Math.abs(this._velocity.x) > Math.abs(this._velocity.y)) {
            if (this._velocity.x > 0) {
                incrementalDeltaX = 1;
            }
            else if (this._velocity.x < 0) {
                incrementalDeltaX = -1;
            }

            incrementalDeltaY = this._velocity.y / Math.abs(this._velocity.x);
            iterationCount = Math.abs(this._velocity.x);
        }
        else if (Math.abs(this._velocity.x) < Math.abs(this._velocity.y)) {
            if (this._velocity.y > 0) {
                incrementalDeltaY = 1;
            }
            else if (this._velocity.y < 0) {
                incrementalDeltaY = -1;
            }

            incrementalDeltaX = this._velocity.x / Math.abs(this._velocity.y);
            iterationCount = Math.abs(this._velocity.y);
        }
        else if (Math.abs(this._velocity.x) === Math.abs(this._velocity.y)) {
            if (this._velocity.x > 0) {
                incrementalDeltaX = 1;
            }
            else if (this._velocity.x < 0) {
                incrementalDeltaX = -1;
            }

            if (this._velocity.y > 0) {
                incrementalDeltaY = 1;
            }
            else if (this._velocity.y < 0) {
                incrementalDeltaY = -1;
            }

            iterationCount = Math.abs(this._velocity.x);
        }

        // todo: this is not ideal (* speed)
        for (let i = 0; i < iterationCount * speed; i++) {
            let collisionBounce = this._checkCollisionBounce(collideableElements);

            this._velocity.setX(this._velocity.x * collisionBounce.x);
            this._velocity.setY(this._velocity.y * collisionBounce.y);

            if (collisionBounce.x < 0) {
                console.log(collisionBounce.overlap);
            }

            if (collisionBounce.y < 0) {
                console.log(collisionBounce.overlap);
            }

            incrementalDeltaX *= collisionBounce.x;
            incrementalDeltaY *= collisionBounce.y;

            super.setPosition(super.x + incrementalDeltaX, super.y);
            super.setPosition(super.x, super.y + incrementalDeltaY);
        }
    }

    _checkCollisionBounce(collideableElements) {
        // 1 = no collision, -1 = collision (this value will be used to invert (bounce) the velocity)
        // overlap value is for future use
        let bounce = {x: 1, y: 1, overlap: 0};

        for (const collideableElement of collideableElements) {
            if (super._checkCollision(this, collideableElement)) {
                let overlapX = Math.min(this.x + this.w - collideableElement.x,
                    collideableElement.x + collideableElement.w - this.x);
                let overlapY = Math.min(this.y + this.h - collideableElement.y,
                    collideableElement.y + collideableElement.h - this.y);

                if (overlapX < overlapY) {
                    bounce.x = -1;
                    bounce.overlap = overlapX;
                }
                else if (overlapY < overlapX) {
                    bounce.y = -1;
                    bounce.overlap = overlapY;
                }
                else if (overlapX === overlapY) {
                    bounce.x = -1;
                    bounce.y = -1;
                    bounce.overlap = overlapX;
                }
            }
        }

        return bounce;
    }
}