const cheerio = require('cheerio');
const axios = require('axios');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb+srv://dtdansh:Devansht20@scraperdb.mm1eo.mongodb.net/scraperDB?retryWrites=true&w=majority';

//database name
const db = 'DB';

let object = [];

const getPostInfo = async () => {
  const {data} = await axios.get('https://www.imdb.com/search/title/?groups=top_1000&ref_=adv_prv');
  // console.log(data)

  const $ = cheerio.load(data);

  const titles = [];
  const date = [];
  const runtime = [];
  const rating = [];
  const metascore = [];
  const votes = [];
  const grossEarning = [];

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

  $('.ratings-bar').each((i, el) => {
    if ($(el).find('.ratings-metascore .favorable').length > 0) {
      metascore[i] = $(el).find('.ratings-metascore .favorable').text().trim();
    }

    if ($(el).find('.ratings-metascore .mixed').length > 0) {
      metascore[i] = $(el).find('.ratings-metascore .mixed').text().trim();
    }
  })

  const nv = [];

  $('.sort-num_votes-visible').each((i, el) => {
    if($(el).find('span')){
      // text-muted has text 'votes:', however we need the number of votes which is in next() span tag
      nv[i] = $(el).find('.text-muted').next().text();
      votes[i] = nv[i].split('$')[0];
      grossEarning[i] = '$' + nv[i].split('$')[1];
    }
  })

//use connect to connect to db
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const database = client.db(db);

    for (let i = 0; i < 50; i++) {
      object[i] = {
        title: titles[i],
        date: date[i],
        runtime: runtime[i],
        rating: rating[i],
        metascore: metascore[i],
        votes: votes[i],
        grossEarning: grossEarning[i]
      }
    }

    // use insertMany and pass an array of object containing the postInfo to mongodb database
    database.collection('postInfo').insertMany(object)

    client.close();
  });

  return object;
}

getPostInfo()

//getPostInfo().then(obj => console.log(obj))
//module.exports.object = getPostInfo;
