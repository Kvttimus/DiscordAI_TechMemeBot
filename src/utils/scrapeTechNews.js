/*
- Identifies & scrapes news articles from HackerNews
*/

const axios = require('axios');

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

                // the story?.title returns undefined/null instead of an error
                return { title: story?.title, url: story.url };  
            })
        );

        console.log("fetched articles!!");
        return articles;
    } catch (error) {
        console.log("error fetching HackerNews articles", error);
        return [];
    }
};

// test function
// fetchHackerNewsArticles(3).then(console.log());

module.exports = {fetchHackerNewsArticles};