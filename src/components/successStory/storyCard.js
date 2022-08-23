import React from 'react';
import './storyCard.css'
export default function StoryCard({user}) {
    
  return <div className='story-card'>
    
      <img className='card-img' src={user.img} />
      <div className='card-body'>
      <h1 className='card-title'>{user.name}</h1>
      <p className='card-story'> {user.story}</p>
      </div>
      
      {/*  */}
  </div>;
}
