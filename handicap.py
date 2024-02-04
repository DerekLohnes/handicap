from fastapi import FastAPI, HTTPException, Body

app = FastAPI()

@app.post('/calcHandicap')  
async def calculate_result(data: dict = Body(...)):
    """
    Calculate the result based on the given parameters.

    :param data: JSON input with 'BallsFor', 'BallsAgainst', 'Wins', and 'Games' parameters.
    :return: JSON response with the calculated result.
    """
    balls_for = data.get('BallsFor')
    balls_against = data.get('BallsAgainst')
    wins = data.get('Wins')
    games = data.get('Games')

    if None in (balls_for, balls_against, wins, games):
        raise HTTPException(status_code=400, detail='Missing data')

    try:
        result = ((balls_for / (balls_for + balls_against)) * 10) + ((wins / games) * 5)
        return {'result': result}
    except ZeroDivisionError:
        raise HTTPException(status_code=400, detail='Division by zero')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))