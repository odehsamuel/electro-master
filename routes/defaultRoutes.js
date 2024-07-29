const express = require("express");

const authController = require("../controller/auth-controller")

const router = express.Router();

router.get("/", authController.getHome);

router.get("/sign-in", authController.getSignup);

router.post("/sign-in", authController.signUp);

router.get("/login", authController.getLogin);

router.post("/login", authController.login);

router.get("/logout", authController.getLogout);

router.get("/blank", authController.getBlank);

router.get("/terms", authController.getTermsAndConditions);

router.get('/404', authController.get404)


module.exports = router;
