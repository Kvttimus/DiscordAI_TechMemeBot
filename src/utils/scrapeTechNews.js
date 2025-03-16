/*
- Identifies & scrapes news articles from HackerNews
*/

// Load the environment variables using dotenv package
require('dotenv').config({path: '../.env'});

const axios = require('axios');

const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY  // get openai api key from .env
})
// const openai = process.env.OPENAI_API_KEY;  // get openai api key from .env

async function classifyTechArticle ( title ) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "Classify the following article title as either STEM-related (Technology, IT, STEM, Math, Physics, Computers, Engineering, Cybersecurity, etc.) or not."},
                { role: "user", content: `Title: ${title}". Answer only with "STEM" or "NOT STEM". Also, classify all political news articles (e.g. Elon Musk or Trump) as "NOT STEM".`}
            ]
        });

        const classification = response.choices[0].message.content.trim();
        return classification === "STEM";
    } catch (error) {
        console.error(`AI classification failed: ${error}`);
        return false;
    }
}


// limit: # of tech articles scraped
async function fetchHackerNewsArticles ( limit ) {
    try {
        // get list of top story IDs
        // const topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
        const topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json';
        const { data: storyIds } = await axios.get(topStoriesUrl);

        // get details of the top 'limit' stories
        const articles = await Promise.all(
            storyIds.slice(0, limit).map(async (id) => {
                const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

                const { data: story } = await axios.get(storyUrl);
                console.log(`found title: ${story.title}`)  // DEBUG
                console.log(`found url: ${story.url}`)  // DEBUG

                if (!story || !story.title || !story.url) return null;

                // AI-based title/content classification
                const isSTEM = await classifyTechArticle(story.title);
                if (!isSTEM) return null;  // filter out non-stem articles

                console.log(`STEM article found: ${story.title}`);  // DEBUG
                return { title: story.title, url: story.url };
            })
        );

        console.log("fetched articles!!");
        // return articles;
        return articles.filter(article => article !== null).slice(0, limit);
    } catch (error) {
        console.log("error fetching HackerNews articles", error);
        return [];
    }
};

// test function
// fetchHackerNewsArticles(10).then(console.log());

module.exports = {fetchHackerNewsArticles};