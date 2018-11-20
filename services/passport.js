const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const credential = require("../config/keys");

const mongoose = require("mongoose");
const User = mongoose.model("user");

//下面这个两个地方才是保存的使用的地方,
// 为什么我serializeUser用来serializeUser的id
// 是因为不论所有的user对象都会有id
// 登录成功以后, user 就传过来了
// 传过来之后, 就会用index.js,i面的cookie-session
// 来加密这个userid 就是下面这个done要做的事情
passport.serializeUser((user, done) => {
  // debugger;
  // 下面这个done会存储到 session里面去
  // 所以要尽量的小
  // 然后后面的deserializeUser解析的时候再直接读取
  if (user) {
    done(null, user.id);
  } else {
    done(null, false);
  }
});

//后面所有的操作都到这里来先
// 相当于 passport是一个midlware了
passport.deserializeUser((obj, done) => {
  // 把这个id 要存储到cookies里面去
  User.findById(obj)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      console.log(err);
    });

  // done(null, obj);
});

passport.use(
  // 注意下面里里面的username 和 password是必须要填写的,
  // 哪怕传过来的是 '' 也不定 一定要有值
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
      // session: false
    },
    (req, email, password, done) => {
      // 每次到这里来的时候, 都要先logout一下
      // req.logout();
      console.log("这个是正常的login时候的状态", req.body);
      // third:
      if (req.body.logintype === 'third') {
        console.log('login type:', req.body);
        let obj = {};
        obj["thirdId"] = req.body.thirdId;
        User.findOne(obj).then(user => {
          console.log("get user ?", user, obj);
          if (!user) {
            console.log(
              "该用户并没有注册, 跳转到注册页面让他注册"
            );
            // 再这个地方进行一次注册用户?
            return done(null, false, req.flash("message", "请注册对应的lifebox账户"));
          } else {
            return done(null, user);
          }
        });
      } else {
        // local check
        console.log('local check', req.body, email, password, { email: email })
        User.findOne({ email: email })
          .then(user => {
            console.log("查找到user: ", user);
            if (!user) {
              // 即用户不存在
              return done(null, false, { message: "no user found" });
            }

            if (user && user.password !== password) {
              return done(null, false, { message: "password is not right" });
            }

            // 登录成功
            return done(null, user);
          })
          .catch(err => {
            return done(err, false);
          });
      }
      // console.log("anthing come here: ",req, username, password);
    }
  )
);

// 下面这儿用不上了
/**
passport.use(
  new GoogleStrategy(
    {
      clientID: credential.google_id,
      clientSecret: credential.google_secret,
      callbackURL: "/auth/google/callback",
      // proxy是为了方便都能在 dev 和 drop上面切换
      proxy: true
    },
    // 下面这个部分是如果通过了strategy之后的操作,
    // 我这个里面的之后的操作是把user传过去
    async (accessToken, refreshToken, profile, done) => {
      console.log(" do i come here ? ");
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        console.log(" had a user", existingUser);
        return done(null, existingUser);
      }
      const user = await new User({
        googleId: profile.id
      }).save();

      done(null, user);
    }
  )
 * 

);
 * */
