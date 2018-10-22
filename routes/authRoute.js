// require的是包里面本身的,不是我写的
const passport = require("passport");
const cors = require("cors");

module.exports = app => {
  // app.get

  app.use(cors());

  // third login
  // 这个地方只能登录成功
  // 但是如果用户不存在, 那么就是跳转到创建用户界面
  app.post(
    "/api/auth/third",
    passport.authenticate("local", { failureRedirect: "/api/auth/register" }),
    (req, res) => {
      // req.cookies = req.params.id;
      // console.log(res);
      // res.passport.session =
      res.json({
        message: "demo"
      });
    }
  );

  // LOCAL SETTING
  app.post(
    "/api/auth/local",
    passport.authenticate("local", { failureRedirect: "/api/auth/error" }),
    (req, res) => {
      // console.log("所以登录了吗?", req.user);
      // res.redirect("/core");
      res.json({
        status: 200,
        type: "local",
        message: "success"
      });
    }
  );
  app.get("/api/auth/register", (req, res) => {
    res.json({
      status: 200,
      message: "register"
    });
  });

  app.get("/api/auth/error", (req, res) => {
    console.log("come here ", req.user);
    res.json({
      status: 200,
      message: "login error"
    });
  });

  app.get("/api/auth/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/auth/current_user", (req, res) => {
    // console.log(" can i come here ? ", req.user);
    if (!req.user) {
      res.json({
        message: "没有登录怎么查看"
      });
      return;
    } else {
      res.json({
        messae: "不论如何",
        user: req.user
      });
    }
  });
};
