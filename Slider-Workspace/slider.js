const wrapper = document.querySelector(".projects-cards-wrapper");
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");
const cards = Array.from(wrapper.children);

// Calculating how many cards should be visible based on screen width.
const calculateVisibleCards = () => {
    // In case of large screens.
    if (window.innerWidth >= 1024) return 3;
    // In case of medium screens.
    if (window.innerWidth >= 768) return 2;
    // Defaults to small screens.
    return 1;
};

let visibleCards = calculateVisibleCards();
let currentIndex = 0;

const getGapSize = () => {
    const rootStyle = getComputedStyle(document.documentElement);
    return parseInt(rootStyle.getPropertyValue("--projects-cards-gap").trim());
};

const setCardsWidths = () => {
    const gapSize = getGapSize();
    const totalGapWidth = gapSize * (visibleCards - 1);

    // Calculating the percentage width each card should have.
    const availableWidth = 100 - (totalGapWidth / wrapper.offsetWidth) * 100;
    const cardWidthPercent = availableWidth / visibleCards;

    // Applying width to all cards.
    cards.forEach((card) => {
        card.style.flexBasis = `${cardWidthPercent}%`;
    });
};

const updateSlider = () => {
    // Setting proper cards widths.
    setCardsWidths();

    // Calculating slide distance in percentage.
    const cardWidth = 100 / visibleCards;
    const slidePercentage = cardWidth * currentIndex;

    wrapper.style.transform = `translateX(-${slidePercentage}%)`;

    // Updating the buttons states.
    prevButton.classList.toggle("disabled", currentIndex === 0);
    nextButton.classList.toggle("disabled", currentIndex >= cards.length - visibleCards);
};

// Listening for slider's navigation buttons click events.
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

// Handling a screen / window resizing.
window.addEventListener("resize", () => {
    const newVisibleCards = calculateVisibleCards();

    // If the number of visible cards has changed
    // reset index and update the slider element.
    if (newVisibleCards !== visibleCards) {
        visibleCards = newVisibleCards;
        currentIndex = 0;
        updateSlider();
    } else {
        // Even if visible cards number is the same and hasn't changed,
        // recalculating widths regardless.
        setCardsWidths();
    }
});

// Initialize the slider
updateSlider();
