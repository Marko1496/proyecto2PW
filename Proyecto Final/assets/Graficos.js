var LineChart = ReactChartkick.LineChart;
var PieChart = ReactChartkick.PieChart;
var BarChart = ReactChartkick.BarChart;
var ColumnChart = ReactChartkick.ColumnChart;
var AreaChart = ReactChartkick.AreaChart;
class Graficos extends React.Component{
  constructor(props) {
    super(props);
    this.state = { tipoGrafico: "columnas", usuarios: "", grupo: this.props.gruposTodos[0].ID_Grupo, datos: [] };
    this.setTipoGrafico = this.setTipoGrafico.bind(this);
    this.setDatos = this.setDatos.bind(this);
    this.setGrupo = this.setGrupo.bind(this);
  }
  componentDidMount(){
    this.setDatos(this.state.grupo);
  }
  setDatos(id){
    fetch('php/datos.php/graficos/'+id)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        this.setState({ datos: data });
        this.forceUpdate();
    })
  }
  setTipoGrafico(e){
    this.setState({tipoGrafico: e.target.value});
  }
  setGrupo(e){
    this.setState({grupo: e.target.value});
    this.setDatos(e.target.value);
  }
  render(){
    const listaGrupos = this.props.gruposTodos.map((grupo,index) =>
      <option key={index} value={grupo.ID_Grupo}>{grupo.tema}</option>
    );
    var arrayDatos = {};
    for (var i = 0; i < this.state.datos.length; i++) {
      arrayDatos[this.state.datos[i].nombre_usuario]=this.state.datos[i].Cantidad;
    }
    console.log(arrayDatos);
    return(
      <div>
        <h1>Graficos</h1>
        <div className="row">
          <div className="col-md-4">
            <label>Grupo</label>
            <select className="form-control" onChange={this.setGrupo}>
              {listaGrupos}
            </select>
          </div>
          <div className="col-md-4">
            <label>Usuario</label>
            <select className="form-control">
               <option value="volvo">Volvo</option>
               <option value="saab">Saab</option>
               <option value="mercedes">Mercedes</option>
               <option value="audi">Audi</option>
            </select>
          </div>
          <div className="col-md-4">
            <label>Tipo de Gráfico</label>
            <select className="form-control" onChange={this.setTipoGrafico}>
              <option value="columnas">Columnas</option>
              <option value="area">Area</option>
              <option value="linear">Linear</option>
              <option value="pie">Circular</option>
              <option value="barras">Barras</option>
            </select>
          </div>
        </div>
        <br />
        <h3>Cantidad de Mensajes Por Grupos y Usuarios</h3>
        <br />
        <div className="row">
          <div className="col-md-12">
                  {(() => {
                    switch (this.state.tipoGrafico) {
                      case "linear": return <LineChart data={arrayDatos} />;
                      case "pie": return <PieChart data={arrayDatos} />;
                      case "barras": return <BarChart data={arrayDatos} />;
                      case "columnas": return <ColumnChart data={arrayDatos} />;
                      case "area": return <AreaChart data={arrayDatos} />;
                      default: return <AreaChart data={arrayDatos} />;
                    }
                  })()}
          </div>
        </div>
      </div>
    );
  }
}
