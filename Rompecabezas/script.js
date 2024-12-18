const puzzleContainer = document.getElementById('puzzle-container');
const message = document.getElementById('message');
const pieces = Array.from({ length: 9 }, (_, i) => i);

function createPuzzle() {
    const shuffledPieces = shuffle(pieces.slice());
    shuffledPieces.forEach((piece, index) => {
        const div = document.createElement('div');
        div.classList.add('puzzle-piece');
        div.style.backgroundPosition = `${-100 * (piece % 3)}px ${-100 * Math.floor(piece / 3)}px`;
        div.setAttribute('data-index', piece);
        div.addEventListener('click', () => handlePieceClick(div));
        puzzleContainer.appendChild(div);
    });
}

let selectedPiece = null;

function handlePieceClick(div) {
    if (selectedPiece === null) {
        selectedPiece = div;
        div.style.border = '2px solid red'; // Indicar selección
    } else {
        if (selectedPiece !== div) {
            const tempIndex = selectedPiece.getAttribute('data-index');
            selectedPiece.setAttribute('data-index', div.getAttribute('data-index'));
            div.setAttribute('data-index', tempIndex);
            swapBackgroundPosition(selectedPiece, div);
            selectedPiece.style.border = 'none'; // Restablecer borde
            selectedPiece = null;
            checkCompletion();
        }
    }
}

function swapBackgroundPosition(piece1, piece2) {
    const tempPosition = piece1.style.backgroundPosition;
    piece1.style.backgroundPosition = piece2.style.backgroundPosition;
    piece2.style.backgroundPosition = tempPosition;
}

function checkCompletion() {
    const currentPieces = Array.from(puzzleContainer.children).map(div => parseInt(div.getAttribute('data-index')));
    if (JSON.stringify(currentPieces) === JSON.stringify(pieces)) {
        message.classList.remove('hidden');
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

createPuzzle();