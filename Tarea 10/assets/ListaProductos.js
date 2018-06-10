var Table = Reactstrap.Table;
var Input = Reactstrap.Input;
var Form = Reactstrap.Form;
var Button = Reactstrap.Button;

class ListaProductos extends React.Component {
    constructor(props) {
        super(props)
        this.agregarNuevo = this.agregarNuevo.bind(this);
        this.quitarNuevo = this.quitarNuevo.bind(this);
        this.quitarViejo = this.quitarViejo.bind(this);
    }
    agregarNuevo(e) {
      e.preventDefault();
      if(e.target.elements.input_cantidad.value.trim().length > 0 &&
      e.target.elements.input_descripcion.value.trim().length > 0 &&
      e.target.elements.input_valor.value.trim().length > 0 ){
        const cantidad = e.target.elements.input_cantidad.value.trim();
        const descripcion = e.target.elements.input_descripcion.value.trim();
        const valor = e.target.elements.input_valor.value.trim();
        const subtotal = cantidad*valor;
        const datos = {
          cantidad:cantidad,
          descripcion: descripcion,
          valor_unitario:valor,
          subtotal:subtotal
        };
        document.getElementById("form-productos").reset();
        this.props.agregarNuevoProducto(datos);
      }
      else{
        alert('Los campos "Cantidad", "Descripcion" y "Valor Unitario" deben contener datos!');
      }
    }
    quitarNuevo(e){
      e.preventDefault();
      this.props.quitarNuevoProducto(e.currentTarget.getAttribute('indexprod'));
    }
    quitarViejo(e){
      e.preventDefault();
      this.props.quitarViejoProducto(e.currentTarget.getAttribute('indexprod'));
    }
    render() {
      const encabezado = (<thead><tr><th>Cantidad</th><th>Descripcion</th><th>Valor Unitario</th><th>Subtotal</th><th>Accion</th></tr></thead>);
      const inputs = (
        <tr>
            <td>
              <Input type="number" name="input_cantidad"/>
            </td>
            <td>
              <Input type="text" name="input_descripcion"/>
            </td>
            <td>
              <Input type="number" name="input_valor"/>
            </td>
            <td>
            </td>
            <td>
              <Input type="submit" value="Agregar"/>
            </td>
          </tr>
        );
      if (this.props.productos.length > 0 || this.props.productosNuevos.length > 0) {
        const rows = this.props.productos.map((producto,index) =>
        <tr key={index} data-item={index} onClick={this.handleDetails}>
          <td>{producto.cantidad}</td>
          <td>{producto.descripcion}</td>
          <td>{producto.valor_unitario}</td>
          <td>{producto.subtotal}</td>
          <td><Button id={index} color="danger" indexprod={index} onClick={this.quitarViejo}>Eliminar</Button></td>
        </tr>);
        const rows2 = this.props.productosNuevos.map((producto,index) =>
        <tr key={index} data-item={index} onClick={this.handleDetails}>
          <td>{producto.cantidad}</td>
          <td>{producto.descripcion}</td>
          <td>{producto.valor_unitario}</td>
          <td>{producto.subtotal}</td>
          <td><Button id={index} color="danger" indexprod={index} onClick={this.quitarNuevo}>Eliminar</Button></td>
        </tr>);
        if(this.props.productos.length > 0 && this.props.productosNuevos.length > 0){
          return (
            <form id="form-productos" onSubmit={this.agregarNuevo}>
              <Table striped>
                  {encabezado}
                  <tbody>
                  {rows}
                  {rows2}
                  {inputs}
                  </tbody>
              </Table>
            </form>
              );
        }
        else if(this.props.productos.length > 0){
          return (
            <form id="form-productos" onSubmit={this.agregarNuevo}>
              <Table striped>
                  {encabezado}
                  <tbody>
                  {rows}
                  {inputs}
                  </tbody>
              </Table>
            </form>
              );
        }
        else if(this.props.productosNuevos.length > 0){
          return (
            <form id="form-productos" onSubmit={this.agregarNuevo}>
              <Table striped>
                  {encabezado}
                  <tbody>
                  {rows2}
                  {inputs}
                  </tbody>
              </Table>
            </form>
              );
        }
      }
      else{
        return (
          <form id="form-productos" onSubmit={this.agregarNuevo}>
            <Table striped>
                {encabezado}
                <tbody>
                  <tr>
                    <td colSpan={5}>
                      <p>Vacío</p>
                    </td>
                  </tr>
                  {inputs}
                </tbody>
            </Table>
          </form>
        );
      }
    }
}
