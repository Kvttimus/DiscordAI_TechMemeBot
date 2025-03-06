const axios = require('axios');

async function fetchMeme() {
    try
    {
        const response = await axios.get('https://memebase.cheezburger.com/tag/tech-memes');
        return response.data.url();  // returns meme img URL
    } catch (error) {
        console.error(`Error fetching meme: ${error}`);
    }
}

// Export the function
module.exports = {fetchmeme};