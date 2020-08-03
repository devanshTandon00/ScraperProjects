require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// using nightmare to create an amazon price checker
const nightmare = require('nightmare')()

// This is the argument array. Node is at position 0, fileName at position 1.
// input url by user at position 2
const url = process.argv[2]
// minimum price for which user wants an alert
const minPrice = process.argv[3]

priceTracker()

async function priceTracker(){
  const priceString = await nightmare.goto(url)
            // wait for price element to load on the screen
           .wait('#priceblock_dealprice')
           // write js code to access price element
           .evaluate(() => document.getElementById('priceblock_dealprice').innerText)
           .end()

  const formattedPriceString = parseFloat(priceString.replace('$', ''))

  if(formattedPriceString < minPrice){
    sendEmail(
      'Affordable price',
      `The item at ${url} has dropped its price below ${minPrice}`
    )
  }
}

// created a temp mail for testing
function sendEmail(subject, body){
  const email = {
    to: 'jasojil509@in4mail.net',
    from: 'dtdansh@gmail.com',
    subject: subject,
    text: body,
    html: body
  }

  sgMail.send(email).then(() => {
    console.log('Message sent')
  }).catch((error) => {
    console.log(error.response.body)
  })
}
