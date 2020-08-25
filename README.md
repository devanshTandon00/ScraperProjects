These are sample web scraping projects using libraries such as Nightmare and cheerio

1. Amazon Price Tracker:
  This sends an email at the provided email address with a message to notify the
  user when there is a price drop below their set price. SendGrid was used to send emails and temp mail to create a tester email address.

    Use this format to correctly run the code: node cronJob.js amazonURL minPrice emailID

    emailID = ID where you want the updates,
    minPrice = price the scraper should look out for

    This only tracks for objects that are not on deal.

2. Reddit Scraper:
  Scrapes the post titles on the page and returns them in an array. Furthered the challenge to scrape
  the guidelines section as well.
