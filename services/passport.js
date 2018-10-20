const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const credential = require("../config/keys");

const mongoose = require("mongoose");
const User = mongoose.model("users");

// 登录成功以后, user 就传过来了
// 传过来之后, 就会用index.js,i面的cookie-session
// 来加密这个userid 就是下面这个done要做的事情
passport.serializeUser((user, done) => {
  console.log("所以要到这里来了 -- user ", user);
  // id here is not the profile id
  // it is the user model id in the mongodb database
  done(null, user.id);
});

//后面所有的操作都到这里来先
// 相当于 passport是一个midlware了
passport.deserializeUser((id, done) => {
  console.log("所以要到这里来了 -- id ", id);
  // 把这个id 要存储到cookies里面去
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      console.log(err);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: credential.google_id,
      clientSecret: credential.google_secret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    // 下面这个部分是如果通过了strategy之后的操作,
    // 我这个里面的之后的操作是把user传过去
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if (existingUser) {
            console.log(" had a user", existingUser);
            done(null, existingUser);
          } else {
            new User({
              googleId: profile.id
            })
              .save()
              .then(user => {
                done(null, user);
              });
          }
          // inform passport that we are done
          // and resume the auth process
          // 第一个argument是error.
          // 第二个是existing Usder
        })
        .catch(err => {
          console.log(err);
        });
    }
  )
);
