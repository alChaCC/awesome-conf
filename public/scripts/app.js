var People = React.createClass({
  render: function() {
    var d = this.props.data;
    return (
      <div className="people" key={d.id} onClick={this.props.onClick}>
        <div className="people-details">
          <div>
            <img src={d.thumbnail_url}></img>
          </div>
          <p>{d.first_name} {d.last_name}</p>
          <p>{d.title}</p>
          <p>{d.company}</p>
          <p>{d.country}</p>
          <p>{d.interests}</p>
        </div>
      </div>
    )
  },
});
var LightBox = React.createClass({
  onHide: function() {
    $('.lightbox').hide();
  },
  render: function() {
    var d = this.props.item;
    return (
      <div className="lightbox">
        <div className="view">
          <button onClick={this.onHide}>X</button>
          <div className="img-box">
            <img src={d.image_url}></img>
          </div>
          <div>
            <p>{d.first_name} {d.last_name}</p>
            <p>{d.title}</p>
            <p>{d.company}</p>
            <p>{d.country}</p>
            <p>{d.bio}</p>
          </div>
        </div>
      </div>
    )
  }
})
var Attendees = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      item: {},
      page: 1
    };
  },
  componentDidMount: function() {
    $.ajax({
      url: 'http://localhost:3000/attendees',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.attendees});
        this.setState({page: this.state.page + 1});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('http://localhost:3000/attendees', status, err.toString());
      }.bind(this)
    });
  },
  clickHandler: function(item) {
    var itemId = this.state.data[item].id;
    var url = 'http://localhost:3000/attendees/' + itemId;
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({item: data.attendee});
        $('.lightbox').show();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('http://localhost:3000/attendees', status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="attendees">
        {this.state.data.map(function(d, i) {
          var boundClick = this.clickHandler.bind(this, i);
          return (
            <People onClick={boundClick} key={i} data={d}/>
          );
        }, this)}
        <LightBox item={this.state.item}/>
      </div>
    );
  }
})
ReactDOM.render(
  <Attendees/>,
  document.getElementById('content')
);