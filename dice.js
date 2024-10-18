/* 

Die is a class for defining a single 6-sided die

These properties are available:
  - frozen (whether it's rollable or not)
  - size (the size it should appear on screen)
  - value (the number showing on the die)

These methods are available:
  - place(x,y) places the die at x,y in the canvas
  - display() shows the die on the canvas
  - roll() rolls the die if it's not frozen
  - freeze(), unfreeze(), toggleFreeze()
  - isTouched(x,y) returns true if x,y are in the die shape
*/

class Die {
    
    constructor(size) {
        this.size = size;
        this.sides = 6;
        this.frozen = false;
        this.place(random(width),random(height));
        this.roll();
    }

    place(x,y) {
        this.x = x;
        this.y = y;
    }

    display() {
        rectMode(CENTER);
        textAlign(CENTER, CENTER);
        fill("white");
        strokeWeight(3);
        rect(this.x,this.y,this.size,this.size,8);
        if (this.frozen) {
            fill("silver");
        } else {
            fill("black");
        }
        textSize(30);
        strokeWeight(0);
        text(this.value, this.x, this.y, this.size, this.size);
    }

    roll() {
        if (! this.frozen) 
            this.value = floor(random(this.sides)+1);
    }

    freeze() {
        this.frozen = true;
    }

    unfreeze() {
        this.frozen = false;
    }

    toggleFreeze() {
        this.frozen = ! this.frozen;
    }

    isTouched(x,y) {
        let halfsize = this.size/2;
        if (x >= (this.x-halfsize) && 
            x <= (this.x+halfsize) && 
            y >= (this.y-halfsize) && 
            y <= (this.y+halfsize)
        ) {
            return true;
        } 
        return false;
    }
}