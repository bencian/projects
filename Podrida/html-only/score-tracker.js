let playerCount = 4;
let roundCount = 1;
let noTrumpRounds = 4;
let gameStarted = false;
let lastPlayerIndex = 0;

function addPlayer() {
    if(!gameStarted){
        const headerRow = document.getElementById('headerRow');
        const subHeaderRow = document.getElementById('subHeaderRow');
        const roundData = document.getElementById(`round-${roundCount}`);
        const totalsRow = document.getElementById('totals-row');

        const existingPlayerIndexes = playerIndexes();
        let newPlayerNumber = playerCount + 1;
        
        // Ensure newPlayerNumber doesn't already exist
        while (existingPlayerIndexes.includes(newPlayerNumber)) {
            newPlayerNumber++;
        }


        // Add header cell
        const playerHeader = document.createElement('th');
        playerHeader.setAttribute('data-player', newPlayerNumber);
        playerHeader.setAttribute('colspan', 3);
        playerHeader.classList.add('player-header');
        playerHeader.innerHTML = `
            <input type="text" value="Jugador ${newPlayerNumber}" class="player-name">
            <button class="remove remove-btn" onclick="removePlayer(${newPlayerNumber})">×</button>
        `;
        headerRow.appendChild(playerHeader);

        // Add sub header cells
        const predictionSubHeader = document.createElement('th');
        predictionSubHeader.setAttribute('data-player', newPlayerNumber);
        predictionSubHeader.classList.add('player-headers');
        predictionSubHeader.textContent = `Predicciones`;
        
        const resultSubHeader = document.createElement('th');
        resultSubHeader.setAttribute('data-player', newPlayerNumber);
        resultSubHeader.classList.add('player-headers');
        resultSubHeader.textContent = `Resultados`;
        
        const pointsSubHeader = document.createElement('th');
        pointsSubHeader.setAttribute('data-player', newPlayerNumber);
        pointsSubHeader.classList.add('player-headers');
        pointsSubHeader.textContent = `Puntos`;
        
        subHeaderRow.appendChild(predictionSubHeader);
        subHeaderRow.appendChild(resultSubHeader);
        subHeaderRow.appendChild(pointsSubHeader);

        // Add round data cells
        const predictionCell = document.createElement('td');
        predictionCell.classList.add('player-data');
        predictionCell.setAttribute('data-player', newPlayerNumber);
        predictionCell.innerHTML = `<input type="number" onchange="validatePrediction(${newPlayerNumber})" class="prediction-input">`;
        roundData.appendChild(predictionCell);

        const resultCell = document.createElement('td');
        resultCell.classList.add('player-data');
        resultCell.setAttribute('data-player', newPlayerNumber);
        resultCell.innerHTML = `<input type="number" onchange="validateResult()" class="result-input">`;
        roundData.appendChild(resultCell);
        
        const pointsCell = document.createElement('td');
        pointsCell.classList.add('player-data');
        pointsCell.setAttribute('data-player', newPlayerNumber);
        pointsCell.innerHTML = `<text class="player-points" data-player="${newPlayerNumber}">0</text>`;
        roundData.appendChild(pointsCell);

        // Add total cell
        const totalEmptyCells = document.createElement('td');
        totalEmptyCells.setAttribute('data-player', newPlayerNumber);
        totalEmptyCells.setAttribute('colspan', 2);
        totalsRow.appendChild(totalEmptyCells);

        const totalCell = document.createElement('td');
        totalCell.setAttribute('data-player', newPlayerNumber);
        totalCell.classList.add('player-totals');
        totalCell.textContent = '0';
        totalsRow.appendChild(totalCell);

        playerCount++;
    } else {
        alert('Game has already started!');
        return;
    }
}

function removePlayer(index) {
    if(!gameStarted){
        if (playerCount <= 1) {
            alert('No se puede borrar el último jugador!');
            return;
        }

        const elementsToRemove = document.querySelectorAll(`[data-player="${index}"]`);
        elementsToRemove.forEach(element => element.remove());
        
        playerCount--;
    } else {
        alert('El juego ya empezó!');
        return;
    }
}

function advanceRound() {
    if (!gameStarted) {
        alert('El juego no empezó!');
        return;
    } else if (!validateInputs()) {
        alert('Completá bien las predicciones y resultados.');
        return;
    } else {
        if (confirm('¿Estás seguro de querer avanzar a la siguiente ronda?')) {
            updateTotals();
            const tableBody = document.getElementById('tableBody');
            const newRow = document.createElement('tr');
            if (roundCount == cardsArray().length) {
                alert('Fin de la partida!');
                endGame();
                return;
            }
            roundCount++;
            if (roundCount == cardsArray().length) {
                alert('Última ronda!');
            }

            newRow.innerHTML = `<td><text class="round-number">${cardsAmount()}</text></td>`;
            newRow.classList.add('round-data');
            
            // Add cells for each player (prediction, result, points)
            for (let i = 1; i <= playerCount; i++) {
                // Prediction cell
                let playerNumber = playerIndexes()[i - 1];
                const predictionCell = document.createElement('td');
                predictionCell.classList.add('player-data');
                predictionCell.setAttribute('data-player', playerNumber);
                predictionCell.innerHTML = `<input type="number" onchange="validatePrediction(${playerNumber})" class="prediction-input">`;
                newRow.appendChild(predictionCell);
                
                // Result cell
                const resultCell = document.createElement('td');
                resultCell.classList.add('player-data');
                resultCell.setAttribute('data-player', playerNumber);
                resultCell.innerHTML = `<input type="number" onchange="validateResult()" class="result-input">`;
                newRow.appendChild(resultCell);
                
                // Points cell
                const pointsCell = document.createElement('td');
                pointsCell.classList.add('player-data');
                pointsCell.setAttribute('data-player', playerNumber);
                pointsCell.innerHTML = `<text class="player-points" data-player="${playerNumber}">0</text>`;
                newRow.appendChild(pointsCell);
            }
            
            tableBody.appendChild(newRow);
            lastPlayerIndex++;
            highlightLastPlayer();
        }
    }
}

function generateCardsArray(maxValue) {
    // Ascending: 1 to maxValue
    const ascending = [];
    for (let i = 1; i <= maxValue; i++) {
        ascending.push(i);
    }
    
    // Fixed: maxValue repeated fixedAmount times
    const fixed = [];
    for (let i = 0; i < noTrumpRounds; i++) {
        fixed.push(`${maxValue}S`);
    }
    
    // Descending: maxValue-1 down to 1
    const descending = [];
    for (let i = maxValue; i >= 1; i--) {
        descending.push(i);
    }
    
    // Combine all parts
    return [...ascending, ...fixed, ...descending];
}

function cardsArray() {
    maximumPossibleCards = (52 - (52 % playerCount)) / playerCount;
    maximumCards = maximumPossibleCards > 7 ? 7 : maximumPossibleCards;
    
    // Generate the cards array pattern
    const cardsArray = generateCardsArray(maximumCards, noTrumpRounds);
    return cardsArray;
}

function cardsAmount() {
    return cardsArray()[roundCount - 1];
}
    


function validatePrediction(playerIndex) {
    if (playerIndex === getLastPlayer()) {
        allRounds = document.querySelectorAll('.round-data');
        currentRound = allRounds[allRounds.length - 1];
        const cardAmount = parseInt(currentRound.querySelector('.round-number').textContent[0]);
        allPredictions = Array.from(currentRound.getElementsByClassName('prediction-input')).map(input => parseInt(input.value));
        allPredictionsSum = allPredictions.reduce((a, b) => a + b, 0);
        if (allPredictionsSum === cardAmount) {
            alert('Las predicciones no pueden ser iguales a la cantidad de cartas repartidas.');
            return;
        }
    }    
}

function validateResult() {
    allRounds = document.querySelectorAll('.round-data');
    currentRound = allRounds[allRounds.length - 1];
    const cardAmount = parseInt(currentRound.querySelector('.round-number').textContent[0]);
    allResults = Array.from(currentRound.getElementsByClassName('result-input')).map(input => parseInt(input.value));
    
    if (allResults.some(value => isNaN(value))) {
        numericValuesSum = allResults.reduce((a, b) => a + (isNaN(b) ? 0 : b), 0);
        if (numericValuesSum > cardAmount) {
            alert('Las rondas ganadas no pueden ser mayor a la cantidad de cartas repartidas.');
            return;
        }
        return;
    }

    allResultsSum = allResults.reduce((a, b) => a + b, 0);
    if (allResultsSum !== cardAmount) {
        alert('Las rondas ganadas no suman la cantidad de cartas repartidas.');
        return;
    }
}

function validateInputs() {
    allRounds = document.querySelectorAll('.round-data');
    currentRound = allRounds[allRounds.length - 1];
    const cardAmount = parseInt(currentRound.querySelector('.round-number').textContent[0]);
    allPredictions = Array.from(currentRound.getElementsByClassName('prediction-input')).map(input => parseInt(input.value));
    allResults = Array.from(currentRound.getElementsByClassName('result-input')).map(input => parseInt(input.value));
    allPredictionsSum = allPredictions.reduce((a, b) => a + b, 0);
    allResultsSum = allResults.reduce((a, b) => a + b, 0);
    return allResultsSum === cardAmount && allPredictionsSum !== cardAmount;
}

function updateTotals() {
    allRounds = document.querySelectorAll('.round-data');
    totalsRow = document.getElementById('totals-row');
    currentRound = allRounds[allRounds.length - 1];
    allPlayers = playerIndexes();
    allPlayers.forEach(player => {
        points = 0
        const prediction = currentRound.querySelectorAll(`[data-player="${player}"] .prediction-input`)[0].value;
        const result = currentRound.querySelectorAll(`[data-player="${player}"] .result-input`)[0].value;
        if (prediction === result) {
            points = prediction > 3 ? 20 : 10;
        }
        points += parseInt(result);
        currentRound.querySelectorAll(`[data-player="${player}"] .player-points`)[0].textContent = points;
        currentTotals = parseInt(totalsRow.querySelectorAll(`.player-totals[data-player="${player}"]`)[0].textContent) + points;
        totalsRow.querySelectorAll(`.player-totals[data-player="${player}"]`)[0].textContent = currentTotals;
    });
}

function endGame() {
    gameStarted = false;
    document.getElementById('game-started-controls-1').setAttribute('hidden', true);
    document.getElementById('game-started-controls-2').setAttribute('hidden', true);
    document.getElementById('game-ended-controls').removeAttribute('hidden');
    document.getElementsByClassName('remove').forEach(button => {
        button.setAttribute('hidden', true);
    });
    allPredictionInputs = document.querySelectorAll('.prediction-input');
    allPredictionInputs.forEach(input => {
        input.setAttribute('readonly', true);
    });
    allResultInputs = document.querySelectorAll('.result-input');
    allResultInputs.forEach(input => {
        input.setAttribute('readonly', true);
    });
}

function startGame() {
    // Prompt user for number of cards
    const cardsInput = prompt('Cuantas rondas sin triunfo?');
    
    // Validate input
    if (cardsInput === null) {
        return; // User cancelled
    }
    
    const cards = parseInt(cardsInput);
    if (isNaN(cards) || cards < 1) {
        alert('Ingrese un número válido mayor o igual a 1');
        return;
    }

    noTrumpRounds = cards;
    document.getElementById('game-started-controls-1').removeAttribute('hidden');
    document.getElementById('game-started-controls-2').removeAttribute('hidden');
    document.getElementById('game-not-started-controls').setAttribute('hidden', true);

    allPredictionInputs = document.querySelectorAll('.prediction-input');
    allPredictionInputs.forEach(input => {
        input.removeAttribute('readonly');
    });
    allResultInputs = document.querySelectorAll('.result-input');
    allResultInputs.forEach(input => {
        input.removeAttribute('readonly');
    });
    
    highlightLastPlayer();
    gameStarted = true;
}

function clearGame() {
    if (!gameStarted) {
        alert('El juego no empezó!');
        return;
    } else {
        if (confirm('¿Estás seguro de querer borrar el juego?')) {
            location.reload();
        }
    }
}

function clearRound() {
    if (!gameStarted) {
        alert('El juego no empezó!');
        return;
    } else {
        if (confirm('¿Estás seguro de querer borrar la ronda?')) {
            allRounds = document.querySelectorAll('.round-data');
            if (allRounds.length > 1) {
                totalsRow = document.getElementById('totals-row');
                currentRound = allRounds[allRounds.length - 2];
                allPlayers = playerIndexes();
                allPlayers.forEach(player => {
                    points = currentRound.querySelectorAll(`[data-player="${player}"] .player-points`)[0].textContent;
                    currentTotals = parseInt(totalsRow.querySelectorAll(`.player-totals[data-player="${player}"]`)[0].textContent) - points;
                    totalsRow.querySelectorAll(`.player-totals[data-player="${player}"]`)[0].textContent = currentTotals;
                    currentRound.querySelectorAll(`[data-player="${player}"] .prediction-input`)[0].value = '';
                    currentRound.querySelectorAll(`[data-player="${player}"] .result-input`)[0].value = '';
                    currentRound.querySelectorAll(`[data-player="${player}"] .player-points`)[0].textContent = 0;
                });
                allRounds[allRounds.length - 1].remove();
                lastPlayerIndex--;
                roundCount--;
            } else {
                alert('No se puede borrar la primera ronda!');
            }
        }
    }
}

function playerIndexes() {
    headerRow = document.getElementById('headerRow');
    const playerHeaders = Array.from(headerRow.children).slice(1);
    return playerHeaders.map(header => parseInt(header.getAttribute('data-player')));
}

function getLastPlayer() {
    return playerIndexes()[mod(lastPlayerIndex - 1, playerCount)];
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function highlightLastPlayer() {    
    // Get the current round (last round)
    const allRounds = document.querySelectorAll('.round-data');    
    const currentRound = allRounds[allRounds.length - 1];
    const lastPlayer = getLastPlayer();
    
    // Find all cells with the last player's data-player attribute
    const playerCells = currentRound.querySelectorAll(`[data-player="${lastPlayer}"]`);
    
    // The first cell with this data-player is the prediction cell
    // The second cell with this data-player is the result cell
    if (playerCells.length >= 2) {
        const predictionInput = playerCells[0].querySelector('.prediction-input');
        const resultInput = playerCells[1].querySelector('.result-input');
        
        if (predictionInput) {
            predictionInput.classList.add('last-player-input');
        }
        if (resultInput) {
            resultInput.classList.add('last-player-input');
        }
    }
}


