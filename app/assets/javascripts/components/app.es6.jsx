class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'main',
      detailUrl: {},
      modalOpen: false,
    };
    this.displayDetail = this.displayDetail.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {

  }
  
  displayDetail(url) {
    //window.history.pushState({}, "", '/url/' + url.id);
    this.setState({
      detailUrl: url,
      modalOpen: true
    });
  }
  
  closeModal() {
    // window.history.pushState({}, "", '/');
    this.setState({
      detailUrl: {},
      modalOpen: false
    });
  }
  
  changeView(view) {
    this.setState({
      view: view
    });
  }
  render () {
    const {view} = this.state;
    const auth = this.props.authenticated;
    return(
      <div id="app">
        <nav className="nav block">
          <a className={(view == 'main' ? 'selected' : '')} onClick={this.changeView.bind(this, 'main')}><i className="fa fa-home fa-fw" aria-hidden="true"></i> Website</a>
          {(auth == false) ?
          <a className={(view == 'login' ? 'selected' : '')} 
              onClick={this.changeView.bind(this, 'login')}>
            <i className="fa fa-user fa-fw" aria-hidden="true"></i>Login
          </a>
          :
          <a className={(view == 'user' ? 'selected' : '')} 
              onClick={this.changeView.bind(this, 'user')}>
            <i className="fa fa-user fa-fw" aria-hidden="true"></i> User
          </a>
          }
          {(auth == true) ?
          <a href="/logout"><i className="fa fa-sign-out fa-fw" aria-hidden="true"></i> Logout</a>
          : ''
          }
        </nav>
        {view == 'main' ? <Main displayDetail={this.displayDetail} /> : '' }
        {view == 'login' ? <Authentication /> : ''}
        {view == 'user' ? <UserProfile displayDetail={this.displayDetail} /> : '' }
        { this.state.modalOpen ? <UrlDetail url={this.state.detailUrl} closeModal={this.closeModal} /> : ''}
      </div>
    );
  }
}