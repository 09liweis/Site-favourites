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
      action = 'Remove';
    }
    return (
      <div className="url">
        <img className="f-left favicon" src={url.favicon} />
        <a className="f-left link" target="_blank" href={url.link}>{url.title}</a>
        <a className="f-left link" onClick={this.props.handleUrl.bind(this, url)}>{action}</a>
        <div className="clear"></div>
      </div>
    );
  }
}

