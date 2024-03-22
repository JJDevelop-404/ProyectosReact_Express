import mariadb from 'mariadb';

export const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'DinnerSys',
    port: 3306,
});