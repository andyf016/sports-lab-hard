function Team(props) {
    
    let shotPercentageDiv;

    if (props.stats.shots) {
      const shotPercentage = Math.round(
        (props.stats.score / props.stats.shots) * 100
      );
      shotPercentageDiv = (
        <div>
          <strong>Shooting %: {shotPercentage}</strong>
        </div>
      );
    }

    return (
      <div className='Team'>
        <h2>{props.name}</h2>
        <div className='identity'>
          <img src={props.logo} alt={props.name}></img>
        </div>
        <div>
          <strong>Shots:</strong> {props.stats.shots}
        </div>
        <div>
          <strong>Score:</strong> {props.stats.score}
        </div>

        {shotPercentageDiv}
        <button onClick={props.shotHandler}>Shoot!</button>
      </div>
    );
  
}

class Game extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
       homeTeamStats : {
        shots: 0,
        score: 0
       },
       visitingTeamStats : {
        shots: 0,
        score: 0
       }, 
       resetCount : 0
    }
    this.shotSound = new Audio("./assets/audio/board.mp3");
    this.scoreSound = new Audio("./assets/audio/swish.mp3");
  }

  shotHandler = (team) => {
    const teamStatsKey = `${team}TeamStats`
    let score = this.state[teamStatsKey].score;
    if (Math.random() > 0.5) {
      score += 1;
      this.scoreSound.play();
    } else {
      this.shotSound.play();
    }

    this.setState((state, props) => ({
      [teamStatsKey] : {
      shots: state[teamStatsKey].shots + 1,
      score
      }
    }));
    console.log("shoot");
  };

  resetGame = () =>{
    this.setState((state,props)=> ({
      resetCount : state.resetCount + 1, 
      homeTeamStats: {
        shots: 0,
        score: 0
      },
      visitingTeamStats: {
        shots: 0,
        score: 0
      }
    })) 
  }


  render(){
  return (
   <div className="Game">
     <h1>Welcome to {this.props.venue}</h1>
    <div className='stats'>
        
        <Team 
          name={this.props.visitingTeam.name} 
          logo={this.props.visitingTeam.logoSrc} 
          stats = {this.state.visitingTeamStats}
          shotHandler={() => this.shotHandler('visiting')}
        />
          
          <div className='versus'>
            <h1>VS</h1>
            <div>
              <strong>Resets: </strong> {this.state.resetCount}
              <button onClick = {this.resetGame}>Reset!</button>
            </div>
          </div>
        
        <Team 
          name={this.props.homeTeam.name} 
          logo={this.props.homeTeam.logoSrc} 
          stats = {this.state.homeTeamStats}
          shotHandler={() => this.shotHandler('home')}
        />
      </div>
    </div>
  )}
}

// Deafault App component that all other compents are rendered through
function App(props) {
  const pigs = {
    name: 'Capitolist Pigs',
    logoSrc: './assets/logos/pig.png'
  }
  const commies = {
    name: 'Soviet Union',
    logoSrc: './assets/logos/com.png'
  }

  const birds = {
    name: 'Dumb Birds', 
    logoSrc: './assets/logos/bird.jpg'
  }

  const wolves = {
    name: 'Wolf Colas',
    logoSrc: './assets/logos/wolf.png'
  }

  return (
    <div className='App'>
      <Game 
      venue="Moscow" 
      homeTeam={commies}
      visitingTeam={pigs} />

      <Game 
      venue="Washington DC" 
      homeTeam={wolves}
      visitingTeam={birds} /> 
    </div>
  );
}

//Render the application
ReactDOM.render(<App />, document.getElementById("root"));
