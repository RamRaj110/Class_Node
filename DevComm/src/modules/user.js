const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true,
    minlength:3,
    maxlength:20,
    trim:true
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
    trim: true
  },
  age: {
    type: Number,
    min:18,

  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  skills: {
    type: [String],
  },
  about:{
    type:String,
    default:"This is about me section."
  },
  profileImg:{
    type:String,
    default:"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png"
  }
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
