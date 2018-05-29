var Table = Reactstrap.Table;

class ListaFacturas extends React.Component {
    constructor(props) {
        super(props)
        this.handleDetails = this.handleDetails.bind(this);
    }
    handleDetails(e) {
        const index = e.currentTarget.getAttribute('data-item');
        this.props.handleReset();
        this.props.handleProductos(this.props.facturas[index].id_factura);
        this.props.handleChangeFactura(this.props.facturas[index]);
    }
    render() {
        if (this.props.facturas.length > 0) {
            const rows = this.props.facturas.map((factura,index) =>
                <tr key={index} data-item={index} onClick={this.handleDetails}>
                <td>{factura.id_factura}</td>
                <td>{factura.cliente}</td></tr>);
        return (
            <Table striped>
                <thead><tr><th>ID</th><th>Cliene</th></tr></thead>
                <tbody>
                {rows}
                </tbody>
            </Table>);
    }
    return (<p></p>)
    }
}
