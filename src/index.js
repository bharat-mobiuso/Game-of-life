const mycanvas = document.querySelector('canvas');
const ctx = mycanvas.getContext('2d');

const resolution = 20;
mycanvas.width = 800;
mycanvas.height = 800;

const rows = mycanvas.height / resolution;
const cols = mycanvas.width / resolution;

let canvas = createArray(rows,cols);
fillArray(canvas);
console.log(canvas);
// update(canvas);

requestAnimationFrame(update);

function update() {
    setTimeout(function(){ //throttle requestAnimationFrame to .5s
        canvas = nextArray(canvas);
        render(canvas);
        requestAnimationFrame(update)
    },500);
}

function createArray(rows,cols){
    let newArray = new Array(rows).fill(null);

    for(let i=0;i<rows;i++){
        newArray[i] = new Array(cols).fill(null);
    }
    return newArray;
}

function fillArray(canvas){
    // populating 2D array by random 1's
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            canvas[i][j] = Math.floor(Math.random() * 2);
        }
    }
}

function nextArray(canvas){
    const tempArray =  [...canvas].map(row => [...row]);
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){

            const currentElement = canvas[i][j];
            let countOfNeighbour = 0;
            
            for(let innerRow = -1; innerRow < 2;innerRow++){
                for(let innerCol = -1; innerCol < 2;innerCol++){
                    const x_point = i + innerRow;
                    const y_point = j + innerCol;
                    
                    if(x_point === i && y_point === j){
                        continue;
                    }
                    if(x_point >= 0 && y_point >= 0 && x_point < rows && y_point < cols){
                        if(canvas[x_point][y_point] === 1){
                            countOfNeighbour += 1;
                        }
                    }
                }
            }
            
            // rules for Conway's game of life
            if(currentElement && countOfNeighbour < 2){
                tempArray[i][j] = 0;
            }else if(currentElement && countOfNeighbour > 3){
                tempArray[i][j] = 0;
            }else if(!currentElement && countOfNeighbour === 3){
                tempArray[i][j] = 1;
            }else if(currentElement && (countOfNeighbour === 2 || countOfNeighbour === 3)){
                tempArray[i][j] = 1;
            }
            
        }
    }
    return tempArray;
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