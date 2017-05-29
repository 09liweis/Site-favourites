class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'main',
    };
  }
  componentDidMount() {

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
        {this.state.view == 'main' ? <Main /> : '' }
        {this.state.view == 'user' ? <UserProfile /> : '' }
      </div>
    );
  }
}

