const express = require('express');

const router = express.Router();
const passport = require('passport');
const postsApi = require("../../../controllers/api/v1/posts_api");


router.get('/', postsApi.index);

//this will put an authentication check in my passport
router.delete('/:id', passport.authenticate('jwt', {sesssion:false}),postsApi.destroy);

module.exports = router;