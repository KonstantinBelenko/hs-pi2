class App {
    constructor() {
        this.init();
        console.log('Init done')
    }

    init() {
        this.canvas = new Canvas();

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        this.lastUpdate = Date.now();
    }

    run() {
        const now = Date.now();
        const deltaTime = (now - this.lastUpdate) / 1000; // Delta time in seconds
        this.lastUpdate = now;

        this.canvas.run(deltaTime);

        requestAnimationFrame(this.run.bind(this));
        // setInterval(this.run.bind(this), 1000 / 10);
    }
}

class Canvas {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.init();
    }

    #getCanvas() {
        return document.getElementById('canv');
    }

    #setBackgroundColor(color, ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    #setCanvasSize(width, height, ctx) {
        ctx.canvas.width = width;
        ctx.canvas.height = height;
    }

    init() {
        console.log('Canvas init');

        this.canvas = this.#getCanvas();
        this.ctx = this.canvas.getContext('2d');

        this.balls = [];

        for (let i = 0; i < 100; i++) {
            this.balls.push(new Ball(10*i, 100, 50, 'white', this.ctx));
        }

        console.log('Canvas init end');
    }

    run(deltaTime) {
        this.#setCanvasSize(this.width, this.height, this.ctx);
        this.#setBackgroundColor('black', this.ctx);

        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].run(deltaTime);
        }
    }
}

class Ball {
    constructor(x, y, r, color, ctx) {
        console.log('Ball constructor');
        this.x = x;
        this.y = y;
        this.px = x
        this.py = y;

        this.r = r;
        this.color = color;
        this.ctx = ctx;
        this.init();
    }

    init() {
        console.log('Ball init');
        this.GRAVITY_X = 0;
        this.GRAVITY_Y = 0.981;
        this.BOUNCE = 1.5;
        this.FRICTION = 0.999999999;

        this.stop = 0;

        window.addEventListener('mousemove', (event) => {
            this.lastMouseX = event.clientX;
            this.lastMouseY = event.clientY;
        });

        // every 2 seoncds, switch vertical gravity
        setInterval(() => {
            this.GRAVITY_Y = -this.GRAVITY_Y;
        }, 2000);

        // setTimeout(() => {
        //     this.GRAVITY_X = Math.random() * 0.1 - 0.05;
        //     this.GRAVITY_Y = Math.random() * 0.1 - 0.05;
        // }, 1);
        // on click - inverse the gravity
        // window.addEventListener('click', () => {
        //     this.GRAVITY_X = -this.GRAVITY_X;
        //     this.GRAVITY_Y = -this.GRAVITY_Y;
        // }
    }

    #draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.arc(this.px, this.py, this.r-this.r*0.3, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
        this.ctx.closePath();
    }

    #apply_gravity(deltaTime) {
        this.y += this.GRAVITY_Y * deltaTime * 60;
        this.x += this.GRAVITY_X * deltaTime * 60;
    }

    #apply_bounce() {
        if (this.y + this.r > window.innerHeight) {
            this.y = window.innerHeight - this.r;
            this.py = this.y + (this.y - this.py) * this.BOUNCE;
        }

        if (this.y - this.r < 0) {
            this.y = this.r;
            this.py = this.y + (this.y - this.py) * this.BOUNCE;
        }

        if (this.x + this.r > window.innerWidth) {
            this.x = window.innerWidth - this.r;
            this.px = this.x + (this.x - this.px) * this.BOUNCE;
        }

        if (this.x - this.r < 0) {
            this.x = this.r;
            this.px = this.x + (this.x - this.px) * this.BOUNCE;
        }
    }

    #move_away_from_mouse(mouseX, mouseY) {
        let dx = this.x - mouseX;
        let dy = this.y - mouseY;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.r) {
            this.x += dx / distance * (this.r*3 - distance) * 0.5 * Math.random();
            this.y += dy / distance * (this.r*3 - distance) * 0.5 * Math.random();
        }
    }

    run(deltaTime) {
        this.#apply_gravity(deltaTime);
        this.#apply_bounce();
        this.#move_away_from_mouse(this.lastMouseX, this.lastMouseY)

        let dx = this.x - this.px;
        let dy = this.y - this.py;

        this.px = this.x;
        this.py = this.y;

        this.x += dx * this.FRICTION;
        this.y += dy * this.FRICTION;

        this.#draw();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.run();
});