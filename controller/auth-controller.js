const User = require("../model/user.models");
const sessionUtils = require("../utils/sessions");
const userDetailsValid = require("../utils/validation");

function getHome(req, res) {
  res.render("default/index");
}

function getSignup(req, res) {
  // flash inputData if there is a problem
  let sessionInputData = sessionUtils.getSession(req);

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  res.render("users-signup/sign-in", {
    inputData: sessionInputData
  });
}

async function signUp(req, res, next) {
  const user = new User(req.body);

  let emailAlreadyExist;
  try {
    // check for registered email
    emailAlreadyExist = await user.existingUser();
  } catch (error) {
    return next(error);
  }

  if (!userDetailsValid(req.body) || emailAlreadyExist) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid creditials - pls enter the valid credentials!",
      name: req.body["user-name"],
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.password2,
    };
    req.session.save(() => {
      res.redirect("/sign-in");
    });
    return;
  }

  try {
    await user.signup();
  } catch (error) {
    return next(error);
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  // flash inputData if there is a problem
  let sessionInputData = sessionUtils.getSession(req);

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      password: "",
    };
  }

  res.render("users-signup/login", {
    inputData: sessionInputData,
  });
}

async function login(req, res, next) {
  const user = new User(req.body);

  let existingUser;
  try {
    existingUser = await user.existingUser();
  } catch (error) {
    return next(error);
  }

  const inputDataInfo = {
    hasError: true,
    email: req.body.email,
    password: req.body.password,
  };

  if (!existingUser) {
    req.session.inputData = {
      message: "Invalid details - try signing in",
      ...inputDataInfo,
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  let equalPassword;
  try {
    equalPassword = await user.comparePassword(existingUser.password);
  } catch (error) {
    return next(error);
  }

  if (!equalPassword) {
    req.session.inputData = {
      message: "Incorrect password",
      ...inputDataInfo,
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  // initiate session ticket to user and save to database
  sessionUtils.addSession(req, existingUser, () => {
    res.redirect("/");
  });
}

function getLogout(req, res) {
  // falsify user session ticket
  sessionUtils.removeSession(req);
  res.redirect("/");
}

function getBlank(req, res) {
  res.render("default/blank");
}

function getTermsAndConditions(req, res) {
  res.render("default/terms");
}

function get404(req, res) {
  res.render("default/404");
}

module.exports = {
  signUp: signUp,
  login: login,
  getHome: getHome,
  getSignup: getSignup,
  getLogin: getLogin,
  getLogout: getLogout,
  getBlank: getBlank,
  getTermsAndConditions: getTermsAndConditions,
  get404: get404,
};
