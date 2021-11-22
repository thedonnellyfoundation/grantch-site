canvas = $('#canvas').get(0);
salterImage = $('#salter-image').get(0);
ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

let x = canvas.width / 2 - 52;
let y = canvas.height / 2 - 69;

let vx = 0;
let vy = 0;

dx = 0;
dy = 0;

const ACCELERATION = 2;
const FRICTION = 2.3;

var currentMousePos = { x: 0, y: 0 };

jQuery(function($) {
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });
});

window.setInterval(function() {
    dx = currentMousePos.x - x;
    dy = currentMousePos.y - y;

    dx /= Math.sqrt(  (dx * dx) + (dy * dy)  );
    dy /= Math.sqrt(  (dx * dx) + (dy * dy)  );

    vx += dx * ACCELERATION;
    vy += dy * ACCELERATION;

    x += vx;
    y += vy;
    
    vx /= FRICTION;
    vy /= FRICTION;
    if (vx < -1.23) {
        flipHorizontally(salterImage, x - 52, y - 69);
    }
    else {
        ctx.drawImage(salterImage, x - 52, y - 69);
    }
}, 1000 / 60);

function flipHorizontally(img,x,y){
    // move to x + img's width
    ctx.translate(x+img.width,y);

    // scaleX by -1; this "trick" flips horizontally
    ctx.scale(-1,1);
    
    // draw the img
    // no need for x,y since we've already translated
    ctx.drawImage(img,0,0);
    
    // always clean up -- reset transformations to default
    ctx.setTransform(1,0,0,1,0,0);
}