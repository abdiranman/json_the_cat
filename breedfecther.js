const request = require('request');

const apiUrl = 'https://api.thecatapi.com/v1/breeds';

const fetchBreedDescription = function(breedName, callback) {
  request(apiUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(`API request failed with status code: ${response.statusCode}`, null);
      return;
    }

    try {
      const data = JSON.parse(body);
      const breed = data.find(entry => entry.name.toLowerCase() === breedName.toLowerCase());

      if (breed) {
        callback(null, breed.description);
      } else {
        callback(`Breed "${breedName}" not found.`, null);
      }
    } catch (parseError) {
      callback(`Error parsing response: ${parseError}`, null);
    }
  });
};

module.exports = { fetchBreedDescription };