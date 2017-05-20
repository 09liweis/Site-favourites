class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      tags: nextProps.tags
    });
  }
  
  render () {
    const tags = this.state.tags.map((t) => 
      <div className="tag" key={t.id} onClick={this.props.filterByTag.bind(this, t.id)}>{t.name}</div>
    );
    return (
      <div id="tags" className="f-left">
        <h2>Tags</h2>
        <div className="tag" onClick={this.props.filterByTag.bind(this, 'all')}>All</div>
        {tags}
      </div>
    );
  }
}

