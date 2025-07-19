// const { Signup, Login } = require("../Controllers/AuthControllers");
// const router = require("express").Router();




// router.post("/signup", Signup);
// router.post("/login", Login);


// module.exports = router;
const express = require("express");
const router = express.Router();

const { Signup, Login } = require("../Controllers/AuthControllers"); // ✅ Make sure this path is correct

router.post("/signup", Signup);
router.post("/login", Login);

module.exports = router;

