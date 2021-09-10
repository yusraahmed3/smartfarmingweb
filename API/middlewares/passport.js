const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const User = require("../models/user");
const mongoose = require("mongoose");


function auth(req, res, next)  {
  const token = req.headers['x-access-token']?.split(' ')[1]
  if(token){
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return res.json({
        isLoggedIn: false,
        message: "Failed to authenticate",
        error: err
      })
      req.user = {},
      req.user.id = decoded.id,
      req.user.email = decoded.email,
      req.user.role = decoded.role
      next()
    })
  }else{
    res.json({message: "Incorrect token given", isLoggedIn: false})
  }
}
//   const decoded = token.replace("Bearer ", "");
//   console.log(decoded)

//   if (!decoded) {
//     return res.status(401).json({ err: "Not authorized!!" });
//   }
//   jwt.verify(decoded, SECRET, (err, payload) => {
//     if (err) {
//       return res.status(401).json({ error: "Must be logged in!" });
//     }
//     const { user_id } = payload;
//     User.findById(user_id).then((userdata) => {
//       req.user = userdata;
//     });
//     next()
//   });
// };

// // const User = require("../models/user");
// // const { SECRET } = require("../config");
// // const jwt = require('jsonwebtoken')

// // function auth(req, res, next){
// //   const token = req.header('x-auth-token')

// //   if(!token) res.status(401).json({msg: 'No token, authorization denied'})

// //   const decoded = jwt.verify(token, SECRET);

// //   req.us
// // }
// // const { Strategy, ExtractJwt } = require("passport-jwt");
// // const opts = {
// //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// //   secretOrKey: SECRET,
// // };

// // module.exports = (passport) => {
// //   passport.use(
// //     new Strategy(opts, async (payload, done) => {
// //       await User.findById(payload._id)
// //         .then(async (user) => {
// //           if (user) {
// //             return done(null, user);
// //           }
// //           return done(null, false);
// //         })
// //         .catch((err) => {
// //           return done(null, false);
// //         });
// //     })
// //   );
// // };
module.exports = auth;