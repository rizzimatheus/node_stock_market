var express = require('express');
const request = require("request");
var router = express.Router();

// https://iexcloud.io/
function call_api(symbol, finishedAPI) {
    api_key = ""
    request('https://cloud.iexapis.com/stable/stock/' + symbol + '/quote?token=' + api_key,
        {json: true, timeout: 5000},
        (err, resp, body) => {
            if (err) {
                return console.log(err);
            } else if (resp.statusCode == 200) {
                // console.log(body);
                finishedAPI(body);
            } else {
                finishedAPI("Unknown symbol");
            };
    });
}

/* GET stock page. */
router.get('/', function(req, res, next) {
    call_api("aapl", function (doneAPI) {
        res.render('stock', {
            title: 'Stock Market',
            stock: doneAPI,
        });
    });
});

/* POST stock page. */
router.post('/', function(req, res, next) {
    symbol = req.body.stock_ticker;
    call_api(symbol, function (doneAPI) {
        if (doneAPI == "Unknown symbol") {
            err = {
                status: "Exemple:",
                stack: 'Use "aapl" for Apple Inc. or "tsla" for Tesla, Inc.',
            }
            res.render('error', {
                message: 'Failed to find stock with this symbol (' + symbol + ')',
                error: err,
            });
        }
        res.render('stock', {
            title: 'Stock Market',
            stock: doneAPI,
        });
    });
});

module.exports = router;
