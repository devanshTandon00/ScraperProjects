const cheerio = require('cheerio');
const axios = require('axios');

const getPostInfo = async() => {
  const {data} = await axios.get('https://www.imdb.com/search/title/?groups=top_1000&ref_=adv_prv');
  // console.log(data)

  const $ = cheerio.load(data);

  const titles = [];
  const date = [];
  const genre = [];
  const runtime = [];
  const rating = [];

  $('h3 a').each((i, el) => {
    titles[i] = $(el).text().trim();
  })

  $('h3 .lister-item-year').each((i, el) => {
    date[i] = $(el).text();
  })

  $('.runtime').each((i, el) => {
    runtime[i] = $(el).text().trim();
  });

  $('.ratings-imdb-rating').each((i, el) => {
    rating[i] = $(el).text().trim();
  })

  let object = {};

  for(let i = 0; i < 50; i++){

    object[i] =
    {
      title: titles[i],
      date: date[i],
      runtime: runtime[i],
      rating: rating[i]
    };
  }

  console.log(object);
}

getPostInfo();
