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
  }
  handleChange(e) {
    var value = e.target.value;
    var property = e.target.name;
    this.setState({
      [property]: value
    });
  }
  handleTagSearch(e) {
    var value = e.target.value;
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
  }
  handleKeyPress(e) {
    if (e.key == 'Enter') {
      this.addTag(e.target.value);
    }
  }
  selectTag(tag) {
    this.addTag(tag.name);
  }
  addTag(tag) {
    var tags = this.state.tags;
    tags.push(tag);
    this.setState({
      tags: tags
    });
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
          window.location = '/urls';
        } else {
          alert(result.msg);
        }
      }
    });
  }
  render () {
    let tagsResult = this.state.searchTags.map((tag) => 
      <a onClick={this.selectTag.bind(this, tag)} key={tag.id}>{tag.name}</a>
    );
    return (
      <form className="authentication" onSubmit={this.handleSubmit}>
        <h1>Add Your Site</h1>
        <div className="form_control">
          <label>Enter Your Favourite</label>
          <input type="text" name="link" value={this.state.link} onChange={this.handleChange} />
        </div>
        <div className="form_control">
          <label>Tags</label>
          <input type="text" name="tag" onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleTagSearch.bind(this)}/>
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

