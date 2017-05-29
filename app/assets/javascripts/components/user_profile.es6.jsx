class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'owned'
    };
  }
  changeView(view) {
    this.setState({
      view: view
    });
  }
  render () {
    return (
      <div>
        <h1>User Profile</h1>
        <UrlList />
      </div>
    );
  }
}

