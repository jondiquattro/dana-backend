var express = require('express');
var router = express.Router();
require('dotenv').config();

const AWS = require('aws-sdk');

const SESConfig = {
  region: process.env.AWS_SES_REGION,
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  apiVersion: '2010-12-01'
};


var params = {
  Destination: {
    BccAddresses: [
    ],
    CcAddresses: [
    ],
    ToAddresses: [
      "jondiquattro@hotmail.com"
    ]
  },
  Message: {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: "This message body contains HTML formatting. It can, for example, contain links like this one: <a class=\"ulink\" href=\"http://docs.aws.amazon.com/ses/latest/DeveloperGuide\" target=\"_blank\">Amazon SES Developer Guide</a>."
      },
      Text: {
        Charset: "UTF-8",
        Data: "This is the message body in text format."
      }
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Test email"
    }
  },
  Source: "it@danamichellewellness.com",
};

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("config: ", SESConfig);
  new AWS.SES(SESConfig).sendEmail(params).promise();

  res.send('Hello World!');
});

module.exports = router;
