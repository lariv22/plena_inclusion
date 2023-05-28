import express from "express";

import { GetActivities, GetActivitiesDate } from "../controllers/activities.js";

import {
  AddUserActivity,
  DeleteUserActivity,
  GetActivitiesOfUser,
  GetActivitiesAvailableForUser,
} from "../controllers/usersActivities.js";

import {
  Login,
  GetUserData,
  UpdatePasswordUser,
  UpdateEmailUser,
} from "../controllers/users.js";

import { GetCategories } from "../controllers/categories.js";

import {
  AddCatActivity,
  DeleteCatActivity,
} from "../controllers/catActivities.js";

import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.post("/login", Login);
router.post("/refreshToken", refreshToken);
router.post("/getUserData", verifyToken, GetUserData);
router.post("/updatePasswordUser", UpdatePasswordUser);
router.post("/updateEmailUser", UpdateEmailUser);

router.post("/getActivities", GetActivities);
router.post("/getActivitiesDate", GetActivitiesDate);

router.post("/getActivitiesOfUser", GetActivitiesOfUser);
router.post("/addUserActivity", AddUserActivity);
router.post("/deleteUserActivity", DeleteUserActivity);
router.post("/getActivitiesAvailableForUser", GetActivitiesAvailableForUser);

router.post("/getCategories", GetCategories);

router.post("/addCatActivity", AddCatActivity);
router.post("/deleteCatActivity", DeleteCatActivity);

export default router;
