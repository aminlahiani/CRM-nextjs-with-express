
const jwt = require('jsonwebtoken')

const Admin = require("../models/admin")
const Manager = require('../models/manager')
const Employee = require('../models/Employee')

const auth = async (req, res, next) => {
    try {
        const token =  req.session.token
        //const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        let user

        if(decoded.role === "ADMIN"){
            user = await Admin.findOne({ _id: decoded._id })
        }else if(decoded.role === "MANAGER") {
          user = await Manager.findOne({ _id: decoded._id })
         }else{
          user = await Employee.findOne({ _id: decoded._id })
        }
        
        if (!user) {
            req.user = null
            return next()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        req.user = null
        next()
    }
}

module.exports = auth