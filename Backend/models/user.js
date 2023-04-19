const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designationSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone:{type:Number,required:true}
}, {
  timestamps: true,
});

const Designation = mongoose.model('usertable', designationSchema);
module.exports = Designation;