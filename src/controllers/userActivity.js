import UserActivity from "../models/userActivityModel.js";

export const AddUserActivity = async (req, res) => {
  const { idUser, idActivity } = req.body;
  try {
    await UserActivity.create({
      UserId: idUser,
      ActivityId: idActivity,
    });
    res.json({ msg: "El usuario se ha inscrito exitosamente!" });
  } catch (error) {
    console.log(error);
  }
};
