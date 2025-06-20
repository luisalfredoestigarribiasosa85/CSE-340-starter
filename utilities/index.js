const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    console.log(data.rows)
    let list = "<ul>"
    list += '<li><a href="/" title="Home page" class="nav-link">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list +=
            '<a class="nav-link" href="/inv/type/' +
            row.classification_id +
            '" title="See our inventory of ' +
            row.classification_name +
            ' vehicles">' +
            row.classification_name +
            "</a>"
        list += "</li>"
    })
    list += "</ul>"
    return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
    let grid
    if (data.length > 0) {
        grid = '<ul id="inv-display">'
        data.forEach(vehicle => {
            grid += '<li>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id
                + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + 'details"><img src="' + vehicle.inv_thumbnail
                + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + ' on CSE Motors" /></a>'
            grid += '<div class="namePrice">'
            grid += '<hr />'
            grid += '<h2>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
                + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
                + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
            grid += '</h2>'
            grid += '<span>$'
                + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
            grid += '</div>'
            grid += '</li>'
        })
        grid += '</ul>'
    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

/* ****************************************
    * A custom function in the utilities > index.js file that will take the specific vehicle's information and wrap it up in HTML to deliver to the view
    * **************************************** */
Util.buildDetailView = async function (data) {
    let view = ""
    if (data.length > 0) {
        view += '<div class="detail">'
        view += '<h1>' + data[0].inv_make + ' ' + data[0].inv_model + '</h1>'
        view += '<img src="' + data[0].inv_image + '" alt="Image of ' + data[0].inv_make + ' ' + data[0].inv_model + '" />'
        view += '<p>Price: $' + new Intl.NumberFormat('en-US').format(data[0].inv_price) + '</p>'
        view += '<p>Color: ' + data[0].inv_color + '</p>'
        view += '<p>Mileage: ' + new Intl.NumberFormat('en-US').format(data[0].inv_mileage) + ' miles</p>'
        view += '<p>Description: ' + data[0].inv_description + '</p>'
        view += '</div>'
    } else {
        view = '<p class="notice">Sorry, no matching vehicle could be found.</p>'
    }
    return view
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util