import Users from "../models/userModel.js";
import bcrypt from "bcrypt";

export const GetUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "password"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { username, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Las contraseñas no coinciden. Prueba otra vez" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: username,
      password: hashPassword,
    });
    res.json({ msg: "Registrado exitosamente" });
  } catch (error) {
    console.log(error);
  }
};
