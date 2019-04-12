import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './style.scss';

const App = () => <div className="test">All the REACT are belong to us!</div>;

ReactDOM.render(<App />, document.getElementById('main'));

let num = 0;
setInterval(() => {
  num += 1;
  $('#main').html(`You have been on this page for ${num} seconds!`);
}, 1000);
