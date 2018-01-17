function make2dArray(cols, rows){

    let arr = new Array(cols);

    for(let i = 0; i<arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;

}



let grid;
let cols;
let rows;
let resolution = 20;

function setup() {
    // put setup code here
    createCanvas(600, 400);
    stroke(0);

    cols = width / resolution;
    rows = height / resolution;

    grid = make2dArray(cols, rows);
    
    for(let i = 0; i<cols; i++){
        for(let j =0; j<rows; j++){
            grid[i][j] = floor(random(2));
        }
    }
  }
  
  function draw() {
      background(255);
    // put drawing code here

    

    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            let x = i * resolution;
            let y = j*resolution;

            if(grid[i][j] == 1){
                fill(0);
            }
            else{
                fill(255);
            }

            rect(x, y, resolution-1, resolution-1);
        }
    }

    let next = make2dArray(cols, rows);

    

    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){

            let state = grid[i][j];

                let liveNeighbors = countLiveNeighbors(grid, i, j);
            
                if(state == 0 && liveNeighbors == 3){
                    next[i][j] = 1;
                    
                }
                else if( state == 1 && (liveNeighbors > 3 || liveNeighbors < 2)){
                    next[i][j] = 0;
                }
                else{
                    next[i][j] = state;
                }

        }
    }

    grid = next;

  }

  function countLiveNeighbors(grid, x, y){

    let sum = 0;

    for(let i = -1; i<2; i++){
        for(let j = -1; j<2; j++){

            let col = (cols + x + i)%cols;
            let row = (rows + y + j)%rows;

            sum+= grid[col][row];
        }
    }

    sum -= grid[x][y];
    return sum;

}