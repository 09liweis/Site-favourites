class UrlTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags,
      tag: ''
    };
    this.addTag = this.addTag.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      tags: nextProps.tags
    });
  }
  addTag(e) {
    this.setState({
      tag: e.target.value
    });
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.addTag(this.state.tag);
      this.setState({
        tag: ''
      });
    }
  }
  render () {
    var tags = this.state.tags.map((t) => 
      <div className="tag" key={t.id}>{t.name}</div>
    );
    return(
      <div >
      {tags}
        <div className="form_control">
          <input type="text" value={this.state.tag} onChange={this.addTag} onKeyPress={this.handleKeyPress}  />
        </div>
      </div>
    );
  }
}

