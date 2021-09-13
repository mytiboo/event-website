const menuElement = document.querySelector('#mobile-menu');

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

const menuDisappearAnimation = () => {
    currentFrame++;
    if (currentFrame <= menuDisappearDurationInFrames) {
        window.requestAnimationFrame(() => {
            topLineY = AJS.easeInBack(37, 50, menuDisappearDurationInFrames, currentFrame);
            topLine.setAttribute("d", "M30," + topLineY + " L70," + topLineY);
            bottomLineY = AJS.easeInBack(63, 50, menuDisappearDurationInFrames, currentFrame);
            bottomLine.setAttribute("d", "M30," + bottomLineY + " L70," + bottomLineY);
            menuDisappearAnimation();
        });
    } else {
        middleLine.style.opacity = "0";
        currentFrame = 1;
        menuDisappearComplete = true;
        openMenuAnimation();
    }
}

const arrowAppearAnimation = () => {
    currentFrame++;
    if (currentFrame <= arrowAppearDurationInFrames) {
        window.requestAnimationFrame(() => {
            topLeftX = AJS.easeOutBack(30, 35, arrowAppearDurationInFrames, currentFrame);
            topLeftY = AJS.easeOutBack(50, 35, arrowAppearDurationInFrames, currentFrame);
            bottomRightX = AJS.easeOutBack(70, 65, arrowAppearDurationInFrames, currentFrame);
            bottomRightY = AJS.easeOutBack(50, 65, arrowAppearDurationInFrames, currentFrame);
            topLine.setAttribute("d", "M" + topLeftX + "," + topLeftY + " L" + bottomRightX + "," + bottomRightY);
            bottomLeftX = AJS.easeOutBack(30, 35, arrowAppearDurationInFrames, currentFrame);
            bottomLeftY = AJS.easeOutBack(50, 65, arrowAppearDurationInFrames, currentFrame);
            topRightX = AJS.easeOutBack(70, 65, arrowAppearDurationInFrames, currentFrame);
            topRightY = AJS.easeOutBack(50, 35, arrowAppearDurationInFrames, currentFrame);
            bottomLine.setAttribute("d", "M" + bottomLeftX + "," + bottomLeftY + " L" + topRightX + "," + topRightY);
            arrowAppearAnimation();
        });
    } else {
        currentFrame = 1;
        arrowAppearComplete = true;
        openMenuAnimation();
    }
}

const arrowDisappearAnimation = () => {
    currentFrame++;
    if (currentFrame <= arrowDisappearDurationInFrames) {
        window.requestAnimationFrame(() => {
            topLeftX = AJS.easeInBack(35, 30, arrowDisappearDurationInFrames, currentFrame);
            topLeftY = AJS.easeInBack(35, 50, arrowDisappearDurationInFrames, currentFrame);
            bottomRightX = AJS.easeInBack(65, 70, arrowDisappearDurationInFrames, currentFrame);
            bottomRightY = AJS.easeInBack(65, 50, arrowDisappearDurationInFrames, currentFrame);
            topLine.setAttribute("d", "M" + topLeftX + "," + topLeftY + " L" + bottomRightX + "," + bottomRightY);
            bottomLeftX = AJS.easeInBack(35, 30, arrowDisappearDurationInFrames, currentFrame);
            bottomLeftY = AJS.easeInBack(65, 50, arrowDisappearDurationInFrames, currentFrame);
            topRightX = AJS.easeInBack(65, 70, arrowDisappearDurationInFrames, currentFrame);
            topRightY = AJS.easeInBack(35, 50, arrowDisappearDurationInFrames, currentFrame);
            bottomLine.setAttribute("d", "M" + bottomLeftX + "," + bottomLeftY + " L" + topRightX + "," + topRightY);
            arrowDisappearAnimation();
        });
        return;
    }

    middleLine.style.opacity = "1";
    currentFrame = 1;
    arrowDisappearComplete = true;
    closeMenuAnimation();
}

const menuAppearAnimation = () => {
    currentFrame++;
    if (currentFrame <= menuAppearDurationInFrames) {
        window.requestAnimationFrame(() => {
            topLineY = AJS.easeOutBack(50, 37, menuDisappearDurationInFrames, currentFrame);
            topLine.setAttribute("d", "M30," + topLineY + " L70," + topLineY);
            bottomLineY = AJS.easeOutBack(50, 63, menuDisappearDurationInFrames, currentFrame);
            bottomLine.setAttribute("d", "M30," + bottomLineY + " L70," + bottomLineY);
            menuAppearAnimation();
        });
        return;
    }

    currentFrame = 1;
    menuAppearComplete = true;
    closeMenuAnimation();
}

const openMenuAnimation = () => {
    if (!menuDisappearComplete) {
        menuDisappearAnimation();
        return;
    }

    if (!arrowAppearComplete) {
        arrowAppearAnimation();
    }

    state = "arrow";
    arrowDisappearComplete = false;
    menuAppearComplete = false;
}

const closeMenuAnimation = () => {
    if (!arrowDisappearComplete) {
        arrowDisappearAnimation();
        return;
    }

    if (!menuAppearComplete) {
        menuAppearAnimation();
    }

    state = "menu";
    menuDisappearComplete = false;
    arrowAppearComplete = false;
}

const toggleMenu = () => {
    if (state === "menu") {
        openMenuAnimation();
        document.body.classList.add('menu-active');
        return;
    }

    closeMenuAnimation();
    document.body.classList.remove('menu-active');
};

icon.addEventListener("click", () => {
    toggleMenu();
});

[].slice.call(menuElement.querySelectorAll('a[href^="#"][data-action="scroll"]')).map((element) => {
    element.addEventListener('click', toggleMenu);
});
