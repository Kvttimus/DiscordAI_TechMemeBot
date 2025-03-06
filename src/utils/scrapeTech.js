/*
Purpose: Scrape web articles/tech memes and stuff
*/

const axios = require('axios');
const cheerio = require('cheerio');

async function fetchTechArticles()
{
    try
    {
        // Fetch the webpage w/ axios
        const {data} = await axios.get("https://thehackernews.com/");

        // Load HTML into cheerio
        const $ = cheerio.load(data);

        // Extract article titles & links
        const articles = [];
        $('.post-block_title a').each((index, element) => {
            const title = $(element).text().trim();
            const url = $(element).attr('href');
            articles.push({title, url});
        });
        
        return articles;
    } catch (error) {
        console.error(`Error fetching articles: ${error}`);
        return [];
    }
};

// Export the function
module.exports = {fetchTechArticles};