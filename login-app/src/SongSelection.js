/* eslint-disable react/prop-types, react/jsx-filename-extension, react/destructuring-assignment, max-len, prefer-template, no-console, react/prefer-stateless-function */

import React, { Component } from 'react';

import Carousel from './Carosel';
import avatar1 from './playerchar_p1_01.png';
import avatar2 from './playerchar_p1_02.png';
import './carousel.css';


// const songs1 = [
//   {
//     title: '「天国と地獄」序曲', desc: 'オッフェンバック', category: 1, course: 'Oni', level: 10, file: 'dgfh.mp3',
//   },
//   {
//     title: 'カルメン 組曲一番終曲', desc: 'ビゼー', category: 1, difficulty: 4, clear: false,
//   },
//   {
//     title: '紅蓮の弓矢', desc: '「進撃の巨人」より', category: 2, difficulty: 4, clear: false,
//   },
//   {
//     title: 'ウィーアー！', desc: '「ワンピース」より', category: 2, difficulty: 4, clear: false,
//   },
//   {
//     title: '残酷な天使のテーゼ', desc: '「新世紀エヴァンゲリオン」より', category: 2, difficulty: 4, clear: false,
//   },
//   {
//     title: '前前前世', desc: '映画「君の名は。」より', category: 3, difficulty: 4, clear: false,
//   },
//   {
//     title: '天体觀測', desc: '', category: 3, difficulty: 4, clear: false,
//   },
//   {
//     title: '海の声', desc: 'au「三太郎シリーズ」ＣＭソング', category: 3, difficulty: 4, clear: false,
//   },
//   {
//     title: 'キセキ', desc: '', category: 3, difficulty: 4, clear: false,
//   },
//   {
//     title: '君の知らない物語', desc: '', category: 3, difficulty: 4, clear: false,
//   },
//   {
//     title: '千本桜', desc: '黒うさP feat. 初音ミク', category: 4, difficulty: 4, clear: false,
//   },
//   {
//     title: '天ノ弱', desc: '164 feat.GUMI', category: 4, difficulty: 4, clear: false,
//   },
// ];

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
    course: 'Oni',
    desc: 'オッフェンバック',
    file: 'dgfh.mp3',
    level: 10,
    title: '「天国」序曲',
    joinedTime: '2018-07-03 19:17:00 +08:00',
  },
];

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="avatar-wrap">
          <div className="avatar">
            <img id="avatar1" src={avatar1} alt="avatar1" />
            <img id="avatar2" src={avatar2} alt="avatar2" />
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
              あいうえお
            </span>
            <span className="no-stroke">
            あいうえお
            </span>
            あいうえお
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
          <Carousel items={this.state.songs} active={0} user={this.props.location.state.userInfo} />
        </div>
        <Footer className="footer" name={this.props.location.state.userInfo.userName}/>
      </div>
    );
  }
}

export default SongSelection;
