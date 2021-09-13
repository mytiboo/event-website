let icon = document.getElementById("menu-toggler");
let topLine = document.getElementById("top-line-1");
let middleLine = document.getElementById("middle-line-1");
let bottomLine = document.getElementById("bottom-line-1");
let state = "menu";  // can be "menu" or "arrow"
let topLineY;
let middleLineY;
let bottomLineY;
let topLeftY;
let topRightY;
let bottomLeftY;
let bottomRightY;
let topLeftX;
let topRightX;
let bottomLeftX;
let bottomRightX;

///Animation Variables
let segmentDuration = 15;
let menuDisappearDurationInFrames = segmentDuration;
let arrowAppearDurationInFrames = segmentDuration;
let arrowDisappearDurationInFrames = segmentDuration;
let menuAppearDurationInFrames = segmentDuration;
let menuDisappearComplete = false;
let arrowAppearComplete = false;
let arrowDisappearComplete = false;
let menuAppearComplete = false;
let currentFrame = 1;

///Menu Disappear
function menuDisappearAnimation() {
    currentFrame++;
    if (currentFrame <= menuDisappearDurationInFrames) {
        window.requestAnimationFrame(() => {
            //top line
            topLineY = AJS.easeInBack(37, 50, menuDisappearDurationInFrames, currentFrame);
            topLine.setAttribute("d", "M30," + topLineY + " L70," + topLineY);
            //bottom line
            bottomLineY = AJS.easeInBack(63, 50, menuDisappearDurationInFrames, currentFrame);
            bottomLine.setAttribute("d", "M30," + bottomLineY + " L70," + bottomLineY);
            //recursion
            menuDisappearAnimation();
        });
    } else {
        middleLine.style.opacity = "0";
        currentFrame = 1;
        menuDisappearComplete = true;
        openMenuAnimation();
    }
}

///Cross Appear
function arrowAppearAnimation() {
    currentFrame++;
    if (currentFrame <= arrowAppearDurationInFrames) {
        window.requestAnimationFrame(() => {
            //top line
            topLeftX = AJS.easeOutBack(30, 35, arrowAppearDurationInFrames, currentFrame);
            topLeftY = AJS.easeOutBack(50, 35, arrowAppearDurationInFrames, currentFrame);
            bottomRightX = AJS.easeOutBack(70, 65, arrowAppearDurationInFrames, currentFrame);
            bottomRightY = AJS.easeOutBack(50, 65, arrowAppearDurationInFrames, currentFrame);
            topLine.setAttribute("d", "M" + topLeftX + "," + topLeftY + " L" + bottomRightX + "," + bottomRightY);
            //bottom line
            bottomLeftX = AJS.easeOutBack(30, 35, arrowAppearDurationInFrames, currentFrame);
            bottomLeftY = AJS.easeOutBack(50, 65, arrowAppearDurationInFrames, currentFrame);
            topRightX = AJS.easeOutBack(70, 65, arrowAppearDurationInFrames, currentFrame);
            topRightY = AJS.easeOutBack(50, 35, arrowAppearDurationInFrames, currentFrame);
            bottomLine.setAttribute("d", "M" + bottomLeftX + "," + bottomLeftY + " L" + topRightX + "," + topRightY);
            //recursion
            arrowAppearAnimation();
        });
    } else {
        currentFrame = 1;
        arrowAppearComplete = true;
        openMenuAnimation();
    }
}

///Combined Open Menu Animation
function openMenuAnimation() {
    if (!menuDisappearComplete) {
        menuDisappearAnimation();
        return;
    }

    if (!arrowAppearComplete) {
        arrowAppearAnimation();
    }
}

///Cross Disappear
function arrowDisappearAnimation() {
    currentFrame++;
    if (currentFrame <= arrowDisappearDurationInFrames) {
        window.requestAnimationFrame(() => {
            //top line
            topLeftX = AJS.easeInBack(35, 30, arrowDisappearDurationInFrames, currentFrame);
            topLeftY = AJS.easeInBack(35, 50, arrowDisappearDurationInFrames, currentFrame);
            bottomRightX = AJS.easeInBack(65, 70, arrowDisappearDurationInFrames, currentFrame);
            bottomRightY = AJS.easeInBack(65, 50, arrowDisappearDurationInFrames, currentFrame);
            topLine.setAttribute("d", "M" + topLeftX + "," + topLeftY + " L" + bottomRightX + "," + bottomRightY);
            //bottom line
            bottomLeftX = AJS.easeInBack(35, 30, arrowDisappearDurationInFrames, currentFrame);
            bottomLeftY = AJS.easeInBack(65, 50, arrowDisappearDurationInFrames, currentFrame);
            topRightX = AJS.easeInBack(65, 70, arrowDisappearDurationInFrames, currentFrame);
            topRightY = AJS.easeInBack(35, 50, arrowDisappearDurationInFrames, currentFrame);
            bottomLine.setAttribute("d", "M" + bottomLeftX + "," + bottomLeftY + " L" + topRightX + "," + topRightY);
            //recursion
            arrowDisappearAnimation();
        });
        return;
    }

    middleLine.style.opacity = "1";
    currentFrame = 1;
    arrowDisappearComplete = true;
    closeMenuAnimation();
}

///Menu Appear
function menuAppearAnimation() {
    currentFrame++;
    if (currentFrame <= menuAppearDurationInFrames) {
        window.requestAnimationFrame(() => {
            //top line
            topLineY = AJS.easeOutBack(50, 37, menuDisappearDurationInFrames, currentFrame);
            topLine.setAttribute("d", "M30," + topLineY + " L70," + topLineY);
            //bottom line
            bottomLineY = AJS.easeOutBack(50, 63, menuDisappearDurationInFrames, currentFrame);
            bottomLine.setAttribute("d", "M30," + bottomLineY + " L70," + bottomLineY);
            //recursion
            menuAppearAnimation();
        });
        return;
    }

    currentFrame = 1;
    menuAppearComplete = true;
    closeMenuAnimation();
}

///Close Menu Animation
function closeMenuAnimation() {
    if (!arrowDisappearComplete) {
        arrowDisappearAnimation();
        return;
    }

    if (!menuAppearComplete) {
        menuAppearAnimation();
    }
}

///Events
icon.addEventListener("click", () => {
    if (state === "menu") {
        openMenuAnimation();
        state = "arrow";
        arrowDisappearComplete = false;
        menuAppearComplete = false;
        return;
    }

    closeMenuAnimation();
    state = "menu";
    menuDisappearComplete = false;
    arrowAppearComplete = false;
});
