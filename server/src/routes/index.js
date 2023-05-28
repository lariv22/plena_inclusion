import express from "express";
import {
  AddActivity,
  GetActivities,
  GetActivitiesDate,
  UpdateActivity,
} from "../controllers/activities.js";
import {
  AddUserActivity,
  DeleteUserActivity,
  GetActivitiesOfUser,
  GetActivitiesAvailableForUser,
} from "../controllers/usersActivities.js";
import {
  GetUsers,
  Login,
  GetUserData,
  UpdatePasswordUser,
  UpdateEmailUser,
} from "../controllers/users.js";
import {
  AddParticipant,
  GetParticipants,
  DeleteParticipant,
  UpdateParticipant,
} from "../controllers/participants.js";
import {
  AddCategory,
  GetCategories,
  UpdateCategory,
  DeleteCategory,
} from "../controllers/categories.js";

import {
  AddCatActivity,
  DeleteCatActivity,
} from "../controllers/catActivities.js";

import {
  AddProfessional,
  GetProfessionals,
  DeleteProfessional,
  UpdateProfessional,
} from "../controllers/professionals.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.post("/addParticipant", AddParticipant);
router.post("/getParticipants", GetParticipants);
router.post("/deleteParticipant", DeleteParticipant);
router.post("/updateParticipant", UpdateParticipant);

router.post("/login", Login);
router.post("/refreshToken", refreshToken);
router.post("/getUsers", GetUsers);
router.post("/getUserData", verifyToken, GetUserData);
router.post("/updatePasswordUser", UpdatePasswordUser);
router.post("/updateEmailUser", UpdateEmailUser);

router.post("/addActivity", AddActivity);
router.post("/getActivities", GetActivities);
router.post("/getActivitiesDate", GetActivitiesDate);
router.post("/updateActivity", UpdateActivity);

router.post("/getActivitiesOfUser", GetActivitiesOfUser);
router.post("/addUserActivity", AddUserActivity);
router.post("/deleteUserActivity", DeleteUserActivity);
router.post("/getActivitiesAvailableForUser", GetActivitiesAvailableForUser);

router.post("/addCategory", AddCategory);
router.post("/getCategories", GetCategories);
router.post("/updateCategory", UpdateCategory);
router.post("/deleteCategory", DeleteCategory);

router.post("/addCatActivity", AddCatActivity);
router.post("/deleteCatActivity", DeleteCatActivity);

router.post("/addProfessional", AddProfessional);
router.post("/getProfessionals", GetProfessionals);
router.post("/deleteProfessional", DeleteProfessional);
router.post("/updateProfessional", UpdateProfessional);

export default router;
