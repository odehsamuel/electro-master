function getSession(req) {
  let sessionInputData = req.session.inputData;

  req.session.inputData = null;
  
  return sessionInputData
}

function addSession(req, user, action) {
  req.session.user = {
    id: user._id,
    email: user.email,
  };
  req.session.isAuthenticated = true;
  req.session.save(action);
}

function removeSession(req) {
  req.session.user = null;
  req.session.isAuthenticated = false;
}

module.exports = {
  getSession: getSession,
  addSession: addSession,
  removeSession: removeSession,
};
