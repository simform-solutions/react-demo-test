import React, { Component } from 'react';
import moment from 'moment'
import './App.css';

class App extends Component {
  state = {
    posts : [],
  }
  componentDidMount(){
    fetch('https://thewirecutter.com/wp-json/wp/v2/posts')
    .then(res=>res.json())
    .then((responseJSON) => {
      this.setState({
        posts: responseJSON
      })
    });
  }
  render() {
    const { posts } = this.state;
    return (
      <div className="App">
        {
          posts.map((post,i)=>(
            <Post post={post} key={post.id} />
          ))
        }
      </div>
    );
  }
}

const Post = ({post}) => (
  <div className='post-container' >
    <h3 className='post-title'> 
      <a href={post.link}> {post.title.rendered} </a>
    </h3>
  <div className='date'>
    {moment(post.date).format('MMMM DD YYYY')}
  </div>
  <div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} />
  <a className='read-more' href={post.link}> Read more </a>
  </div>
);


export default App;
