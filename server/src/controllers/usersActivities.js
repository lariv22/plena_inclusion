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

export const GetActivitiesByUser = async (req, res) => {
  const { idUser } = req.body;
  try {
    const activities = await UserActivity.findAll({
      attributes: ["id", "name", "dateStart", "dateEnd"],
      where: {
        id: idUser,
      },
    });
    res.json(activities);
  } catch (error) {
    console.log(error);
  }
};

export const DeleteUserActivity = async (req, res) => {
  try {
    await UserActivity.destroy({
      where: {
        UserId: req.body.id,
      },
      where: {
        ActivityId: req.body.id,
      },
    });
    res.json({ msg: "Participación borrada con éxito" });
  } catch (error) {
    console.log(error);
  }
};
