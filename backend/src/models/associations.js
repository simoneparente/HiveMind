import User from "./User.js";
import Idea from "./Idea.js";
import Comment from "./Comment.js";
import Vote from "./Vote.js";

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
  console.log("\n\Associations created successfully\n\n");
}
