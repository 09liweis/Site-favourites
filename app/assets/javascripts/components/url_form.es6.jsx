class UrlForm extends React.Component {
  constructor() {
    super();
    this.state = {
      link: '',
      title: '',
      favicon: '',
      tags: [],
      searchTags: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTag = this.addTag.bind(this);
    this.unselectTag = this.unselectTag.bind(this);
    this.getSiteInfo = this.getSiteInfo.bind(this);
  }
  componentDidMount() {
    this.linkText.focus();
  }
  handleChange(e) {
    var value = e.target.value;
    var property = e.target.name;
    if (property == 'link') {
      this.getSiteInfo(value);
    }
    this.setState({
      [property]: value
    });
  }
  getSiteInfo(link) {
    var _this = this;
    $.ajax({
      url: 'api/get_info_with_url',
      data: {link: link},
      success(result) {
        if (result.code == 200) {
          _this.setState({
            title: result.url.title,
            favicon: result.url.favicon
          });
        }
      }
    });
  }
  handleTagSearch(e) {
    var value = e.target.value;
    if (value !== '') {
      var _this = this;
      $.ajax({
        url: '/tags',
        method: 'GET',
        data: {keyword: value},
        success(result) {
          if (result.code == 200) {
            _this.setState({
              searchTags: result.tags
            });
          }
        }
      }); 
    } else {
      this.setState({
        searchTags: []
      });
    }
  }
  handleKeyPress(e) {
    if (e.key == 'Enter') {
      var tag = e.target.value;
      if (tag !== '') {
        this.addTag(tag);
      }
    }
    return false;
  }
  selectTag(tag) {
    this.addTag(tag.name);
  }
  unselectTag(tag) {
    var tags = this.state.tags;
    var index = tags.indexOf(tag);
    tags.splice(index, 1);
    this.setState({
      tags: tags
    });
  }
  addTag(tag) {
    var tags = this.state.tags;
    if (tags.indexOf(tag) == -1) {
      tags.push(tag);
      this.setState({
        tags: tags
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.link == '') {
      return;
    }
    $.ajax({
      url: '/urls',
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
  render () {
    let selectedTags = this.state.tags.map((tag, index) => 
      <a className="tag" onClick={this.unselectTag.bind(this, tag)} key={index}>{tag}</a>
    );
    let tagsResult = this.state.searchTags.map((tag) => 
      <a className="tag" onClick={this.selectTag.bind(this, tag)} key={tag.id}>{tag.name}</a>
    );
    return (
      <form className="authentication block" onSubmit={this.handleSubmit}>
        <h1>Add Your Site</h1>
        <div className="form_control">
          <label>Enter Your Website</label>
          <input 
            type="text" 
            name="link" 
            autoFocus 
            value={this.state.link} 
            onChange={this.handleChange} 
            ref={(input) => { this.linkText = input; }} 
          />
        </div>
        <div className="form_control">
          <label>Title</label>
          <input type="text" value={this.state.title} name="title" onChange={this.handleChange}  />
        </div>
        <div className="form_control">
          <label>Favicon</label>
          <input type="text" value={this.state.favicon} name="favicon" onChange={this.handleChange}  />
        </div>
        <div className="form_control">
          Selected Tags: {selectedTags}
          <input 
            type="text" 
            name="tag" 
            onKeyPress={this.handleKeyPress.bind(this)} 
            onChange={this.handleTagSearch.bind(this)}
          />
          <div className="search_list">
            {tagsResult}
          </div>
        </div>
        <div className="form_control">
          <input type="submit" className="btn" value="Add" />
        </div>
      </form>
    );
  }
}

