import Activities from "../models/activityModel.js";

export const GetActivities = async (req, res) => {
  try {
    const activities = await Activities.findAll({
      attributes: ["id", "name", "date"],
    });
    res.json(activities);
  } catch (error) {
    console.log(error);
  }
};

export const AddActivity = async (req, res) => {
  const { name, date } = req.body;
  try {
    await Activities.create({
      name: name,
      date: date,
    });
    res.json({ msg: "Actividad añadida correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export const GetActivitiesDate = async (req, res) => {
  try {
    const { dateStart, dateEnd } = req.body;
    const activities = await Activities.findAll({
      attributes: ["id", "name", "date"],
      where: {
        dateStart: between[(dateStart, dateEnd)],
      },
    });
    res.json(activities);
  } catch (error) {
    console.log(error);
  }
};

export const DeleteActivity = async (req, res) => {
  try {
    await Activities.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.json({ msg: "Actividad borrada con éxito" });
  } catch (error) {
    console.log(error);
  }
};
