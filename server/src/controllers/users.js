import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  console.log("......");
  try {
    const { dataValues } = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    const user = dataValues;
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user.id;
    const name = user.name;
    const email = user.email;
    const accessToken = jwt.sign(
      { userId, name, email },
      "jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225",
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      "825y8i3hnfjmsbv7gwajbl7fobqrjfvbs7gbfj2q3bgh8f42",
      {
        expiresIn: "1d",
      }
    );
    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email not found" });
  }
};

export const UpdateEmailUser = async (req, res) => {
  const { id, email, confEmail } = req.body;
  if (email !== confEmail)
    return res
      .status(400)
      .json({ msg: "Los correos electrónicos no coinciden." });
  try {
    const user = await User.update(
      { email },
      {
        where: {
          id,
        },
      }
    );
    if (user) {
      res.json({ msg: "Email actualizado con éxito" });
    } else {
      res.json({ msg: "El email no se ha podido actualizar" });
    }
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
    const user = await User.update(
      { password: hashPassword },
      {
        where: {
          id,
        },
      }
    );
    res.json({ msg: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.log(error);
  }
};
