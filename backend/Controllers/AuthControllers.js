// const User = require("../Models/UserModel");
// const { createSecretToken } = require("../util/SecretToken");
// const bcrypt = require("bcryptjs");

// module.exports.Signup = async (req, res, next) => {
//   try {
//     const { email, password, username, createdAt } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ message: "User already exists" });
//     }
//     const user = await User.create({ email, password, username, createdAt });
//     const token = createSecretToken(user._id);
//     res.cookie("token", token, {
//       withCredentials: true,
//       httpOnly: false,
//     });
//     res
//       .status(201)
//       .json({ message: "User signed in successfully", success: true, user });
//     next();
//   } catch (error) {
//     console.error(error);
//   }
// };
// const User = require("../model/UserModel");

// exports.Signup = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const user = new User({ username, email });
//     await User.register(user, password); // Provided by passport-local-mongoose
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: err.message || "Registration failed" });
//   }
// };
// const passport = require("passport");

// exports.Login = (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) return res.status(500).json({ message: "Server error" });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     req.logIn(user, (err) => {
//       if (err) return res.status(500).json({ message: "Login failed" });

//       return res.status(200).json({ message: "Login success", user: { username: user.username, email: user.email } });
//     });
//   })(req, res, next);
// };

// const User = require("../model/UserModel");
// const passport = require("passport");

// exports.Signup = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const user = new User({ username, email });

//     // Register the user using passport-local-mongoose
//     await User.register(user, password);

//     // ✅ Automatically log the user in after signup
//     req.login(user, (err) => {
//       if (err) {
//         console.error("Auto-login failed after signup:", err);
//         return res.status(500).json({ message: "Signup succeeded but auto-login failed" });
//       }

//       // ✅ Send a success response (client will redirect to dashboard)
//       return res.status(200).json({
//         message: "Signup and login successful",
//         user: {
//           username: user.username,
//           email: user.email
//         },
//       });
//     });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(400).json({ message: err.message || "Registration failed" });
//   }
// };

// exports.Login = (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) return res.status(500).json({ message: "Server error" });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     req.logIn(user, (err) => {
//       if (err) return res.status(500).json({ message: "Login failed" });

//       return res.status(200).json({
//         message: "Login success",
//         user: {
//           username: user.username,
//           email: user.email
//         }
//       });
//     });
//   })(req, res, next);
// };
// const passport = require("passport");
// const User = require("../model/UserModel");

// exports.Signup = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const user = new User({ username, email });

//     await User.register(user, password); // registers with passport-local-mongoose

//     // ✅ Auto-login the user after successful signup
//     req.login(user, (err) => {
//       if (err) {
//         console.error("Login after signup failed:", err);
//         return res.status(500).json({ message: "Signup succeeded but login failed" });
//       }

//       // ✅ All good: respond with success
//       return res.status(200).json({
//         message: "Signup and login successful",
//         user: {
//           username: user.username,
//           email: user.email,
//         },
//       });
//     });
//   } catch (err) {
//     console.error("Signup error:", err);
//     return res.status(400).json({ message: err.message || "Signup failed" });
//   }
// };
// backend/Controllers/AuthController.js
// const passport = require("passport");
// const User = require("../model/UserModel");

// exports.Signup = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const user = new User({ username, email });
//     await User.register(user, password);
//     req.login(user, (err) => {
//       if (err) {
//         return res.status(500).json({ message: "Signup successful but login failed" });
//       }
//       return res.status(200).json({ message: "Signup and login successful", user });
//     });
//   } catch (err) {
//     return res.status(400).json({ message: err.message });
//   }
// };

// exports.Login = (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) return res.status(500).json({ message: "Server error" });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     req.login(user, (err) => {
//       if (err) return res.status(500).json({ message: "Login failed" });
//       return res.status(200).json({ message: "Login success", user });
//     });
//   })(req, res, next);
// };
const passport = require("passport");
const User = require("../model/UserModel");

// ✅ Signup Controller
exports.Signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email });
    await User.register(user, password); // provided by passport-local-mongoose

    // ✅ Login the user automatically
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Signup succeeded, login failed" });
      }

      return res.status(200).json({
        message: "Signup and login successful",
        user: {
          username: user.username,
          email: user.email
        }
      });
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// ✅ Login Controller
exports.Login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });

      return res.status(200).json({
        message: "Login success",
        user: {
          username: user.username,
          email: user.email
        }
      });
    });
  })(req, res, next);
};
