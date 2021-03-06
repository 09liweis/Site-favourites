class Url extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url
    };
  }
  render () {
    const url = this.state.url;
    let action;
    
    if (this.props.page == 'profile') {
      action = <a className="link btn" onClick={this.props.handleUrl.bind(this, url)}>Remove</a>;
    }
    return (
      <div className="url block">
        <figure className="url__content url__favicon">
          <img className="url__icon" src={url.favicon} />
        </figure>
        <div className="url__content links">
          <a className="link" onClick={this.props.displayDetail.bind(this, url)}>{url.title}</a>
          <div className="modalLink"><a className="link" href={url.link} target="_blank"><i className="fa fa-external-link"></i></a></div>
          {action}
        </div>
      </div>
    );
  }
}