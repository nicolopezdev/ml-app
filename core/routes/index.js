const express = require('express');
const router = express.Router();
const logger = require('../common/logger');
const { returnCommonResponse } = require('../common/common');
const { fetchItems,
    fetchItemById,
    fetchItemDescriptionById,
    fetchCategoryById
} = require('../endpoints/ml.endpoints');

router.get('/items', async(req, res, next) => {
    const queryString = req.query['q'];
    const limit = req.query['limit'];
    const offset = req.query['offset'];
    let items;
    
    if (!queryString) {
        const message = `You have not specified any product to search`;
        logger.info(message);
        return returnCommonResponse(res, message, 400);
    }
    
    try {
        items = await fetchItems(queryString, limit, offset);
    } catch(e) {
        const errorMessage = `Error getting items for query ${queryString}. ${e.message}`;
        logger.error(errorMessage);
        return returnCommonResponse(res, errorMessage, 500);
    }

    res.json(items);
    next();
});

router.get('/items/:id', async(req, res, next) => {
    const id = req.params.id;
    let item;
    let description;
    
    if (!id) {
        const message = `You have not specified any product ID`;
        logger.info(message);
        return returnCommonResponse(res, message, 400);
    }
    
    try {
        item = await fetchItemById(id);
    } catch(e) {
        const errorMessage = `Error getting data for item ${id}. ${e}`;
        logger.error(errorMessage);
        return returnCommonResponse(res, errorMessage, 500);
    }
    
    if (!item) {
        const message = `Did not found any product with ID ${id}`;
        logger.info(message);
        return returnCommonResponse(res, message, 404);
    }

    try {
        description = await fetchItemDescriptionById(id);
    } catch(e) {
        const errorMessage = `Error getting description for item ${id}. ${e}`;
        logger.error(errorMessage);
        return returnCommonResponse(res, errorMessage, 500);
    }

    item.description = description;
    res.json(item);
    next();
    
});

// Endpoint to get breadcrumb data
router.get('/categories/:id', async(req, res, next) => {
    const id = req.params.id;
    let category
    
    if (!id) {
        const message = `You have not specified any category ID`;
        logger.info(message);
        return returnCommonResponse(res, message, 400);
    }
    
    try {
        category = await fetchCategoryById(id);
    } catch(e) {
        const errorMessage = `Error getting category for Id ${id}. ${e}`;
        logger.error(errorMessage);
        return returnCommonResponse(res, errorMessage, 500);
    }
    
    if (!category) {
        const message = `Did not found any category with ID ${id}`;
        logger.info(message);
        return returnCommonResponse(res, message, 404);
    }
    
    res.json(category);
    next();
});

module.exports = {
    router
}