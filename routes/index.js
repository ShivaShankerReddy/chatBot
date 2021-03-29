const express = require('express');

const router = express.Router();

const controllers = require('../controllers/');


/* GET home page. */
router.get('/home', (req, res) => {
    res.send({ express: 'Express' });
});


router.post('/chat', controllers.skillExtraction);


module.exports = router;
