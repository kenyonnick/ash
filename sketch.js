var progression = 0;

var ash = [];

var fromColor;
var toColor;

class Ash {
    initialX = 0;
    initialY = 0;
    yBase = 0;
    x = 0;
    y = 0;
    speed = 0;
    diameter = 2;
    active = false;
    amplitude = 10;
    frequency = 0.0005;

    constructor(x, y, speed) {
        this.initialX = x;
        this.initialY = y;
        this.yBase = y;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    render() {
        if (this.active) {
            this.x -= this.speed;
            // this.y += this.speed;
            this.y = this.yBase + this.amplitude / this.speed * Math.cos(Math.PI * 2 * this.frequency * this.speed * this.x);
            this.yBase -= this.speed / 4;

            noStroke();
            var c = lerpColor(fromColor, toColor, this.x / width);
            fill(c);
            circle(this.x, this.y, this.diameter * this.speed);

            if (this.x <= 0) {
                this.x = width + this.diameter / 2;
                this.y = this.yBase = this.initialY;
                this.active = false;
            }
        }
    }
}

function setup() {
    createCanvas(1920, 1080);
    background('rgba(0,0,0,0.0)');
    angleMode(DEGREES);
    for (var y = 0; y < height * 3; y++) {
        ash.push(new Ash(width, y, Math.random() * 2));
    }
    console.log("Hello")

    fromColor = color(128,16,16, 0);
    toColor = color(255, 92, 64);
}

function draw() {
    clear();
    background('rgba(0,0,0,0.0)');
    for (var y = 0; y < height; y++) {
        if(!ash[y].active && Math.random() > 0.8) {
            ash[y].active = true;
            ash[y].speed = Math.random() * 2 + 1;
        }
        ash[y].render();
    }
}


