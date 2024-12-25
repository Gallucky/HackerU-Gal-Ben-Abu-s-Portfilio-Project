// General event listeners will be located and defined here.

// If the user changes the value of the size input below the minimum value.
const changeValuesBelowMinimumLimitListener = (e) => {
    if (e.target.value < 50) {
        e.target.value = 50;
        const backupBorder = e.target.style.border;
        e.target.style.border = "2px solid red";
        setTimeout(() => {
            e.target.style.border = backupBorder;
        }, 1000);
    }
};

export { changeValuesBelowMinimumLimitListener };
