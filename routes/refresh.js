const router = require('express').Router();
const { test } = require('../utils/buid_data');

router.get('/' , async (req, res) => {
    await test();
    res.redirect('/');
})

module.exports = router;