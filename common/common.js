function returnCommonResponse(res, message, status, data) {
    if (!status) {
        status = 201;
    }
    
    return res.status(status).send({
        data,
        message,
        status,
    });
}

module.exports = {
    returnCommonResponse
}