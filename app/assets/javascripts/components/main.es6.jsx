class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      urls: [],
      selectedTag: 'all'
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
          urls: res.urls,
          selectedTag: id
        });
      }
    });
  }
  render () {
    const {tags, urls} = this.state;
    return (
      <div>
        <Tags tags={tags} selectedTag={this.state.selectedTag} filterByTag={this.filterByTag.bind(this)} />
        <UrlList urls={urls} displayDetail={this.props.displayDetail} />
      </div>
    );
  }
}

