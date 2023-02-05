var progression = 0;

var ash = [];

var smoke = [];

var fromColor;
var toColor;

class Particle {
    initialX = 0;
    initialY = 0;
    yBase = 0;
    x = 0;
    y = 0;
    xSpeed = 0;
    ySpeed = 0;
    diameter = 2;
    active = false;
    amplitude = 10;
    frequency = 0.0005;
    startColor = color(255, 255, 255);
    endColor = color(255, 255, 255);
    age = 0;
    lifespan = 300;

    constructor(x, y, xSpeed, ySpeed, startColor, endColor) {
        this.initialX = x;
        this.initialY = y;
        this.yBase = y;
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.startColor = startColor;
        this.endColor = endColor;
        this.age = Math.random() * this.lifespan;
    }

    render() {
        if (this.active) {
            this.x -= this.xSpeed;
            this.y = this.yBase + (this.amplitude / this.xSpeed * Math.cos(Math.PI * 2 * this.frequency * this.xSpeed * this.x)) + this.ySpeed;
            this.yBase -= this.ySpeed / 4;

            noStroke();
            var c = lerpColor(this.startColor, this.endColor, this.age / this.lifespan);
            fill(c);
            circle(this.x, this.y, this.diameter);

            this.age++;

            // death
            if (this.x <= -this.diameter ||
                this.x > width + this.diameter ||
                this.y <= -this.diameter ||
                this.y >= height + this.diameter ||
                this.age > this.lifespan
            ) {
                this.x = width + 2;
                this.y = this.yBase = this.initialY;
                this.active = false;
                this.age = 0;
            }
        }
    }
}

function setup() {
    createCanvas(1920, 1080);
    background('rgba(0,0,0,0.0)');
    angleMode(DEGREES);
    frameRate(15);
    for (var y = 0; y < height; y += 2) {
        ash.push(new Particle(
            Math.random() * width,
            y,
            Math.random() * 2 + 1,
            Math.random() * 2,
            color(64, 255, 140),
            color(16, 128, 64, 0),
        ));
    }
}

function draw() {
    clear();
    background('rgba(0,0,0,1.0)');

    for (var i = 0; i < ash.length; i++) {
        if (!ash[i].active && Math.random() > 0.8) {
            ash[i].active = true;
            ash[i].xSpeed = Math.random() * 2 + 1;
            ash[i].ySpeed = Math.random() * 3 + 0.5;
            ash[i].frequency = Math.random() * 0.0001 + 0.0005;
            ash[i].diameter = Math.random() * 2 + 1;
            ash[i].lifespan = Math.random() * 1200;
        }
        ash[i].render();
    }
}