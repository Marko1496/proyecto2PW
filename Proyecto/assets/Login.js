class Login extends React.Component {
  constructor(props) {
    super(props);
    this.ingresar = this.ingresar.bind(this);
  }
  ingresar(){
    this.props.cambiarPagina(1);
  }
  render(){
    return (

      <div className="card card-login mx-auto mt-5">
        <div className="card-header">Login Pizarra Informativa</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label >Email address</label>
              <input className="form-control" id="exampleInputEmail1" type="email" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label >Password</label>
              <input className="form-control" id="exampleInputPassword1" type="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" /> Remember Password</label>
              </div>
            </div>
            <a className="btn btn-primary btn-block" onClick={this.ingresar}>Login</a>
          </form>
          <div className="text-center">
            <a className="d-block small mt-3" href="#">Register an Account</a>
            <a className="d-block small" href="#">Forgot Password?</a>
          </div>
        </div>
      </div>
    );
  }
}