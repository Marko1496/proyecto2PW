class Login extends React.Component {
  constructor(props) {
    super(props);
    this.ingresar = this.ingresar.bind(this);
    this.state = { usuario: "", contrasena: ""}
    this.setCampos = this.setCampos.bind(this);
  }
  ingresar(e){
    e.preventDefault();
    fetch('php/datos.php/usuario/'+this.state.usuario+'HXZ'+this.state.contrasena)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
      if(data.length > 0){
        this.props.setMensajes(data[0].id);
        this.props.setGrupos(data[0].id);
        this.props.setUsuario(data[0]);
        this.props.setUsuarios();
        this.props.setCategorias();
        this.props.cambiarPagina(1);
      }
    })
  }

  setCampos(event) {
    const propiedad = event.currentTarget.getAttribute('name');
    this.setState({[propiedad]: event.target.value});
  }
  render(){
    return (

      <div className="card card-login mx-auto mt-5">
        <div className="card-header">Login Pizarra Informativa</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label >Usuario</label>
              <input onChange={this.setCampos} className="form-control" name="usuario" id="exampleInputEmail1" type="text" aria-describedby="emailHelp" placeholder="Usuario..." />
            </div>
            <div className="form-group">
              <label >Contraseña</label>
              <input onChange={this.setCampos} className="form-control" name="contrasena" id="exampleInputPassword1" type="password" placeholder="Contraseña..." />
            </div>
            <a className="btn btn-primary btn-block" onClick={this.ingresar} href="#">Login</a>
          </form>
        </div>
      </div>
    );
  }
}
