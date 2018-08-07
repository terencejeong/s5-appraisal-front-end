import React, { Component } from 'react'

class Board extends Component {
    state = {
      audio: {
        sound: null,
        soundName: null,
        currentlyPlaying: null
      }
    }

  playSound(id) {
    if (this.state.audio.currentlyPlaying) {
      let snd = this.state.audio.sound;
      snd.pause();
    }
    let sound = this.props.sounds.find(sound => { return sound.id === id});
    let snd = new Audio(sound.soundURL);
    this.setState({ audio: { sound: snd, soundName: sound.soundName, currentlyPlaying: true }});
    snd.play();

    let data = [...this.props.sounds];
    const index = data.findIndex(obj => obj.soundName === sound.soundName);
    data[index].count += 1;
    data[index].isPlaying = true;
    this.setState(data);

    snd.addEventListener('ended', this.soundListener.bind(this, data, index, snd));
  }

  soundListener(data, index, snd) {
    const newData = [ ...data ];
    newData[index].isPlaying = false;
    this.setState(newData);
    snd.removeEventListener('ended', this.soundListener);
  }

  renderSounds() {
    return this.props.sounds.map(sound => {
      return <Sound key={sound.id} sound={sound} audio={this.state.audio} playSound={this.playSound.bind(this)} />
    })
  }
  render() {
    return (
      <div className="appContainer">
        {this.renderSounds()}
      </div>
    )
  }
};
export default Board

class Sound extends Component {
  render() {
    let speakerStyle = 'fa fa-volume-off fa-3x';
    if (this.props.sound.isPlaying && this.props.sound.soundName === this.props.audio.soundName && this.props.audio.currentlyPlaying) {
      speakerStyle += 'fa fa-volume-up fa-3x';
    }
    return (
      <div className='sound-card'
           onClick={() => this.props.playSound(this.props.sound.id)}>
        <h3>{this.props.sound.soundName}</h3>
        <div>
          <div className="image-container">
            <i className={speakerStyle} aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }
}