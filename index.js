const express = require('express');
const meli = require('mercadolibre-nodejs-sdk');
const dotenv = require('dotenv');
const result = dotenv.config()
if (result.error) {
  throw result.error
}
const app = express()
const port = 3000;
let apiInstance = new meli.OAuth20Api();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/vuelta', (req, res) => {
  if (!req.query || !req.query.code) res.send('Error');
  let opts = {
    'grantType': "authorization_code", // String | 
    'clientId': process.env.CLIENT_ID, // String | 
    'clientSecret': process.env.CLIENT_SECRET, // String | 
    'redirectUri': process.env.REDIRECT_URI, // String | 
    'code': `${req.query.code}`, // String | 
    // 'refreshToken': "refreshToken_example" // String | 
  };
  apiInstance.getToken(opts, (error, data, response) => {
    if (error) {
      console.error(error);
      res.send('Error');
    } else {
      console.log('API called successfully.');
      res.send(JSON.stringify(response))
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
