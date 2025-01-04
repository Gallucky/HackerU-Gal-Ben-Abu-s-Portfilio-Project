import { allCountries, searchCountry, setShownCountries } from "./countriesService.js";
import { arrangeCountriesCards } from "./domService.js";

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value;
    const filteredCountries = searchCountry(searchValue);
    setShownCountries(filteredCountries);

    arrangeCountriesCards();
    console.log("Found the following countries: ", filteredCountries);
});
