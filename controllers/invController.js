const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}
invCont.buildDetailView = async function (req, res, next) {
    const invId = req.params.invId
    const data = await invModel.getInventoryByInvId(invId)
    let nav = await utilities.getNav()
    if (data.length > 0) {
        res.render("./inventory/detail", {
            title: data[0].inv_make + " " + data[0].inv_model + " details",
            nav,
            vehicle: data[0],
        })
    } else {
        res.status(404).render("errors/404", { title: "Vehicle Not Found", nav })
    }
}

module.exports = invCont