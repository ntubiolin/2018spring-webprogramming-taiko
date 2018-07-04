/* eslint-disable react/prop-types, react/jsx-filename-extension, react/destructuring-assignment, max-len, prefer-template, no-console, react/prefer-stateless-function */

import React, { Component } from 'react';

import Carousel from './Carosel';
import avatar1 from './img/NTUDON2-01.png';
import avatar2 from './img/NTUDON2-02-01.png';
import './carousel.css';

const tempsongs = [
  {
    _id: '5b3b437e63088c5ced2a5f70',
    category: 1,
    chart: {
      offset: -3.6,
      totalnotes: 797,
      BPM: 200,
      Notes: [
        {
          types: 1,
          measure: 0,
          time: 18,
        },
      ],
    },
    course: 'Easy',
    desc: '「化物語」より',
    file: 'music/kim4ra.ogg',
    level: 3,
    title: '君の知らない物語',
    joinedTime: '2018-07-03 19:17:00 +08:00',
  },
  {
    _id: '4b3b437e63088c5ced2a5f70',
    category: 3,
    chart: {
      offset: -3.6,
      totalnotes: 797,
      BPM: 200,
      Notes: [
        {
          types: 1,
          measure: 0,
          time: 18,
        },
      ],
    },
    course: 'Hard',
    desc: '',
    file: 'music/10tai.ogg',
    level: 4,
    title: '天体観測',
    joinedTime: '2018-07-03 19:17:00 +08:00',
  },
  {
    _id: '3b3b437e63088c5ced2a5f70',
    category: 2,
    chart: {
      offset: -3.6,
      totalnotes: 797,
      BPM: 200,
      Notes: [
        {
          types: 1,
          measure: 0,
          time: 18,
        },
      ],
    },
    course: 'Oni',
    desc: 'feat.unmo',
    file: 'music/sotsuomeshiki.ogg',
    level: 10,
    title: 'そつおめしき',
    joinedTime: '2018-07-03 19:17:00 +08:00',
  },
];

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="avatar-wrap">
          <div className="avatar">
            <img id="avatar1" src={avatar1} alt="avatar1" width="288px" height="288px" />
            <img id="avatar2" src={avatar2} alt="avatar2" width="288px" height="288px" />
          </div>
        </div>
        <div className="instructions">
          <div className="circle">
            <div className="inner-circle" />
            <div className="half-circle-left animate-flicker-border" />
            <div className="half-circle-right animate-flicker-border" />
          </div>
          <span>
            フチでえらんで
          </span>
          <div className="circle">
            <div className="inner-circle animate-flicker" />
          </div>
          <span>
            面で決定
          </span>
        </div>
      </div>
      <div className="footer-left">
        <div className="nametag">
          <div className="nametag-circle">
            <span className="stroke-white">
              1P
            </span>
            <span className="no-stroke-white">
              1P
            </span>
          </div>
          <div className="name">
            <span className="stroke">
              {props.name}
            </span>
            <span className="no-stroke">
              {props.name}
            </span>
            {props.name}
          </div>
        </div>
      </div>
      <div className="footer-right" />
    </div>
  );
}

class SongSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: tempsongs,
    };
  }

  render() {
    const userName = (this.props.location.state !== undefined) ? this.props.location.state.userInfo.userName : 'Not Logged In';
    const sessionKey = (this.props.location.state !== undefined) ? this.props.location.state.userInfo.sessionKey : 'No Key';
    const userInfo = (this.props.location.state !== undefined) ? this.props.location.state.userInfo : '';
    return (
      <div className="menu-div">
        <div className="menu-top">
          <div className="menu-title">
            <span className="big-stroke">
              曲をえらぶ
            </span>
            <span className="stroke-red">
              曲をえらぶ
            </span>
            <span className="no-stroke">
              曲をえらぶ
            </span>
          </div>
          <Carousel items={this.state.songs} active={0} userInfo={userInfo} />
        </div>
        <Footer className="footer" name={userName} />
      </div>
    );
  }
}

export default SongSelection;
