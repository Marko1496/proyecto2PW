class Usuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nombre: "", correo: "", edad:0, pais: "", genero: "", contrasena: "", accion: "Guardar"};
  }
  guardarDatos(){
  if(this.state.accion === "Guardar"){
    this.Insertar();
  }
  else if(this.state.accion === "Editar"){
    this.Actualizar();
  }
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
    console.log(response);
  });
}

Actualizar(){
  console.log("B2");
  fetch("php/datos.php/usuarios/",{
    method: "post",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      method: 'post',
      nombre: this.state.nombre,
      correo: this.state.correo,
      edad: this.state.edad,
      pais: this.state.pais,
      genero: this.state.genero,
      contrasena: this.state.contrasena
    })
  }).then((response) => {
    console.log("B3");
    console.log(response);
    this.props.setUsuarios();
  });
}

Eliminar(e){
  const index = e.currentTarget.getAttribute('index');
  fetch("php/datos.php/usuarios/"+this.props.usuarios[index],{
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
                <i className="fa fa-fw fa-pencil" index={index}  data-toggle="modal" data-target="#modalUsuarios"></i>|
                <i className="fa fa-fw fa-trash" index={index}></i>|
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
          <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#modalUsuarios">Nuevo <i className="fa fa-fw fa-plus"></i></button>
        </div>
      </div>
    );
  }
}
