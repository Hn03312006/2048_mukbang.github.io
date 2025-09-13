let win_or_not = "no"
const id_use = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
let initial_state_value_obj = [0,""]
let board = []
for (let i = 0; i < 4; i++) {
    let inner_list = []
    for (let j = 0; j < 4; j++) {
        inner_list.push(initial_state_value_obj)
    }
    board.push(inner_list)
}


function game_over(board) {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col <4; col++ ) {
            if ((row !== 3) && (col !== 3)) {
                if ((board[row][col][0] ===  board[row+1][col][0] ) || (board[row][col][0] === board[row][col+1][0])) {
                    return "continue"
                }
            }
            else if (row === 3 && col !== 3) {
                if ( board[row][col][0] === board[row][col+1][0]) {
                    return "continue"

                }
            }
            else if (col=== 3 && row !== 3) {
              if ( board[row][col][0] === board[row+1][col][0]) {
                  return "continue"
                }
            }
        }
    }
    return "lose"
}


function random24() {
    const myList = [2,2,2,2,2,2,2,2,2,4];
    const randomIndex = Math.floor(Math.random() * myList.length);
    return myList[randomIndex];
}






function RandomTile(board) {
    if (win_or_not === "yes") {
        appear_of_game_over_board("win")
    }
    let new_list = []
    for (let i =0; i < 4; i++ ) {
        for (let a = 0; a < 4; a++) {
            let value = board[i][a][0]
            if (value === 0) {
                new_list.push([i, a])
            }
        }
    }
    let randomNumber = Math.floor(Math.random() * (new_list.length ))
    let random_tile = new_list[randomNumber]
    let random = random24()
    let id = id_use[id_use.length-1]
    board[random_tile[0]][random_tile[1]] = [random, id]

    RandomTileAnimation(random, random_tile, id)
    id_use.pop()
    if (new_list.length === 1) {
        let lose_or_continue = game_over( board)
        if (lose_or_continue === "lose") {
            appear_of_game_over_board("lose")
        }
    }
}



function RemoveSpace(board, direction){
    let temporary_list = []
    let second_temp = []
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            let tile = board[row][col][0]
            if (tile !== 0) {
                temporary_list.push([tile,board[row][col][1] ])
            }
        }
        if (direction === "left" || direction === "up") {
            while (temporary_list.length < 4) {
                temporary_list.push([0, ""])
            }
        }
        else if (direction === "right" || direction === "down") {
            for (let i = 0; i < (4 - temporary_list.length); i++) {
                second_temp.push([0,""])
            }
            temporary_list = second_temp.concat(temporary_list)
            second_temp = []
        }
        board[row] = temporary_list
        temporary_list = []
    }
}


function merge(board, direction) {
    let a, b, c
    let merge_disappear = []
    let merging_to = []
    if (direction === "left" || direction === "up") {
        a = 0;b = 1; c= 3
    }
    else if (direction === "right" || direction === "down") {
        a = 3; b = 2; c = 0
    }
    for (let row = 0; row < 4; row++) {
        let x = a, y = b
        while (x !== c) {
            if ((board[row][x][0] === board[row][y][0]) && (board[row][x][0] !== 0)) {
                board[row][x][0] *= 2
                id_use.push(board[row][y][1])
                merge_disappear.push(String(board[row][y][1]))
                merging_to.push(board[row][x][1])
                board[row][y][0] = 0

                board[row][y][1] = ""
            }
            if (board[row][x][0] === 2048) {
                win_or_not = "yes"
            }
            if( direction === "left" || direction === "up") {
                x ++
                y++
            }
            if (direction === "right" || direction === "down") {
                x --
                y--
            }
        }
    }
    return ([merge_disappear, merging_to])
}



function Translating_Distance_Cal(old_board, new_board, merging_disappear, merging_to) {
    const new_position = []
    const list_of_id = []
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (typeof(new_board[i][j][1]) === "number") {
                if (merging_to.includes(new_board[i][j][1])) {
                    let index = merging_to.indexOf(new_board[i][j][1])
                    let id = merging_to[index]
                    merging_to[index] = [id, [i, j]]
                }
                if (old_board[i][j][1] !== new_board[i][j][1]) {
                    list_of_id.push(new_board[i][j][1])
                    new_position.push([i, j]) }
            }
        }
    }
    const translate_obj = {}
    const merging_obj = {}
    for (let i = 0; i < list_of_id.length; i++){
        translate_obj[String(list_of_id[i])] = new_position[i]
    }
    for (let i = 0; i < merging_disappear.length; i ++) {
        merging_obj[String(merging_disappear[i])] = merging_to[i]
    }
    return [translate_obj, merging_obj]
}


function HorToVer(real_board) {
    let new_board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++){
            new_board[row][col] = real_board[col][row]
        }
    }
    return new_board
}

function main(board) {
    document.addEventListener('keyup', (event) => {
        let direction
        let old_board = [...board]
        if (isMoving) {
            return;
        }
        let copy_to_compare = []
        for (let element of board) {
            for (let item of element){
                copy_to_compare.push(item[0])
            }
        }
        if (event.key === 'ArrowLeft') {
            direction = "left"
        }
        else if (event.key === "ArrowRight") {
            direction = "right"
        }
        else if (event.key === "ArrowUp") {
            direction = "up"
            board = HorToVer(board)
        }
        else if (event.key === "ArrowDown") {
            direction = "down"
            board = HorToVer(board)
        }
        RemoveSpace(board, direction);
        let merging_movement = merge(board, direction);
        let merging_disappear = merging_movement[0]
        let merging_to = merging_movement[1]
        RemoveSpace(board, direction);
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            board = HorToVer(board)
        }
        let translate_obj = (Translating_Distance_Cal(old_board, board,  merging_disappear, merging_to ))
        moveNormalTile(translate_obj[0])
        moveMergingTile(translate_obj[1])

        let copy_to_compare1 = []
        for (let element of board) {
            for (let item of element){
                copy_to_compare1.push(item[0])
            }
        }
        if (copy_to_compare.toString() !== copy_to_compare1.toString() ){
            isMoving = true
            RandomTile(board)
        }
    });
}

function final_run(board) {
    RandomTile(board);
    main(board);
}

final_run(board)