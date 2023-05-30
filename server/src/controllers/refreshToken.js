import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await User.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      "825y8i3hnfjmsbv7gwajbl7fobqrjfvbs7gbfj2q3bgh8f42",
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const idUser = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign(
          { userId: idUser, name, email },
          "jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225",
          {
            expiresIn: "15s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
