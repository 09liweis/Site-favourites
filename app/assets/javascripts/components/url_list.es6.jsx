class UrlList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: this.props.urls,
      page: this.props.page
    };
    this.handleUrl = this.handleUrl.bind(this);
  }
  handleUrl(url) {
    var urls = this.state.urls.filter(function(u) {
      return u.id != url.id;
    });
    var _this = this;
    $.ajax({
      url: '/remove_url',
      method: 'POST',
      data: url,
      success(result) {
        _this.setState({
          urls: urls
        });
      }
    });
  }
  render() {
    const urls = this.state.urls.map((url) => 
      <Url key={url.id} url={url} handleUrl={this.handleUrl} page={this.props.page} />
    );
    return (
      <div>
        {urls}
      </div>
    );
  }
}

