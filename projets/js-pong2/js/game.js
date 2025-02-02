"use strict";

const GAME_AREA_WIDTH = 1280;
const GAME_AREA_HEIGHT = 720;

const PADDLE_MARGIN = 5;
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 7;

const BALL_SIZE = 10;
const BALL_SPEED = 5;

const PLAYER_1_UP_KEY = "w";
const PLAYER_1_DOWN_KEY = "s";
const PLAYER_2_UP_KEY = "ArrowUp";
const PLAYER_2_DOWN_KEY = "ArrowDown";

let gameArea;
let gameAreaScaleFactor;

function initTests() {
    console.log("w: " + window.screen.width);
    console.log("h: " + window.screen.height);

    let windowW = window.screen.width;
    let windowH = window.screen.height;

    if (windowW > windowH) {
        // landscape: check if screen is wider than game
        // if windowH / gameH > windowW / gameW, screen is less wide than game
        // if windowH / gameH < windowW / gameW, screen is wider than game

        if (windowH / GAME_AREA_HEIGHT > windowW / GAME_AREA_WIDTH) {
            // screen is taller than game
            // fix game area according to screen width
            console.log("screen is taller than canvas");
            gameAreaScaleFactor = windowH
        }
        else if (windowH / GAME_AREA_HEIGHT < windowW / GAME_AREA_WIDTH) {
            // screen is wider than game
            // fix game area according to screen height
            console.log("screen is wider than canvas");
            gameAreaScaleFactor = windowW / GAME_AREA_WIDTH;
        }
    }
    else if (windowH > windowW) {

    }
    else {

    }
}

function initGame() {
    gameArea = new VisualElement(0, 0, GAME_AREA_WIDTH, GAME_AREA_HEIGHT);

    runGame();
}

function runGame() {
    let leftPaddle = new CollideableVisualElement();
    leftPaddle.setSize(PADDLE_WIDTH, PADDLE_HEIGHT);
    leftPaddle.setPosition(PADDLE_MARGIN, gameArea.h / 2 - leftPaddle.h / 2);

    let rightPaddle = new CollideableVisualElement();
    rightPaddle.setSize(PADDLE_WIDTH, PADDLE_HEIGHT);
    rightPaddle.setPosition(gameArea.w - rightPaddle.w - PADDLE_MARGIN, gameArea.h / 2 - rightPaddle.h / 2);

    let ball = new Ball(BALL_SIZE, BALL_SPEED);

    let ceiling = new CollideableVisualElement(0, -1, GAME_AREA_WIDTH, 1);
    let floor = new CollideableVisualElement(0, GAME_AREA_HEIGHT, GAME_AREA_WIDTH, 1);

    let keyboard = new Keyboard();

    let quit = false;

    let previousTime;
    function gameLoop(timestamp) {
        let deltaTime;
        if (previousTime === undefined) {
            deltaTime = 0;
        }
        else {
            deltaTime = timestamp - previousTime;
        }

        previousTime = timestamp;

        let gameSpeed = deltaTime / 16.667;

        if (gameSpeed > 1.1) {
            console.log("dT: " + deltaTime + ", gS: " + gameSpeed);
        }

        if (quit) {
            return;
        }

        if (keyboard.getKeyState(PLAYER_1_UP_KEY)) {
            leftPaddle.adjustPosition(0, -PADDLE_SPEED * gameSpeed, [ceiling, floor, ball]);
        }

        if (keyboard.getKeyState(PLAYER_1_DOWN_KEY)) {
            leftPaddle.adjustPosition(0, PADDLE_SPEED * gameSpeed, [ceiling, floor, ball]);
        }

        if (keyboard.getKeyState(PLAYER_2_UP_KEY)) {
            rightPaddle.adjustPosition(0, -PADDLE_SPEED * gameSpeed, [ceiling, floor, ball]);
        }

        if (keyboard.getKeyState(PLAYER_2_DOWN_KEY)) {
            rightPaddle.adjustPosition(0, PADDLE_SPEED * gameSpeed, [ceiling, floor, ball]);
        }

        ball.updateBall(gameSpeed, [leftPaddle, rightPaddle, ceiling, floor]);

        drawVisualElement(gameArea, "rgba(0, 0, 0, 0.2)");

        drawVisualElement(leftPaddle, "white");
        drawVisualElement(rightPaddle, "white");

        drawVisualElement(ball, "white");

        drawVisualElement(ceiling, "red");
        drawVisualElement(floor, "red");

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}

initGame();
//initTests();