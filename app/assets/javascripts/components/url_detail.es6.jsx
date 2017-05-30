class UrlDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      tags: [],
      owner: false,
      favourite: false,
    };
    this.keyPress = this.keyPress.bind(this);
    this.addTag = this.addTag.bind(this);
  }
  componentDidMount() {
    const _this = this;
    $.ajax({
      url: '/url/' + _this.state.url.id,
      method: 'GET',
      success(res) {
        _this.setState({
          favourite: res.favourite,
          owner: res.owner,
          tags: res.tags
        });
      }
    });
  }
  favourite(url) {
    var _this = this;
    $.ajax({
      url: '/url/' + url.id + '/favourite',
      method: 'POST',
      success(res) {
        _this.setState({
          favourite: res.favourite
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
    var favourite = this.state.favourite ? 'Unfavourite' : 'Favourite';
    return (
      <div className="detail">
        <div className="modal-bg" onKeyPress={this.keyPress} onClick={this.props.closeModal}>
        </div>
        <div className="modal">
          <h1>{url.title}</h1>
          {this.state.owner == false ? <button className="favourite" onClick={this.favourite.bind(this, url)}>{favourite}</button> : ''}
          <UrlTags tags={this.state.tags} addTag={this.addTag} />
        </div>
      </div>
    );
  }
}

