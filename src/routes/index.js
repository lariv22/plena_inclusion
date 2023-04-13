import express from "express";
import { AddActivity, GetActivities } from "../controllers/activities.js";
import { GetUsers } from "../controllers/users.js";
import { Register } from "../controllers/users.js";
import { AddUserActivity } from "../controllers/userActivity.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.post("/getUsers", GetUsers);
router.post("/register", Register);

router.post("/getActivities", GetActivities);
router.post("/addActivity", AddActivity);

router.post("/addUserActivity", AddUserActivity);

export default router;
