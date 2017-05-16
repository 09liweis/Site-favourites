class Main extends React.Component {
  constructor(props) {
    super(props);
    this.filterByTag = this.filterByTag.bind(this);
  }
  filterByTag(tag) {
    console.log(tag);
  }
  render () {
    return (
      <div>
        <UrlList urls={this.props.urls} />
        <Tags tags={this.props.tags} filterByTag={this.filterByTag} />
        <div className="clear"></div>
      </div>
    );
  }
}

