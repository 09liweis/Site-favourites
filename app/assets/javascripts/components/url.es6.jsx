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
      action = <a className="f-left link btn" onClick={this.props.handleUrl.bind(this, url)}>Remove</a>;
    }
    return (
      <div className="url">
        <img className="f-left favicon" src={url.favicon} />
        <a className="f-left link" target="_blank" href={url.link}>{url.title}</a>
        {action}
        <div className="clear"></div>
      </div>
    );
  }
}

