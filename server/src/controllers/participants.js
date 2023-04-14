import Participant from "../models/participantModel.js";
import User from "../models/userModel.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const GetParticipants = async (req, res) => {
  try {
    const participants = await Participant.findAll({
      attributes: ["id", "name", "disability"],
    });
    res.json(participants);
  } catch (error) {
    console.log(error);
  }
};

export const AddParticipant = async (req, res) => {
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
      disability,
    } = req.body;
    const passwordUser = crypto.randomBytes(5).toString("hex");
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(passwordUser, salt);
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
    const newParticipant = await Participant.create({
      idUser: id,
      disability: disability,
    });
    res.json({
      msg: "Registrado exitosamente. Tu contraseña es: " + passwordUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const DeleteParticipant = async (req, res) => {
  try {
    await Participant.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.json({ msg: "Participante borrado con éxito" });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateParticipant = async (req, res) => {
  const { id, name, disability } = req.body;
  try {
    await Participant.upsert({
      id: id,
      name: name,
      disability: disability,
    });
    res.json({ msg: "Participante editada con éxito" });
  } catch (error) {
    console.log(error);
  }
};
