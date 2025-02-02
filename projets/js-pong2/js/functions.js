"use strict";

const canvasElement = document.getElementById("gameCanvas");
const canvas = canvasElement.getContext("2d");

function drawVisualElement(visualElement, color) {
    canvas.fillStyle = color;
    canvas.fillRect(visualElement.x, visualElement.y, visualElement.w, visualElement.h);
}