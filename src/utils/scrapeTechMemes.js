const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});

const snoowrap = require('snoowrap');

const redditUser = process.env.REDDIT_DEV_NAME;
const redditPass = process.env.REDDIT_PWD;
const redditId = process.env.REDDIT_ID;
const redditSecret = process.env.REDDIT_SECRET;

const reddit = new snoowrap({
    userAgent: `tech-meme-bot by /u/${redditUser}`,
    clientId: `${redditId}`,
    clientSecret: `${redditSecret}`,
    username: `${redditUser}`,
    password: `${redditPass}`
});

async function fetchMemes ( limit ) {
    const posts = await reddit.getSubreddit('ProgrammerHumor').getTop({ time: 'day', limit});

    // posts.forEach(post => {
    //     const { title, url, permalink } = post;
        
    //     if (post.url.endsWith('.jpg') || post.url.endsWith('.png') || post.url.endsWith('.gif')) {
    //         console.log(`Meme Found: ${title}`);
    //         console.log(`URL: ${url}`);
    //         console.log(`Link: ${permalink}`);
    //         console.log(`--------`);

    //         // return { title, url, permalink };
    //         return post;
    //     } 
    // })

    // Filter image posts and return them as an array
    const memes = posts
        .filter(post => post.url.endsWith('.jpg') || post.url.endsWith('.png') || post.url.endsWith('.gif'))
        .map(post => ({
            title: post.title,
            url: post.url,
            permalink: post.permalink
        }));

    return memes;
}

// fetchMemes(4);

module.exports = {fetchMemes}