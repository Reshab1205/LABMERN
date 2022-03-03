const jwt = require('jsonwebtoken');
const mongooose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongooose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    role: {
        type:String,
        required:true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    hae: [
        {
            Haemoglobin: {
                type: String,
                required: true
            },
            TotalcountWBC: {
                type: String,
                required: true
            },
            Neutrophils: {
                type: String,
                required: true
            },
            Lymphocytes: {
                type: String,
                required: true
            },
            Eosinophiles: {
                type: String,
                required: true
            },
            Monocytes: {
                type: String,
                required: true
            },
            Basophils: {
                type: String,
                required: true
            },
            RedBloodCells: {
                type: String,
                required: true
            },
            PackedCellVolume: {
                type: String,
                required: true
            },
            MEANCorpuscularVolume: {
                type: String,
                required: true
            }
        }
    ]
})
// hashing the password
userSchema.pre('save', async function (next) {
    console.log("hii from inside");
    if (this.isModified('password')) {
        console.log("hii i am ");
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// We are generating token
   userSchema.methods.generateAuthToken = async function () {
       try {
           let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
           this.tokens = this.tokens.concat({token: token});
           await this.save();
           return token;
       } catch (err) {
           console.log(err);
       }
   }


const User = mongooose.model('USER', userSchema);

module.exports = User;


