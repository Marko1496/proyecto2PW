var Navbar = Reactstrap.Navbar;
var NavbarBrand = Reactstrap.NavbarBrand;
var NavbarToggler = Reactstrap.NavbarToggler;
var Collapse = Reactstrap.Collapse;
var Nav = Reactstrap.Nav;
var NavItem = Reactstrap.NavItem;
var NavLink = Reactstrap.NavLink;
var UncontrolledDropdown = Reactstrap.UncontrolledDropdown;
var DropdownToggle =  Reactstrap.DropdownToggle;
var DropdownMenu = Reactstrap.DropdownMenu;
var DropdownItem = Reactstrap.DropdownItem;
var Container = Reactstrap.Container;
var Row = Reactstrap.Row;
var Col = Reactstrap.Col;

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { countries: [], country: [] }
        this.handleReload = this.handleReload.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
    }
    handleReload() {
        fetch('datos.php/country')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({ countries: data });
            this.forceUpdate();
        })
    }
    componentWillMount() {
        this.handleReload();
    }
    handleChangeData() {
        this.handleReload();
    }
    handleChangeCountry(data) {
        this.setState({country: data})
    }
    render() {
        return (<div><Navbar color="light" light expand="md">
          <NavbarBrand href="/">Datos de Países</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="http://programacion-con-reactjs.readthedocs.io">Tutorial</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar><Container><Row>
        <Col xs="8"><CountryList countries={this.state.countries}
            handleChangeCountry={this.handleChangeCountry}/></Col>
        <Col xs="4"><CountryForm country={this.state.country}
            handleChangeData={this.handleChangeData}/></Col>
        </Row></Container></div>)
    }
}
ReactDOM.render(<App/>, document.getElementById('root'));
