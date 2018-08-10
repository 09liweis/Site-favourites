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
    const {view} = this.state;
    return (
      <div>
        <nav className="nav block">
          <a className={(view == 'owned' ? 'selected' : '')} onClick={this.changeView.bind(this, 'owned')}><i className="fa fa-user fa-fw" aria-hidden="true"></i> My Urls {this.state.ownUrls.length}</a>
          <a className={(view == 'favourites' ? 'selected' : '')} onClick={this.changeView.bind(this, 'favourites')}><i className="fa fa-star fa-fw" aria-hidden="true"></i> My Favourites {this.state.favourites.length}</a>
          <a className={(view == 'add_new' ? 'selected' : '')} onClick={this.changeView.bind(this, 'add_new')}><i className="fa fa-plus fa-fw" aria-hidden="true"></i> Add New</a>
        </nav>
        {(view == 'owned') ? 
        <UrlList page="profile" urls={this.state.ownUrls} displayDetail={this.props.displayDetail} />
        : '' }
        
        {(view == 'favourites') ? 
        <UrlList urls={this.state.favourites} displayDetail={this.props.displayDetail} />
        : '' }
        
        {(view == 'add_new') ? 
        <UrlForm />
        : '' }
        
      </div>
    );
  }
}

