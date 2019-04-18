

// Author : Simone Masiero

import React from 'react';
import './Main.css';
import Keyboard from './../keyboard/Keyboard';
import Solution from './../solution/Solution';

class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      song: [[2]],
      play:false
    };
    this.takePlay = this.takePlay.bind(this);
    this.takeSong = this.takeSong.bind(this);
  } 

  takePlay(play) {
    // console.log("play is " + play)
    this.setState({
      play : play
    });
  }

  takeSong(song) {
    this.setState({
      song : song
    });
  }

   render() {
    return (
      <div>
        <section className="presentation">
          <div className="loghi">
            <img className="logo" href="https://www.conservatorio.ch/it" src={require('./../../img/logo_conservatorio_supsi.png')} />
            <img className="logo" href="https://www.si.usi.ch/" src={require('./../../img/logo_software_institute.png')} />
          </div>
          <header className="header">
            <h1 >S O L O</h1>
            <h2>ear training web app</h2>
            
            <div class="presentationText">
            
              <p>solo is the ear training application of the <a target="_blank" href="http://www.conservatorio.ch/it/scuola-universitaria">Conservatorio della Svizzera italiana</a>, University of Music (SUPSI).</p>

              <p>From an idea of composer <a a target="_blank" href="http://www.albertobarberis.it/">Alberto Barberis</a> and under the supervision of teachers <a target="_blank" href="http://www.ivoantognini.com/MUSIC_COMPOSER/home.html">Ivo Antognini</a> and <a target="_blank" href="http://nadirvassena.ch/">Nadir Vassena</a>.</p>
            
              <p>SOLO is supported by Spazio21 and it was initially developed by <a target="_blank" href="http://simonemasiero.com/">Simone Masiero</a> under the supervision of <a target="_blank" href="https://robertominelli.com">Roberto Minelli</a> in collaboration with <a target="_blank" href="https://codelounge.si.usi.ch">CodeLounge</a> and the <a target="_blank" href="https://si.usi.ch">Software Institute</a> (<a target="_blank" href="https://www.usi.ch/it">USI</a>).</p> 
            
              <p class="smallText">The project is still under development.</p>
            </div>

              
          </header>
        </section>

        <section className="app">
        
        <div className="grid">
        
          <div className="item">
          <small class="mb-1 text-muted" id='textKeyboard'>
            selected register
            </small>
            <div>
              <Keyboard
                song = {this.state.song}
                setSong = {this.takeSong}
                setPressedPlay = {this.takePlay}
              />
            </div>
          </div>
          <div className="item">

          <small id = 'textSolution' className = "mb-1 text-muted" > 
            set solutions 
          </small>
            <div className="box">
              <Solution
              song = {this.state.song}
              isPlayng = {this.state.play}
              currentNote = {3}/>
            </div>
          </div>
        </div>
        </section>        
      </div>
      );
  }
}

export default Main;
