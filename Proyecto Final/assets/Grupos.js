class Grupos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tema: "" , descripcion: "", categoria: "", region: "", pais: "", ciudad: "", id_grupo: 0,
                    idioma: "", actividad: "", accion: "Guardar" };
    this.prepararEditar = this.prepararEditar.bind(this);
    this.prepararInsertar = this.prepararInsertar.bind(this);
    this.handleFields = this.handleFields.bind(this);
    this.guardarDatos = this.guardarDatos.bind(this);
    this.Insertar = this.Insertar.bind(this);
    this.InsertarUsuarioXGrupo = this.InsertarUsuarioXGrupo.bind(this);
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
  Insertar(){
    fetch("php/datos.php/grupo/",{
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        method: 'put',
        tema: this.state.tema,
        descripcion: this.state.descripcion,
        categoria: this.state.categoria,
        region: this.state.region,
        pais: this.state.pais,
        ciudad: this.state.ciudad,
        idioma: this.state.idioma,
        actividad: this.state.actividad,
        administrador: this.props.usuario.id
      })
    }).then((response) => {
      this.InsertarUsuarioXGrupo();
    });
  }
  InsertarUsuarioXGrupo(){
    fetch("php/datos.php/usuarioxgrupo/",{
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        method: 'put',
        ID_Usuario: this.props.usuario.id
      })
    }).then((response) => {
      this.props.setGrupos(this.props.usuario.id);
      this.props.setGruposUsuario();
    });
  }
  Actualizar(){
    fetch("php/datos.php/grupo/",{
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id_grupo: this.state.id_grupo,
        tema: this.state.tema,
        descripcion: this.state.descripcion,
        categoria: this.state.categoria,
        region: this.state.region,
        pais: this.state.pais,
        ciudad: this.state.ciudad,
        idioma: this.state.idioma,
        actividad: this.state.actividad
      })
    }).then((response) => {
      this.props.setGrupos(this.props.usuario.id);
      this.props.setGruposUsuario();
    });
  }
  Eliminar(e){
    const index = e.currentTarget.getAttribute('index');
    fetch("php/datos.php/grupo/"+this.props.gruposUsuario[index].ID_Grupo,{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ method: 'delete'})
    }).then((response) => {
      this.props.setGrupos(this.props.usuario.id);
      this.props.setGruposUsuario();
    });
  }
  prepararEliminar(){

  }
  componentDidMount(){
    this.setState({categoria: this.props.categorias[0].nombre});
    $('#dataTable').DataTable();
  }
  componentDidUpdate(){
    $('#dataTable').DataTable();
  }
  componentWillUnmount(){
    $('#dataTable').DataTable().destroy();
  }
  prepararEditar(e){
    const index = e.currentTarget.getAttribute('index');
    this.setState({ tema: this.props.gruposUsuario[index].tema , descripcion: this.props.gruposUsuario[index].descripcion, categoria: this.props.gruposUsuario[index].categorias,
                    region: this.props.gruposUsuario[index].region, pais: this.props.gruposUsuario[index].pais, ciudad: this.props.gruposUsuario[index].ciudad,
                    idioma: this.props.gruposUsuario[index].idioma, actividad: this.props.gruposUsuario[index].actividad, id_grupo: this.props.gruposUsuario[index].ID_Grupo,
                    accion: "Editar" });
  }
  prepararInsertar(e){
    this.setState({ tema: "" , descripcion: "", categoria: this.props.categorias[0].nombre, region: "", pais: "", ciudad: "",
                    idioma: "", actividad: "", accion: "Guardar" });
  }
  handleFields(event) {
    const propiedad = event.currentTarget.getAttribute('name');
    this.setState({[propiedad]: event.target.value});
  }
  render(){
    const listaCategorias = this.props.categorias.map((categoria,index) =>
        <option value={categoria.nombre} key={index}>{categoria.nombre}</option>
    );
    var id_usuario = this.props.usuario.id;
    const listaGrupos = this.props.gruposUsuario.map((grupo,index) =>
        <tr key={index}>
          <td>{grupo.tema}</td>
          <td>{grupo.descripcion}</td>
          <td>{grupo.categorias}</td>
          <td>{grupo.region}</td>
          <td>{grupo.pais}</td>
          <td>{grupo.ciudad}</td>
          <td>{grupo.idioma}</td>
          <td>
            <div className="row">
              <div className="col-md-12">
                <i className="fa fa-fw fa-pencil" index={index} onClick={this.prepararEditar} data-toggle="modal" data-target="#modalGrupos"></i>|
                <i className="fa fa-fw fa-trash" index={index} onClick={this.Eliminar}></i>
              </div>
            </div>
          </td>
        </tr>
    );
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>Grupos</h1>
          <hr />
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead>
              <tr>
                <th>Tema</th>
                <th>Descripcion</th>
                <th>Categoria</th>
                <th>Region</th>
                <th>Pais</th>
                <th>Ciudad</th>
                <th>Idioma</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Tema</th>
                <th>Descripcion</th>
                <th>Categoria</th>
                <th>Region</th>
                <th>Pais</th>
                <th>Ciudad</th>
                <th>Idioma</th>
                <th>Acciones</th>
              </tr>
            </tfoot>
            <tbody>
              {listaGrupos}
            </tbody>
          </table>
          <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#modalGrupos" onClick={this.prepararInsertar}>Nuevo <i className="fa fa-fw fa-plus"></i></button>
        </div>
        <div className="modal fade" id="modalGrupos" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                        <input className="form-control" name="tema" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.tema} />
                      </div>
                      <div className="col-md-6">
                        <label>Descripción</label>
                        <input className="form-control" name="descripcion" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.descripcion}  />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-md-6">
                        <label>Categoría</label>
                        <select className="form-control" name="categoria" onChange={this.handleFields} value={this.state.categoria}>
                          {listaCategorias}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label>Región</label>
                        <input className="form-control" name="region" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.region} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-md-6">
                        <label>País</label>
                        <input className="form-control" name="pais" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.pais} />
                      </div>
                      <div className="col-md-6">
                        <label>Ciudad</label>
                        <input className="form-control" name="ciudad" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.ciudad} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-md-6">
                        <label>Idioma</label>
                        <input className="form-control" name="idioma" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.idioma} />
                      </div>
                      <div className="col-md-6">
                        <label>Actividad</label>
                        <input className="form-control" name="actividad" onChange={this.handleFields} type="text" aria-describedby="" placeholder="" value={this.state.actividad} />
                      </div>
                    </div>
                  </div>
                  <input type="hidden" name="id_grupo" value={this.props.id_grupo}/>
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
