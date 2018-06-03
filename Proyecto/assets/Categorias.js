class Categorias extends React.Component{
  constructor(props) {
    super(props);
    this.state = {id_categoria: 0, nombre: "", categoria_padre: 0, accion: "Guardar"};
    this.prepararEditar = this.prepararEditar.bind(this);
    this.prepararInsertar = this.prepararInsertar.bind(this);
    this.handleFields = this.handleFields.bind(this);
    this.guardarDatos = this.guardarDatos.bind(this);
    this.Insertar = this.Insertar.bind(this);
    this.Actualizar = this.Actualizar.bind(this);
    this.Eliminar = this.Eliminar.bind(this);
  }

  guardarDatos(){
  if(this.state.accion === "Guardar"){
    this.Insertar();
  }
  else if(this.state.accion === "Editar"){
    this.Actualizar();
  }
}


prepararEditar(e){
  const index = e.currentTarget.getAttribute('index');
  this.setState({ id_categoria: this.props.categorias[index].ID_Categoria, nombre: this.props.categorias[index].nombre, categoria_padre: this.props.categorias[index].categoria_padre, accion: "Editar" });
}

prepararInsertar(e){
  this.setState({id_categoria: 0, nombre: "", categoria_padre: 0, accion: "Guardar"});
}

Insertar(){
  fetch("php/datos.php/categorias/",{
    method: "post",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      method: 'put',
      nombre: this.state.nombre,
      categoria_padre: this.state.categoria_padre
    })
  }).then((response) => {
    this.props.setCategorias();
  });
}

Actualizar(){
  fetch("php/datos.php/categorias/",{
    method: "post",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      method: 'post',
      id_categoria: this.state.id_categoria,
      nombre: this.state.nombre,
      categoria_padre: this.state.categoria_padre
    })
  }).then((response) => {
    console.log(response);
    this.props.setCategorias();
  });
}

Eliminar(e){
  const index = e.currentTarget.getAttribute('index');
  fetch("php/datos.php/categorias/"+this.props.categorias[index].ID_Categoria,{
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ method: 'delete'})
  }).then((response) => {
    this.props.setCategorias();
  });
}

componentDidMount(){
  $('#dataTable').DataTable();
}
componentDidUpdate(){
  $('#dataTable').DataTable();
}
componentWillUnmount(){
  $('#dataTable').DataTable().destroy();
}

handleFields(event) {
  const propiedad = event.currentTarget.getAttribute('name');
  this.setState({[propiedad]: event.target.value});
}


render(){
  console.log(this.props.categorias);
  const listaCategorias = this.props.categorias.map((categorias,index) =>
      <tr key={index}>
        <td>{categorias.nombre}</td>
        <td>{categorias.categoria_padre}</td>
        <td>
          <div className="row">
            <div className="col-md-12">
              <i className="fa fa-fw fa-pencil" index={index} onClick={this.prepararEditar}  data-toggle="modal" data-target="#modalCategorias"></i>|
              <i className="fa fa-fw fa-trash" index={index} onClick={this.Eliminar} ></i>|
              <i className="fa fa-fw fa-eye"></i>
            </div>
          </div>
        </td>
      </tr>
  );

  return(
    <div className="row">
      <div className="col-md-12">
        <h1>Categorias</h1>
        <hr />
        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoria Padre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
            <th>Nombre</th>
            <th>Categoria Padre</th>
            <th>Acciones</th>
            </tr>
          </tfoot>
          <tbody>
            {listaCategorias}
          </tbody>
        </table>
        <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#modalCategorias" onClick={this.prepararInsertar}>Nuevo <i className="fa fa-fw fa-plus"></i></button>
      </div>
      <div className="modal fade" id="modalCategorias" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-md-6">
                      <label>Nombre</label>
                      <input className="form-control" name="nombre" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.nombre} />
                    </div>
                    <div className="col-md-6">
                      <label>Categoria Padre</label>
                      <input className="form-control" name="categoria_padre" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.categoria_padre}  />
                    </div>
                  </div>
                </div>
                <input type="hidden" name="id_categoria" value={this.props.id_categoria}/>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" accion={this.state.accion} onClick={this.guardarDatos} type="button" data-dismiss="modal">{this.state.accion}</button>
              <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

}
