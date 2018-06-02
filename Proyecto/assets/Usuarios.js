class Usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id_usuario: 0, nombre: "", correo: "", edad:0, pais: "", genero: "", contrasena: "", accion: "Guardar"};
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
  this.setState({ id_usuario: this.props.usuarios[index].id, nombre: this.props.usuarios[index].nombre, correo: this.props.usuarios[index].correo, edad: this.props.usuarios[index].edad,
                  pais: this.props.usuarios[index].pais, genero: this.props.usuarios[index].genero,
                  contrasena: this.props.usuarios[index].contrasena,accion: "Editar" });
}
prepararInsertar(e){
  this.setState({ id_usuario: 0, nombre: "" , correo: "", edad: 0, pais: "", genero: "", contrasena: "", accion: "Guardar" });
}

Insertar(){
  fetch("php/datos.php/usuarios/",{
    method: "post",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      method: 'put',
      nombre: this.state.nombre,
      correo: this.state.correo,
      edad: this.state.edad,
      pais: this.state.pais,
      genero: this.state.genero,
      contrasena: this.state.contrasena
    })
  }).then((response) => {
    this.props.setUsuarios();
  });
}

Actualizar(){
  console.log(this.state);
  console.log("B2");
  fetch("php/datos.php/usuarios/",{
    method: "post",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      method: 'post',
      id_usuario: this.state.id_usuario,
      nombre: this.state.nombre,
      correo: this.state.correo,
      edad: this.state.edad,
      pais: this.state.pais,
      genero: this.state.genero,
      contrasena: this.state.contrasena

    })
  }).then((response) => {
    console.log(this.state.id_usuario);
    console.log(response);
    this.props.setUsuarios();
  });
}

Eliminar(e){
  const index = e.currentTarget.getAttribute('index');
  fetch("php/datos.php/usuarios/"+this.props.usuarios[index].id,{
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ method: 'delete'})
  }).then((response) => {
    this.props.setUsuarios();
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
    console.log(this.props.usuarios);
    const listaUsuarios = this.props.usuarios.map((usuarios,index) =>
        <tr key={index}>
          <td>{usuarios.nombre}</td>
          <td>{usuarios.correo}</td>
          <td>{usuarios.edad}</td>
          <td>{usuarios.pais}</td>
          <td>{usuarios.genero}</td>
          <td>{usuarios.contrasena}</td>
          <td>
            <div className="row">
              <div className="col-md-12">
                <i className="fa fa-fw fa-pencil" index={index}  onClick={this.prepararEditar} data-toggle="modal" data-target="#modalUsuarios"></i>|
                <i className="fa fa-fw fa-trash" index={index} onClick={this.Eliminar}></i>|
                <i className="fa fa-fw fa-eye"></i>
              </div>
            </div>
          </td>
        </tr>
    );

    return (
      <div className="row">
        <div className="col-md-12">
          <h1>Usuarios</h1>
          <hr />
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Edad</th>
                <th>Pais</th>
                <th>Genero</th>
                <th>Contraseña</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Edad</th>
                <th>Pais</th>
                <th>Genero</th>
                <th>Contraseña</th>
                <th>Acciones</th>
              </tr>
            </tfoot>
            <tbody>
              {listaUsuarios}
            </tbody>
          </table>
          <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#modalUsuarios" onClick={this.prepararInsertar}>Nuevo <i className="fa fa-fw fa-plus"></i></button>
        </div>
        <div className="modal fade" id="modalUsuarios" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <label>Tema</label>
                        <input className="form-control" name="nombre" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.nombre} />
                      </div>
                      <div className="col-md-6">
                        <label>Descripción</label>
                        <input className="form-control" name="correo" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.correo}  />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-md-6">
                        <label>Categoría</label>
                        <input className="form-control" name="edad" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.edad} />
                      </div>
                      <div className="col-md-6">
                        <label>Región</label>
                        <input className="form-control" name="pais" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.pais} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-md-6">
                        <label>País</label>
                        <input className="form-control" name="genero" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.genero} />
                      </div>
                      <div className="col-md-6">
                        <label>Ciudad</label>
                        <input className="form-control" name="contrasena" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.contrasena} />
                      </div>
                    </div>
                  </div>
                  <input type="hidden" name="id_usuario" value={this.props.id_usuario}/>
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
