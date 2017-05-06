class UrlList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: this.props.urls
    };
  }
  render () {
    const urls = this.state.urls.map((url) => 
      <Url key={url.id} url={url} />
    );
    return (
      <div>
        {urls}
      </div>
    );
  }
}

