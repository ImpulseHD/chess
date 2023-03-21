// ! Back-End Part

const pieces = document.querySelectorAll('.board__square');

// Classic Board
var classic_board = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
                     'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
                     'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
                     'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
                     'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
                     'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
                     'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
                     'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];

// Board
var board = ['br0', 'bn', 'bb', 'bq', 'bk0', 'bb', 'bn', 'br0',
             'bp0', 'bp0', 'bp0', 'bp0', 'bp0', 'bp0', 'bp0', 'bp0',
             'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
             'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
             'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
             'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
             'wp0', 'wp0', 'wp0', 'wp0', 'wp0', 'wp0', 'wp0', 'wp0',
             'wr0', 'wn', 'wb', 'wq', 'wk0', 'wb', 'wn', 'wr0'];

// Test Board
var board = ['br0', 'bn', 'bb', 'bq', 'bk0', 'bb', 'bn', 'br0',
             'bp0', 'bp0', 'bp0', 'bp0', 'bp0', 'bp0', 'bp0', 'bp0',
             'o', 'o', 'o', 'o', 'o', '', 'o', 'o',
             'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
             'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
             'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
             'wp0', 'wp0', 'wp0', 'wp0', 'wp0', 'wp0', 'wp0', 'wp0',
             'wr0', 'wn', 'wb', 'wq', 'wk0', 'wb', 'wn', 'wr0'];

var player_to_play = "white";
var move_played_by_white = 0;
var move_played_by_black = 0;

// Change the player according to the number of moves of each player.
function change_player() {
    if (move_played_by_white > move_played_by_black) {
        player_to_play = "black";
    } else {
        player_to_play = "white";
    }
}

// ? Look if the current player is in check.
function is_check() {
    if (player_to_play == "white") {
        
        // ? Get the initial position of the king.
        // * Browse the board to determine the position of the king.

        var white_king_position = 0;
        for (var i = 0; i < board.length; i++) {
            if (board[i].slice(0, 2) == 'wk') {
                white_king_position = i;
                break;
            }
        }
        
        var check = false;

        // ? Look if the white king is check by a pawn.
        // * The first condition checks if we are not looking for a piece outside the board.
        // * The second condition checks if we are in check by a pawn.

        // * Suppose that the king is at the point (0;0)
        // * The function will search for an enemy pawn in this order: (-1;1) (1;1)
        
        if (white_king_position - 8 - 1 > 0 && board[white_king_position - 8 - 1].slice(0, 2) == 'bp') {
            check = true;
        }
        if (white_king_position - 8 + 1 > 0 && board[white_king_position - 8 + 1].slice(0, 2) == 'bp') {
            check = true;
        }

        // ? Look if the white king is check by a knight.
        // * The first condition checks if we are not looking for a piece outside the board.
        // * The second condition checks if we are in check by a knight.

        // * Suppose that the king is at the point (0;0)
        // * The function will search for an enemy knight in this order: (-2;1) (-1;2) (1;2) (2;1) (2;-1) (1;-2) (-1;-2) (-2;-1)

        if (white_king_position - 8 - 2 > 0 && board[white_king_position - 8 - 2].slice(0, 2) == 'bn') {
            check = true;
        }
        if (white_king_position - 16 - 1 > 0 && board[white_king_position - 16 - 1].slice(0, 2) == 'bn') {
            check = true;
        }
        if (white_king_position - 16 + 1 > 0 && board[white_king_position - 16 + 1].slice(0, 2) == 'bn') {
            check = true;
        }
        if (white_king_position - 8 + 2 > 0 && board[white_king_position - 8 + 2].slice(0, 2) == 'bn') {
            check = true;
        }
        if (white_king_position + 8 + 2 < 64 && board[white_king_position + 8 + 2].slice(0, 2) == 'bn') {
            check = true;
        }
        if (white_king_position + 16 + 1 < 64 && board[white_king_position + 16 + 1].slice(0, 2) == 'bn') {
            check = true;
        }
        if (white_king_position + 16 - 1 < 64 && board[white_king_position + 16 - 1].slice(0, 2) == 'bn') {
            check = true;
        }
        if (white_king_position + 8 - 2 < 64 && board[white_king_position + 8 - 2].slice(0, 2) == 'bn') {
            check = true;
        }

        // ? Look if the white king is check by a bishop.
        // * The loop will allow to browse a whole diagonal in search of a bishop.

        // * The first if statement stop the loop if we meet an allied piece: 
        // * --> The first condition checks if we are not looking for a piece outside the board.
        // * --> The second condition checks if the piece is an alloyed piece.

        // * The second if statement stops the loop if we meet a bishop.
        // * --> The first condition checks if we are not looking for a piece outside the board.
        // * --> The second condition checks if the piece is a bishop

        // * Suppose that the king is at the point (0;0)
        // * The function will search for an enemy bishop in this order: (-1;1) (1;1) (1;-1) (-1;-1)
        
        for (let i = 1; i < 8; i++) {
            if (white_king_position + (- 8 - 1) * i > 0 && board[white_king_position + (- 8 - 1) * i][0] == 'w') {
                check = false;
                break;
            }
            if (white_king_position + (- 8 - 1) * i > 0 && board[white_king_position + (- 8 - 1) * i].slice(0, 2) == 'bb') {
                check = true;
                break;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (white_king_position + (- 8 + 1) * i > 0 && board[white_king_position + (- 8 + 1) * i][0] == 'w') {
                check = false;
                break;
            }
            if (white_king_position + (- 8 + 1) * i > 0 && board[white_king_position + (- 8 + 1) * i].slice(0, 2) == 'bb') {
                check = true;
                break;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (white_king_position + (+ 8 + 1) * i > 0 && board[white_king_position + (+ 8 + 1) * i][0] == 'w') {
                check = false;
                break;
            }
            if (white_king_position + (+ 8 + 1) * i > 0 && board[white_king_position + (+ 8 + 1) * i].slice(0, 2) == 'bb') {
                check = true;
                break;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (white_king_position + (+ 8 - 1) * i > 0 && board[white_king_position + (+ 8 - 1) * i][0] == 'w') {
                check = false;
                break;
            }
            if (white_king_position + (+ 8 - 1) * i > 0 && board[white_king_position + (+ 8 - 1) * i].slice(0, 2) == 'bb') {
                check = true;
                break;
            }
        }
        console.log(check);
    }
}

// Remove the digit next to the piece.
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

// ! Front-End Part

const selected_squares = document.querySelector('.board');

// Waiting for the window load.
window.addEventListener('load', () => {

    // The initial and the final position.
    var pos1 = null;
    var pos2 = null;

    // Waiting for the user click on one square
    for (var i = 0; i < selected_squares.children.length; i++) {
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