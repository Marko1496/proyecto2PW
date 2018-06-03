class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mensajesXgrupo: []};
    this.enviarMensaje = this.enviarMensaje.bind(this);
    this.insertarMensaje = this.insertarMensaje.bind(this);
  }
  componentWillMount(){
    var mensajesxgrupo = [];
    for (var i = 0; i < this.props.grupos.length; i++) {
      var arrayMensajes = [];
      for (var j = 0; j < this.props.mensajes.length; j++) {
        if(this.props.grupos[i].ID_Grupo === this.props.mensajes[j].ID_Grupo){
          arrayMensajes.push(this.props.mensajes[j]);
        }
      }
      mensajesxgrupo.push(arrayMensajes);
    }
    this.setState({ mensajesXgrupo: mensajesxgrupo});
  }
  componentWillReceiveProps(nextProps) {
    var mensajesxgrupo = [];
    for (var i = 0; i < nextProps.grupos.length; i++) {
      var arrayMensajes = [];
      for (var j = 0; j < nextProps.mensajes.length; j++) {
        if(nextProps.grupos[i].ID_Grupo === nextProps.mensajes[j].ID_Grupo){
          arrayMensajes.push(nextProps.mensajes[j]);
        }
      }
      mensajesxgrupo.push(arrayMensajes);
    }
    this.setState({ mensajesXgrupo: mensajesxgrupo});
  }
  enviarMensaje(e){
    if(e.key === 'Enter'){
      var mensaje = e.target.value.trim();
      if(mensaje.length > 0){
        const grupo = e.currentTarget.getAttribute('grupo');
        const usuario = e.currentTarget.getAttribute('usuario');
        const nombreUsuario = e.currentTarget.getAttribute('nombre');
        const categoria = e.currentTarget.getAttribute('categoria');
        const tamano = mensaje.length;
        var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        var f=new Date();
        const fecha = f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + " - " +
                      f.getHours() + ":" + f.getMinutes();
        this.insertarMensaje(categoria, usuario, fecha, tamano, mensaje, grupo, nombreUsuario);
        e.target.value = null;
      }
    }
  }
  insertarMensaje(tema, usuario, fecha, tamano, contenido, id_grupo, nombre_usuario){
    fetch("php/datos.php/mensaje/",{
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        method: 'put',
        tema: tema,
        usuario: usuario,
        fecha: fecha,
        tamano: tamano,
        contenido: contenido,
        ID_Grupo: id_grupo,
        nombre_usuario: nombre_usuario
      })
    }).then((response) => {
      this.props.setMensajes(this.props.usuario.id);
      this.props.refrescar();
    });
  }
  render(){
    const listaMensajes = this.state.mensajesXgrupo.map((mensajes,index) =>
      mensajes.map((mensajes2,index2) =>
      <a className="list-group-item list-group-item-action" href="#" key={index2}>
        <div className="media">
          <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/45x45" alt="" />
          <div className="media-body">
            <strong>{mensajes2.nombre_usuario}</strong>
            <p>{mensajes2.contenido}</p>
            <p className="text-muted smaller">{mensajes2.fecha}</p>
          </div>
        </div>
      </a>
      )
    );
    const listaGrupos = this.props.grupos.map((grupo,index) =>
    <div className="col-md-4" key={index}>
      <div className="card mb-3">
        <div className="card-header">
          <i className="fa fa-bell-o"></i> {grupo.tema}</div>
        <div className="lista-mensajes list-group list-group-flush small">
          {listaMensajes[index]}
        </div>
        <div className="list-group list-group-flush small">
          <div className="list-group-item list-group-item-action" href="#">
            <input className="form-control"
              name="mensaje"
              onKeyUp={this.enviarMensaje}
              type="text"
              placeholder="Escriba su mensaje..."
              grupo={grupo.ID_Grupo}
              usuario={this.props.usuario.id}
              nombre={this.props.usuario.nombre}
              categoria={grupo.categorias}
            />
          </div>
        </div>
        <div className="card-footer small text-muted">
          Administrador:
        </div>
      </div>
    </div>
  );
    return (
      <div>
        <h1>Index</h1>
        <hr />
        <div className="row">
          {listaGrupos}
        </div>
      </div>
    );
  }
}
