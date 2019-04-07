/*
---------------------------------------
ALWAYS RUN DEFAULT PORT (7070) {live-server hangman --port=7070}
--------------------------------------- 
*/

class Hangman
{
    constructor(i_Word, i_remainingGuesses)
    {
        this.m_Word = i_Word.toLowerCase().split("") //char[]: an array of the hidden word's chars
        this.m_RemainingGuesses = i_remainingGuesses //int: the number of guesses remain
        this.m_GuessedLetters = [] //char[]: the letters had been guessed
        this.m_GameStatus = eGameStatus.PLAYING //enum: game status
    }

    get Puzzle()
    {
        let puzzle = ''
        this.m_Word.forEach((currenLetter) =>
        {
            if(this.m_GuessedLetters.includes(currenLetter) || currenLetter === ' ')
            {
                puzzle += currenLetter
            }
            else
            {
                puzzle += '*'
            }
        })
        
        return puzzle
    }

    makeGuess(i_guess)
    {
        i_guess = i_guess.toLowerCase();
        const isUniqueGuess = !this.m_GuessedLetters.includes(i_guess)
        const isBadGuess = !this.m_Word.includes(i_guess) //if the user's char is not include in the hidden word

        if(this.m_GameStatus !== eGameStatus.PLAYING) //safty: prevent the game running when status is not playing
        {
            return
        }

        if(isUniqueGuess)
        {
            this.m_GuessedLetters.push(i_guess)
            //this.m_GuessedLetters = [...this.m_GuessedLetters, i_guess]
        }

        if(isUniqueGuess && isBadGuess)
        {
            this.m_RemainingGuesses--
        }

        this.recalcuateStatus()
    }

    recalcuateStatus()
    {
        //every:::: true if every single item in the array pass the test function
        //if one of the letters yet not guessed, false. else - true
        const finished = this.m_Word.every((currentLetter) => 
        {
            return this.m_GuessedLetters.includes(currentLetter) || currentLetter === ' '
        })

        if(this.m_RemainingGuesses === 0)
        {
            this.m_GameStatus = eGameStatus.FAILED
        }
        else if(finished)
        {
            this.m_GameStatus = eGameStatus.FINISHED
        }
        else
        {
            this.m_GameStatus = eGameStatus.PLAYING
        }
    }

    get StatusMessage()
    {
        if(this.m_GameStatus === eGameStatus.PLAYING)
        {
            return `Guesses left: ${this.m_RemainingGuesses}`
        }
        else if(this.m_GameStatus === eGameStatus.FAILED)
        {
            const completeWord = this.m_Word.join('')
            return `Nice try! the word was "${completeWord}"`
        }
        else //finished
        {
            return `Great work! You guessed the word!` 
        }
    }
}




const eGameStatus = 
{
    PLAYING: "playing",
    FINISHED: "finished",
    FAILED: "failed"
}

export {Hangman, eGameStatus}