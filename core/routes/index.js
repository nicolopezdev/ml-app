const express = require('express');
const router = express.Router();
const logger = require('../common/logger');
const { returnCommonResponse } = require('../common/common');
const { fetchItems, fetchItemById, fetchItemDescriptionById, fetchCategoryById } = require('../endpoints/ml.endpoints');

router.get('/items', async(req, res, next) => {
    const queryString = req.query.q;
    
    if (!queryString) {
        const message = `You have not specified any product to search`;
        logger.info(message);
        return returnCommonResponse(res, message, 400);
    }
    
    const items = await fetchItems(queryString);
    res.json(items);
    next();
});

router.get('/items/:id', async(req, res, next) => {
    const id = req.params.id;
    
    if (!id) {
        const message = `You have not specified any product ID`;
        logger.info(message);
        return returnCommonResponse(res, message, 400);
    }
    
    let item = await fetchItemById(id);
    let description = await fetchItemDescriptionById(id);
    item.description = description;
    res.json(item);
    next();
});

// Endpoint to get breadcrumb data
router.get('/categories/:id', async(req, res, next) => {
    const id = req.params.id;

    if (!id) {
        const message = `You have not specified any category ID`;
        logger.info(message);
        return returnCommonResponse(res, message, 400);
    }

    let category = await fetchCategoryById(id);
    res.json(category);
    next();
});

module.exports = {
    router
}