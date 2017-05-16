class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags
    };
  }
  render () {
    const tags = this.state.tags.map((t) => 
      <Tag key={t.id} tag={t} filterByTag={this.props.filterByTag} />
    );
    return (
      <div id="tags" className="f-left">
        {tags}
      </div>
    );
  }
}

