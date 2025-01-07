import { allCountries } from "./countriesService.js";
import { namesOfShownCountries } from "./countriesService.js";
import { saveToFavorite, removeFromFavorite } from "./localStorageService.js";

const cardsContainer = document.getElementById("cards-container");
const countriesCards = {};

// O(M) time complexity.
const createCard = (country) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = "card-" + country.name.common;
    card.style.width = "300px";
    card.style.height = "400px";
    // card.style.padding = "0.5rem 1rem";

    const flag = document.createElement("img");
    flag.classList.add("card-img-top", "img", "img-round");
    flag.style.width = "300px !important";
    flag.style.height = "40%";
    flag.style.borderBottom = "3px groove teal";

    flag.src = country.flags.png;
    flag.alt = `Flag of ${country.name.common}`;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const countryName = document.createElement("h5");
    countryName.classList.add("card-title");
    countryName.innerText = country.name.common;
    countryName.style.width = "300px";

    const countryRegion = document.createElement("p");
    countryRegion.classList.add("card-text");
    countryRegion.innerText = country.region;

    const countryPopulation = document.createElement("p");
    countryPopulation.classList.add("card-text");

    const populationNumber = +country.population;
    const formattedPopulationNumber = populationNumber.toLocaleString();
    countryPopulation.innerText = `Population: ${formattedPopulationNumber}`;

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "d-flex", "justify-content-center");

    const favoriteIcon = document.createElement("i");
    favoriteIcon.classList.add("fa", "fa-heart");

    // Checking if in local storage the country is in the
    // favorite countries array.
    // O(M) time complexity.
    const savedFavoriteCountries = JSON.parse(localStorage.getItem("favoriteCountries"));

    // O(M) time complexity [includes method].
    if (savedFavoriteCountries) {
        if (savedFavoriteCountries.includes(country.name.common)) {
            favoriteIcon.classList.add("liked");
        }
    }

    favoriteIcon.onclick = () => {
        favoriteIcon.classList.toggle("liked");
        const countryLiked = favoriteIcon.classList.contains("liked");

        if (countryLiked) {
            console.log(`Added ${country.name.common} to favorites.`);
            saveToFavorite(country.name.common);
        } else {
            console.log(`Removed ${country.name.common} from favorites.`);
            removeFromFavorite(country.name.common);
        }
    };

    cardBody.appendChild(countryName);
    cardBody.appendChild(countryRegion);
    cardBody.appendChild(countryPopulation);

    cardFooter.appendChild(favoriteIcon);

    card.appendChild(flag);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    cardsContainer.appendChild(card);
    countriesCards[country.name.common] = card;
};

// Base time complexity is O(N).
// Inside the loop, we have O(M) time complexity.
// Thus, the total time complexity is O(N * M) or in short O(NM).
const populateCountriesCards = () => {
    allCountries.forEach((country) => {
        createCard(country);
    });
};

populateCountriesCards();

const arrangeCountriesCards = () => {
    allCountries.forEach((country) => {
        const countryName = country.name.common;
        const countryID = "card-" + countryName;

        // If it does not exist in the namesOfShownCountries array.
        // We need to hide it from the DOM.
        if (!namesOfShownCountries.has(countryName)) {
            document.getElementById(countryID).style.display = "none";
        }
        // If it is in the namesOfShownCountries array.
        // We need to show it in the DOM.
        else if (namesOfShownCountries.has(countryName)) {
            document.getElementById(countryID).style.display = "block";
        }
    });
};

const sortASCAndDESCBtn = document.getElementById("btn-sort");

sortASCAndDESCBtn.onclick = () => {
    const orderType = sortASCAndDESCBtn.getAttribute("data-order-type");

    if (orderType === "asc") {
        // Change to the opposite order type - descending.
        sortASCAndDESCBtn.style.backgroundImage = `url("./images/icons8-descending-down-24.png")`;
        sortASCAndDESCBtn.style.ariaDescription = "Descending order image";
        sortASCAndDESCBtn.setAttribute("data-order-type", "desc");
    } else {
        // The order type is desc, if it is not desc then default to descending order.
        // Change to the opposite order type - ascending.
        sortASCAndDESCBtn.style.backgroundImage = `url("./images/icons8-ascending-up-24.png")`;
        sortASCAndDESCBtn.style.ariaDescription = "Ascending order image";
        sortASCAndDESCBtn.setAttribute("data-order-type", "asc");
    }
};

export { arrangeCountriesCards };
