import Professional from "../models/professionalModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const GetProfessionals = async (req, res) => {
  try {
    const professionals = await Professional.findAll({
      attributes: ["id", "professionalId", "speciality"],
    });
    res.json(professionals);
  } catch (error) {
    console.log(error);
  }
};

export const DeleteProfessional = async (req, res) => {
  try {
    await Professional.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.json({ msg: "Profesional borrado con éxito" });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateProfessional = async (req, res) => {
  const { id, name, speciality } = req.body;
  try {
    await Professional.upsert({
      id: id,
      name: name,
      speciality: speciality,
    });
    res.json({ msg: "Profesional editada con éxito" });
  } catch (error) {
    console.log(error);
  }
};

export const AddProfessional = async (req, res) => {
  try {
    const {
      id,
      nameUser,
      surname1,
      surname2,
      DNI,
      gender,
      phoneNumber,
      email,
      birthDate,
      address,
      speciality,
      password,
      confPassword,
    } = req.body;
    if (password !== confPassword)
      return res
        .status(400)
        .json({ msg: "Las contraseñas no coinciden. Prueba otra vez" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      const newUser = await User.create({
        id: id,
        name: nameUser,
        surname1: surname1,
        surname2: surname2,
        DNI: DNI,
        gender: gender,
        phoneNumber: phoneNumber,
        email: email,
        birthDate: birthDate,
        address: address,
        password: hashPassword,
      });
      const newProfessional = await Professional.create({
        idUser: id,
        speciality: speciality,
      });
      res.json({ msg: "Registrado exitosamente" });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
