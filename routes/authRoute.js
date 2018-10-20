// require的是包里面本身的,不是我写的
const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      // NOTE;
      // 上面这个通过验证了 并没有过来u, 妈的
      // console.log("suppose to come here a : ", req);
      res.json({
        message: "登录成功"
      });
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    // console.log(" can i come here ? ", req.user);
    res.send(req.user);
  });
};
