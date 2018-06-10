<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" /> <title>Hello World</title>
    <script src="react.development.js"></script>
    <script src="react-dom.development.js"></script>
    <script src="babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
    class CountryList extends React.Component {
        render() {
          return this.props.countries.map((country) =>
        <tr><td>{country.id_fatura}</td><td>{country.fecha}</td>
        <td>{country.cliente}</td><td>{country.impuestos}</td></tr>
        );
        }
    }
    class CountryApp extends React.Component {
        constructor(props) {
          super(props)
          this.state = { countries: [] }
        }
        componentWillMount() {
          fetch('datos.php/country')
            .then((response) => {
                return response.json()
            })
            .then((countries) => {
                this.setState({ countries: countries })
            })
        }
        render() {
          if (this.state.countries.length > 0) {
            return (
                <table>
                  <thead><tr><th>Nombre</th><th>Area</th><th>Population</th>
                        <th>Density</th></tr></thead>
                  <tbody>
                    <CountryList countries={this.state.countries} />
                  </tbody>
                </table>
            )
          } else {
            return <p>Loading countries...</p>
          }
        }
    }
   ReactDOM.render(<CountryApp/>, document.getElementById('root'));
   </script>
  </body>
</html>
