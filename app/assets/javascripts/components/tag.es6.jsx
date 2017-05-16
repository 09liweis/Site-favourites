class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: this.props.tag
    };
  }
  render () {
    const tag = this.state.tag;
    return (
      <div className="tag" onClick={this.props.filterByTag(tag)}>{tag.name}</div>
    );
  }
}

