const axios = require('axios');
const cheerio = require('cheerio');

const getPostTitles = async () => {
  try{
    const {data} = await axios.get('https://old.reddit.com/r/programming/');
    //console.log(data);

    const $ = cheerio.load(data);
    const guidelines = [];
    const postTitles = [];

    // to get text in form of array
    $('p.title > a').each((idx, el) => {
      const postTitle = $(el).text();
      postTitles.push(postTitle);
    });

    // $('.md ul li').each((idx, el) => {
    //   const guideline = $(el).text();
    //   guidelines.push(guideline);
    // });

    $('.md').find('ul').first().each((i, el) => {
      let guideline = $(el).text().trim();
      guidelines.push(guideline);
    });

    console.log(guidelines);

    return postTitles;

  }
  catch(error){
    throw error;
  }
}

getPostTitles()
.then((postTitles) => console.log(postTitles))
.catch(err => console.log(err));

// to get just the text
// console.log($('.md ul li').text());
