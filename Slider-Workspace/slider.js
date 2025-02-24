const wrapper = document.querySelector(".slider > .cards-wrapper");
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");
const cards = Array.from(wrapper.children);
let visibleCards = window.innerWidth >= 768 ? 3 : 1; // Set initial visible cards
let currentIndex = 0;

const updateSlider = () => {
    const offset = -(100 / visibleCards) * currentIndex;
    wrapper.style.transform = `translateX(${offset}%)`;

    prevButton.classList.toggle("disabled", currentIndex === 0);
    nextButton.classList.toggle("disabled", currentIndex >= cards.length - visibleCards);
};

nextButton.addEventListener("click", () => {
    if (currentIndex < cards.length - visibleCards) {
        currentIndex++;
        updateSlider();
    }
});

prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

const handleResize = () => {
    visibleCards = window.innerWidth >= 768 ? 3 : 1;
    currentIndex = 0; // Reset to first card when resizing
    updateSlider();
};

const initializeProjectsCardsSlider = () => {
    window.addEventListener("resize", handleResize);
    updateSlider();
};

initializeProjectsCardsSlider();
