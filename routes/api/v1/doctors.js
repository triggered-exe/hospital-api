const router = require("express").Router();
const doctorController = require("../../../controllers/doctor_controller");
// const Doctor = require("../../models/doctor");

// route.get("/", async (req, res) => {
//   const doctor = await Doctor.find({});

//   return res.json({
//     doctor,
//   });
// });

router.post("/register", doctorController.register);

router.post("/login", doctorController.login);

module.exports = router;