class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mensajesXgrupo: []};
  }
  componentWillMount(){
    var mensajesxgrupo = [];
    for (var i = 0; i < this.props.grupos.length; i++) {
      var arrayMensajes = [];
      for (var j = 0; j < this.props.mensajes.length; j++) {
        if(this.props.grupos[i].ID_Grupo === this.props.mensajes[j].ID_Grupo){
          arrayMensajes.unshift(this.props.mensajes[j]);
        }
      }
      mensajesxgrupo.unshift(arrayMensajes);
    }
    this.setState({ mensajesXgrupo: mensajesxgrupo});
  }
  componentWillReceiveProps(nextProps) {
    var mensajesxgrupo = [];
    for (var i = 0; i < nextProps.grupos.length; i++) {
      var arrayMensajes = [];
      for (var j = 0; j < nextProps.mensajes.length; j++) {
        if(nextProps.grupos[i].ID_Grupo === nextProps.mensajes[j].ID_Grupo){
          arrayMensajes.unshift(nextProps.mensajes[j]);
        }
      }
      mensajesxgrupo.unshift(arrayMensajes);
    }
    this.setState({ mensajesXgrupo: mensajesxgrupo});
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
            <p className="text-muted smaller">Today at 4:37 PM - 1hr ago</p>
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
        <div className="list-group list-group-flush small">
          {listaMensajes[index]}
          <a className="list-group-item list-group-item-action" href="#">View all activity...</a>
        </div>
        <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
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
