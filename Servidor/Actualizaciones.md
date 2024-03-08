Actualizacion 0.0.1 => 
1. Se realizan cambios en la base de datos
2. Se realizan cambios en metodos get de productos y usuarios, pues estos traian en su respuesta el
campo "Inactivo" y este completamente innecesario ya que no nos es de utilidad puesto que solo traiamos
los registros cuyo valor en el campo Inactivo era 0, es decir falso (quiere decir que esta activo)