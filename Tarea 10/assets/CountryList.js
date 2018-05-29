var Table = Reactstrap.Table;

class CountryList extends React.Component {
    constructor(props) {
        super(props)
        this.handleDetails = this.handleDetails.bind(this);
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        this.props.handleChangeCountry(this.props.countries[index]);
    }
    render() {
        if (this.props.countries.length > 0) {
            const rows = this.props.countries.map((country,index) =>
                <tr key={index} data-item={index} onClick={this.handleDetails}>
                <td>{country.name}</td>
                <td>{country.area}</td>
                <td>{country.population}</td>
                <td>{country.density}</td></tr>);
        return (
            <Table striped>
                <thead><tr><th>Nombre</th><th>Area</th><th>Pop.</th>
                <th>Dens.</th></tr></thead>
                <tbody>
                {rows}
                </tbody>
            </Table>);
    }
    return (<p></p>)
    }
}
