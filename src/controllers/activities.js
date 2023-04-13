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
