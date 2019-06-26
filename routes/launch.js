const express = require('express');
const router = express.Router();
const comproDLS = require('comprodls-sdk').init('staging1');
const { ORG_ID, USERNAME, PASSWORD, PRODUCT_UUID }  = process.env;

router.get('/', function(req, res, next) {
  comproDLS.authWithCredentials(ORG_ID, { username: USERNAME, password: PASSWORD }, {}).then(
    (response) => {
      res.redirect(`https://cosmatt-dev.comprodls.com/app/courses/training/${PRODUCT_UUID}/content/0/0?access_token=${getEncodedDLSToken(response.token)}&org_id=${response.user.org.id}&uuid=${response.user.uuid}`)
    },
    (err) => {
      console.log('error', err);
      res.send(err);
    }
  );
});

function getEncodedDLSToken(dlsToken) {
  if ( dlsToken )
    return encodeURIComponent(Buffer.from(JSON.stringify(dlsToken)).toString('base64'));
  return '';
}

module.exports = router;
