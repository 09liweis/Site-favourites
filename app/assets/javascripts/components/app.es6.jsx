class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'main',
      detailUrl: {},
      modalOpen: false
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
    return(
      <div id="app">
        <nav className="nav block">
          <a className={(this.state.view == 'main' ? 'selected' : '')} onClick={this.changeView.bind(this, 'main')}><i className="fa fa-home fa-fw" aria-hidden="true"></i> Website</a>
          <a className={(this.state.view == 'user' ? 'selected' : '')} onClick={this.changeView.bind(this, 'user')}><i className="fa fa-user fa-fw" aria-hidden="true"></i> User Profile</a>
        </nav>
        {this.state.view == 'main' ? <Main displayDetail={this.displayDetail} /> : '' }
        {this.state.view == 'user' ? <UserProfile displayDetail={this.displayDetail} /> : '' }
        { (this.state.modalOpen) ? <UrlDetail url={this.state.detailUrl} closeModal={this.closeModal} /> : ''}
      </div>
    );
  }
}

