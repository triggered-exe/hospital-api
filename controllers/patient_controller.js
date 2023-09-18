const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Report = require("../models/report");

module.exports.register = async function (req, res) {
    try {
        let phone = req.body.phone;
        let name = req.body.name;
        let address =req.body.address;

        // check whether the patient is already registered
        let patient = await Patient.findOne({phone});
        console.log(patient)
        // if registered then return error
        if(patient){
            return res.status(400).json({message: "Patient already exists"})
        }else{
             patient = Patient.create({
                name: name,
                phone: phone,
                address: address,
            });
            console.log("patient created")
            res.status(200).json({message: "Patient registered successfully"})
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "internal error"})
    }
}

module.exports.createReport = async(req, res) => {
    
    console.log(req.user._id)
    try {
        let patient = await Patient.findById(req.params.id);
        // check whether patient exists or not
        if(!patient){
            return res.status(404).json({message: "Patient not found"})
        }else{
            let report = await Report.create({
                doctor: req.user.id,
                patient: patient.id,
                status: req.body.status,
                date: new Date(),
            });

            // add the report to the patient's report array
            patient.reports.push(report);
            patient.save();

            console.log("report created")
            res.status(200).json({message: "Report created successfully"})
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        error: "internal error",
        message: "enter the patient name id correctly and status any one from['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']"
        })
    }
    
}


module.exports.getReports = async(req, res) => {
    try {
        let patient = await Patient.findById(req.params.id);
        // check whether patient exists or not
        if(!patient){
            return res.status(404).json({message: "Patient not found"})
        }else{
             // Populate the reports array in the Patient document and the doctor and patient fields inside each Report
                patient = await Patient.findById(patient.id)
                .populate({
                    path: 'reports',
                    populate: [
                      { path: 'doctor', model: 'Doctor' },
                      { path: 'patient', model: 'Patient' },
                    ],
                  })
                  .sort({ createdAt: 1 })
                  .exec();
             console.log("reports fetched")
             res.status(200).json({reports: patient.reports});
          }
         
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "internal error"})
    }
    
}