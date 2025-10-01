function Cell(i, j) {
    this.i = i;
    this.j = j;

    this.walls = [true, true, true, true];
    this.visited = false;
    this.backtracked = false;

    this.show = function() {
        var x = this.i*w;
        var y = this.j*w;
        stroke(255);

        //top left - right
        if (this.walls[0]){
            line(x, y, x+w, y);
        }
        //right top - bottom
        if (this.walls[1]){
            line(x+w, y+w, x+w, y+w);
        }
        //bottom right - left
        if (this.walls[2]){
            line(x, y+w, x+w, y+w);
        }
        //left top - bottom
        if (this.walls[3]){
            line(x, y, x, y+w);
        }

        if (this.visited) {
            noStroke();
            fill(0, 100, 250, 100);
            rect(x, y, w, w);
        } 

        if (this.backtracked) {
            noStroke();
            fill(250, 250, 250, 100);
            rect(x, y, w, w);
        } 
    }

    this.highlight = function() {
        var x = this.i*w;
        var y = this.j*w;
        noStroke();
        fill(255, 121, 0, 200);
        rect(x, y, w, w);
    }    

    this.checkNeighbours = function() {
        var neighbours = [];

        var top = grid[index(i, j-1)];
        var right = grid[index(i+1, j)];
        var bottom = grid[index(i, j+1)];
        var left = grid[index(i-1, j)];

        if (top && !top.visited) {
            neighbours.push(top);
        }
        if (right && !right.visited) {
            neighbours.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbours.push(bottom);
        }
        if (left && !left.visited) {
            neighbours.push(left);
        }

        if (neighbours.length > 0) {
            var r = floor(random(0, neighbours.length));
            return neighbours[r];
        } else {
            return undefined;
        }
    }
}