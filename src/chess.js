/* Back-End Part */

const pieces = document.querySelectorAll('.board__square');

let board = ['br0', 'bn', 'bb', 'bq', 'bk0', 'bb', 'bn', 'br0',
             'bp0', 'bp0', 'bp0', 'bp0', 'bp0', 'bp0', 'bp0', 'bp0',
             'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
             'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
             'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
             'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
             'wp0', 'wp0', 'wp0', 'wp0', 'wp0', 'wp0', 'wp0', 'wp0',
             'wr0', 'wn', 'wb', 'wq', 'wk0', 'wb', 'wn', 'wr0'];

let player_to_play = "white";
let move_played_by_white = 0;
let move_played_by_black = 0;

// Change the player according to the number of moves of each player
function change_player() {
    if (move_played_by_white > move_played_by_black) {
        player_to_play = "black";
    } else {
        player_to_play = "white";
    }
}

// Remove the digit next to the piece
function get_piece_to_move_without_digit(pos1) {
    return pos1.slice(0, 2);
}

// Determines which piece should move from the initial position
// and on which square it should move from the final position.
function get_piece_to_move(pos1, pos2) {
    switch (get_piece_to_move_without_digit(board[pos1])) {
        case 'wp':
        case 'bp':
            pawn_move(pos1, pos2);
            change_player();
            break;
        default:
            break;
    }
}

// Manage the pawn moves
function pawn_move(pos1, pos2) {
    // Faire en sorte de pouvoir manger un pion qui se trouve en diagonale

    // If it's the turn of the white
    if (player_to_play == "white") {

        // Can't move forward if there is a already piece
        if (board[pos2] == 'o') {

            // Allows you to move two squares forward if it's the first move.
            if (board[pos1]  == "wp0") {
                if (pos1 - 8 == pos2 || pos1 - 16 == pos2) {
                    pieces.item(pos2).innerHTML = pieces.item(pos1).innerHTML;
                    pieces.item(pos1).innerHTML = "";
            
                    [board[pos1], board[pos2]] = [board[pos2], board[pos1].replace('0', '1')];
                    move_played_by_white += 1;
                }
            }
            
            // Allows you to move one square forward if it's not the first move .
            else if (pos1 - 8 == pos2) {
                pieces.item(pos2).innerHTML = pieces.item(pos1).innerHTML;
                pieces.item(pos1).innerHTML = "";
        
                [board[pos1], board[pos2]] = [board[pos2], board[pos1]];
                move_played_by_white += 1;
            }
        }

        // Allow you to take the ennemy pawn if it's in diagonale.
        if (board[pos2][0] == "b" && pos1 - 8 != pos2) {
            pieces.item(pos2).innerHTML = pieces.item(pos1).innerHTML;
            pieces.item(pos1).innerHTML = "";
    
            [board[pos1], board[pos2]] = [board[pos2], board[pos1]];
            move_played_by_white += 1;
        }
    }

    // If it's the turn of the black
    if (player_to_play == "black") {

        // Can't move forward if there is a already piece
        if (board[pos2] == 'o') {

            // If it's the first move, allows you to move two squares forward.
            if (board[pos1]  == "bp0") {
                if (pos1 + 8 == pos2 || pos1 + 16 == pos2) {
                    pieces.item(pos2).innerHTML = pieces.item(pos1).innerHTML;
                    pieces.item(pos1).innerHTML = "";
            
                    [board[pos1], board[pos2]] = [board[pos2], board[pos1].replace('0', '1')];
                    move_played_by_black += 1;
                }
            }
            
            // If it's not the first move, allows you to move one square forward.
            else if (pos1 + 8 == pos2) {
                pieces.item(pos2).innerHTML = pieces.item(pos1).innerHTML;
                pieces.item(pos1).innerHTML = "";
        
                [board[pos1], board[pos2]] = [board[pos2], board[pos1]];
                move_played_by_black += 1;
            }
        }

        // Allow you to take the ennemy pawn if it's in diagonale.
        if (board[pos2][0] == "w" && pos1 + 8 != pos2) {
            pieces.item(pos2).innerHTML = pieces.item(pos1).innerHTML;
            pieces.item(pos1).innerHTML = "";
            
            [board[pos1], board[pos2]] = [board[pos2], board[pos1]];
            move_played_by_black += 1;
        }
    }
}

/* Front-End Part */

const selected_squares = document.querySelector('.board');

// Waiting for the window load.
window.addEventListener('load', () => {

    // The initial and the final position.
    let pos1 = null;
    let pos2 = null;

    // Waiting for the user click on one square
    for (let i = 0; i < selected_squares.children.length; i++) {
        selected_squares.children.item(i).addEventListener('click', () => {
            
            // Get the initial position of the piece and the final position.
            if (pos1 == null) {
                pos1 = i;
            } else {
                pos2 = i;
            }

            // Give the initial and final position to know which piece should move and where.
            // Also reset the initial and the final position.
            if (pos1 != null && pos2 != null) {
                console.log("Pos1:", pos1);
                console.log("Pos2:", pos2);

                get_piece_to_move(pos1, pos2);
                pos1 = null;
                pos2 = null;
            }
        })
    }
})