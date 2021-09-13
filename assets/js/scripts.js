const defaultSwiperOptions = {
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    loop: true,
}

const mobileFeatureSwiper = new Swiper('#mobile-feature-slider', {
    ...defaultSwiperOptions
});

const desktopWarrantySwiper = new Swiper('#vertical-warranty-slider', {
    ...defaultSwiperOptions,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
    },
    direction: "vertical",
    slidesPerView: 3,
});

const smoothScroll = (event) => {
    event.preventDefault();

    const yOffset = event.target.dataset.offset || -50;
    const targetSelector = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetSelector);
    const targetTopOffset = targetElement.offsetTop - yOffset;

    const options = {
        'behavior': "smooth",
        'top': targetTopOffset,
    };

    window.scroll(options);
};

(function () {
    [].slice.call(document.querySelectorAll('a[href^="#"][data-action="scroll"]')).map((element) => {
        element.addEventListener('click', smoothScroll);
    });
})()
