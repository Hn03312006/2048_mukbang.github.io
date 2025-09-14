let two = '2.JPG"'
let four = '4.JPG"'
let eight = '8.JPG"'
let sixteen = '16.JPG"'
let thirtytwo = '32.JPG"'
let sixtyfour = '64.JPG"'
let one28 = '128.JPG"'
let two25 = '256.JPG"'
let five12 = '512.JPG"'
let ten24 = '1024.JPG"'
let twenty48 = '2048.JPG"'
let option = '"' + document.getElementById("title").innerHTML.split(" ")[1].toLowerCase() + '/'
console.log(option)
let img_src = 'img src=' + option
let collection_of_image = {"2": `<${img_src + two }>` , "4": `<${img_src + four }>`,
                                 "8": `<${img_src + eight  }>`,"16": `<${img_src + sixteen  }>`,"32": `<${img_src + thirtytwo }>`,"64": `<${img_src + sixtyfour  }>`,
                                 "128": `<${img_src + one28 }>`, "256": `<${img_src + two25 }>`, "512": `<${img_src + five12}>`, "1024": `<${img_src + ten24  }>`,
                                 "2048": `<${img_src + twenty48 }>`,}

let tile_count = 0


let isMoving = false



function RandomTileAnimation(random, random_tile, id) {
    tile_count ++
    let apply_transform = document.createElement("div")
    let newTile = document.createElement("div");

    newTile.innerHTML = collection_of_image[String(random)]
    console.log(newTile.innerHTML)
    newTile.dataset.value = String(random)
    newTile.classList.add("new_tile")
    apply_transform.classList.add(String(id), "moving")
    apply_transform.style.top = "12px"
    apply_transform.style.left = "12px"
    apply_transform.style.transform = `translate(${(random_tile[1] * 107)}px, ${random_tile[0] * 107}px)`;
    apply_transform.appendChild(newTile)
    document.getElementById("control").appendChild(apply_transform);
    newTile.addEventListener("animationend", () => {
        tile_count--
        console.log(tile_count)
        if (tile_count === 0) {
            isMoving = false
        }
    }, {once: true})
    newTile.style.animation = "scale-in 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)"
    newTile.classList.remove("new_tile")
}

function moveNormalTile(normal_move) {
   for (let key in normal_move) {
       if (!(Number.isNaN(normal_move[String(key)]))) {
           let tile = document.getElementsByClassName(key)[0]
           tile.style.transform = `translate(${normal_move[key][1] * 107}px, ${normal_move[key][0] * 107}px)`;
           tile_count++
           console.log(tile_count)
           tile.addEventListener("transitionend", () => {
               tile_count--
               console.log(tile_count)
               if (tile_count === 0) {
                   isMoving = false
               }
           }, {once: true})
       }
   }
}


function moveMergingTile(merging_move) {
   for (let key in merging_move) {
       if (!(Number.isNaN(merging_move[String(key)]))) {
           let tile = document.getElementsByClassName(key)[0]
           tile_count+= 2
           let old_value = Number(tile.firstElementChild.dataset.value)
           let double_value_tile
           tile.style.transform = `translate(${merging_move[key][1][1] * 107}px, ${merging_move[key][1][0] * 107}px)`;
           tile.addEventListener("transitionend", () => {
               tile_count--
               console.log(tile_count)
               if (tile_count === 0) {
                   isMoving = false
               }
               tile.remove()
               double_value_tile = document.getElementsByClassName(String(merging_move[key][0]))[0].firstElementChild
               double_value_tile.innerHTML = collection_of_image[String(old_value * 2)]
               double_value_tile.dataset.value = String(old_value * 2)

               double_value_tile.classList.add("new_merging_tile")
               double_value_tile.addEventListener("animationend", () => {
                       tile_count--;
                       console.log(tile_count)
                       if (tile_count === 0) {
                           isMoving = false
                       }
                       double_value_tile.style.animation = "none"
                   }, {once: true})
               double_value_tile.style.animation = "pulse-bump 0.1s ease-in-out"
           }, {once: true})
       }
   }
}



function appear_of_game_over_board (win_or_not){
    let game_over_grid = document.getElementById("game_over")
    game_over_grid.style.opacity = "1"
    document.getElementById("control").style.opacity = "0.8"
    if (win_or_not === "win") {
        game_over_grid.innerHTML = ' YOU WIN!!!' + `<${img_src + twenty48 }>` + '  <div id = "play_again"> Play Again</div>'
    }
    document.getElementById("play_again").addEventListener("click", function() {
    window.location.reload();
    });
}

