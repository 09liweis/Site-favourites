class Url extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url
    };
  }
  render () {
    let url = this.state.url;
    let action;
    
    if (this.props.page == 'profile') {
      action = <a className="link btn" onClick={this.props.handleUrl.bind(this, url)}>Remove</a>;
    }
    return (
      <div className="url">
        <img className="favicon" src={url.favicon} />
        <div className="url__info">
          <a className="link" onClick={this.props.displayDetail.bind(this, url)}>{url.title}</a>
          <a className="link" href={url.link} target="_blank"><i className="fa fa-external-link"></i></a>
          {action}
        </div>
      </div>
    );
  }
}

