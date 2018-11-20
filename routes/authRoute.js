// require的是包里面本身的,不是我写的
const passport = require("passport");
const cors = require("cors");

const mongoose = require("mongoose");
const User = mongoose.model("user");

module.exports = app => {

  /**
   * login
   */
  app.post("/api/auth/login",
    passport.authenticate("local", { failureRedirect: "/api/auth/loginErrorHandler", failureFlash: true }), (req, res) => {
      console.log('我来了, 碉堡了', req.user);
      res.json({
        status: true,
        message: "success"
      });

    })

  app.get('/api/auth/loginErrorHandler', (req, res) => {
    console.log(req.body.logintype)
    res.json({
      status: false,
      error: req.flash("message")
    });
  })

  app.get("/api/auth/check/:email", (req, res) => {
    console.log(req.params);
    setTimeout(() => {
      User.findOne({ email: req.params.email }).then(user => {
        if (user) {
          res.json({
            status: true,
            message: "存在该user"
          });
          return;
        }
        res.json({
          status: false,
          message: "不存在该user"
        });
      });
    }, 1000);
  });

  // LOCAL SETTING
  app.post("/api/auth/local", function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      console.log(req.body, err, user, info);
      if (err) {
        return next(err);
      }
      if (!user) {
        // return res.redirect(`/api/auth/error/${info.message}`);
        console.log("come here");
        res.json({
          status: false,
          message: `${info.message}`
        });
        // 添加 return的作用是防止走下去,
        // 如果走下去了 就会进行一个session的存储,
        // 但是这个是我不想看到的
        return;
      }
      // 为何这个地方手动的放了一个loginIN
      // passport.authenticate() middleware invokes req.login() automatically.
      // This function is primarily used when users sign up,
      // during which req.login() can be invoked to automatically
      // log in the newly registered user.
      req.logIn(user, function (err) {
        if (err) {
          // TODO: 暂时我的能力还不知道这个next err怎么用
          return next(err);
        }
        // console.log(" come ? ");
        res.json({
          status: true,
          message: "success"
        });
      });
    })(req, res, next);
  });

  app.get("/api/auth/logout", (req, res) => {
    req.logout();
    res.json({
      status: true,
      message: "logout successful"
    });
  });

  app.get("/api/auth/current_user", (req, res) => {
    // console.log(" can i come here ? ", req.user);
    if (!req.user) {
      res.json({
        status: false,
        message: "没有登录怎么查看"
      });
      return;
    } else {
      res.json({
        status: true,
        messae: "不论如何",
        user: req.user
      });
    }
  });

  app.post("/api/auth/register", (req, res) => {
    console.log(" come here ? ", req.body);
    let body = req.body;
    User.findOne({ email: body.emai }).then(user => {
      if (user) {
        res.json({
          status: false,
          message: "该email已经被注册"
        });
        return;
      }
      let saveUser = {};
      saveUser.email = body.email;
      saveUser.username = body.username;
      saveUser.password = body.password;
      saveUser.thirdId = body.thirdId;

      User.create(saveUser, (err, result) => {
        if (err) {
          res.json({
            status: false,
            message: "创建用户失败"
          });
          return;
        }

        res.json({
          status: true,
          message: "创建用户成功"
        });
      });
    });
  });
};
