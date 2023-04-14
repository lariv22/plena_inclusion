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

export const AddUser = async (req, res) => {
  const { username, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Las contraseñas no coinciden. Prueba otra vez" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await User.create({
      name: username,
      password: hashPassword,
    });
    res.json({ msg: "Registrado exitosamente" });
  } catch (error) {
    console.log(error);
  }
};

//Ponerlo en participantes(?) o participantes
//Heredan tambien las funciones?
export const DeleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.json({ msg: "Usuario borrado con éxito" });
  } catch (error) {
    console.log(error);
  }
};
