<?php
require("Toro.php");
class UsuariosHandler{
  function init() {
    try {
      $dbh = new PDO('sqlite:Proyecto.db');
      return $dbh;
    } catch (Exception $e) {
      die("Unable to connect: " . $e->getMessage());
    }
  }
  function get($id=null,$pass=null) {
    $dbh = $this->init();
    try {
      if ($id!=null) {
        //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");
        $datos = explode("HXZ", $id);
        $id2 = $datos[0];
        $pass = $datos[1];
        $stmt = $dbh->prepare("SELECT * FROM Usuarios WHERE nombre= :id AND contrasena= :pass");
        $stmt->bindParam(':id', $id2, PDO::PARAM_STR);
        $stmt->bindParam(':pass', $pass, PDO::PARAM_STR);
      } else {
        $stmt = $dbh->prepare("SELECT * FROM Usuarios");
      }
      $stmt->execute();
      $data = Array();
      while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $result;
      }
      echo json_encode($data);
    } catch (Exception $e) {
      echo "Failed: " . $e->getMessage();
    }
  }
  function put($id=null) {
    $dbh = $this->init();
    try {
      $_PUT=json_decode(file_get_contents('php://input'), True);
      $id_fatura = $_PUT['id_fatura'];
      $fecha = $_PUT['fecha'];
      $cliente = $_PUT['cliente'];
      $impuestos = $_PUT['impuestos'];
      $monto_total = $_PUT['monto_total'];
      $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $stmt = $dbh->prepare("INSERT INTO facturas (fecha,cliente,impuestos,monto_total)
      VALUES (:fecha,:cliente,:impuestos,:monto_total)");
      $stmt->bindParam(':fecha', $fecha);
      $stmt->bindParam(':cliente', $cliente);
      $stmt->bindParam(':impuestos', $impuestos);
      $stmt->bindParam(':monto_total', $monto_total);
      $dbh->beginTransaction();
      $stmt->execute();
      $dbh->commit();
      echo $stmt->insert_id;
    } catch (Exception $e) {
      $dbh->rollBack();
      echo "Failed: " . $e->getMessage();
    }
  }
  function delete($id=null) {
    $dbh = $this->init();
    try {
      $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $stmt = $dbh->prepare("DELETE FROM facturas WHERE id_factura = :id_factura");
      $stmt->bindParam(':id_factura', $id);
      $dbh->beginTransaction();
      $stmt->execute();
      $dbh->commit();
      echo 'Successfull';
    } catch (Exception $e) {
      $dbh->rollBack();
      echo "Failed: " . $e->getMessage();
    }
  }
  function post($id=null) {
    $dbh = $this->init();
    try {
      $_POST=json_decode(file_get_contents('php://input'), True);
      if ($_POST['method']=='put')
        return $this->put($id);
      else if ($_POST['method']=='delete')
        return $this->delete($id);
      $id_factura = $_POST['id_factura'];
      $fecha = $_POST['fecha'];
      $cliente = $_POST['cliente'];
      $impuestos = $_POST['impuestos'];
      $monto_total = $_POST['monto_total'];
      $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $stmt = $dbh->prepare("UPDATE facturas SET fecha=:fecha,
        cliente=:cliente, impuestos=:impuestos,
        monto_total=:monto_total WHERE id_factura = :id_factura");
        $stmt->bindParam(':id_factura', $id_factura);
        $stmt->bindParam(':fecha', $fecha);
        $stmt->bindParam(':cliente', $cliente);
        $stmt->bindParam(':impuestos', $impuestos);
        $stmt->bindParam(':monto_total', $monto_total);
        $dbh->beginTransaction();
        $stmt->execute();
        $dbh->commit();
        echo 'Successfull';
      } catch (Exception $e) {
        $dbh->rollBack();
        echo "Failed: " . $e->getMessage();
      }
    }
  }
  class UsuariosXGrupoHandler{
    function init() {
      try {
        $dbh = new PDO('sqlite:Proyecto.db');
        return $dbh;
      } catch (Exception $e) {
        die("Unable to connect: " . $e->getMessage());
      }
    }
    function get($id=null,$pass=null) {
      $dbh = $this->init();
      try {
        if ($id!=null) {
          //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");

          $stmt = $dbh->prepare("SELECT * FROM Grupos WHERE ID_Grupo IN
            (SELECT ID_Grupo FROM Usuario_Por_Grupo WHERE ID_Usuario = :id)");
          $stmt->bindParam(':id', $id, PDO::PARAM_STR);
        } else {
          $stmt = $dbh->prepare("SELECT * FROM Usuarios");
        }
        $stmt->execute();
        $data = Array();
        while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
          $data[] = $result;
        }
        echo json_encode($data);
      } catch (Exception $e) {
        echo "Failed: " . $e->getMessage();
      }
    }
    function put($id=null) {
      $dbh = $this->init();
      try {
        $_PUT=json_decode(file_get_contents('php://input'), True);
        $ID_Usuario = $_PUT['ID_Usuario'];
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $dbh->prepare("INSERT INTO Usuario_Por_Grupo (ID_Usuario, ID_Grupo)
                            VALUES (:ID_Usuario,(SELECT MAX(ID_Grupo) FROM Grupos))");
        $stmt->bindParam(':ID_Usuario', $ID_Usuario);
        $dbh->beginTransaction();
        $stmt->execute();
        $dbh->commit();
        echo $stmt->insert_id;
      } catch (Exception $e) {
        $dbh->rollBack();
        echo "Failed: " . $e->getMessage();
      }
    }
    function delete($id=null) {
      $dbh = $this->init();
      try {
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $dbh->prepare("DELETE FROM Usuario_Por_Grupo WHERE ID_Grupo = :ID_Grupo");
        $stmt->bindParam(':ID_Grupo', $id);
        $dbh->beginTransaction();
        $stmt->execute();
        $dbh->commit();
        echo 'Successfull';
      } catch (Exception $e) {
        $dbh->rollBack();
        echo "Failed: " . $e->getMessage();
      }
    }
    function post($id=null) {
      $dbh = $this->init();
      try {
        $_POST=json_decode(file_get_contents('php://input'), True);
        if ($_POST['method']=='put')
          return $this->put($id);
        if ($_POST['method']=='delete')
          return $this->delete($id);
        } catch (Exception $e) {
          $dbh->rollBack();
          echo "Failed: " . $e->getMessage();
        }
      }
    }

    class UsuariosXGrupoHandler2{
      function init() {
        try {
          $dbh = new PDO('sqlite:Proyecto.db');
          return $dbh;
        } catch (Exception $e) {
          die("Unable to connect: " . $e->getMessage());
        }
      }
      function get($id=null,$pass=null) {
        $dbh = $this->init();
        try {
          if ($id!=null) {
            //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");

            $stmt = $dbh->prepare("SELECT * FROM Grupos WHERE ID_Grupo IN
              (SELECT ID_Grupo FROM Usuario_Por_Grupo WHERE ID_Usuario != :id and ID_Grupo NOT IN
                (SELECT ID_Grupo FROM Usuario_Por_Grupo WHERE ID_Usuario = :id))");
            $stmt->bindParam(':id', $id, PDO::PARAM_STR);
          } else {
            $stmt = $dbh->prepare("SELECT * FROM Usuarios");
          }
          $stmt->execute();
          $data = Array();
          while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $result;
          }
          echo json_encode($data);
        } catch (Exception $e) {
          echo "Failed: " . $e->getMessage();
        }
      }
      function put($id=null) {
        $dbh = $this->init();
        try {
          $_PUT=json_decode(file_get_contents('php://input'), True);
          $ID_Usuario = $_PUT['ID_Usuario'];
          $ID_Grupo = $_PUT['ID_Grupo'];
          $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          $stmt = $dbh->prepare("INSERT INTO Usuario_Por_Grupo (ID_Usuario, ID_Grupo)
                              VALUES (:ID_Usuario, :ID_Grupo)");
          $stmt->bindParam(':ID_Usuario', $ID_Usuario);
          $stmt->bindParam(':ID_Grupo', $ID_Grupo);
          $dbh->beginTransaction();
          $stmt->execute();
          $dbh->commit();
          echo $stmt->insert_id;
        } catch (Exception $e) {
          $dbh->rollBack();
          echo "Failed: " . $e->getMessage();
        }
      }
      function post($id=null) {
        $dbh = $this->init();
        try {
          $_POST=json_decode(file_get_contents('php://input'), True);
          if ($_POST['method']=='put')
            return $this->put($id);
          } catch (Exception $e) {
            $dbh->rollBack();
            echo "Failed: " . $e->getMessage();
          }
        }
      }
    class MensajesHandler{
      function init() {
        try {
          $dbh = new PDO('sqlite:Proyecto.db');
          return $dbh;
        } catch (Exception $e) {
          die("Unable to connect: " . $e->getMessage());
        }
      }
      function get($id=null,$pass=null) {
        $dbh = $this->init();
        try {
          if ($id!=null) {
            //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");

            $stmt = $dbh->prepare("SELECT * FROM Mensajes WHERE ID_Grupo IN
              (SELECT ID_Grupo FROM Usuario_Por_Grupo WHERE ID_Usuario = :id)");
            $stmt->bindParam(':id', $id, PDO::PARAM_STR);
          } else {
            $stmt = $dbh->prepare("SELECT * FROM Mensajes");
          }
          $stmt->execute();
          $data = Array();
          while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $result;
          }
          echo json_encode($data);
        } catch (Exception $e) {
          echo "Failed: " . $e->getMessage();
        }
      }
      function put($id=null) {
        $dbh = $this->init();
        try {
          $_PUT=json_decode(file_get_contents('php://input'), True);
          $tema = $_PUT['tema'];
          $usuario = $_PUT['usuario'];
          $fecha = $_PUT['fecha'];
          $tamano = $_PUT['tamano'];
          $contenido = $_PUT['contenido'];
          $ID_Grupo = $_PUT['ID_Grupo'];
          $nombre_usuario = $_PUT['nombre_usuario'];
          $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          $stmt = $dbh->prepare("INSERT INTO Mensajes (tema,usuario,fecha,tamano,contenido,ID_Grupo,nombre_usuario)
          VALUES (:tema,:usuario,:fecha,:tamano,:contenido,:ID_Grupo,:nombre_usuario)");
          $stmt->bindParam(':tema', $tema);
          $stmt->bindParam(':usuario', $usuario);
          $stmt->bindParam(':fecha', $fecha);
          $stmt->bindParam(':tamano', $tamano);
          $stmt->bindParam(':contenido', $contenido);
          $stmt->bindParam(':ID_Grupo', $ID_Grupo);
          $stmt->bindParam(':nombre_usuario', $nombre_usuario);
          $dbh->beginTransaction();
          $stmt->execute();
          $dbh->commit();
          echo $stmt->insert_id;
        } catch (Exception $e) {
          $dbh->rollBack();
          echo "Failed: " . $e->getMessage();
        }
      }
      function delete($id=null) {
        $dbh = $this->init();
        try {
          $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          $stmt = $dbh->prepare("DELETE FROM Mensajes WHERE ID_Mensaje = :id_mensaje");
          $stmt->bindParam(':id_mensaje', $id);
          $dbh->beginTransaction();
          $stmt->execute();
          $dbh->commit();
          echo 'Successfull';
        } catch (Exception $e) {
          $dbh->rollBack();
          echo "Failed: " . $e->getMessage();
        }
      }
      function post($id=null) {
        $dbh = $this->init();
        try {
          $_POST=json_decode(file_get_contents('php://input'), True);
          if ($_POST['method']=='put')
            return $this->put($id);
          else if ($_POST['method']=='delete')
            return $this->delete($id);
          $id_factura = $_POST['id_factura'];
          $fecha = $_POST['fecha'];
          $cliente = $_POST['cliente'];
          $impuestos = $_POST['impuestos'];
          $monto_total = $_POST['monto_total'];
          $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          $stmt = $dbh->prepare("UPDATE facturas SET fecha=:fecha,
            cliente=:cliente, impuestos=:impuestos,
            monto_total=:monto_total WHERE id_factura = :id_factura");
            $stmt->bindParam(':id_factura', $id_factura);
            $stmt->bindParam(':fecha', $fecha);
            $stmt->bindParam(':cliente', $cliente);
            $stmt->bindParam(':impuestos', $impuestos);
            $stmt->bindParam(':monto_total', $monto_total);
            $dbh->beginTransaction();
            $stmt->execute();
            $dbh->commit();
            echo 'Successfull';
          } catch (Exception $e) {
            $dbh->rollBack();
            echo "Failed: " . $e->getMessage();
          }
        }
      }
      class GruposHandler{
        function init() {
          try {
            $dbh = new PDO('sqlite:Proyecto.db');
            return $dbh;
          } catch (Exception $e) {
            die("Unable to connect: " . $e->getMessage());
          }
        }
        function get($id=null) {
          $dbh = $this->init();
          try {
            if ($id!=null) {
              //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");

              $stmt = $dbh->prepare("SELECT * FROM Grupos WHERE administrador =:id");
              $stmt->bindParam(':id', $id, PDO::PARAM_STR);
            } else {
              $stmt = $dbh->prepare("SELECT * FROM Grupos");
            }
            $stmt->execute();
            $data = Array();
            while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
              $data[] = $result;
            }
            echo json_encode($data);
          } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
          }
        }
        function put($id=null) {
          $dbh = $this->init();
          try {
            $_PUT=json_decode(file_get_contents('php://input'), True);

            $tema = $_PUT['tema'];
            $descripcion = $_PUT['descripcion'];
            $categoria = $_PUT['categoria'];
            $region = $_PUT['region'];
            $pais = $_PUT['pais'];
            $ciudad = $_PUT['ciudad'];
            $idioma = $_PUT['idioma'];
            $actividad = $_PUT['actividad'];
            $administrador = $_PUT['administrador'];
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $dbh->prepare("INSERT INTO Grupos (tema,descripcion,categorias,region,pais,ciudad,idioma,cant_miembros,actividad,administrador)
            VALUES (:tema,:descripcion,:categorias,:region,:pais,:ciudad,:idioma,1,:actividad,:administrador)");
            $stmt->bindParam(':tema', $tema);
            $stmt->bindParam(':descripcion', $descripcion);
            $stmt->bindParam(':categorias', $categoria);
            $stmt->bindParam(':region', $region);
            $stmt->bindParam(':pais', $pais);
            $stmt->bindParam(':ciudad', $ciudad);
            $stmt->bindParam(':idioma', $idioma);
            $stmt->bindParam(':actividad', $actividad);
            $stmt->bindParam(':administrador', $administrador);
            $dbh->beginTransaction();
            $stmt->execute();
            $dbh->commit();
            echo $stmt->insert_id;
          } catch (Exception $e) {
            $dbh->rollBack();
            echo "Failed: " . $e->getMessage();
          }
        }
        function delete($id=null) {
          $dbh = $this->init();
          try {
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $dbh->prepare("DELETE FROM Grupos WHERE ID_Grupo = :id_grupo");
            $stmt->bindParam(':id_grupo', $id);
            $dbh->beginTransaction();
            $stmt->execute();
            $dbh->commit();
            echo 'Successfull';
          } catch (Exception $e) {
            $dbh->rollBack();
            echo "Failed: " . $e->getMessage();
          }
        }
        function post($id=null) {
          $dbh = $this->init();
          try {
            $_POST=json_decode(file_get_contents('php://input'), True);
            if ($_POST['method']=='put')
              return $this->put($id);
            else if ($_POST['method']=='delete')
              return $this->delete($id);
            $id_grupo = $_POST['id_grupo'];
            $tema = $_POST['tema'];
            $descripcion = $_POST['descripcion'];
            $categoria = $_POST['categoria'];
            $region = $_POST['region'];
            $pais = $_POST['pais'];
            $ciudad = $_POST['ciudad'];
            $idioma = $_POST['idioma'];
            $actividad = $_POST['actividad'];
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $dbh->prepare("UPDATE Grupos SET tema=:tema,
              descripcion=:descripcion, categorias=:categorias,
              region=:region, pais=:pais,
              ciudad=:ciudad, idioma=:idioma,
              actividad=:actividad WHERE ID_Grupo = :ID_Grupo");
            $stmt->bindParam(':tema', $tema);
            $stmt->bindParam(':descripcion', $descripcion);
            $stmt->bindParam(':categorias', $categoria);
            $stmt->bindParam(':region', $region);
            $stmt->bindParam(':pais', $pais);
            $stmt->bindParam(':ciudad', $ciudad);
            $stmt->bindParam(':idioma', $idioma);
            $stmt->bindParam(':actividad', $actividad);
            $stmt->bindParam(':ID_Grupo', $id_grupo);
            $dbh->beginTransaction();
            $stmt->execute();
            $dbh->commit();
            echo 'Successfull';
            } catch (Exception $e) {
              $dbh->rollBack();
              echo "Failed: " . $e->getMessage();
            }
          }
        }

        class UsersHandler
        {
          function init() {
            try {
              $dbh = new PDO('sqlite:Proyecto.db');
              return $dbh;
            } catch (Exception $e) {
              die("Unable to connect: " . $e->getMessage());
            }
          }

          function get() {
            $dbh = $this->init();
            try{
                //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");
                $stmt = $dbh->prepare("SELECT * FROM Usuarios");

              $stmt->execute();
              $data = Array();
              while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $data[] = $result;
              }
              echo json_encode($data);
            }
            catch(Exception $e) {
              $dbh->rollBack();
              echo "Failed: " . $e->getMessage();
            }
          }
          function put($id=null) {
            $dbh = $this->init();
            try{
              $_PUT=json_decode(file_get_contents('php://input'), True);

              $nombre = $_PUT['nombre'];
              $correo = $_PUT['correo'];
              $edad = $_PUT['edad'];
              $pais = $_PUT['pais'];
              $genero = $_PUT['genero'];
              $contrasena = $_PUT['contrasena'];

              $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
              $stmt = $dbh->prepare("INSERT INTO Usuarios (nombre,correo,edad,pais,genero,contrasena)
              VALUES (:nombre,:correo,:edad,:pais,:genero,:contrasena)");

              $stmt->bindParam(':nombre', $nombre);
              $stmt->bindParam(':correo', $correo);
              $stmt->bindParam(':edad', $edad);
              $stmt->bindParam(':pais', $pais);
              $stmt->bindParam(':genero', $genero);
              $stmt->bindParam(':contrasena', $contrasena);

              $dbh->beginTransaction();
              $stmt->execute();
              $dbh->commit();
              echo "Successfull";
            }
            catch(Exception $e) {
              $dbh->rollBack();
              echo "Failed: " . $e->getMessage();
            }
          }
          function delete($id=null) {
            $dbh = $this->init();
            try{
              $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
              $stmt = $dbh->prepare("DELETE FROM Usuarios WHERE id = :Id_usuario");
              $stmt->bindParam(':Id_usuario', $id);
              $dbh->beginTransaction();
              $stmt->execute();
              $dbh->commit();
              echo "Successfull";
            }
            catch(Exception $e) {
              $dbh->rollBack();
              echo "Failed: " . $e->getMessage();
            }
          }
          function post($id=null) {
            $dbh = $this->init();
            try{
              $_POST=json_decode(file_get_contents('php://input'), True);
              if ($_POST['method']=='put')
                return $this->put($id);
              else if ($_POST['method']=='delete')
                return $this->delete($id);
                $id_usuario = $_POST['id_usuario'];
                $nombre = $_POST['nombre'];
                $correo = $_POST['correo'];
                $edad = $_POST['edad'];
                $pais = $_POST['pais'];
                $genero = $_POST['genero'];
                $contrasena = $_POST['contrasena'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE Usuarios SET nombre=:nombre,correo=:correo, edad=:edad,pais=:pais, genero=:genero,contrasena=:contrasena
                  WHERE id = :Id_usuario");
                $stmt->bindParam(':nombre', $nombre);
                $stmt->bindParam(':correo', $correo);
                $stmt->bindParam(':edad', $edad);
                $stmt->bindParam(':pais', $pais);
                $stmt->bindParam(':genero', $genero);
                $stmt->bindParam(':contrasena', $contrasena);
                $stmt->bindParam(':Id_usuario', $id_usuario);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo "Successfull";
            }
            catch(Exception $e) {
              $dbh->rollBack();
              echo "Failed: " . $e->getMessage();
            }
          }

        }

        class CategoriasHandler{
  function init() {
    try {
      $dbh = new PDO('sqlite:Proyecto.db');
      return $dbh;
    } catch (Exception $e) {
      die("Unable to connect: " . $e->getMessage());
    }
  }

  function get() {
    $dbh = $this->init();
    try{
        //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");
        $stmt = $dbh->prepare("SELECT * FROM Categorias");

      $stmt->execute();
      $data = Array();
      while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $result;
      }
      echo json_encode($data);
    }
    catch(Exception $e) {
      $dbh->rollBack();
      echo "Failed: " . $e->getMessage();
    }
  }

  function put($id=null) {
    $dbh = $this->init();
    try{
      $_PUT=json_decode(file_get_contents('php://input'), True);

      $nombre = $_PUT['nombre'];
      $categoria_padre = $_PUT['categoria_padre'];

      $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $stmt = $dbh->prepare("INSERT INTO Categorias (nombre,categoria_padre)
      VALUES (:nombre,:categoria_padre)");

      $stmt->bindParam(':nombre', $nombre);
      $stmt->bindParam(':categoria_padre', $categoria_padre);
      $dbh->beginTransaction();
      $stmt->execute();
      $dbh->commit();
      echo "Successfull";
    }
    catch(Exception $e) {
      $dbh->rollBack();
      echo "Failed: " . $e->getMessage();
    }
  }

  function delete($id=null) {
    $dbh = $this->init();
    try{
      $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $stmt = $dbh->prepare("DELETE FROM Categorias WHERE ID_Categoria = :ID_categoria");
      $stmt->bindParam(':ID_categoria', $id);
      $dbh->beginTransaction();
      $stmt->execute();
      $dbh->commit();
      echo "Successfull";
    }
    catch(Exception $e) {
      $dbh->rollBack();
      echo "Failed: " . $e->getMessage();
    }
  }


  function post($id=null) {
    $dbh = $this->init();
    try{
      $_POST=json_decode(file_get_contents('php://input'), True);
      if ($_POST['method']=='put')
        return $this->put($id);
      else if ($_POST['method']=='delete')
        return $this->delete($id);
        $id_categoria = $_POST['id_categoria'];
        $nombre = $_POST['nombre'];
        $categoria_padre = $_POST['categoria_padre'];

        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $dbh->prepare("UPDATE Categorias SET nombre=:nombre, categoria_padre=:categoria_padre WHERE ID_Categoria = :Id_categoria");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':categoria_padre', $categoria_padre);
        $stmt->bindParam(':Id_categoria', $id_categoria);
        $dbh->beginTransaction();
        $stmt->execute();
        $dbh->commit();
        echo "Successfull";
    }
    catch(Exception $e) {
      $dbh->rollBack();
      echo "Failed: " . $e->getMessage();
    }
  }
}


class GraficosHandler{

  function init() {
    try {
      $dbh = new PDO('sqlite:Proyecto.db');
      return $dbh;
    } catch (Exception $e) {
      die("Unable to connect: " . $e->getMessage());
    }
  }

  function get($id=null) {
    $dbh = $this->init();
    try {
      if ($id!=null) {
        //$stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");

        $stmt = $dbh->prepare("SELECT ID_Grupo, usuario,nombre_usuario, count(ID_Mensaje) AS Cantidad FROM Mensajes WHERE ID_Grupo = 2 and usuario = 2 ORDER BY Cantidad");
        $stmt->bindParam(':id', $id, PDO::PARAM_STR);
      } else {
        $stmt = $dbh->prepare("SELECT * FROM Mensajes");
      }
      $stmt->execute();
      $data = Array();
      while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $result;
      }
      echo json_encode($data);
    } catch (Exception $e) {
      echo "Failed: " . $e->getMessage();
    }
  }
}


  Toro::serve(array(
    "/usuario" => "UsuariosHandler",
    "/usuario/:alpha" => "UsuariosHandler",
    "/usuarioxgrupo" => "UsuariosXGrupoHandler",
    "/usuarioxgrupo/:alpha" => "UsuariosXGrupoHandler",
    "/usuarioxgrupo2" => "UsuariosXGrupoHandler2",
    "/usuarioxgrupo2/:alpha" => "UsuariosXGrupoHandler2",
    "/grupo" => "GruposHandler",
    "/grupo/:alpha" => "GruposHandler",
    "/mensaje" => "MensajesHandler",
    "/mensaje/:alpha" => "MensajesHandler",
    "/usuarios" => "UsersHandler",
    "/usuarios/:alpha" => "UsersHandler",
    "/categorias" => "CategoriasHandler",
    "/categorias/:alpha" => "CategoriasHandler"
  ));
?>
