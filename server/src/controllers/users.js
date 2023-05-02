import User from "../models/userModel.js";
import bcrypt from "bcrypt";

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

export const GetUserData = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: [
        "id",
        "name",
        "surname1",
        "surname2",
        "DNI",
        "gender",
        "phoneNumber",
        "email",
        "birthDate",
        "address",
      ],
      where: {
        id: req.body.id,
      },
    });
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const password_valid = await bcrypt.compare(password, user.password);
      if (password_valid) {
        res.status(200).json({ msg: "Password Correct" });
      } else {
        res.status(400).json({ msg: "Password Incorrect" });
      }
    } else {
      res.status(404).json({ msg: "User does not exist" });
    }
  } catch (msg) {
    console.log(msg);
  }
};

export const UpdateEmailUser = async (req, res) => {
  const { id, email, confEmail } = req.body;
  if (email !== confEmail)
    return res
      .status(400)
      .json({ msg: "Los correos electrónicos no coinciden." });
  try {
    await User.upsert({
      id: id,
      email: email,
    });
    res.json({ msg: "Email actualizado con éxito" });
  } catch (error) {
    console.log(error);
  }
};

export const UpdatePasswordUser = async (req, res) => {
  const { id, password, confPassword } = req.body;
  if (password !== confPassword)
    return res.status(400).json({ msg: "Las contraseñas no coinciden." });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await User.upsert({
      id: id,
      password: hashPassword,
    });
    res.json({ msg: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.log(error);
  }
};
