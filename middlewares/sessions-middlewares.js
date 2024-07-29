const session = require("express-session");
const mongodbSession = require("connect-mongodb-session");


function createMongodbSession(){
    const mongodbStore = mongodbSession(session)
    
    const sessionStore = new mongodbStore({
        uri: "mongodb://localhost:27017",
        databaseName: "electro",
        collection: "session",
      });

    return sessionStore;                                                                                                                                                                                                
}


function configMongodbSession(){
    return {
        secret: "super-secret",
        resave: false,
        saveUninitialized: false,
        store: createMongodbSession(),
        cookie: {
          maxAge: 30 * 24 * 60 * 1000 * 60,
          sameSite : "lax"
        },
      }
}

module.exports = configMongodbSession