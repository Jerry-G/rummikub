import React from 'react';
import './JoinPage.css';
import * as Constants from '../constants';
import * as Icons from '../icons';
import * as ROUTES from '../constants/routes';
import { withRouter, Link} from 'react-router-dom';
import { withFirebase } from '../components/Firebase';
import Loading from '../components/Loading';

const JoinPage = () => (
  <div className='joinpage'>
    <JoinForm />
  </div>
);

class JoinFormBase extends React.Component {
  _isMounted = false;
    
  constructor(props) {
    super(props);
    
    this.state = {
      gameId: '',
      success: null,
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSubmit = event => {
    
  }

  onChange = event => {
    //if (process.env.NODE_ENV !== 'production') console.log('Change - ' + event.target.name + ': ' + event.target.value);
    this.setState({ [event.target.name]: event.target.value.toUpperCase() }, this.checkGame);
  };

  checkGame() {
    //if (process.env.NODE_ENV !== 'production') console.log('checkGame - gameId: ' + this.state.gameId);
    if (this.state.gameId && this.state.gameId.length === Constants.GAME_CODE_CHARACTER_LENGTH) {
      this.dbCheckGame(this.state.gameId);
    }
    else {
      this.setState({ error: null, success: null, });
    }
  }

  dbCheckGame(gameId) {
    this.setState({ loading: true });

    this.props.firebase.game(gameId)
    .once('value', snapshot => {
      let success = snapshot.val() && 'Game ' + gameId + ' found. Press Confirm to join!';
      let error = !snapshot.val() && 'Game ' + gameId + ' not found. Please check and try again.';
      if (process.env.NODE_ENV !== 'production') console.log('Firebase DB: check game: ' + error ? error : success);
      if (this._isMounted) {
        this.setState({
          success: success,
          loading: false,
          error: error,
        })
      }
    });
  }

  render() {
    const { gameId, success, loading, error } = this.state;

    return (
      <div>
        <div>
          <h1>Join a game</h1>
        </div>
        <div className="joinbox">
          <div className="joinform">
            <form onSubmit={this.onSubmit}>  
              <label>
                Game code: 
                <input
                  id="gameId"
                  name="gameId"
                  value={gameId}
                  onChange={this.onChange}
                  type="text"
                  maxLength={Constants.GAME_CODE_CHARACTER_LENGTH}
                  placeholder="e.g. ABC123"
                />
                {success && <span className="joinicon"><Icons.SuccessIcon /></span>}
                {error && <span className="joinicon"><Icons.ErrorIcon /></span>}
              </label>
              <Link to={success ? ROUTES.GAME + '/' + this.state.gameId : ROUTES.JOIN}>
                <button 
                  className="joinbutton" 
                  disabled={!success} 
                  type="submit">
                    Confirm
                </button>
              </Link>
            </form> 
            {loading && <Loading />}
            {success && <p>{success}</p>}
            {error && <p className="error">{error}</p>}
          </div>
        </div>
        <h2>No game code?</h2>
        <div className="note">
          The game code is given to the host when creating a new game.
        </div>
        <div className="note">
          If a link was shared with you then you can obtain the game code by taking the letters and numbers that follow the final / in the link.
        </div>
        <div className="note">
          For example, if the link was {window.location.href.replace('join', 'game')}/ABC123 then you would type ABC123 in the above box and click Confirm.
        </div>
        <div>
          <p><Link to={ROUTES.GAME}>Create a new game instead</Link></p>
        </div>
      </div>
    );
  }
}

const JoinForm = withRouter(withFirebase(JoinFormBase));
 
export default JoinPage;