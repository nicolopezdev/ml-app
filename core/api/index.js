const express = require('express');
const router = express.Router();
const request = require('axios');
const logger = require('../common/logger');
const returnCommonResponse = require('../common/common');
const URL = process.env.ML_BASE_API_URL;
const NAME = process.env.SIGNATURE_NAME;
const LASTNAME = process.env.SIGNATURE_LASTNAME;

router.get('/items', async(req, res, next) => {
    const query = req.query.q;

    if (!query) {
        next();
    }

    const items = await fetchData(query);
    res.json(items);
    console.log(items)
    next();
});

const fetchData = async(query) => {
    logger.info(`Fetching products that match: ${query}`);
    const items_query_url = URL + '/sites/MLA/search';
    let response;

    try {
        response = await request.get(items_query_url, {
            params: {
                q: query
            }
        });
        return formatResponse(response);
    } catch (e) {
        const errorMessage = `Error getting products ${e}`;
        logger.error(errorMessage);
        return returnCommonResponse(res, errorMessage, 500);
    }
};

const formatResponse = (payload) => {
    return payload.data.results.map(item => {
        return {
            "author": {
                "name": NAME,
                "lastname": LASTNAME
            },
            "item": {
                "id": item.id,
                "title": item.title,
                "price": {
                    "currency": item.currency_id,
                    "amount": Math.floor(item.price),
                    "decimals": Math.trunc(item.price)
                },
                "picture": item.thumbnail,
                "condition": item.condition,
                "free_shipping": item.shipping.free_shipping,
                "sold_quantity": item.sold_quantity,
                "description": item.title
            }
        }
    })
}

module.exports = {
    router
}