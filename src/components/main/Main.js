

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
    console.log("play is " + play)
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
            <img className="logo" src={require('./../../logo_conservatorio.png')} />
            <img className="logo" src={require('./../../logo_lounge_b.png')} />
          </div>
          <header className="header">
            <h1 >S O L O
              <h2>ear training web app</h2>
            </h1>
            
            <h3 class="presentationText"> solo is the ear training application of the <a href="http://www.conservatorio.ch/it/scuola-universitaria">Conservatorio della Svizzera Italiana</a>, University of Music (SUPSI). 
            <br/>
            <br/>
              From an idea of composer < a href="http://www.albertobarberis.it/">Alberto Barberis </a> 
              and under the supervision of teachers < a href="http://www.ivoantognini.com/MUSIC_COMPOSER/home.html">Ivo Antognini </a> 
              and <a href="http://nadirvassena.ch/"> Nadir Vassena</a>, <br/> SOLO is supported by Spazio21 and it is developed by <a href="http://simonemasiero.com/"> Simone Masiero</a> <br/> with < a href="https://www.si.usi.ch/">Software Institute | CodeLounge </a> 
              and <a href="https://www.usi.ch/it"> Università della Svizzera Italiana</a> (USI). 
            <br/> 
            <br/>

              <h4> This is the first version and the project is still in development </h4> 

              </h3>
          </header>
          <div className="loghiUni">
            <img className="logoUni" src={require('./../../logo_SUPSI_60mm_ITA.png')} />
            <img className="logoUni" src={require('./../../press-usi-logo.png')} style={{padding: "30px"}} />
          </div>
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