// Constant and variables
let inputDir = {x:0, y:0};
const gameover = new Audio("gameover.mp3")
const move = new Audio("move.mp3")
const music = new Audio("music.mp3")
const eat = new Audio("food.mp3")
let lastpainttime = 0
let score = 0;
let speed = 20;
let snakeArr=[
    {x:13, y:15}
]
let food = {x:5, y:8}


    // Game function herex
    function main(ctime){
        window.requestAnimationFrame(main)
        // console.log(ctime)
        if((ctime - lastpainttime)/1000 < 1/speed){
            return;
        }
        lastpainttime = ctime;
        gameEngine();
    }
    function isCollide(snake){
        // if you bump into yourself
        for (let i = 1; i < snakeArr.length; i++) {
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
                return true;
            }
        }
        // If you bupm into the wall
            if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
                return true;
            }
            return false;
    }

    function gameEngine(){
        // Updating the snake array and food
            if(isCollide(snakeArr)){
                gameover.play()
                music.pause()
                inputDir = {x:0,y:0}
                alert("Please enter the game again")
                snakeArr=[{x:13, y:15}]
                music.play()
                score = 0;
            }

            // and now if you eat the food regenerate the food and plus the score
            if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
                eat.play()
                score+=1
                scoreGame.innerHTML = "Score:" + score;
                snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y + inputDir.y})
                // formula fo generating the random number
                let a  = 2
                let b = 15;
                food = {x: Math.round(a +(b-a)* Math.random()),y: Math.round(a +(b-a)* Math.random())}
            }

            // moving the snake
            for(let i = snakeArr.length-2; i>=0; i-- ){
                snakeArr[i+1] = {...snakeArr[i]}
            }
            snakeArr[0].x += inputDir.x 
            snakeArr[0].y += inputDir.y 



        // Display the snake and food

        // Display the snake
        board.innerHTML = ""; 
        snakeArr.forEach((element, index)=>{
            snakeElement = document.createElement("div")
            snakeElement.style.gridRowStart = element.y;
            snakeElement.style.gridColumnStart = element.x;
            if(index === 0){
                snakeElement.classList.add("head")
            }else{
                snakeElement.classList.add("snake")
            }
            board.appendChild(snakeElement);
        })

        // Display the food
            foodElement = document.createElement("div")
            foodElement.style.gridRowStart = food.y;
            foodElement.style.gridColumnStart = food.x;
            foodElement.classList.add("food")
            board.appendChild(foodElement);
        }




// Main logic start here
// requestAnimationFrame produces higher quality animation completely eliminating flicker and shear that can happen whe
// using setTimeout or setInterval, and reduce or completely remove frame skips.

window.requestAnimationFrame(main)

window.addEventListener("keydown",element=>{
    // Start the game
    inputDir = {x:0, y:1}
    move.play()
    switch (element.key) {
        case "ArrowUp":
            inputDir.x = 0
            inputDir.y = -1
            break;
        case "ArrowDown":
            inputDir.x = 0
            inputDir.y = 1
            break;
        case "ArrowLeft":
            inputDir.x = -1
            inputDir.y = 0
            break;
        case "ArrowRight":
            inputDir.x = 1
            inputDir.y = 0
            break;
    
        default:
            break;
    }

})