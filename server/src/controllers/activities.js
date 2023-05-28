import Activities from "../models/activityModel.js";
import { Op } from "sequelize";

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

export const GetActivitiesDate = async (req, res) => {
  try {
    const { dateStart, dateEnd } = req.body;
    const activities = await Activities.findAll({
      attributes: ["id", "name", "dateStart", "dateEnd"],
      where: {
        dateStart: {
          [Op.between]: [dateStart, dateEnd],
        },
      },
    });
    res.json(activities);
  } catch (error) {
    console.log(error);
  }
};
