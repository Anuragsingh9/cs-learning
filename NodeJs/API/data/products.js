// fetchData.js

const fetchThirdPartyData = () => {
    return fetch('https://fakestoreapi.com/products?limit=5')
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching data from third-party API:', error);
            return []; // Return an empty array or handle the error as needed
        });
};

module.exports = fetchThirdPartyData;
