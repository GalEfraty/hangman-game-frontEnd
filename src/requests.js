const getPuzzle = async (wordCount) =>
{
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`) //attention: // and not http/s. "//" will match the request protocol with the host protocol!
    if(response.status === 200)
    {
        const data = await response.json()
        return data.puzzle
    }
    else
    {
        throw new Error('unable to fetch data')
    }
}

export {getPuzzle as default}