import {Hangman, eGameStatus} from './hangman'
import getPuzzle from './requests'

const puzzleElement = document.querySelector("#puzzle")
const guessesElement = document.querySelector("#guesses")
let game

window.addEventListener("keypress", (keypressEvent)=>
{
    const guess = String.fromCharCode(keypressEvent.charCode)
    game.makeGuess(guess)
    render()
})

const render = () =>
{
    puzzleElement.innerHTML = ''//game.Puzzle
    guessesElement.textContent = game.StatusMessage

    game.Puzzle.split('').forEach(letter => 
    {
        const puzzleLetterSpan = document.createElement('span')
        puzzleLetterSpan.textContent = letter
        puzzleElement.appendChild(puzzleLetterSpan)
    });
}

const startGame = async () =>
{
    const puzzle = await getPuzzle('2')
    console.log(puzzle)
    game = new Hangman(puzzle, 5)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()