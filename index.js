// third import
const uuidv4 = require("uuid/v4");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
  res.json({
    hi: "测试一下"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);

// // wang's import
// let User = require("./model/user.model");

// const app = express();
// // 增加跨域访问的需求
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect(
//   "mongodb://localhost:27017/life",
//   { useNewUrlParser: true }
// );
// mongoose.set("debug", true);

// //
// const port = 5000;

// // 登录使用post, 后面还会更改成 token的, 看加不加钱
// app.post("/login", (req, res) => {
//   if (!req.body || !req.body.username || !req.body.password) {
//     console.log("come here");
//     res.json({
//       status: 400,
//       result: null,
//       message: "登录需要密码和用户名"
//     });
//     return;
//   }

//   let username = req.body.username;
//   let password = req.body.password;
//   // console.log(User.username);
//   mongoose.model("user").findOne(
//     {
//       username: username,
//       password: password
//     },
//     (err, user) => {
//       if (err) console.log(err);
//       console.log("user: ", user.username, typeof user.username);
//       res.json({
//         status: 200,
//         result: user
//       });
//     }
//   );
// });

// /**
//  * 传递要validate的东西, 和 validate的type
//  */
// app.post("/validate", (req, res) => {
//   if (!req.body || !req.body.type || !req.body.value) {
//     console.log("come here");
//     res.json({
//       status: 400,
//       result: null,
//       message: "请输入要校验的信息和类型"
//     });
//     return;
//   }

//   let value = req.body.value;
//   let type = req.body.type;

//   let user = {};
//   user[type] = value;

//   console.log(user);

//   mongoose.model("user").findOne(user, (err, user) => {
//     if (err || !user) {
//       res.json({
//         status: 200,
//         result: true
//       });
//       return;
//     }
//     console.log("查找到了: ", user);
//     res.json({
//       status: 200,
//       result: false
//     });
//   });
// });

// /**
//  * 创建一个新的用户
//  */
// app.post("/register", (req, res) => {
//   let user = new User(req.body);
//   // chek has user or not

//   mongoose.model("user").findOne({ username: user.username }, (err, result) => {
//     if (err) {
//       res.json({
//         status: 401,
//         message: "error occur"
//       });
//       return;
//     }
//     if (result) {
//       res.json({
//         status: 200,
//         message: "已经存在该用户"
//       });
//       return;
//     } else {
//       user.token = uuidv4();
//       user.save((error, result) => {
//         if (error) console.log(error);
//         console.log(" result : ");

//         res.json({
//           status: 200,
//           message: "hello"
//         });
//       });
//     }
//   });
// });

// // 设计几个简单的api 用来存储 很简单的就行了
// app.get("/company-list", function(req, res) {
//   res.send("GET request to the homepage");
// });

// app.listen(port, () => {
//   console.log("demo");
// });
