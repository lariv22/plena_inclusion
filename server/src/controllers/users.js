import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import cron from "node-cron";

export const AddUser = async (req, res) => {
  try {
    const passwordUser = crypto.randomBytes(5).toString("hex");
    console.log(passwordUser);
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(passwordUser, salt);
    const email = req.body.email;
    const name = req.body.name;
    const email_notif = req.body.email_notif;
    const newUser = await User.create({
      name: name,
      surname1: req.body.surname1,
      surname2: req.body.surname2,
      DNI: req.body.DNI,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      email: email,
      birthDate: req.body.birthDate,
      address: req.body.address,
      special_needs: req.body.special_needs,
      emerg_number: req.body.emerg_number,
      disability: req.body.disability,
      password: hashPassword,
      email_notif: email_notif,
    });
    console.log(passwordUser);
    EnviarEmailBienvenida(email, passwordUser);
    res.json({
      msg: "Registrado exitosamente. Tu contraseña es: " + passwordUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const GetUserData = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: [
        "id",
        "name",
        "surname1",
        "surname2",
        "DNI",
        "gender",
        "phoneNumber",
        "email",
        "birthDate",
        "address",
        "special_needs",
        "emerg_number",
        "disability",
        "email_notif",
      ],
      where: {
        id: req.body.id,
      },
    });
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { dataValues } = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    const user = dataValues;
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Contraseña incorrecta" });
    const userId = user.id;
    const name = user.name;
    const email = user.email;
    const accessToken = jwt.sign(
      { userId, name, email },
      "jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225",
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      "825y8i3hnfjmsbv7gwajbl7fobqrjfvbs7gbfj2q3bgh8f42",
      {
        expiresIn: "1d",
      }
    );
    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email not found" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await User.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await User.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export const UpdateEmailUser = async (req, res) => {
  const { id, email, confEmail } = req.body;
  if (email !== confEmail)
    return res
      .status(400)
      .json({ msg: "Los correos electrónicos no coinciden." });
  try {
    const user = await User.update(
      { email },
      {
        where: {
          id,
        },
      }
    );
    if (user) {
      res.json({ msg: "Email actualizado con éxito" });
    } else {
      res.json({ msg: "El email no se ha podido actualizar" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const UpdatePasswordUser = async (req, res) => {
  const { id, password, confPassword } = req.body;
  if (password !== confPassword)
    return res.status(400).json({ msg: "Las contraseñas no coinciden" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const user = await User.update(
      { password: hashPassword },
      {
        where: {
          id,
        },
      }
    );
    res.json({ msg: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.log(error);
  }
};

export const EnviarEmailBienvenida = async (email, passwordUser) => {
  try {
    const mailOptions = {
      from: "ivanlarisa1999@gmail.com",
      to: email,
      subject: "Registro completado",
      text:
        "Hola! Gracias por registrarte en nuestra web, tu contraseña es: " +
        passwordUser +
        ".",
    };
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ivanlarisa1999@gmail.com",
        pass: "ahgjuncgncheutuh",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error);
      else console.log("Email enviado: " + info.response);
    });
  } catch (error) {
    console.log(error);
  }
};

// export const sendWeeklyEmail = async () => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "laikota@gmail.com",
//         pass: "mxplypizpmagcook",
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });
//     const activitiesUser = [];
//     const users = await User.findAll({ where: {email_notif: true }});
//     for(let i = 0; i < users.length; i++) {
//       activitiesUser = await activities7Days(users.id);
//       const mailOptions = {
//         from: 'laikota@gmail.com',
//         to: users.email,
//         subject: 'Actividades de esta semana',
//         text: 'Estas son tus actividades para esta semana: ' + activitiesUser.name + activitiesUser.startDate,
//       };
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) console.log(error);
//         else console.log("Email enviado: " + info.response);
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const activities7Days = async(userId) => {
//   var curr = new Date();
//   var date = curr.toISOString().substring(0, 10);
//   curr.setDate(curr.getDate() + 7);
//   const startDate = date;
//   date = curr.toISOString().substring(0, 10);
//   const endDate = date;

//   const arrayActivities = [];
//   try {
//     const activities = await UserActivity.findAll({
//       attributes: ["idActivity"],
//       where: {
//         idUser: userId,
//       },
//     });
//     for (let i = 0; i < activities.length; i++) {
//       const subActivities = await Activity.findOne({
//         attributes: ["id", "name", "dateStart"],
//         where: {
//           id: activities[i].idActivity,
//           dateStart: {
//             [Sequelize.Op.between]: [startDate, endDate],
//           },
//         },
//       });
//       if (subActivities !== null) {
//         arrayActivities.push(subActivities);
//       }
//     }
//     arrayActivities.sort(function (a, b) {
//       var c = new Date(a.dateStart);
//       var d = new Date(b.dateStart);
//       return c - d;
//     });
//     return arrayActivities;
//   } catch (error) {
//     console.log(error);
//   }
// };

// cron.schedule("* 0 9 * * MON", sendWeeklyEmail);
