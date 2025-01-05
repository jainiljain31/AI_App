import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, "Email must be at least 6 characters long"],
    maxLength: [50, "Email must be at most 50 characters long"],
  },
  password: {
    type: String,
    select:false,
  },
});

userSchema.statics.hashPassword = async function (password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateJWT = function () {
  const token = jwt.sign({ email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
}

const userModel = mongoose.model("user", userSchema);
export default userModel;
