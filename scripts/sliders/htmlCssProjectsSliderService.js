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

// Checking if the page is currently in RTL mode.
const isRTL = () => {
    return (
        document.documentElement.dir === "rtl" ||
        document.body.dir === "rtl" ||
        getComputedStyle(wrapper).direction === "rtl"
    );
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
    const pageDirectionRTL = isRTL();

    // In RTL mode - using positive values for translateX.
    // In LTR mode - using negative values for translateX.
    const translateDirection = pageDirectionRTL ? "" : "-";

    wrapper.style.transform = `translateX(${translateDirection}${slidePercentage}%)`;

    // Updating the buttons states.
    if (pageDirectionRTL) {
        // RTL supported logic.
        prevButton.classList.toggle("disabled", currentIndex >= cards.length - visibleCards);
        nextButton.classList.toggle("disabled", currentIndex === 0);
    } else {
        // Original LTR logic.
        prevButton.classList.toggle("disabled", currentIndex === 0);
        nextButton.classList.toggle("disabled", currentIndex >= cards.length - visibleCards);
    }
};

// Listening for slider's navigation buttons click events.
nextButton.addEventListener("click", () => {
    if (isRTL()) {
        // In RTL mode:
        // Next button moves backwards - index decreases.
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    } else {
        // The original behavior.
        // In LTR mode:
        // Next button moves forwards - index increases.
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
            updateSlider();
        }
    }
});

prevButton.addEventListener("click", () => {
    if (isRTL()) {
        // In RTL mode:
        // Previous button moves forwards - index increases.
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
            updateSlider();
        }
    } else {
        // The original behavior.
        // In LTR mode:
        // Previous button moves backwards - index decreases.
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
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

const fixRTLButtons = () => {
    if (isRTL()) {
        // Swapping the buttons contents.
        prevButton.innerHTML = "&gt;";
        nextButton.innerHTML = "&lt;";
    } else {
        // Resetting to the original buttons contents.
        prevButton.innerHTML = "&lt;";
        nextButton.innerHTML = "&gt;";
    }
};

export const initializeHtmlCssSlider = () => {
    // Checking if the page direction is in RTL,
    // if it is in RTL mode fixing the buttons,
    // otherwise defaults to the original layout and logic.
    fixRTLButtons();

    // Initialize the slider
    updateSlider();

    // Adding MutationObserver to detect any dir changes.
    const directionObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "dir") {
                fixRTLButtons();
                updateSlider();
            }
        });
    });

    // Observing both documentElement and body for div changes.
    directionObserver.observe(document.documentElement, { attributes: true });
    directionObserver.observe(document.body, { attributes: true });
};
