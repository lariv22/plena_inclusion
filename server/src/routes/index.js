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
  Logout,
  GetUserData,
  UpdatePasswordUser,
  UpdateEmailUser,
  UpdateEmailNotifUser,
  AddUser,
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
router.delete("/logout", Logout);

router.post("/addUser", AddUser);
router.get("/refreshToken", refreshToken);
router.post("/getUserData", verifyToken, GetUserData);
router.post("/updatePasswordUser", verifyToken, UpdatePasswordUser);
router.post("/updateEmailUser", verifyToken, UpdateEmailUser);
router.post("/updateEmailNotifUser", verifyToken, UpdateEmailNotifUser);

router.post("/getActivities", verifyToken, GetActivities);
router.post("/getActivitiesDate", verifyToken, GetActivitiesDate);

router.post("/getActivitiesOfUser", verifyToken, GetActivitiesOfUser);
router.post("/addUserActivity", verifyToken, AddUserActivity);
router.post("/deleteUserActivity", verifyToken, DeleteUserActivity);
router.post(
  "/getActivitiesAvailableForUser",
  verifyToken,
  GetActivitiesAvailableForUser
);

router.post("/getCategories", GetCategories);

router.post("/addCatActivity", AddCatActivity);
router.post("/deleteCatActivity", DeleteCatActivity);

export default router;
