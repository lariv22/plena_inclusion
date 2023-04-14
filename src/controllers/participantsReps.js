import ParticipantRep from "../models/participantRepModel.js";

export const AddParticipantRepModel = async (req, res) => {
  const { idUser, idRepetition } = req.body;
  try {
    await ParticipantRep.create({
      UserId: idUser,
      RepetitionId: idRepetition,
    });
    res.json({ msg: "El usuario se ha inscrito exitosamente!" });
  } catch (error) {
    console.log(error);
  }
};
