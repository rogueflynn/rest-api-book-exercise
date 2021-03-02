const fs = require('fs');
const util = require('util');
const access  = util.promisify(fs.access);
const compareIds = (a, b) => {
    return a.id - b.id;
};

const checkFile = async (directory) => {
    try { 
        await access(directory);
    } catch(err) {
        return false;
    }
    return true;
};

const catchRejectedPromise = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        res.locals.error = err.message;
        next();
    });
};

module.exports = {
    compareIds,
    catchRejectedPromise,
    checkFile,
};