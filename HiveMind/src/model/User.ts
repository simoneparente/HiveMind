import { Model, DataTypes } from 'sequelize';
import sequelize from '../data/db'
import Idea from './Idea';
import Comment from './Comment';
import Vote from './Vote';
import { getCurrentTimestamp } from '../utils';

class User extends Model{};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: "Users",
        schema: "h",
    }
);



async function getUserIdByUsername(username: string): Promise<number | null> {
    const user = await User.findOne({ where: { username } });
    if (user) {
        return user.getDataValue('id');
    } else {
        return null;
    }
}

export async function register(username: string, email: string, password: string) {
    return await User.create({username, email, password});
}

export async function createIdea(username: string, Titolo: string, Descrizione: string, DataOra: string) {
    const id = await getUserIdByUsername(username);
    if (id === null) {
        throw new Error('Utente non trovato');
    }
    return await Idea.create({ idUser: id, Titolo, Descrizione, DataOra });
}

export async function createComment(username: string, idIdea: number, Testo: string) {
    const id = await getUserIdByUsername(username);
    const DataOra = getCurrentTimestamp();
    if (id === null) {
        throw new Error('Utente non trovato');
    }
    if (DataOra === null || DataOra === undefined) {
        throw new Error('DataOra non valida');
    }
    console.log("dataOra: ", DataOra);
    return await Comment.create({ idUser: id, idIdea, Testo, DataOra });
}
export default User;
