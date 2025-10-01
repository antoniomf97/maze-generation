var cols, rows;
var grid = [];
var currents = [];
var stacks = [[]];
var w;

function setup()
{
    w = GCD();
    if (w < 15) w = 15;
    createCanvas(windowWidth, windowHeight);
    cols = floor(width/w);
    rows = floor(height/w);
    
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            grid.push(new Cell(i, j));
        }
    }

    currents.push(grid[0]);
    currents.push(grid[cols-1]);
    currents.push(grid[cols*rows-cols]);
    currents.push(grid[grid.length-1]);

    var stack = [];
    stacks.push(stack);
    var stack = [];
    stacks.push(stack);
    var stack = [];
    stacks.push(stack);
    var stack = [];
    stacks.push(stack);

    console.log(currents);
}


function draw() {
    background(55);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    for (var i = 0; i < currents.length; i++) {
    
        currents[i].visited = true;
        currents[i].highlight();
        var next = currents[i].checkNeighbours();

        if (next) {
            next.visited = true;

            stacks[i].push(currents[i]);

            removeWalls(currents[i], next);;
            currents[i] = next;
        } else if (stacks[i].length > 0) {
            currents[i].backtracked = true;
            currents[i] = stacks[i].pop();
        }
    }
}

function index(i, j){
    if (i < 0 || j < 0 || i > cols-1 || j > rows-1 ) {
        return -1;
    }
    return i + j * cols;
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

function GCD(a = windowWidth, b = windowHeight) {
    if (b == 0) return a;
    else return GCD(b, a % b);
}