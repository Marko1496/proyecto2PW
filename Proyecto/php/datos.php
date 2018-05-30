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






      
    class DBHandler {
        function init() {
            try {
                $dbh = new PDO('sqlite:tarea4.db');
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
                    $stmt = $dbh->prepare("SELECT * FROM facturas");
                    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM facturas");
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
    class DBProductoHandler {
        function init() {
            try {
                $dbh = new PDO('sqlite:tarea4.db');
                return $dbh;
            } catch (Exception $e) {
                die("Unable to connect: " . $e->getMessage());
            }
        }
        function get($id=null) {
            $dbh = $this->init();
            try {
                if ($id!=null) {
                    $stmt = $dbh->prepare("SELECT * FROM productos WHERE id_factura = :id");
                    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
                } else {
                    $stmt = $dbh->prepare("SELECT * FROM productos");
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
                $cantidad = $_PUT['cantidad'];
                $descripcion= $_PUT['descripcion'];
                $valor_unitario = $_PUT['valor_unitario'];
                $subtotal = $_PUT['subtotal'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO productos (cantidad,descripcion,valor_unitario,subtotal,id_factura)
                                                VALUES (:cantidad,:descripcion,:valor_unitario,:subtotal,(SELECT MAX(id_factura) FROM facturas))");
                $stmt->bindParam(':cantidad', $cantidad);
                $stmt->bindParam(':descripcion', $descripcion);
                $stmt->bindParam(':valor_unitario', $valor_unitario);
                $stmt->bindParam(':subtotal', $subtotal);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo "Successfull";
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function editar($id=null) {
            $dbh = $this->init();
            try {
                $_PUT=json_decode(file_get_contents('php://input'), True);
                $cantidad = $_PUT['cantidad'];
                $descripcion= $_PUT['descripcion'];
                $valor_unitario = $_PUT['valor_unitario'];
                $subtotal = $_PUT['subtotal'];
                $id_factura = $_PUT['id_factura'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("INSERT INTO productos (cantidad,descripcion,valor_unitario,subtotal,id_factura)
                                                VALUES (:cantidad,:descripcion,:valor_unitario,:subtotal,:id_factura)");
                $stmt->bindParam(':cantidad', $cantidad);
                $stmt->bindParam(':descripcion', $descripcion);
                $stmt->bindParam(':valor_unitario', $valor_unitario);
                $stmt->bindParam(':subtotal', $subtotal);
                $stmt->bindParam(':id_factura', $id_factura);
                $dbh->beginTransaction();
                $stmt->execute();
                $dbh->commit();
                echo "Successfull";
            } catch (Exception $e) {
                $dbh->rollBack();
                echo "Failed: " . $e->getMessage();
            }
        }
        function delete($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM productos WHERE id_factura = :id_factura");
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
        function borrarUno($id=null) {
            $dbh = $this->init();
            try {
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("DELETE FROM productos WHERE id_producto = :id_producto");
                $stmt->bindParam(':id_producto', $id);
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
                else if ($_POST['method']=='editar')
                    return $this->editar($id);
                else if ($_POST['method']=='borrar')
                    return $this->borrarUno($id);
                $name = $_POST['name'];
                $area = $_POST['area'];
                $population = $_POST['population'];
                $density = $_POST['density'];
                $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $dbh->prepare("UPDATE countries SET area=:area,
                                        population=:population, density=:density,
                                        name=:name WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':area', $area);
                $stmt->bindParam(':population', $population);
                $stmt->bindParam(':density', $density);
                $stmt->bindParam(':name', $name);
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
    Toro::serve(array(
      "/usuario" => "UsuariosHandler",
      "/usuario/:alpha" => "UsuariosHandler",
      "/factura" => "DBHandler",
      "/factura/:alpha" => "DBHandler",
      "/producto" => "DBProductoHandler",
      "/producto/:alpha" => "DBProductoHandler"
    ));
?>
