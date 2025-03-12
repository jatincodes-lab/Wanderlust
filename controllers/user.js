const User = require("../models/user");

module.exports.signupForm = (req, res) => {
  res.render("./users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Add user to database
    const newUser = new User({
      username: username,
      email: email,
    });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash(
        "success",
        `Successfully logged in! ${registeredUser.username}`
      );
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.login = (req, res) => {
  const { username } = req.body;
  req.flash("success", `Welcome back, ${username}`);
  let redirectAddress = res.locals.redirectUrl || "/listings";
  res.redirect(redirectAddress);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      req.flash("success", "You are logged out!");
      res.redirect("/listings");
    }
  });
};