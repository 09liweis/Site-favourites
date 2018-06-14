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
    const {selectedTag, tags} = this.state;
    const tagList = tags.map((t) => 
      <div className={t.id == selectedTag ? 'tag selected' : 'tag'} key={t.id} onClick={this.props.filterByTag.bind(this, t.id)}>{t.name}</div>
    );
    return (
      <div id="tags" className="block">
        <div className={selectedTag == 'all' ? 'tag selected' : 'tag'} onClick={this.props.filterByTag.bind(this, 'all')}>All</div>
        {tagList}
      </div>
    );
  }
}

