const request = require('request');

const apiUrl = 'https://api.thecatapi.com/v1/invalid'; 

// Get the breed name from command-line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Please provide a breed name as a command-line argument.');
  process.exit(1);
}
const breedToSearch = args[0];

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Request error:', error); // Print the request error details
    return;
  }

  if (response.statusCode !== 200) {
    console.error('API request failed with status code:', response.statusCode);
    return;
  }

  try {
    const data = JSON.parse(body); // Parse the response body into an object
    const breed = data.find(entry => entry.name.toLowerCase() === breedToSearch.toLowerCase());

    if (breed) {
      console.log('Description:', breed.description);
    } else {
      console.log(`Breed "${breedToSearch}" not found.`);
    }
  } catch (parseError) {
    console.error('Error parsing response:', parseError);
  }
});