class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'owned',
      ownUrls: [],
      favourites: [],
    };
  }
  componentDidMount() {
    var _this = this;
    $.ajax({
      url: '/user_owned',
      method: 'GET',
      success(res) {
        if (res.code == 401) {
          alert(res.msg);
          return;
        }
        _this.setState({
          ownUrls: res.urls
        });
      }
    });
    
    $.ajax({
      url: '/user_favourites',
      method: 'GET',
      success(res) {
        if (res.code == 401) {
          alert(res.msg);
          return;
        }
        _this.setState({
          favourites: res.urls
        });
      }
    });
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
        <nav className="nav block">
          <a onClick={this.changeView.bind(this, 'owned')}><i className="fa fa-user fa-fw" aria-hidden="true"></i> My Urls</a>
          <a onClick={this.changeView.bind(this, 'favourites')}><i className="fa fa-star fa-fw" aria-hidden="true"></i> My Favourites</a>
        </nav>
        {(this.state.view == 'owned') ? 
        <UrlList urls={this.state.ownUrls} displayDetail={this.props.displayDetail} />
        : '' }
        
        {(this.state.view == 'favourites') ? 
        <UrlList urls={this.state.favourites} displayDetail={this.props.displayDetail} />
        : '' }
        
      </div>
    );
  }
}

