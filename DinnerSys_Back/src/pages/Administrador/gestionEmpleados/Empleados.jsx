import { useEffect, useState } from 'react'
import axios from 'axios';

export default function Empleados() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/usuarios/getAll')
      .then(res => {
        console.log(res.data);
        setUsuarios(res.data);
      }).catch(err => {
        console.log(err);
      });

  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {
            usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.Nombres}</td>
                <td>{usuario.Apellidos}</td>
                <td>{usuario.TipoUsuario}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
