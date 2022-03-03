const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const Authenticate = require("../middleware/authenticate")


const User = require("../model/userSchema")

router.get('/', (req, res) => {
    console.log(`HELLLO MY MIDDLEWARE`);
    res.send(`hello world from the server router js`)
});


// Using Promises

// router.post('/register',  (req,res)=> {

//     const { name, email, password, role} =req.body;

//     if(!name || !email || !password || !role) {
//         return res.status(422).json({error: "Please fill the field properly"});
//     }
//     User.findOne({email:email})
//     .then((userExists) => {
//         if(userExists) {
//             return res.status(422).json({error: "Email already exists"});
//         }

//         const user = new User({name, email, password, role});

//         user.save().then(() => {
//             res.status(201).json({ message : "registered successfully"});
//         }).catch((err) => res.status(500).json({ error: "Failed to register" }));
//     }).catch(err => {console.log(err);});
// });

// module.exports = router;


// Using async and await 
router.post('/register', async (req, res) => {

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(422).json({ error: "Please fill the field properly" });
    }
    try {

        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }  else {
            const user = new User({ name, email, password, role });    
            
        await user.save();   //I am saving the data in db
     

        res.status(201).json({ message: "registered successfully" });
        }
    } catch (err) {
        console.log(err);
    }

});

// Login route

router.post('/signin', async (req, res) => {
    console.log('tmn')
    try{
        let token;
        
        const { email, password} = req.body;
        console.log(req.body,"body")
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" })
        }


        const userLogin = await User.findOne({ email: email })
        clg
        //console.log(userLogin);
        if(userLogin) {
            let {name,role} = userLogin
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            });

        if(!isMatch) {
            res.status(400).json({ error: "user error " });
        } else {
            res.json({ message: "user Signin successfully" });
        }
        } else {
            res.status(400).json({error: "Invalid Credentials"});
        }
        
    } catch (err) {
        console.log(err);
    }
})



//Enter Hae Report
router.post('/enter-haematology-report', async (req, res) => {

    const {Haemoglobin, TotalcountWBC, Neutrophils, Lymphocytes, Eosinophiles, Monocytes, Basophils, RedBloodCells, PackedCellVolume, MEANCorpuscularVolume} = req.body;

    if (!Haemoglobin || !TotalcountWBC || !Neutrophils || !Lymphocytes || !Eosinophiles || !Monocytes || !Basophils || !RedBloodCells || !PackedCellVolume || !MEANCorpuscularVolume) {
        return res.status(422).json({ error: "Please fill the field properly" });
    }
    try {

        const userExist = await User.findOne({ Haemoglobin: Haemoglobin })
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }  else {
            const user = new User({ Haemoglobin, TotalcountWBC, Neutrophils, Lymphocytes, Eosinophiles, Monocytes, Basophils, RedBloodCells, PackedCellVolume, MEANCorpuscularVolume });    
            
        await user.save();   //I am saving the data in db
     

        res.status(201).json({ message: "Data Entered successfully" });
        }
    } catch (err) {
        console.log(err);
    }

});





module.exports = router;

