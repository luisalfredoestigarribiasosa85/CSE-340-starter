const express = require('express')
const router = new express.Router()
const invController = require('../controllers/invController')

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId)
router.get("/detail/:invId", invController.buildDetailView)
router.get("/trigger-error", (req, res, next) => {
    const error = new Error("Intentionally triggered error for testing")
    error.status = 500
    next(error)
})

module.exports = router