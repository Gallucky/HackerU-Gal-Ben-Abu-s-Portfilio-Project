import {
    allCountries,
    searchCountry,
    setShownCountries,
    sortCountries,
} from "./countriesService.js";
import { arrangeCountriesCards, reorderCountryCards } from "./domService.js";

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value;
    const filteredCountries = searchCountry(searchValue);
    setShownCountries(filteredCountries);

    arrangeCountriesCards();

    const orderBy = document.getElementById("search-sort");
    const orderType = document.getElementById("btn-sort");

    console.log("orderBy:", orderBy);

    console.log("orderBy.dataset.value:", orderBy.dataset.value);
    console.log("orderType.dataset.orderType:", orderType.dataset.orderType);

    const orderByOptions = orderBy.querySelectorAll(".select-option");

    orderByOptions.forEach((option) => {
        option.onclick = (e) => {
            // Preventing the event from bubbling up to the custom select element.
            // This will prevent multiple event actions from happening together.
            e.stopPropagation();

            // Adds the selected class to the selected option.
            option.classList.toggle("selected");

            // Closing the custom select element.
            orderBy.classList.remove("active");

            orderBy.querySelector(".select-value").innerText = option.innerText;
            orderBy.dataset.value = option.dataset.value;

            // Reorder the country cards.
            sortCountries(filteredCountries, orderType.dataset.orderType, orderBy.dataset.value);
            reorderCountryCards();
        };
    });

    // Reorder the country cards.
    sortCountries(filteredCountries, orderType.dataset.orderType, orderBy.dataset.value);
    console.log("Found the following countries: ", filteredCountries);
    reorderCountryCards();
});
