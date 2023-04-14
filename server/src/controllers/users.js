import User from "../models/userModel.js";

export const GetUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "password"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};
