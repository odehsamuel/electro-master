function isEmpty(value) {
  return value === "" || !value;
}

function userDetailsValid(userInfo) {
  return (
    !isEmpty(userInfo.email) &&
    !isEmpty(userInfo.password) &&
    !isEmpty(userInfo["user-name"]) &&
    !isEmpty(userInfo.password2) &&
    userInfo.password === userInfo.password2 &&
    userInfo.password.trim() &&
    userInfo.password.length > 8 &&
    userInfo.email.includes("@")
  );
}

module.exports = userDetailsValid;
