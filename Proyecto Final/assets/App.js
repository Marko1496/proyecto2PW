class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usuario: [], pagActual: 0, grupos:[], mensajes:[], gruposUsuario: [], usuarios: [], categorias: [], gruposRestantes: []};
    this.cambiarPagina = this.cambiarPagina.bind(this);
    this.setUsuario = this.setUsuario.bind(this);
    this.setGrupos = this.setGrupos.bind(this);
    this.setGruposRestantes = this.setGruposRestantes.bind(this);
    this.setMensajes = this.setMensajes.bind(this);
    this.setGruposUsuario = this.setGruposUsuario.bind(this);
    this.setUsuarios = this.setUsuarios.bind(this);
    this.refrescar = this.refrescar.bind(this);
    this.setCategorias = this.setCategorias.bind(this);
    this.cerrarSesion = this.cerrarSesion.bind(this);
  }
  componentDidMount(){
    $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
      template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip" style="pointer-events: none;"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    })
  // Toggle the side navigation
  $("#sidenavToggler").click(function(e) {
    e.preventDefault();
    $("body").toggleClass("sidenav-toggled");
    $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
    $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
  });
  // Force the toggled class to be removed when a collapsible nav link is clicked
  $(".navbar-sidenav .nav-link-collapse").click(function(e) {
    e.preventDefault();
    $("body").removeClass("sidenav-toggled");
  });
  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function(e) {
    var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });
  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });
  // Configure tooltips globally
  $('[data-toggle="tooltip"]').tooltip()
  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

  }
  componentDidUpdate(){

      $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
        template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip" style="pointer-events: none;"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
      })
      // Toggle the side navigation
      $("#sidenavToggler").click(function(e) {
        e.preventDefault();
        $("body").toggleClass("sidenav-toggled");
        $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
        $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
      });
      // Force the toggled class to be removed when a collapsible nav link is clicked
      $(".navbar-sidenav .nav-link-collapse").click(function(e) {
        e.preventDefault();
        $("body").removeClass("sidenav-toggled");
      });
      // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
      $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function(e) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      });
      // Scroll to top button appear
      $(document).scroll(function() {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
          $('.scroll-to-top').fadeIn();
        } else {
          $('.scroll-to-top').fadeOut();
        }
      });
      // Configure tooltips globally
      $('[data-toggle="tooltip"]').tooltip()
      // Smooth scrolling using jQuery easing
      $(document).on('click', 'a.scroll-to-top', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
      });

  }
  setGrupos(usuario_id){
    return fetch('php/datos.php/usuarioxgrupo/'+usuario_id)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
      if(data.length > 0){
        this.setState({ grupos: data });
      }
      return data;
    })
  }
  setGruposRestantes(usuario_id){
    return fetch('php/datos.php/usuarioxgrupo2/'+usuario_id)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
      if(data.length > 0){
        console.log(data);
        this.setState({ gruposRestantes: data });
      }
      return data;
    })
  }
  setMensajes(usuario_id){
    return fetch('php/datos.php/mensaje/'+usuario_id)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
      if(data.length > 0){
        this.setState({ mensajes: data });
      }
      return data;
    })
  }
  setGruposUsuario(){
    fetch('php/datos.php/grupo/'+this.state.usuario.id)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        this.setState({ gruposUsuario: data });
        this.forceUpdate();
    })
  }

  setCategorias(){
    fetch('php/datos.php/categorias/')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState({categorias: data});
    })
  }

  setUsuarios(){
    fetch('php/datos.php/usuarios/')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState({usuarios: data});
    })
  }
  cambiarPagina(pagina) {
    this.setState({ pagActual: pagina });
    if(pagina === 1){
      this.setGruposUsuario();
    }
    else if (pagina === 3) {
      this.setCategorias();
    }
    else if (pagina === 4) {
      this.setUsuarios();
    }
  }
  setUsuario(usuario) {
    this.setState({ usuario: usuario });
  }
  refrescar(){
    this.forceUpdate();
  }
  cerrarSesion(e){
    e.preventDefault();
    this.setState({ usuario: [], pagActual: 0, grupos:[], mensajes:[], gruposUsuario: [], usuarios: [], categorias: [], gruposRestantes: []});
    this.forceUpdate();
  }

  render(){
    if(this.state.pagActual === 0){
      return (<Login cambiarPagina={this.cambiarPagina} setUsuario={this.setUsuario} setGruposRestantes={this.setGruposRestantes}
        setGrupos={this.setGrupos} setMensajes={this.setMensajes} setUsuarios={this.setUsuarios} setCategorias={this.setCategorias}/>);
    }
    else{
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
            <a className="navbar-brand" href="#" onClick={() => this.cambiarPagina(1)}>Pizarra Informativa</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
                <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                  <a className="nav-link" onClick={() => this.cambiarPagina(2)}>
                    <i className="fa fa-fw fa-users"></i>
                    <span className="nav-link-text">Grupos</span>
                  </a>
                </li>
                <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                  <a className="nav-link" onClick={() => this.cambiarPagina(3)}>
                    <i className="fa fa-fw fa-list-alt"></i>
                    <span className="nav-link-text">Categorias</span>
                  </a>
                </li>
                <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                  <a className="nav-link" onClick={() => this.cambiarPagina(4)}>
                    <i className="fa fa-fw fa-user"></i>
                    <span className="nav-link-text">Usuarios</span>
                  </a>
                </li>
                <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                  <a className="nav-link" onClick={() => this.cambiarPagina(5)}>
                    <i className="fa fa-fw fa-area-chart"></i>
                    <span className="nav-link-text">Graficos</span>
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link">Usuario: {this.state.usuario.nombre}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="modal" data-target="#exampleModal">
                    <i className="fa fa-fw fa-sign-out"></i>Logout</a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="content-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  {(() => {
                          switch (this.state.pagActual) {
                            case 1: return <Index setGruposRestantes={this.setGruposRestantes} setGrupos={this.setGrupos} setMensajes={this.setMensajes} refrescar={this.refrescar} setMensajes={this.setMensajes} usuario={this.state.usuario} grupos={this.state.grupos} mensajes={this.state.mensajes} gruposRestantes={this.state.gruposRestantes}/>;
                            case 2: return <Grupos setGrupos={this.setGrupos} setGruposUsuario={this.setGruposUsuario} usuario={this.state.usuario} gruposUsuario={this.state.gruposUsuario} categorias={this.state.categorias}/>;
                            case 3: return <Categorias refrescar={this.refrescar} setCategorias={this.setCategorias} categorias={this.state.categorias}/>
                            case 4: return <Usuarios setUsuarios={this.setUsuarios} usuarios={this.state.usuarios}/>;
                            case 5: return <Graficos />;
                            default: return <Index setGrupos={this.setGrupos} setMensajes={this.setMensajes} refrescar={this.refrescar} setMensajes={this.setMensajes} usuario={this.state.usuario} grupos={this.state.grupos} mensajes={this.state.mensajes} gruposRestantes={this.state.gruposRestantes}/>;
                          }
                        })()}
                </div>
              </div>
            </div>
          </div>
          <footer className="sticky-footer">
            <div className="container">
              <div className="text-center">
                <small>Univesidad Nacional - 2018</small>
              </div>
            </div>
          </footer>

          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fa fa-angle-up"></i>
          </a>

          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Cerrar Sesion</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">Seleccione "Salir" para cerrar la sesion actual.</div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                  <a className="btn btn-primary" onClick={this.cerrarSesion} data-dismiss="modal" href="#">Salir</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
ReactDOM.render(<App/>, document.getElementById('root'));
