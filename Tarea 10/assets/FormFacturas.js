var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;
var Row = Reactstrap.Row;
var Col = Reactstrap.Col;
class FormFacturas extends React.Component {
    constructor(props) {
        super(props)
        this.guardarDatos = this.guardarDatos.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleInsertProductos = this.handleInsertProductos.bind(this);
        this.handleInsertProductosEditar = this.handleInsertProductosEditar.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDeleteProducto = this.handleDeleteProducto.bind(this);
        this.handleDeleteProductoEspecifico = this.handleDeleteProductoEspecifico.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentWillReceiveProps(nextProps) {
      //this.props.handleChangeDatosFactura(nextProps);
    }


    guardarDatos(){
      if(this.props.cliente.trim().length > 0 && this.props.fecha.trim().length > 0){
        if(this.props.accion === "Insertar"){
          this.handleInsert();
        }
        else if(this.props.accion === "Modificar"){
          this.handleUpdate();
        }
      }
      else{
        alert('Los campos "Cliente" y "Fecha" deben contener datos!');
      }
    }

    handleInsert() {
      fetch("datos.php/factura/"+this.props.id_factura,{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          method: 'put',
          id_fatura: this.props.id_fatura,
          fecha: this.props.fecha.trim(),
          cliente: this.props.cliente.trim(),
          impuestos: this.props.impuestos,
          monto_total: this.props.monto_total
        })
      }).then((response) => {
        if(this.props.productosNuevos.length > 0){
          for (var i = 0, len = this.props.productosNuevos.length; i < len; i++) {
            this.handleInsertProductos(this.props.productosNuevos[i]);
          }
        }
        this.props.handleReset();
        this.props.handleChangeData();
      })
    }
    handleInsertProductos(productosNuevos) {
      fetch("datos.php/producto/"+this.props.id_fatura,{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          method: 'put',
          cantidad: parseInt(productosNuevos.cantidad),
          descripcion: productosNuevos.descripcion,
          valor_unitario: parseInt(productosNuevos.valor_unitario),
          subtotal: productosNuevos.subtotal
        })
      }).then((response) => {
      });
    }
    handleInsertProductosEditar(productosNuevos) {
      fetch("datos.php/producto/"+this.props.id_fatura,{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          method: 'editar',
          id_factura: this.props.id_factura,
          cantidad: parseInt(productosNuevos.cantidad),
          descripcion: productosNuevos.descripcion,
          valor_unitario: parseInt(productosNuevos.valor_unitario),
          subtotal: productosNuevos.subtotal
        })
      }).then((response) => {
      });
    }
    handleUpdate() {
        fetch("datos.php/factura/"+this.props.id_factura,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'post',
                id_factura: this.props.id_factura,
                fecha: this.props.fecha.trim(),
                cliente: this.props.cliente.trim(),
                impuestos: this.props.impuestos,
                monto_total: this.props.monto_total
            })
      }).then((response) => {
        if(this.props.productosNuevos.length > 0){
          for (var i = 0, len = this.props.productosNuevos.length; i < len; i++) {
            this.handleInsertProductosEditar(this.props.productosNuevos[i]);
          }
        }
        if(this.props.productosQuitar.length > 0){
          for (var i = 0, len = this.props.productosQuitar.length; i < len; i++) {
            this.handleDeleteProductoEspecifico(this.props.productosQuitar[i].id_producto);
          }
        }
        this.props.handleReset();
        this.props.handleChangeData();
      });
    }
    handleDelete() {
      if(this.props.accion === "Modificar"){
        fetch("datos.php/factura/"+this.props.id_factura,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) => {
            this.handleDeleteProducto();
            this.props.handleReset();
            this.props.handleChangeData();
        });
      }
    }
    handleDeleteProducto() {
        fetch("datos.php/producto/"+this.props.id_factura,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) => {
        });
    }
    handleDeleteProductoEspecifico(id_producto) {
        fetch("datos.php/producto/"+id_producto,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'borrar'})
        }).then((response) => {
        });
    }
    render() {
         return(
           <div>
             <Row>
               <Col xs="6">
                 <FormGroup>
                   <Label>ID:</Label>
                   <Input type="number" name="id_factura"
                       value={this.props.id_factura} onChange={this.props.handleFields}/>
                 </FormGroup>
               </Col>
               <Col xs="6">
                 <FormGroup>
                   <Label>Cliente:</Label>
                   <Input type="text" name="cliente"
                     value={this.props.cliente} onChange={this.props.handleFields}/>
                 </FormGroup>
               </Col>
             </Row>
             <Row>
               <Col xs="6">
                 <FormGroup>
                   <Label>Fecha:</Label>
                   <Input type="date" name="fecha"
                           value={this.props.fecha} onChange={this.props.handleFields}/>
                 </FormGroup>
               </Col>
             </Row>
             <h3>Productos:</h3>
             <ListaProductos productos={this.props.productos}
                       productosNuevos={this.props.productosNuevos}
                       agregarNuevoProducto={this.props.agregarNuevoProducto}
                       quitarNuevoProducto={this.props.quitarNuevoProducto}
                       quitarViejoProducto={this.props.quitarViejoProducto}
                       setImpuestos={this.props.setImpuestos}
                       setMontoTotal={this.props.setMontoTotal}
                    />

             <p>Impuestos: {this.props.impuestos}</p><p>Monto Total: {this.props.monto_total}</p>
             <input type="hidden" name="id" value={this.props.id_factura}/>
             <div>
               <Button accion={this.props.accion} color="success" onClick={this.guardarDatos}>{this.props.accion}</Button>{' '}
               <Button onClick={this.handleDelete} color="danger">Eliminar</Button>{' '}
               <Button onClick={this.props.handleReset}>Cancelar</Button>{' '}
             </div>
           </div>
         );
     }
 }
