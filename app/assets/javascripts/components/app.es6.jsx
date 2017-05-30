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
        <nav>
          <a onClick={this.changeView.bind(this, 'main')}>Website</a>
          <a onClick={this.changeView.bind(this, 'user')}>User Profile</a>
        </nav>
        {this.state.view == 'main' ? <Main displayDetail={this.displayDetail} /> : '' }
        {this.state.view == 'user' ? <UserProfile displayDetail={this.displayDetail} /> : '' }
        { (this.state.modalOpen) ? <UrlDetail url={this.state.detailUrl} closeModal={this.closeModal} /> : ''}
      </div>
    );
  }
}

