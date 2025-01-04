const getCountries = async () => {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        return await res.json();
    } catch (error) {
        console.log(error);
    }
};

const allCountries = await getCountries();
const allCountriesNames = new Set(allCountries.map((country) => country.name.common));
let namesOfShownCountries = new Set(allCountriesNames);

const resetShownCountries = () => {
    namesOfShownCountries = new Set(allCountriesNames);
};

const setShownCountries = (countries) => {
    namesOfShownCountries = new Set(countries.map((country) => country.name.common));
};

const searchCountry = (country) => {
    const countryName = country.toLowerCase();
    const filteredCountries = allCountries.filter((word) => {
        const wordLower = word.name.common.toLowerCase();
        return wordLower.includes(countryName);
    });

    return filteredCountries;
};

export {
    allCountries,
    namesOfShownCountries,
    searchCountry,
    resetShownCountries,
    setShownCountries,
};
