//PRIMERO INSTALAMOS EN NUESTRO CASO MARIADB    
// npm install mariadb

import mariadb from 'mariadb';

export const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ShoesShop'
});