const route = require("express").Router();

const reportContoller = require("../../../controllers/reports_controller");

const passport = require("../../../config/passport");
const Report = require("../../../models/report");

route.get("/",passport.authenticate("jwt", { session: false }), async (req, res) => {
  const reports = await Report.find({});
  return res.status(200).json({ message: "patients get all report", reports });
});

route.get("/:status",passport.authenticate("jwt", { session: false }), reportContoller.status);

module.exports = route;