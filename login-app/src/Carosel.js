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
    document.addEventListener('keydown', this.handleKeyPress, false);
    fetch('http://webdemo.nctu.me:5000/songList')
      .then(response => response.json())
      .then(json => this.setState({ items: json }));
  }

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
    // console.log(this.state.active);
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
            userName: this.props.userName,
            sessionKey: this.props.sessionKey,
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
        <ReactAudioPlayer src="ka.wav" id="audio-ka" />
        <ReactAudioPlayer src="don.wav" id="audio-don" />
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
      <div className="song-name">
        <span className="stroke">
          {props.title}
        </span>
        <span className="no-stroke">
          {props.title}
        </span>
      </div>
      {(props.level === 0 && props.desc.length > 0) ? <Description desc={props.desc} /> : '' }
      {(props.level === 0) ? <ReactAudioPlayer src="君の知らない物語.mp3" autoPlay /> : '' }
      {(props.level === 0) ? <Description desc={props.item.course + props.item.file + props.item.level} /> : '' }
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
        &#9733;
      </span>
    </div>
  );
}

export default Carousel;
