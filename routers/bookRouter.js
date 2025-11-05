// importo il framework express
const express = require("express");

// importiamo il controller
const bookController = require('../controllers/bookController');

// settiamo il router
const router = express.Router();

// index
router.get('/', bookController.index)

// show
router.get('/:id', bookController.show)

// Store reviews
router.post('/:id/reviews', bookController.storeReview)

module.exports = router;