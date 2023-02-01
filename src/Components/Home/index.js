import {Component} from 'react'

import {Popup} from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {RiCloseLine} from 'react-icons/ri'

import './index.css'

import {
  Maindiv,
  Scorediv,
  Score,
  ScoreText,
  Optionsdiv,
  GameButton,
  GameImage,
  ResultImageContainer,
  RulesView,
  PopUpView,
  PopUpImage,
} from './styledComponents'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class Home extends Component {
  state = {
    startGame: true,
    score: 0,
    newArray: [choicesList[0], choicesList[1]],
    text: 'YOU WON',
  }

  getResult = (id1, id2) => {
    if (id1 === 'ROCK') {
      switch (id2) {
        case 'PAPER':
          return 'YOU LOSE'
        case 'SCISSORS':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    } else if (id1 === 'PAPER') {
      switch (id2) {
        case 'ROCK':
          return 'YOU WON'
        case 'SCISSORS':
          return 'YOU LOSE'
        default:
          return 'IT IS DRAW'
      }
    } else {
      switch (id2) {
        case 'ROCK':
          return 'YOU LOSE'
        case 'PAPER':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    }
  }

  checkResult = id => {
    const {score} = this.state
    const choice2 = choicesList[Math.floor(Math.random() * choicesList.length)]
    const choice1 = choicesList.filter(eachValue => eachValue.id === id)
    const result = this.getResult(choice1[0].id, choice2.id)
    let newScore = score
    if (result === 'YOU WON') {
      newScore = score + 1
    } else if (result === 'YOU LOSE') {
      newScore = score - 1
    } else {
      newScore = score
    }
    this.setState({
      startGame: false,
      score: newScore,
      newArray: [choice1[0], choice2],
      text: result,
    })
  }

  restartGame = () => this.setState({startGame: true})

  render() {
    const {score, startGame, newArray, text} = this.state
    return (
      <Maindiv>
        <Scorediv>
          <h1>
            Rock
            <br />
            Paper
            <br />
            Scissors
          </h1>
          <Score>
            <p>Score</p>
            <ScoreText className="score">{score}</ScoreText>
          </Score>
        </Scorediv>
        <Optionsdiv>
          {startGame ? (
            choicesList.map(each => (
              <GameButton
                type="button"
                data-testid={`${each.id.toLowerCase()}Button`}
                onClick={() => this.checkResult(each.id)}
              >
                <GameImage src={each.imageUrl} alt={each.id} key={each.id} />
              </GameButton>
            ))
          ) : (
            <>
              <ResultImageContainer>
                <h1>YOU</h1>
                <GameImage src={newArray[0].imageUrl} alt="your choice" />
              </ResultImageContainer>

              <ResultImageContainer>
                <h1>OPPONENT</h1>
                <GameImage src={newArray[1].imageUrl} alt="opponent choice" />
              </ResultImageContainer>

              <ResultImageContainer>
                <p>{text}</p>
                <button
                  className="result-button"
                  type="button"
                  onClick={this.restartGame}
                >
                  PLAY AGAIN
                </button>
              </ResultImageContainer>
            </>
          )}
        </Optionsdiv>
        <RulesView>
          <Popup
            modal
            trigger={
              <button type="button" className="triggerBtn">
                RULES
              </button>
            }
          >
            {close => (
              <PopUpView>
                <button
                  type="button"
                  className="closeBtn"
                  onClick={() => close()}
                >
                  <RiCloseLine />
                </button>
                <PopUpImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </PopUpView>
            )}
          </Popup>
        </RulesView>
      </Maindiv>
    )
  }
}

export default Home
