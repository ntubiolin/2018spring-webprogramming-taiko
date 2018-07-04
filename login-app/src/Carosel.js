/* eslint-disable react/prop-types, react/jsx-filename-extension, react/destructuring-assignment, max-len, prefer-template, no-console, jsx-a11y/click-events-have-key-events, no-underscore-dangle */

import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactAudioPlayer from 'react-audio-player';
import {
  // BrowserRouter as Router,
  // Route,
  // Link,
  Redirect,
  // withRouter,
} from 'react-router-dom';
import './animation.css';
import Easy from './img/ico_difficulty_1.png';
import Normal from './img/ico_difficulty_2.png';
import Hard from './img/ico_difficulty_3.png';
import Oni from './img/ico_difficulty_4.png';
import goldCrown from './img/goldCrown.png';
import silverCrown from './img/silverCrown.png';

function throttle(callback, limit) {
  let wait = false;
  return function checkWait(...args) {
    if (!wait) {
      callback(...args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      active: this.props.active,
      direction: '',
      redirect: false,
    };
    this.rightClick = this.moveRight.bind(this);
    this.leftClick = this.moveLeft.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.rightClick = throttle(this.rightClick, 400);
    this.leftClick = throttle(this.leftClick, 400);
    this.handleKeyPress = throttle(this.handleKeyPress, 400);
  }

  componentDidMount() {
    console.log(this.props.userInfo.sessionKey);
    const test = { id_token: this.props.userInfo.sessionKey };

    document.addEventListener('keydown', this.handleKeyPress, false);
    fetch('http://webdemo.nctu.me:5000/songList')
      .then(response => response.json())
      .then(json => this.setState({ items: json }))
      .then(() => {
        fetch('http://webdemo.nctu.me:5000/userScores', {
          method: 'POST',
          body: JSON.stringify(test),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(response => response.json())
          .then((a) => {
            console.log(a);
            for (let i = 0; i < this.state.items.length; i += 1) {
              const index = a.findIndex(element => element.songId === this.state.items[i]._id);
              this.state.items[i].clearState = a[index].clear_state;
              this.state.items[i].highScore = a[index].score;
            }
          });
      });

    this.listItems();
  }

  // const clearState = this.state.scores.find(element => element.songID === props.item._id);

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  // generateItems() {
  //   const items = [];
  //   let level;
  //   console.log(this.state.active);
  //   for (let i = this.state.active - 5; i < this.state.active + 6; i += 1) {
  //     let index = i;
  //     if (i < 0) {
  //       index = this.state.items.length + i;
  //     } else if (i >= this.state.items.length) {
  //       index = i % this.state.items.length;
  //     }
  //     level = this.state.active - i;
  //     items.push(<MyItem key={index} title={this.state.items[index].title} level={level} category={this.state.items[index].category} diff={this.state.items[index].difficulty} desc={this.state.items[index].desc} />);
  //   }
  //   return items;
  // }

  listItems() {
    const items = [];
    // console.log(this.state.items);
    const totalSongs = (this.state.items.length > 11) ? 11 : this.state.items.length;
    const startLevel = (totalSongs > 11) ? -5 : this.state.active - Math.floor((totalSongs - 1) / 2);
    // console.log('list from ' + startLevel + 'to ' + (startLevel + totalSongs - 1));

    let level;
    for (let i = startLevel; i < startLevel + totalSongs; i += 1) {
      let index = i;
      if (i < 0) {
        index = this.state.items.length + i;
      } else if (i >= this.state.items.length) {
        index = i % this.state.items.length;
      }
      level = this.state.active - i;
      items.push(<MyItem key={index} title={this.state.items[index].title} level={level} category={this.state.items[index].category} diff={this.state.items[index].level} desc={this.state.items[index].desc} item={this.state.items[index]} />);
    }
    return items;
  }

  handleKeyPress(event) {
    console.log(event.key);
    if (event.key === 'd') {
      const ka = document.getElementById('audio-ka');
      ka.play();
      let newActive = this.state.active;
      newActive -= 1;
      const { length } = this.state.items;
      this.setState({
        active: newActive < 0 ? length - 1 : newActive,
        direction: 'left',
      });
    } else if (event.key === 'k') {
      const ka = document.getElementById('audio-ka');
      ka.play();
      const { active } = this.state;
      const { length } = this.state.items;
      this.setState({
        active: (active + 1) % length,
        direction: 'right',
      });
    } else if (event.key === 'f' || event.key === 'j') {
      const don = document.getElementById('audio-don');
      don.play();
      setTimeout(() => this.setState({ redirect: true }), 1000);
    }
  }

  moveLeft() {
    const ka = document.getElementById('audio-ka');
    ka.play();
    let newActive = this.state.active;
    newActive -= 1;
    const { length } = this.state.items;
    this.setState({
      active: newActive < 0 ? length - 1 : newActive,
      direction: 'left',
    });
  }

  moveRight() {
    const ka = document.getElementById('audio-ka');
    ka.play();
    const { active } = this.state;
    const { length } = this.state.items;
    this.setState({
      active: (active + 1) % length,
      direction: 'right',
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return (
        <Redirect to={{
          pathname: '/game',
          package: {
            userInfo: this.props.userInfo,
            songID: this.state.items[this.state.active]._id,
            songFile: this.state.items[this.state.active].file,
            songChart: this.state.items[this.state.active].chart,
          },
        }}
        />
      );
    }
    return (
      <div id="carousel" className="noselect">
        <ReactAudioPlayer src="ka.wav" id="audio-ka" volume={0.5} />
        <ReactAudioPlayer src="don.wav" id="audio-don" volume={0.5} />
        <ReactAudioPlayer src={this.state.items[this.state.active].file} autoPlay />
        <div role="button" tabIndex="0" className="arrow arrow-left" onClick={this.leftClick}>
          &#9668;
        </div>
        <ReactCSSTransitionGroup transitionName={this.state.direction} transitionEnter={false} transitionLeave={false}>
          {this.listItems()}
        </ReactCSSTransitionGroup>
        <div role="button" tabIndex="0" className="arrow arrow-right" onClick={this.rightClick}>
          &#9658;
        </div>
      </div>
    );
  }
}

function MyItem(props) {
  const className = 'myitem category' + props.category;
  const leftOffset = (props.level < 0) ? -3.90625 + 23.4375 + ((5 - props.level) * 7.8125) : -3.90625 + ((5 - props.level) * 7.8125);
  const setWidth = (props.level === 0) ? 29.6875 : 6.25;

  return (
    <div style={{ left: leftOffset + '%', width: setWidth + '%' }} className={className}>
      <Crown clearState={props.item.clearState} highScore={props.item.highScore} />
      {(props.level === 0) ? <Highscore highScore={props.item.highScore} /> : '' }
      <div className="song-wrapper">
        <div className="song-name">
          <span className="stroke">
            {props.title}
          </span>
          <span className="no-stroke">
            {props.title}
          </span>
        </div>
        {(props.level === 0 && props.desc.length > 0) ? <Description desc={props.desc} /> : '' }
        {(props.level === 0) ? <Difficulty course={props.item.course} level={props.item.level} /> : '' }
      </div>
    </div>
  );
}

function Highscore(props) {
  return (
    <div className="high-score">
      <div>自己ベスト</div>
      <div className="score">{props.highScore}</div>
    </div>
  );
}

function Crown(props) {
  if (props.clearState === 2) {
    return (
      <div className="crown">
        <img src={goldCrown} alt="goldCrown" />
      </div>
    );
  } else if (props.clearState === 1) {
    return (
      <div className="crown">
        <img src={silverCrown} alt="silverCrown" />
      </div>
    );
  }
  return null;
}

function Difficulty(props) {
  let icon = '';
  switch (props.course) {
    case 'Oni':
      icon = <div className="diff-course"><img src={Oni} alt={props.course} /><span>おに</span></div>;
      break;
    case 'Hard':
      icon = <div className="diff-course"><img src={Hard} alt={props.course} /><span>むずかしい</span></div>;
      break;
    case 'Normal':
      icon = <div className="diff-course"><img src={Normal} alt={props.course} /><span>ふつう</span></div>;
      break;
    case 'Easy':
      icon = <div className="diff-course"><img src={Easy} alt={props.course} /><span>かんたん</span></div>;
      break;
    default:
  }

  const stars = [];
  for (let i = 10; i > 0; i -= 1) {
    stars.push((props.level >= i) ? <span className="star">&#9733;</span> : <span className="dot">&bull;</span>);
  }

  return (
    <div className="difficulty">
      {icon}
      <div className="diff-level">
        {stars}
      </div>
    </div>
  );
}

function Description(props) {
  return (
    <div className="description song-name">
      <span className="stroke">
        {props.desc}
      </span>
      <span className="no-stroke">
        {props.desc}
      </span>
    </div>
  );
}

export default Carousel;
