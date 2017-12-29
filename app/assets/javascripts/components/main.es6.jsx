class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      urls: [],
    };
    this.filterByTag = this.filterByTag.bind(this);
  }
  componentDidMount() {
    const _this = this;
    $.ajax({
      url: '/api/urls',
      method: 'GET',
      success(res) {
        _this.setState({
          urls: res.urls
        });
      }
    });
    
    $.ajax({
      url: '/api/tags_list',
      method: 'GET',
      success(res) {
        _this.setState({
          tags: res.tags
        });
      }
    });
  }
  filterByTag(id) {
    const _this = this;
    $.ajax({
      url: 'api/url/tag/' + id,
      method: 'GET',
      success(res) {
        _this.setState({
          urls: res.urls
        });
      }
    });
  }
  render () {
    return (
      <div>
        <Tags tags={this.state.tags} filterByTag={this.filterByTag.bind(this)} />
        <UrlList urls={this.state.urls} displayDetail={this.props.displayDetail} />
      </div>
    );
  }
}

