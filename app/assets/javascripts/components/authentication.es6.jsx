class Authentication extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'login',
      email: '',
      password: '',
      password_confirmation: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    var value = e.target.value;
    var property = e.target.name;
    this.setState({
      [property]: value
    });
  }
  handleLogin(e) {
    e.preventDefault();
    $.ajax({
      url: '/login',
      method: 'POST',
      data: this.state,
      success(result) {
        if (result.code == 200) {
          window.location = '/';
        } else {
          alert(result.msg);
        }
      }
    });
  }
  handleSignUp(e) {
    e.preventDefault();
    var _this = this;
    $.ajax({
      url: '/register',
      method: 'POST',
      data: this.state,
      success(result) {
        if (result.code == 200) {
          _this.setState({
            view: 'login'
          });
        } else {
          alert(result.msg);
        }
      }
    });
  }
  render() {
    var view;
    if (this.state.view == 'login') {
      view = (
      <form onSubmit={this.handleLogin.bind(this)}>
        <h1>Login</h1>
        <p>Need an account? <a onClick={() => this.setState({view: 'register'})}>Create an account</a></p>
        <div className="form_control">
          <label>Email</label>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
        </div>
        <div className="form_control">
          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </div>
        <div className="form_control">
          <input type="submit" className="btn" value="Log In" />
        </div>
      </form>
      );
    } else {
      view = (
      <form onSubmit={this.handleSignUp.bind(this)}>
        <h1>Create a free account</h1>
        <p>Already have an account? <a onClick={() => this.setState({view: 'login'})}>Log in here</a></p>
        <div className="form_control">
          <label>Email</label>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
        </div>
        <div className="form_control">
          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </div>
        <div className="form_control">
          <label>Password Confirm</label>
          <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} />
        </div>
        <div className="form_control">
          <input type="submit" className="btn" value="Sign Up" />
        </div>
      </form>
      );
    }
    return (
      <div className="authentication">
      {view}
      </div>
    );
  }
}

