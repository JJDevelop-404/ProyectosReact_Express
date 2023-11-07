import { pool } from "../conexion/conexion.js";

//METODOS GET
//Funcion para traer todas las mesas
export const getMesas = async (req, res) => {
    console.log("\nFuncion getMesas():");
    try {
        const Mesas = await pool.query('SELECT * FROM Mesas');
        console.log(Mesas);
        res.status(200).json(Mesas)
    } catch (error) {
        console.log(error);
        res.status(500).json('Error del servidor', error);
    }
}

//Funcion para traer todas las mesas por MeseroId
export const getMesasByMesero = async (req, res) => {
    console.log("\nFuncion getMesasByMesero():");
    try {
        const { MeseroId } = req.params;
        console.log(MeseroId);
        const Mesas = await pool.query('SELECT DMM.MesaId, DMM.CantidadClientes FROM DetalleMesasMeseros  DMM ' +
            'INNER JOIN Mesas M ON M.MesaId = DMM.MesaId WHERE MeseroId = ?', [MeseroId]);
        console.log("Mesas: ", Mesas);
        res.status(200).json(Mesas)
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor ', error });
    }
}

//Funcion para crear una mesa vacia
export const createMesaVacia = async (req, res) => {
    console.log("\nFuncion createMesa():");
    try {
        await pool.query('INSERT INTO Mesas (MesaId) VALUES (NULL)');
        console.log("Mesa creada correctamente");
        res.status(200).json({ Message: 'Mesa creada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor ', error });
    }
}

//Funcion para asignarle una mesa a un mesero
export const asignarMesaAUnMesero = async (req, res) => {
    console.log("\n\nFuncion asignarMesaAUnMesero():");
    try {
        const { MesaId, MeseroId } = req.body;
        if (MesaId && MeseroId) {// Llegan datos correctos y diferentes a vacio
            // Hacemos una consulta para verificar si la mesa ya esta asignada a un mesero
            const [isAsignada] = await pool.query('SELECT M.Estado FROM Mesas M WHERE M.MesaId = ? ', [MesaId]);
            if (isAsignada) {
                if (isAsignada.Estado === 0) {//NO esta asignada a ningun mesero
                    await pool.query('INSERT INTO DetalleMesasMeseros (MesaId, MeseroId) VALUES (?,?) ', [MesaId, MeseroId]);
                    console.log("Mesa asignada al mesero " + MeseroId + " correctamente");
                    res.status(200).json({ Exito: 'Mesa asignada al mesero ' + MeseroId + ' correctamente' });
                } else {
                    console.log("La mesa ya esta asignada a un mesero");
                    res.status(409).json({ Error: 'La mesa ya esta asignada a un mesero' });
                }
            } else {
                console.log("La mesa no existe");
                res.status(400).json({ Error: 'La mesa no existe' });
            }
        } else {
            res.status(400).json({ Error: 'No se recibieron datos' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor ', error });
    }
}

//METODO PARA ACTUALIZAR MESA
//Funcion para liberar una mesa, es decir, desasignarla de un mesero
export const desasignarMesaAUnMesero = async (req, res) => {
    console.log("\n\nFuncion desasignarMesaAUnMesero():");
    try {
        const { MesaId } = req.body;
        if (MesaId) {
            const [isAsignada] = await pool.query('SELECT M.Estado FROM Mesas M WHERE M.MesaId = ?', [MesaId]);
            if (isAsignada) {
                if (isAsignada.Estado === 1) {//SI esta asignada a algun mesero y se puede entonces desasignar
                    const isInsert = await pool.query('UPDATE DetalleMesasMeseros SET FechaDesasignacion = NOW() ' +
                        'WHERE MesaId = ? ' +
                        'ORDER BY FechaAsignacion DESC ' +
                        'LIMIT 1;', [MesaId]);
                    console.log(isInsert);
                    res.status(200).json({ Exito: 'Mesa liberada correctamente' });
                } else {//NO esta asignada, y por ende, no se puede desasignar
                    res.status(409).json({ Error: 'La mesa no esta asignada a ningun mesero' });
                }
            } else {
                console.log("La mesa no existe");
                res.status(400).json({ Error: 'La mesa no existe' });
            }
        } else {
            res.status(400).json({ Error: 'No se recibieron datos' });
            console.log("No se recibieron datos");
        }
    } catch (error) {
        res.status(500).json({ Error: 'Error del servidor ', error });
    }
}

//METODOS PARA ELIMINAR MESA
//Funcion para eliminar una mesa
export const deleteMesa = async (req, res) => {
    console.log("\n\nFuncion deleteMesa():");
    try {
        const { MesaId } = req.params;
        const isDelete = await pool.query('DELETE FROM Mesas WHERE MesaId = ?', [MesaId]);
        if (isDelete.affectedRows === 1) {
            console.log("Mesa eliminada correctamente");
            res.status(200).json({ Message: 'Mesa eliminada correctamente' });
        } else {
            console.log("No fue posible eliminar la mesa");
            res.status(400).json({ Error: `La mesa con el id ${MesaId} no existe` });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor ', error });
    }
}