import { Request, Response } from 'express';
import { encrypt, compare } from './encryption';
import User from '../model/User';


export class AuthValidator{
    static validateRegister(req: Request){
        if(req.body === undefined || !req.body.username || !req.body.email || !req.body.password) 
            return false;
        return true;
    }

    static validateLogin(req: Request){
        if(req.body === undefined || !req.body.username || !req.body.password) 
            return false;
        return true;
    }

    static async existing(field: string, value: string): Promise<boolean> {
        try {
          let user = await User.findOne({ where: { [field]: value } });
          return user !== null;
        } catch (error) {
          console.error(`Error checking if ${field} exists: ${error}`);
          return false;
        }
      }
    
    static async checkCredentials(username: string, password: string){
        let user = await User.findOne({where: {username}});
        if(user === null) return false;
        return compare(password, user.dataValues.password);
    }
}
export default AuthValidator;