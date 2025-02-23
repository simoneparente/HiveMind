import User from "./User";
import Idea from "./Idea";
import Comment from "./Comment.ts";
import Vote from "./Vote";


export function createAssociations(){
    User.hasMany(Comment);
    User.hasMany(Vote);
    //---------------------------------------------------------
    Idea.belongsTo(User, {foreignKey: "userId"});
    Idea.hasMany(Comment, {foreignKey: "ideaId"});
    Idea.hasMany(Vote, {foreignKey:"ideaId"});
    //---------------------------------------------------------
    Vote.belongsTo(User, {foreignKey: "userId"});
    Vote.belongsTo(Idea, {foreignKey: "ideaId"});
    //---------------------------------------------------------
    Comment.belongsTo(User, {foreignKey: "userId"});
    Comment.belongsTo(Idea, {foreignKey: "ideaId"});
    
    console.log("\n\nAssociazioni effettuate con successo\n\n");
}
