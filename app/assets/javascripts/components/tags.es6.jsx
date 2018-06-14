class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags,
      selectedTag: this.props.selectedTag
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      tags: nextProps.tags,
      selectedTag: nextProps.selectedTag
    });
  }
  
  render () {
    const selectedTag = this.state.selectedTag;
    const tags = this.state.tags.map((t) => 
      <div className={t.id == selectedTag ? 'tag selected' : 'tag'} key={t.id} onClick={this.props.filterByTag.bind(this, t.id)}>{t.name}</div>
    );
    return (
      <div id="tags" className="block">
        <h2>Tags</h2>
        <div className="tag" onClick={this.props.filterByTag.bind(this, 'all')}>All</div>
        {tags}
      </div>
    );
  }
}

