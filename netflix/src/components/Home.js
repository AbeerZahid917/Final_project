import React from 'react';
import Movies from './Movies';

export default function Home({setProgress}) {
  return (
    <div>
      <Movies setProgress={setProgress}/>
    </div>
  );
}
