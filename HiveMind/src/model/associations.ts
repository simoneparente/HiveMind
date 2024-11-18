import User from "./User";
import Idea from "./Idea";
import Comment from "./Comment.ts";
import Vote from "./Vote";


export function createAssociations(){
    User.hasMany(Comment);
    User.hasMany(Vote);
    //---------------------------------------------------------
    Idea.belongsTo(User, {foreignKey: "userID"});
    Idea.hasMany(Comment, {foreignKey: "ideaID"});
    Idea.hasMany(Vote);
    //---------------------------------------------------------
    Vote.belongsTo(User, {foreignKey: "userID"});
    Vote.belongsTo(Idea, {foreignKey: "ideaID"});
    //---------------------------------------------------------
    Comment.belongsTo(User, {foreignKey: "userID"});
    Comment.belongsTo(Idea, {foreignKey: "ideaID"});


    console.log("\n\nAssociazioni effettuate con successo\n\n");
}
