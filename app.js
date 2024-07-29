const path = require("path");

const csrf = require("csurf")

const session = require("express-session");
const express = require("express");

let port = 3000

if(process.env.PORT){
  port = process.env.PORT
}

const db = require("./data/database");
const defaultRoutes = require("./routes/defaultRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");

const csrfmiddleware = require("./middlewares/csrfToken")
const errorHandlerMiddleware = require("./middlewares/error-handler")
const configuredMongodbSessionMiddleware = require("./middlewares/sessions-middlewares")

const authUser = require("./middlewares/authentication");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session(configuredMongodbSessionMiddleware())
);
app.use(csrf());
app.use(csrfmiddleware)

app.use(authUser);

app.use(defaultRoutes);
app.use(productRoutes);
app.use("/admin", adminRoutes);


// app.get("/404", function (req, res) {
//   res.render("404");
// });

// app.use(function (error, req, res, next) {
//   res.status(500).render("default/500");
// });
app.use(errorHandlerMiddleware)

db.connectToDatabase().then(function () {
  app.listen(port);
});
