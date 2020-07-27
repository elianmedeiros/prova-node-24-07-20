import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String
});

export const Users = mongoose.model("Users", UsersSchema);