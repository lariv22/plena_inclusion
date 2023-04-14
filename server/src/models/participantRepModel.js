import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Participant from "./participantModel.js";
import Repetition from "./repetitionModel.js";
const { DataTypes } = Sequelize;
const ParticipantRep = db.define("ParticipantRep", {
  ParticipantId: {
    type: DataTypes.INTEGER,
    references: {
      model: Participant,
      key: "id",
    },
  },
  RepetitionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Repetition,
      key: "id",
    },
  },
});

(async () => {
  await db.sync();
})();

export default ParticipantRep;
