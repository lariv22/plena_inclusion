import UserActivity from "../models/userActivityModel.js";
import Activity from "../models/activityModel.js";
import { Op } from "sequelize";
import { Sequelize } from "sequelize";

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

export const GetActivitiesAvailableForUser = async (req, res) => {
  const id = req.body.userId;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const arrayActivities = [];
  try {
    const activities = await Activity.findAll({
      attributes: ["id", "name", "dateStart", "dateEnd"],
      where: {
        dateStart: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      },
    });
    const activitiesUser = await UserActivity.findAll({
      attributes: ["ActivityId"],
      where: {
        UserId: id,
      },
    });
    for (let i = 0; i < activities.length; i++) {
      let contador = 0;
      for (let j = 0; j < activitiesUser.length; j++) {
        if (activitiesUser[j].ActivityId != activities[i].id) {
          contador++;
        }
      }
      if (contador == activitiesUser.length) {
        arrayActivities.push(activities[i]);
      }
    }
    arrayActivities.sort(function (a, b) {
      var c = new Date(a.dateStart);
      var d = new Date(b.dateStart);
      return c - d;
    });
    res.json({ arrayActivities });
  } catch (error) {
    console.log(error);
  }
};

export const GetActivitiesOfUser = async (req, res) => {
  const userId = req.body.userId;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const arrayActivities = [];
  try {
    const activities = await UserActivity.findAll({
      attributes: ["ActivityId"],
      where: {
        UserId: userId,
      },
    });
    for (let i = 0; i < activities.length; i++) {
      const subActivities = await Activity.findOne({
        attributes: ["id", "name", "dateStart", "dateEnd"],
        where: {
          id: activities[i].ActivityId,
          dateStart: {
            [Sequelize.Op.between]: [startDate, endDate],
          },
        },
      });
      if (subActivities !== null) {
        arrayActivities.push(subActivities);
      }
    }
    arrayActivities.sort(function (a, b) {
      var c = new Date(a.dateStart);
      var d = new Date(b.dateStart);
      return c - d;
    });
    res.json({ arrayActivities });
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
