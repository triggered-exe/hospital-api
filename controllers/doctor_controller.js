const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");
module.exports.register = async (req, res) => {
    try {

            const { name, phone, password, confirmPassword } = req.body;
            
            let doctor = await Doctor.findOne({ phone });

            if (doctor) {
                res.status(400).json({message: "Doctor already exists"})
            }else if(password !== confirmPassword){
                res.status(400).json({message: "Passwords do not match"})
            }else{
                doctor = await Doctor.create({
                    name: name,
                    phone: phone,
                    password: password,
                })
                doctor.save();
                console.log("doctor created")
                res.status(200).json({message: "Doctor registered successfully"})
            }

        }  catch (error) {
            res.status(400).json({
                message: "Something went wrong"
             })
     }
}


module.exports.login = async (req, res) => {
    try {
        let phone = req.body.phone;
        let password = req.body.password;
    
        // Find the doctor by phone
        let doctor = await Doctor.findOne({ phone });

        console.log(req.body)
        console.log(doctor)
    
        // If the doctor is not found, return an error
        if (!doctor) {
          return res.status(401).json({ error: 'doctor doesnt exist' });
        }
    
        // Compare the provided password with the hashed password in the database
        const passwordMatch = (password === doctor.password);
    
        // If the passwords do not match, return an error
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid password' });
        }
    
        // Generate a JWT token for the authenticated doctor
        const token = jwt.sign({ id: doctor._id, phone: doctor.phone }, process.env.SECRET_KEY);
    
        // Send the token as a response
        res.json({ token });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error',
                               message: "enter the phone and password correctly" });
      }
}






