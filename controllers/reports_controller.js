const Report = require("../models/report");
module.exports.status = async(req,res)=>{
    try {
        let status = req.params.status;
        let statusReport = Report.find({status: status});

        statusReport = await statusReport.populate("patient").populate("doctor");
        console.log(statusReport)
        return res.status(200).json({statusReport})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }

}