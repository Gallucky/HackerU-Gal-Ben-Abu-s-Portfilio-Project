import {
    allCountries,
    namesOfShownCountries,
    searchCountry,
    setShownCountries,
    sortCountries,
} from "./countriesService.js";
import { arrangeCountriesCards, reorderCountryCards } from "./domService.js";

let filteredCountries = namesOfShownCountries;

const orderBy = document.getElementById("search-sort");
const orderType = document.getElementById("btn-sort");
const orderByOptions = orderBy.querySelectorAll(".select-option");

// Order by custom select element's options onclick event listener.
orderByOptions.forEach((option) => {
    option.onclick = (e) => {
        // Preventing the event from bubbling up to the custom select element.
        // This will prevent multiple event actions from happening together.
        e.stopPropagation();

        // Removing the selected class from all options.
        orderByOptions.forEach((option) => {
            option.classList.remove("selected");
        });

        // Adds the selected class to the selected option.
        option.classList.toggle("selected");

        // Closing the custom select element.
        orderBy.classList.remove("active");

        orderBy.querySelector(".select-value").innerText = option.innerText;
        orderBy.dataset.value = option.dataset.value;

        if (orderBy.dataset.value === "without") {
            orderType.style.display = "none";
        } else {
            orderType.style.display = "block";
        }

        console.log(
            "Here in index.js - order by options foreach in option.onclick clicked occurred!"
        );

        // Reorder the country cards.
        sortCountries(filteredCountries, orderType.dataset.orderType, orderBy.dataset.value);
        reorderCountryCards();
    };
});

// Search input event listener.
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value;
    filteredCountries = searchCountry(searchValue);
    setShownCountries(filteredCountries);

    arrangeCountriesCards();

    console.log("orderBy:", orderBy);

    console.log("orderBy.dataset.value:", orderBy.dataset.value);
    console.log("orderType.dataset.orderType:", orderType.dataset.orderType);

    // Reorder the country cards.
    sortCountries(filteredCountries, orderType.dataset.orderType, orderBy.dataset.value);
    console.log("Found the following countries: ", filteredCountries);
    reorderCountryCards();
});
