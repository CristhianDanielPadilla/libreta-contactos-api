const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');

router.use('/contacts', require('./api/contacts'));
router.use('/auth', require('./api/auth'));

router.get('/', (req, res) => {
    res.send('MUY BIEN');
});

modules.express = router;