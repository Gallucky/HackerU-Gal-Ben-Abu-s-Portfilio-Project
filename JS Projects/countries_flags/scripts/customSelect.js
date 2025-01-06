const customSelectElements = document.querySelectorAll(".custom-select");

customSelectElements.forEach((element) => {
    element.onclick = (e) => {
        // Making sure on click of the custom select element and not it's options.
        if (e.target.closest(".select-option") === null) {
            element.classList.toggle("active");
        }
    };
});

customSelectElements.forEach((element) => {
    const options = element.querySelectorAll(".select-option");

    options.forEach((option) => {
        option.onclick = (e) => {
            // Preventing the event from bubbling up to the custom select element.
            // This will prevent multiple event actions from happening together.
            e.stopPropagation();

            // Making sure all options are unselected / without the selected class.
            options.forEach((option) => {
                option.classList.remove("selected");
            });

            // Adds the selected class to the selected option.
            option.classList.toggle("selected");

            // Closing the custom select element.
            element.classList.remove("active");

            element.querySelector(".select-value").innerText = option.innerText;
        };
    });
});
