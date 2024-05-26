import { Model, DataTypes } from 'sequelize';
import sequelize from '../data/db'
import Commento from './Commento';
import Voto from './Voto';

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


User.hasMany(Commento, { foreignKey: 'idUser', as: 'commenti' });
User.hasMany(Voto, { foreignKey: 'idUser', as: 'voti' });

export async function register(username: string, email: string, password: string) {
    return await User.create({username, email, password});
}

export default User;
