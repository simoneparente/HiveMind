import User from "./User";
import Idea from "./Idea";
import Comment from "./Comment.ts";
import Vote from "./Vote";


User.hasMany(Comment);
User.hasMany(Vote);
//---------------------------------------------------------
Idea.belongsTo(User);
Idea.hasMany(Comment);
Idea.hasMany(Vote);
//---------------------------------------------------------
Vote.belongsTo(User);
Vote.belongsTo(Idea);
//---------------------------------------------------------
Comment.belongsTo(User);
Comment.belongsTo(Idea);


console.log('Associazioni effettuate con successo');