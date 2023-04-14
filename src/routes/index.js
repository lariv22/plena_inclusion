import express from "express";
import { AddActivity, GetActivities } from "../controllers/activities.js";
import { GetUsers } from "../controllers/users.js";
import { AddUser } from "../controllers/users.js";
import { AddUserActivity } from "../controllers/participantsReps.js";
import { AddDisability, GetDisabilities } from "../controllers/disabilities.js";
import { AddCategory, GetCategories } from "../controllers/categories.js";
import { AddRepetition, GetRepetitions } from "../controllers/repetitions.js";
import {
  AddProfessional,
  GetProfessionals,
} from "../controllers/professionals.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.post("/addUser", AddUser);
router.post("/getUsers", GetUsers);

router.post("/addActivity", AddActivity);
router.post("/getActivities", GetActivities);

router.post("/addUserActivity", AddUserActivity);

router.post("/addDisability", AddDisability);
router.post("/getDisabilities", GetDisabilities);

router.post("/addCategory", AddCategory);
router.post("/getCategories", GetCategories);

router.post("/addRepetition", AddRepetition);
router.post("/getRepetitions", GetRepetitions);

router.post("/addProfessional", AddProfessional);
router.post("/getProfessionals", GetProfessionals);

export default router;
