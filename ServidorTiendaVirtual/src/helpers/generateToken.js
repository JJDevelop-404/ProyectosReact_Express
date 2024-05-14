import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

//FUNCION PARA GENERAR EL TOKEN
export const generateAccessToken = (user) => { 
    return jwt.sign(user, process.env.SECRET_TOKEN, { expiresIn: '24h'});
};

export const verifyToken = async (token) => {
    return jwt.verify(token, process.env.SECRET_TOKEN);
}