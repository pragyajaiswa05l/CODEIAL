// index.js is the entry point of all the routes(this)


const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');


console.log('router loaded');

router.get('/', homeController.home);

//for any further routes access from here
//router.use('/routerName',require('./routerfile'));
router.use('/users',require('./users'));
router.use('/users',require('./posts'));


module.exports = router;