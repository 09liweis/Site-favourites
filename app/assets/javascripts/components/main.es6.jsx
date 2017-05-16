class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags,
      urls: this.props.urls
    };
    this.filterByTag = this.filterByTag.bind(this);
  }
  filterByTag(id) {
    const _this = this;
    $.ajax({
      url: 'url/tag/' + id,
      method: 'GET',
      success(res) {
        console.log(res.urls);
        _this.setState({
          urls: res.urls
        });
      }
    });
  }
  render () {
    return (
      <div>
        <UrlList urls={this.state.urls} />
        <Tags tags={this.state.tags} filterByTag={this.filterByTag.bind(this)} />
        <div className="clear"></div>
      </div>
    );
  }
}

