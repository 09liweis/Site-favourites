class UrlDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      tags: []
    };
    this.keyPress = this.keyPress.bind(this);
    this.addTag = this.addTag.bind(this);
  }
  componentDidMount() {
    const _this = this;
    $.ajax({
      url: '/url/' + _this.state.url.id + '/tags',
      method: 'GET',
      success(res) {
        _this.setState({
          tags: res.tags
        });
      }
    });
  }
  addTag(tag) {
    for (var i = 0; i < this.state.tags.length; i++) {
      if (tag == this.state.tags[i].name) {
        alert(tag + ' is already exist');
        return;
      }
    }
    const _this = this;
    $.ajax({
        url: '/url/' + _this.state.url.id + '/add_tag',
        method: 'POST',
        data: {tag: tag},
        success(res) {
          _this.setState({
            tags: res.tags
          });
        }
      });
  }
  keyPress(e) {
    console.log(e);
  }
  render () {
    const url = this.state.url;
    return (
      <div className="detail">
        <div className="modal-bg" onKeyPress={this.keyPress} onClick={this.props.closeModal}>
        </div>
        <div className="modal">
          <h1>{url.title}</h1>
          <button className="favourite">Favourite</button>
          <UrlTags tags={this.state.tags} addTag={this.addTag} />
        </div>
      </div>
    );
  }
}

