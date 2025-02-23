import User from "./User";
import Idea from "./Idea";
import Commento from "./Comment";
import Voto from "./Vote";


User.hasMany(Commento, { foreignKey: 'idUser', as: 'commenti' });
User.hasMany(Voto, { foreignKey: 'idUser', as: 'voti' });
//---------------------------------------------------------
Idea.belongsTo(User, { foreignKey: 'idUser', as: 'user' });
Idea.hasMany(Commento, { foreignKey: 'idIdea', as: 'commenti' });
Idea.hasMany(Voto, { foreignKey: 'idIdea', as: 'voti' });
//---------------------------------------------------------
Voto.belongsTo(User, {foreignKey: 'user'});
Voto.belongsTo(Idea, {foreignKey: 'idea'});
//---------------------------------------------------------
Commento.belongsTo(User, { foreignKey: 'idUser', as: 'user' });
Commento.belongsTo(Idea, { foreignKey: 'idIdea', as: 'idea' });


console.log('Associazioni effettuate con successo');