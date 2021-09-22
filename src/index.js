import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './Controller';
import Header from './common/header/Header';
import BookShow from './screens/bookshow/BookShow';
import Upcoming from './screens/home/Upcoming';
import Released from './screens/home/Released';
import FilterMovie from './screens/home/FilterMovie';


ReactDOM.render(<Controller />, document.getElementById('root'));
//ReactDOM.render(<Header />, document.getElementById('root'));
// ReactDOM.render(<Upcoming />, document.getElementById('root'));
// ReactDOM.render(<Released />, document.getElementById('root'));
ReactDOM.render(<FilterMovie />, document.getElementById('root'));
registerServiceWorker();
