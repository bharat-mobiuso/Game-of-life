const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resolution = 20;
canvas.width = 800;
canvas.height = 800;

const rows = canvas.height / resolution;
const cols = canvas.width / resolution;

let grid = createFirstGen(rows,cols);
console.log(grid);

requestAnimationFrame(update);

function update() {
    setTimeout(function(){ //throttle requestAnimationFrame to .5s
        grid = nextGen(grid);
        render(grid);
        requestAnimationFrame(update)
    },500);
}

function createFirstGen(rows,cols){
    let firstGen = new Array(rows).fill(null);

    for(let i=0;i<rows;i++){
        firstGen[i] = new Array(cols).fill(null);
    }

    // Populating first Gen with random 1's and 0's 
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            firstGen[i][j] = Math.floor(Math.random() * 2);
        }
    }

    return firstGen;
}

function nextGen(grid){
    const tempGrid =  [...grid].map(row => [...row]);
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){

            const currentCell = grid[i][j];
            let countOfNeighbour = 0;
            
            for(let innerRow = -1; innerRow < 2;innerRow++){
                for(let innerCol = -1; innerCol < 2;innerCol++){
                    const x_point = i + innerRow;
                    const y_point = j + innerCol;
                    
                    if(x_point === i && y_point === j){
                        continue;
                    }
                    if(x_point >= 0 && y_point >= 0 && x_point < rows && y_point < cols){
                        if(grid[x_point][y_point] === 1){
                            countOfNeighbour += 1;
                        }
                    }
                }
            }
            
            // rules for Conway's game of life
            if(currentCell && countOfNeighbour < 2){
                tempGrid[i][j] = 0;
            }else if(currentCell && countOfNeighbour > 3){
                tempGrid[i][j] = 0;
            }else if(!currentCell && countOfNeighbour === 3){
                tempGrid[i][j] = 1;
            }else if(currentCell && (countOfNeighbour === 2 || countOfNeighbour === 3)){
                tempGrid[i][j] = 1;
            }
            
        }
    }
    return tempGrid;
}

function render(grid) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const cell = grid[row][col];
  
        ctx.beginPath();
        ctx.rect(row * resolution, col * resolution, resolution, resolution);
        ctx.fillStyle = cell ? 'black' : 'white';
        ctx.fill();
        ctx.stroke();
    }
  }
}

function restart(){
    location.reload();
}