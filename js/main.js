"use strict";

const NAV_ANIMATION_LENGTH_ITEM = 900;
const NAV_ANIMATION_DELAY = 0.1;

const NAV_ITEM_COUNT = 4;

function init() {
    $("h1").css("text-align", "center")
        .css("font-size", "30px");

    $(".main-li").css("display", "inline-flex")
        .css("margin-top", "10px")
        .css("margin-bottom", "10px")
        .css("margin-left", "auto")
        .css("margin-right", "auto")
        .children("a").css("padding", "10px")
        .css("font-size", "24px")
        .on("click", turnListIntoNavbar);

    $("#main-nav ul").css("display", "flex")
        .css("flex-direction", "column")
        .css("list-style-type", "none")
        .css("margin", "auto");

    $("nav").css("display", "block");

    $("#js-pong-link").on("click", function () {
        const fullscreenMask = $("#fullscreen-mask");
        $("<iframe>").prop("src", "./projets/js-pong/pong.html")
            .prop("id", "game-area")
            .appendTo(fullscreenMask);
    });

    $("#blocks-link").on("click", function () {
        const fullscreenMask = $("#fullscreen-mask");
        $("<iframe>").prop("src", "./projets/blocks-emscripten/index.html")
            .prop("id", "game-area")
            .appendTo(fullscreenMask);
    });
}

function turnListIntoNavbar() {
    const fullscreenMask = $("<div>");
    fullscreenMask.css("position", "absolute")
        .css("top", "0")
        .css("bottom", "0")
        .css("left", "0")
        .css("right", "0")
        .prop("id", "fullscreen-mask")
        //.css("opacity", "0")
        .appendTo("body");

    $("h1").css("opacity", "0")
        .css("transition", "opacity 0.2s");

    const mainNavUl = $("#main-nav ul");
    const mainNavUlClone = mainNavUl.clone();
    mainNavUlClone.css("display", "flex")
        .css("flex-direction", "row")
        .css("flex-wrap", "wrap")
        .css("list-style-type", "none")
        .css("margin", "auto")
        .prop("id", "ul-clone");

    const mainLiClone = mainNavUlClone.children("li");
    mainLiClone.css("display", "inline-flex")
        .css("margin-top", "10px")
        .css("margin-bottom", "10px")
        .css("margin-left", "10px")
        .css("margin-right", "10px");

    mainNavUlClone.appendTo(fullscreenMask)
        .css("opacity", "0");

    $("#main-ul .main-li").each(function(_, element) {
        const id = $(element).attr("id");
        console.log(id);

        const liPos = $(element).offset();
        const liClonePos = $("#ul-clone #" + id).offset();

        const deltaX = liClonePos.left - liPos.left;
        const deltaY = liClonePos.top - liPos.top;

        console.log(id + ": deltaX: " + deltaX + " deltaY: " + deltaY);

        $(element).css("transform","translate( " + deltaX + "px, " + deltaY + "px)")
            .css("transition", "transform 0.25s")
            .css("transition-delay", (NAV_ANIMATION_DELAY * parseInt(id.charAt(2)) - NAV_ANIMATION_DELAY) + "s");
    });

    mainNavUlClone.css("display", "flex")
        .css("opacity", "0");

    setTimeout(function () {
        $("#main-ul").remove();
        mainNavUlClone.css("display", "flex")
            .css("opacity", "1");
    }, NAV_ANIMATION_LENGTH_ITEM);
}

$(document).ready(function () {
    init();
});