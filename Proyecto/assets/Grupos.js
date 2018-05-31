class Grupos extends React.Component {
  constructor(props) {
    super(props);
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
    var id_usuario = this.props.usuario.id;
    const listaFiltrada = this.props.grupos.filter((grupo) => grupo.administrador === id_usuario);
    const listaGrupos = listaFiltrada.map((grupo,index) =>
        <tr key={index}>
          <td>{grupo.tema}</td>
          <td>{grupo.descripcion}</td>
          <td>{grupo.categorias}</td>
          <td>{grupo.region}</td>
          <td>{grupo.pais}</td>
          <td>{grupo.ciudad}</td>
          <td>{grupo.idioma}</td>
          <td>{grupo.administrador}</td>
          <td>
            <div className="row">
              <div className="col-md-12">
                <i className="fa fa-fw fa-pencil"></i>|
                <i className="fa fa-fw fa-trash"></i>|
                <i className="fa fa-fw fa-eye"></i>
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
                <th>Administrador</th>
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
                <th>Administrador</th>
                <th>Acciones</th>
              </tr>
            </tfoot>
            <tbody>
              {listaGrupos}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
