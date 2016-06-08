import React from 'react';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentWillMount() {
    const getRecent = $.ajax({
      method: 'GET',
      url: '/blog/api/recent',
    })
    .done(() => {
      this.setState({
        posts: JSON.parse(getRecent.responseText),
      });
      console.log(this.state.posts)
    });
  }

  render() {
    return (
      <div> I'm a lumberjack and I'm OK. I wear high heels and I work all day. </div>
    );
  }

}

module.exports = Home;
