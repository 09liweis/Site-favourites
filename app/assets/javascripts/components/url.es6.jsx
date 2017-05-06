class Url extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url
    };
  }
  render () {
    return (
      <div>
        {this.state.url.title}
      </div>
    );
  }
}

