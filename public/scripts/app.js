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
  render: function() {
    return (
      <div className="attendees">
        {this.state.data.map(function(d, i) {
          return (
            <div className="people" key={d.id}>
              <div className="people-details">
                <div>
                  <img src={d.thumbnail_url}></img>
                </div>
                <p>{d.first_name}{d.last_name}</p>
                <p>{d.title}</p>
                <p>{d.company}</p>
                <p>{d.country}</p>
                <p>{d.interests}</p>
              </div>
            </div>
          );
        }, this)}
      </div>
    );
  }
})
ReactDOM.render(
  <Attendees/>,
  document.getElementById('content')
);