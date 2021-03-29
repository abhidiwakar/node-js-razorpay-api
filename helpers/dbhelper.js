const { response } = require("express")
const db = require("../config/dbconfig")


module.exports = {
    getProperty: (propertyName, callback) => {
        let query = `SELECT * FROM properties WHERE property = '${propertyName}' LIMIT 1`
        db.query(query, (error, result) => {
            if (error) {
                callback(error.message, null)
            } else {
                if (result.length > 0 && result[0].value != null) {
                    callback(null, result[0].value)
                } else {
                    callback("Property doesn't exists or it's value is null", null)
                }
            }
        })
    },
}