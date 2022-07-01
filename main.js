//All comments are pseudocode

//wireframe: https://www.figma.com/file/15FQ1idr5yWa26ByWC2imd/BlackJack-Wireframe?node-id=0%3A1

//Setting the global game variables
let player = { score: 0, cards: [] }
let dealer = { score: 0, cards: [] }
const deck = []
let winner = false
const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs']
const cardValues = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King']

 //Accessing the DOM
  
$hitBTN = $('#hitBTN')
$standBTN = $('#standBTN')
$resetBTN = $('#resetBTN')
$dealerScore = $('.dealerCardsScore')
$playerCards = $('.playerCardsImage')
$playerScore = $('.playerCardsScore')
$dealerCards = $('.dealerCardsImage')
$dealerCardImage = $('.dealerCardsImage')
$playerCardImage = $('.playerCardsImage')
$winnerMessageText = $('.winnerMessage')

//Shows values of all the cards as a number
const valuesObj = {
  'Ace': 11,
  'Two': 2,
  'Three': 3,
  'Four': 4,
  'Five': 5,
  'Six': 6,
  'Seven': 7,
  'Eight': 8,
  'Nine': 9,
  'Ten': 10,
  'Jack': 10,
  'Queen': 10,
  'King': 10,
}



//functions to create a deck and shuffle using random sort- loop within loop
const createDeck = () => {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < cardValues.length; j++) {
      const obj = {}
  obj.label = cardValues[j]
  obj.suit = suits[i]
      deck.push(obj)

    }
  }
}
createDeck()

const shuffleDeck = () => {
  deck.sort(() => (Math.random() > .5) ? 1 : -1)
  
}


//functions to deal with dealer and players score
const displayPlayerScore = () => {
    let playerScoreText = `score: ${player.score} `
    $playerScore.text(playerScoreText)
  }
  
const displayDealerScore = () => {
    let dealerScoreText = `score: ${dealer.score}`
    $dealerScore.text(dealerScoreText)
  }
  

const isPlayerScoreBust = () => {
  if (player.score > 21) {
    $winnerMessageText.text('Player has bust! Dealer wins')
    winner = true
  }
}

const isDealerScoreBust = () => {
  if (dealer.score > 21) {
   $winnerMessageText.text('Dealer has bust! Player wins!')
   winner=true
   return
  }
}

const determineWinner =() =>{
  if (player.score>dealer.score && player.score<22 &&dealer.score>15)
     {$winnerMessageText.text('Player wins!')
     winner=true
  }else if(player.score<dealer.score &&dealer.score<22 &&dealer.score>16)
  {$winnerMessageText.text('Dealer wins!')
  winner=true
  }else if (player.score === dealer.score &&dealer.score >15)
  {$winnerMessageText.text('Game tie!')
  winner=true
}}

const dealerAutoGetCard = () => {
  while (dealer.score < 16) {
    pushCardToPerson(dealer)
  }
}



const updatedScore = (personObj) => {
  score = 0
  let returnValue
  personObj.cards.forEach(card => {
      returnValue = valuesObj[card.label]
        score += returnValue
        personObj.score = score
        isPlayerScoreBust()
        isDealerScoreBust()
        determineWinner()
      if (winner===true)
        $hitBTN.hide() && $standBTN.hide()
        
  })
    }

//Connecting each card with an image
const addDealerImageToCard =() =>{
      $dealerCardImage.html('')
      dealer.cards.forEach((cardObj) => {
          let imageUrl = `Card Images/${cardObj.label}_of_${cardObj.suit}.png`
          $dealerCardImage.append(`<div> <img src ='${imageUrl}'></div>`)
      })
  
  }
  
const addPlayerImageToCard =() =>{
    $playerCardImage.html('')
    player.cards.forEach((cardObj) => {
        let imageUrl = `Card Images/${cardObj.label}_of_${cardObj.suit}.png`
        $playerCardImage.append(`<div><img src ='${imageUrl}'></div>`)
        
  
    })
  }

//giving a new card to the personObj and hit/stand button functions
const pushCardToPerson = (personObj) => {
    const nextCard = deck.pop()
    personObj.cards.push(nextCard)
    updatedScore(personObj)
    displayDealerScore()
    displayPlayerScore()
    addPlayerImageToCard()
    addDealerImageToCard()
    
  }
  
  
  
const playerHits = () => {
    pushCardToPerson(player)
  }
  
const playerStands = () => {
    pushCardToPerson(dealer)
    dealerAutoGetCard()
  }
  

  
//When reset button is clicked
const initialize = () => {
    player.score = 0
    dealer.score = 0
    player.cards = []
    dealer.cards = []
    shuffleDeck()
    $winnerMessageText.text('')
    winner=false
    $hitBTN.show()
    $standBTN.show()
    render()

  }
  
  
 
//adding required cards to the game
  const render =() =>{
    pushCardToPerson(dealer)
    pushCardToPerson(player)
    pushCardToPerson(player)
  }

  render()

  //Button Event listeners
  $hitBTN.on('click', playerHits)
  $standBTN.on('click', playerStands)
  $resetBTN.on('click', initialize)
  




