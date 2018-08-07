import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Board from './Board'
import { getAppraisals, deleteAppraisal } from '../api/server.js'
import airhorn from '../sounds/airhorn.m4a'
import allrighty from '../sounds/allrighty.m4a'
import chewy from '../sounds/chewy.m4a'
import clap from '../sounds/clap.m4a'
import entertain from '../sounds/entertain.m4a'
import gotothem from '../sounds/gotothem.m4a'
import fireworks from '../sounds/fireworks.m4a'
import michaelscott from '../sounds/michaelscott.m4a'
import mybubbles from '../sounds/mybubbles.m4a'
import raven from '../sounds/raven.m4a'
import yahoo from '../sounds/yahoo.m4a'


class AppraisalListings extends Component {
  state = {
    appraisals: '',
    loading: true,
    error: false,
    settings: {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    },
    sounds: [
      { id: 1, soundName: 'Applause', soundURL: clap, count: 0, isPlaying: false },
      { id: 2, soundName: 'Yahoo', soundURL: yahoo, count: 0, isPlaying: false },
      { id: 3, soundName: 'AirHorn', soundURL: airhorn, count: 0, isPlaying: false },
      { id: 4, soundName: 'Aaallrighty then', soundURL: allrighty, count: 0, isPlaying: false },
      { id: 5, soundName: 'What a time', soundURL: fireworks, count: 0, isPlaying: false },
      { id: 6, soundName: 'Chewy', soundURL: chewy, count: 0, isPlaying: false },
      { id: 7, soundName: 'Gladiator', soundURL: entertain, count: 0, isPlaying: false },
      { id: 8, soundName: 'Wheat', soundURL: gotothem, count: 0, isPlaying: false },
      { id: 9, soundName: 'Bubbles', soundURL: mybubbles, count: 0, isPlaying: false },
      { id: 10, soundName: 'Best', soundURL: raven, count: 0, isPlaying: false },
      { id: 11, soundName: 'Win an Award', soundURL: michaelscott, count: 0, isPlaying: false }
    ],
  };
  componentDidMount = async() => {
    try {
      let appraisalList = await getAppraisals();
      this.setState({ appraisals: appraisalList, loading:false})
    } catch(e) {
      this.setState({error: true, loading: false})
    }
  };

  removeAppraisals = async() => {
    try {
      this.setState({ loading: true })
      let deleteAllAppraisals = await deleteAppraisal(); 
      this.setState({ appraisals: '', loading: false })

      return deleteAllAppraisals
    } catch(e) {
      this.setState({ error: true, loading: false })
    }
  }

  render() {
    const { appraisals } = this.state;
    return (
      <div className="appraisal--container">
        {appraisals &&
        <Slider
          className="slider"
          {...this.state.settings}
        >
            {appraisals.map((item, index) =>
              <div key={index}>
                <h3>
                  {item.appraisal}
                </h3>
              </div>
            )}
          </Slider>
          }
        <Board sounds={this.state.sounds} />
        <button onClick={this.removeAppraisals}>
          Delete All
        </button>
      </div>
    )
  }
}

export default AppraisalListings;