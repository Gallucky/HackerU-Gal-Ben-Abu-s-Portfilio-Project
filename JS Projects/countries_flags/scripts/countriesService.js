const getCountries = async () => {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        return await res.json();
    } catch (error) {
        console.log(error);
    }
};

const allCountries = await getCountries();
let shownCountries = [...allCountries];

const resetShownCountries = () => {
    shownCountries = [...allCountries];
};

const searchCountry = (country) => {
    const countryName = country.toLowerCase();
    const filteredCountries = allCountries.filter((word) => {
        const wordLower = word.name.common.toLowerCase();
        return wordLower.includes(countryName);
    });

    return filteredCountries;
};

export { allCountries, shownCountries, searchCountry, resetShownCountries };
