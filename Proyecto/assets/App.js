class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usuario: [], pagActual: 0}
    this.cambiarPagina = this.cambiarPagina.bind(this);
  }
  componentDidUpdate(){
    (function($) {
      "use strict"; // Start of use strict
      // Configure tooltips for collapsed side navigation
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
    })(jQuery); // End of use strict
  }
  componentDidMount() {
    (function($) {
      "use strict"; // Start of use strict
      // Configure tooltips for collapsed side navigation
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
    })(jQuery); // End of use strict
  }
  cambiarPagina(pagina) {
    this.setState({ pagActual: pagina });
    this.forceUpdate();
  }

  render(){
    if(this.state.pagActual === 0){
      return (<Login cambiarPagina={this.cambiarPagina}/>);
    }
    else{
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
            <a className="navbar-brand" href="#">Pizarra Informativa</a>
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
                    <i className="fa fa-fw fa-area-chart"></i>
                    <span className="nav-link-text">Categorias</span>
                  </a>
                </li>
                <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                  <a className="nav-link" onClick={() => this.cambiarPagina(4)}>
                    <i className="fa fa-fw fa-user"></i>
                    <span className="nav-link-text">Usuarios</span>
                  </a>
                </li>
                <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
                  <a className="nav-link" onClick={() => this.cambiarPagina(5)}>
                    <i className="fa fa-fw fa-comments"></i>
                    <span className="nav-link-text">Mensajes</span>
                  </a>
                </li>
                <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Menu Levels">
                  <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMulti" data-parent="#exampleAccordion">
                    <i className="fa fa-fw fa-sitemap"></i>
                    <span className="nav-link-text">Menu Levels</span>
                  </a>
                  <ul className="sidenav-second-level collapse" id="collapseMulti">
                    <li>
                      <a href="#">Second Level Item</a>
                    </li>
                    <li>
                      <a href="#">Second Level Item</a>
                    </li>
                    <li>
                      <a href="#">Second Level Item</a>
                    </li>
                    <li>
                      <a className="nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMulti2">Third Level</a>
                      <ul className="sidenav-third-level collapse" id="collapseMulti2">
                        <li>
                          <a href="#">Third Level Item</a>
                        </li>
                        <li>
                          <a href="#">Third Level Item</a>
                        </li>
                        <li>
                          <a href="#">Third Level Item</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="navbar-nav sidenav-toggler">
                <li className="nav-item">
                  <a className="nav-link text-center" id="sidenavToggler">
                    <i className="fa fa-fw fa-angle-left"></i>
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-fw fa-envelope"></i>
                    <span className="d-lg-none">Messages
                      <span className="badge badge-pill badge-primary">12 New</span>
                    </span>
                    <span className="indicator text-primary d-none d-lg-block">
                      <i className="fa fa-fw fa-circle"></i>
                    </span>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="messagesDropdown">
                    <h6 className="dropdown-header">New Messages:</h6>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <strong>David Miller</strong>
                      <span className="small float-right text-muted">11:21 AM</span>
                      <div className="dropdown-message small">Hey there! This new version of SB Admin is pretty awesome! These messages clip off when they reach the end of the box so they don't overflow over to the sides!</div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <strong>Jane Smith</strong>
                      <span className="small float-right text-muted">11:21 AM</span>
                      <div className="dropdown-message small">I was wondering if you could meet for an appointment at 3:00 instead of 4:00. Thanks!</div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <strong>John Doe</strong>
                      <span className="small float-right text-muted">11:21 AM</span>
                      <div className="dropdown-message small">I've sent the final files over to you for review. When you're able to sign off of them let me know and we can discuss distribution.</div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item small" href="#">View all messages</a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle mr-lg-2" id="alertsDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-fw fa-bell"></i>
                    <span className="d-lg-none">Alerts
                      <span className="badge badge-pill badge-warning">6 New</span>
                    </span>
                    <span className="indicator text-warning d-none d-lg-block">
                      <i className="fa fa-fw fa-circle"></i>
                    </span>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="alertsDropdown">
                    <h6 className="dropdown-header">New Alerts:</h6>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <span className="text-success">
                        <strong>
                          <i className="fa fa-long-arrow-up fa-fw"></i>Status Update</strong>
                      </span>
                      <span className="small float-right text-muted">11:21 AM</span>
                      <div className="dropdown-message small">This is an automated server response message. All systems are online.</div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <span className="text-danger">
                        <strong>
                          <i className="fa fa-long-arrow-down fa-fw"></i>Status Update</strong>
                      </span>
                      <span className="small float-right text-muted">11:21 AM</span>
                      <div className="dropdown-message small">This is an automated server response message. All systems are online.</div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <span className="text-success">
                        <strong>
                          <i className="fa fa-long-arrow-up fa-fw"></i>Status Update</strong>
                      </span>
                      <span className="small float-right text-muted">11:21 AM</span>
                      <div className="dropdown-message small">This is an automated server response message. All systems are online.</div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item small" href="#">View all alerts</a>
                  </div>
                </li>
                <li className="nav-item">
                  <form className="form-inline my-2 my-lg-0 mr-lg-2">
                    <div className="input-group">
                      <input className="form-control" type="text" placeholder="Search for..." />
                      <span className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="fa fa-search"></i>
                        </button>
                      </span>
                    </div>
                  </form>
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
                            case 1: return <p>Pag 1</p>;
                            case 2: return <p>Pag 2</p>;
                            case 3: return <p>Pag 3</p>;
                            case 4: return <p>Pag 4</p>;
                            case 5: return <p>Pag 5</p>;
                            default: return <p>Pag 1</p>;
                          }
                        })()}
                </div>
              </div>
            </div>
          </div>

          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fa fa-angle-up"></i>
          </a>

          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                  <a className="btn btn-primary" href="login.html">Logout</a>
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
