import User from "./User.js";
import Idea from "./Idea.js";
import Comment from "./Comment.js";
import Vote from "./Vote.js";
import sequelize from "../data/db.js";

export function createAssociations() {
  User.hasMany(Comment);
  User.hasMany(Vote);
  //---------------------------------------------------------
  Idea.belongsTo(User, { foreignKey: "userId" });
  Idea.hasMany(Comment, { foreignKey: "ideaId" });
  Idea.hasMany(Vote, { foreignKey: "ideaId" });
  //---------------------------------------------------------
  Vote.belongsTo(User, { foreignKey: "userId" });
  Vote.belongsTo(Idea, { foreignKey: "ideaId" });
  //---------------------------------------------------------
  Comment.belongsTo(User, { foreignKey: "userId" });
  Comment.belongsTo(Idea, { foreignKey: "ideaId" });

  sequelize.sync({ force: true }); 
  console.log("\n\nAssociazioni effettuate con successo\n\n");
}
