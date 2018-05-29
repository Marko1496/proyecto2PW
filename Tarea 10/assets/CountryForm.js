var Form = Reactstrap.Form;
var Button = Reactstrap.Button;
var FormGroup = Reactstrap.FormGroup;
var Label = Reactstrap.Label;
var Input = Reactstrap.Input;
var FormText = Reactstrap.FormText;

class CountryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {id:"",name:"",area:0,population:0,density:0}
        this.handleInsert = this.handleInsert.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFields = this.handleFields.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({id:nextProps.country.id});
        this.setState({name:nextProps.country.name});
        this.setState({area:nextProps.country.area});
        this.setState({population:nextProps.country.population});
        this.setState({density:nextProps.country.density});
    }
    handleInsert() {
        fetch("/server/index.php/country/"+this.state.id,{
             method: "post",
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({
                 method: 'put',
                 name: this.state.name,
                 area: this.state.area,
                 population: this.state.population,
                 density: this.state.density
                        })
     }).then((response) => {
            this.props.handleChangeData();
        }
    );
    }
    handleUpdate() {
        fetch("/server/index.php/country/"+this.state.id,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                area: this.state.area,
                population: this.state.population,
                density: this.state.density
            })
      }).then((response) => {
            this.props.handleChangeData();
        }
    );
    }
     handleDelete() {
        fetch("/server/index.php/country/"+this.state.id,{
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ method: 'delete'})
        }).then((response) => {
            this.props.handleChangeData();
        }
    );
    }
    handleFields(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }
    render() {
         return(<Form>
            <FormGroup><Label>Nombre:</Label>
                <Input type="text" name="name"
                    value={this.state.name} onChange={this.handleFields}/></FormGroup>
            <FormGroup><Label>Area:</Label>
                <Input type="text" name="area"
                    value={this.state.area} onChange={this.handleFields}/></FormGroup>
             <FormGroup><Label>Population:</Label>
                <Input type="text" name="population"
                    value={this.state.population} onChange={this.handleFields}/></FormGroup>
            <FormGroup><Label>Density:</Label>
                <Input type="text" name="density"
                    value={this.state.density} onChange={this.handleFields}/></FormGroup>
            <Input type="hidden" name="id" value={this.state.id}/>
            <div>
                <Button onClick={this.handleInsert}>Agregar</Button>{' '}
                <Button onClick={this.handleUpdate}>Modificar</Button>{' '}
                <Button onClick={this.handleDelete}>Eliminar</Button>{' '}
            </div></Form>)
     }
 }
