const db = require("../data/database");

async function authenticateUSer(req, res, next) {
    const user = req.session.user
    const isAuth = req.session.isAuthenticated;
    
    if(!user || !isAuth){
      return next();
    }
  
    const adminUser = await db.getDb().collection("users").findOne({_id : user.id})
    const isAdmin = adminUser.isAdmin
    res.locals.isAuth = isAuth
    res.locals.isAdmin = isAdmin
    next()
  }

module.exports = authenticateUSer  