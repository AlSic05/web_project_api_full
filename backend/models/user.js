import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const regex =
          /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]*)#?$/;
        return regex.test(v);
      },
      message: "URL no válida",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: "Email no válido",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
