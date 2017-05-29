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
    window.history.pushState({}, "", '/url/' + url.id);
    this.setState({
      detailUrl: url,
      modalOpen: true
    });
    //console.log(window.location);
  }
  closeModal() {
    window.history.pushState({}, "", '/');
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
        <Tags tags={this.state.tags} filterByTag={this.filterByTag.bind(this)} />
        <UrlList urls={this.state.urls} displayDetail={this.displayDetail} />
        { (this.state.modalOpen) ? <UrlDetail url={this.state.detailUrl} closeModal={this.closeModal} /> : ''}
      </div>
    );
  }
}

