const getCountries = async () => {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        return await res.json();
    } catch (error) {
        console.log(error);
    }
};

const allCountries = await getCountries();
console.log(allCountries);
const allCountriesNames = new Set(allCountries.map((country) => country.name.common));
let namesOfShownCountries = [...allCountriesNames];

const resetShownCountries = () => {
    namesOfShownCountries = [...allCountriesNames];
};

const setShownCountries = (countries) => {
    namesOfShownCountries = countries.map((country) => country.name.common);
};

const searchCountry = (country) => {
    const countryName = country.toLowerCase();
    const filteredCountries = allCountries.filter((word) => {
        const wordLower = word.name.common.toLowerCase();
        return wordLower.includes(countryName);
    });

    return filteredCountries;
};

const sortCountries = (type, by = "name") => {
    const sortByMap = {
        name: (country) => country.name.common.toLowerCase(),
        region: (country) => country.region.toLowerCase(),
        population: (country) => country.population,
    };

    // If the result returns an undefined value break out of the function and return.
    if (!sortByMap[by]) {
        console.log("by = ", by);
        console.log("sortByMap[by] = ", sortByMap[by]);
        return;
    }

    console.log("Before Sorting\n", namesOfShownCountries);

    namesOfShownCountries = [...allCountries]
        // The sort method is a destructive method,
        // hence why we use a shallow copy of allCountries array.
        .sort((curr, next) => {
            const currValue = sortByMap[by](curr);
            const nextValue = sortByMap[by](next);

            // If statement is true the next value switch places with the current value.
            // When the currentValue and nextValue are of type string,
            // the comparison is done by dictionary-like order (lexicographically).
            // NOTE: This if statements are telling the sort method how to rearrange the array,
            //       based on this logic and result values:
            //       1 -> next value needs to go before the current value.
            //       -1 -> next value needs to go after the current value.
            //       0 -> order does not change.
            if (type === "asc") return currValue > nextValue ? 1 : currValue < nextValue ? -1 : 0;
            if (type === "desc") return currValue < nextValue ? 1 : currValue > nextValue ? -1 : 0;

            // No sorting.
            return 0;
        })
        .map((country) => country.name.common);

    console.log("After Sorting\n", namesOfShownCountries);
};

export {
    allCountries,
    namesOfShownCountries,
    searchCountry,
    resetShownCountries,
    setShownCountries,
    sortCountries,
};
