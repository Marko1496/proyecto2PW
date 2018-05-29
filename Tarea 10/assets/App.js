var Navbar = Reactstrap.Navbar;
var NavbarBrand = Reactstrap.NavbarBrand;
var NavbarToggler = Reactstrap.NavbarToggler;
var Collapse = Reactstrap.Collapse;
var Nav = Reactstrap.Nav;
var NavItem = Reactstrap.NavItem;
var NavLink = Reactstrap.NavLink;
var UncontrolledDropdown = Reactstrap.UncontrolledDropdown;
var DropdownToggle =  Reactstrap.DropdownToggle;
var DropdownMenu = Reactstrap.DropdownMenu;
var DropdownItem = Reactstrap.DropdownItem;
var Container = Reactstrap.Container;
var Row = Reactstrap.Row;
var Col = Reactstrap.Col;

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { facturas: [], factura: [] , productos: [], productosNuevos: [], productosQuitar:[],
                       id_factura:0,fecha:"",cliente:"",impuestos:0,monto_total:0,accion:"Insertar"}
        this.handleReload = this.handleReload.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleChangeDatosFactura = this.handleChangeDatosFactura.bind(this);
        this.handleChangeFactura = this.handleChangeFactura.bind(this);
        this.handleProductos = this.handleProductos.bind(this);
        this.handleChangeProductos = this.handleChangeProductos.bind(this);
        this.agregarNuevoProducto = this.agregarNuevoProducto.bind(this);
        this.quitarNuevoProducto = this.quitarNuevoProducto.bind(this);
        this.quitarViejoProducto = this.quitarViejoProducto.bind(this);
        this.calcularImpuestos = this.calcularImpuestos.bind(this);
        this.calcularMontoTotal = this.calcularMontoTotal.bind(this);
        this.handleFields = this.handleFields.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleReload() {
        fetch('datos.php/factura')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ facturas: data });
            this.forceUpdate();
        })
    }
    handleReset(){
      this.setState({ factura: [] , productos: [], productosNuevos: [], productosQuitar:[],
                     id_factura:0,fecha:"",cliente:"",impuestos:0,monto_total:0,accion:"Insertar" });
    }
    handleProductos(id){
      fetch('datos.php/producto/'+id)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
        }
      })
      .then((data) => {
          this.setState({ productos: data });
          this.forceUpdate();
      })
    }
    agregarNuevoProducto(nuevoProducto){
      var newArray = this.state.productosNuevos.slice();
      newArray.push(nuevoProducto);
      const impuestos = this.calcularImpuestos(newArray, this.state.productos);
      const montoTotal = this.calcularMontoTotal(newArray, this.state.productos,impuestos);
      this.setState({productosNuevos:newArray,
                    impuestos: impuestos,
                    monto_total:montoTotal});
    }
    quitarNuevoProducto(index){
      var newArray = this.state.productosNuevos.slice();
      newArray.splice(index, 1);
      const impuestos = this.calcularImpuestos(newArray, this.state.productos);
      const montoTotal = this.calcularMontoTotal(newArray, this.state.productos, impuestos);
      this.setState({productosNuevos:newArray,
                    impuestos: impuestos,
                    monto_total:montoTotal});
    }
    quitarViejoProducto(index){
      var newArray = this.state.productos.slice();
      var newArray2 = this.state.productosQuitar.slice();
      newArray2.push(this.state.productos[index]);
      newArray.splice(index, 1);
      const impuestos = this.calcularImpuestos(newArray,this.state.productosNuevos);
      const montoTotal = this.calcularMontoTotal(newArray,this.state.productosNuevos,impuestos);
      this.setState({productos:newArray,
        productosQuitar:newArray2,
        impuestos: impuestos,
        monto_total:montoTotal});
    }
    componentWillMount() {
        this.handleReload();
    }
    handleChangeData() {
        this.handleReload();
    }
    handleChangeFactura(data) {
      this.setState({factura: data,
        id_factura: data.id_factura,
        fecha: data.fecha,
        cliente: data.cliente,
        impuestos: data.impuestos,
        monto_total: data.monto_total,
        accion: "Modificar"});
    }
    handleChangeDatosFactura(nextProps) {
      this.setState({id_factura:nextProps.factura.id_factura});
      this.setState({fecha:nextProps.factura.fecha});
      this.setState({cliente:nextProps.factura.cliente});
      const impuestos = this.calcularImpuestos(nextProps);
      const montoTotal = this.calcularMontoTotal(impuestos, nextProps);
      this.setState({impuestos:impuestos});
      this.setState({monto_total:montoTotal});
      if(nextProps.factura.id_factura > 0){
        this.setState({accion:"Modificar"});
      }
      else {
        this.setState({accion:"Insertar"});
      }
    }
    handleChangeProductos(data) {
        this.setState({productos: data})
    }
    calcularImpuestos(nuevosProductos, productos){
      var impuestos = 0;
      if(productos.length > 0){
        productos.forEach(function(producto) {
          impuestos = impuestos + parseInt(producto.subtotal);
        });
      }

      if(nuevosProductos.length > 0){
        nuevosProductos.forEach(function(producto) {
          impuestos = impuestos + parseInt(producto.subtotal);
        });
      }
      return (impuestos*0.13);
    }
    calcularMontoTotal(nuevosProductos, productos, impuestos){
      var montoTotal = 0;
      if(productos.length > 0){
        productos.forEach(function(producto) {
          montoTotal = montoTotal + parseInt(producto.subtotal);
        });
      }

      if(nuevosProductos.length > 0){
        nuevosProductos.forEach(function(producto) {
          montoTotal = montoTotal + parseInt(producto.subtotal);
        });
      }
      return (montoTotal+impuestos);
    }
    handleFields(event) {
      const propiedad = event.currentTarget.getAttribute('name');
      this.setState({[propiedad]: event.target.value});
    }
    render(){
      return (<div><Navbar color="light" light expand="md">
        <NavbarBrand href="/">Tarea 10</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
        </Collapse>
      </Navbar><Container><Row className="row-principal">
      <Col xs="4">
        <h2>Lista de Facturas</h2>
        <ListaFacturas facturas={this.state.facturas}
        handleChangeFactura={this.handleChangeFactura}
        handleProductos={this.handleProductos}
        handleReset={this.handleReset}/></Col>
      <Col xs="8">
        <h2>Manejo de Facturas</h2>
        <FormFacturas factura={this.state.factura}
        handleChangeData={this.handleChangeData}
        productos={this.state.productos}
        productosNuevos={this.state.productosNuevos}
        handleProductos={this.handleProductos}
        handleChangeProductos={this.handleChangeProductos}
        agregarNuevoProducto={this.agregarNuevoProducto}
        quitarNuevoProducto={this.quitarNuevoProducto}
        quitarViejoProducto={this.quitarViejoProducto}
        handleChangeDatosFactura={this.handleChangeDatosFactura}
        id_factura={this.state.id_factura}
        fecha={this.state.fecha}
        cliente={this.state.cliente}
        impuestos={this.state.impuestos}
        monto_total={this.state.monto_total}
        accion={this.state.accion}
        handleFields={this.handleFields}
        handleReset={this.handleReset}
        productosQuitar={this.state.productosQuitar}
      /></Col>
      </Row></Container></div>)
    }
}
ReactDOM.render(<App/>, document.getElementById('root'));
