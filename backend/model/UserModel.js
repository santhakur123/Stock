// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const passportLocalMongoose=require("passport-local-mongoose");
// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, "Your email address is required"],
//     unique: true,
//   },
//   username: {
//     type: String,
//     required: [true, "Your username is required"],
//   },
//   password: {
//     type: String,
//     required: [true, "Your password is required"],
//   },
//   createdAt: {
//     type: Date,
//     default: new Date(),
//   },
// });



// userSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Plugin adds username, hash, salt, and auth methods
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
