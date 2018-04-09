class UrlList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: this.props.urls,
      page: this.props.page
    };
    this.handleUrl = this.handleUrl.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      urls: nextProps.urls
    });
  }
  handleUrl(url) {
    var _this = this;
    $.ajax({
      url: '/api/remove_url',
      method: 'POST',
      data: {url_id: url.id},
      success(result) {
        _this.setState({
          urls: result.urls
        });
      }
    });
  }
  render() {
    const urls = this.state.urls.map((url) => 
      <Url key={url.id} url={url} handleUrl={this.handleUrl} page={this.props.page} displayDetail={this.props.displayDetail} />
    );
    return (
      <div id="urls" className="block">
        {(urls.length != 0) ? urls: 'No Urls'}
      </div>
    );
  }
}

