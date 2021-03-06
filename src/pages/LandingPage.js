import React from 'react';
import './LandingPage.css';
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../components/Session';
import RecentGames from '../components/Landing/RecentGames';

class LandingPageBase extends React.Component {
  
  render() {
    
    return (
      <div className='landingpage'>
        <div className='landingheader'>
          <h1 className="landingtitle">Rummi<i>h</i>ub</h1>
          <h3>Play Rummikub online with your friends</h3>
          <div className="landingbuttons">
            <span><Link to={ROUTES.GAME}><button className="bigbutton">Create Game</button></Link></span>
            <span><Link to={ROUTES.JOIN}><button className="bigbutton">Join Game</button></Link></span>
          </div>
        </div>
        <div className='landingbody'>
          <RecentGames user = {this.props.user} />
          <div className='landingnote'>
              <h3>Getting started...</h3>
              <p className='note'>
                Create a new game (congrats, you're now the host) and share the link/code with your friends; 
                they can then join the game directly via the link, or by entering the code into the page beyond the Join Game button.</p>
              <p className='note'>
                Each player will need their own device to play on. Anything with a modern web browser should do it.</p>
              <p className='note'>
                Wikipedia has the <a href='https://en.wikipedia.org/wiki/Rummikub#Rules'>rules of the game</a> if you need a refresher.</p>
              <p className='note'>
                Enjoy <strong>㋡</strong></p>
          </div>
        </div>
      </div>
    );
  }
}

const LandingPage = props => (
  <AuthUserContext.Consumer>
    {user => (
      <LandingPageBase {...props} user={user} />
    )}
  </AuthUserContext.Consumer>
);

export default LandingPage;
