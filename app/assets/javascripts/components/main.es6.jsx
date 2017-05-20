class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      urls: [],
      detailUrl: {},
      modalOpen: false
    };
    this.filterByTag = this.filterByTag.bind(this);
    this.displayDetail = this.displayDetail.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    const _this = this;
    $.ajax({
      url: '/urls_list',
      method: 'GET',
      success(res) {
        _this.setState({
          urls: res.urls
        });
      }
    });
    
    $.ajax({
      url: '/tags_list',
      method: 'GET',
      success(res) {
        _this.setState({
          tags: res.tags
        });
      }
    });
  }
  displayDetail(url) {
    this.setState({
      detailUrl: url,
      modalOpen: true
    });
  }
  closeModal() {
    this.setState({
      detailUrl: {},
      modalOpen: false
    });
  }
  filterByTag(id) {
    const _this = this;
    $.ajax({
      url: 'url/tag/' + id,
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
        <UrlList urls={this.state.urls} displayDetail={this.displayDetail} />
        <Tags tags={this.state.tags} filterByTag={this.filterByTag.bind(this)} />
        <div className="clear"></div>
        { (this.state.modalOpen) ? <UrlDetail url={this.state.detailUrl} closeModal={this.closeModal} /> : ''}
      </div>
    );
  }
}

