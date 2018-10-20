// third import
const uuidv4 = require("uuid/v4");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const credential = require("./config/keys");

const cookieSession = require("cookie-session");
const passport = require("passport");

//load 其他的js文件

require("./model/User");
require("./services/passport");

const authRoutes = require("./routes/authRoute");

mongoose.connect(
  credential.mongodb,
  { useNewUrlParser: true }
);

const app = express();

// dev check
// 增加跨域访问的需求
if (process.env.NODE_ENV !== "production") {
  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   next();
  // });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// tell express use cookie

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [credential.cookieKey]
  })
);

app.use(passport.initialize());
// 下面这个就是把passport专属的user的
// 这个就是告诉passport 来用前段传过来的cookies
app.use(passport.session());

authRoutes(app);

// app.get("/", (req, res) => {
//   console.log("-----");
//   res.json({
//     hi: "测试一下"
//   });
// });

//  添加auth google 到

const PORT = process.env.PORT || 5000;

app.listen(PORT);
