const errorHandler = (req, res) => {
    return res.status(500).json({
        statusCode: 500,
        message: res.locals.error, 
    });
};

module.exports = errorHandler;