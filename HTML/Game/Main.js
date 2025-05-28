//Variables
const board = document.getElementById ("Board");
board.width = window.innerWidth;
board.height = window.innerHeight;
const draw = board.getContext ("2d");

var objects = new Array();
var ui = new UI();
var player, boss, square, circle, triangle, resonance1, resonance2, resonance3;
var freezeFrame = 0;

//Images Initialization
var count = 0;
var imageList = {};
var imageSRC = {};
function checkLoad()
{
    console.log ("Image Loaded.");
    count++;
    if (count == Object.keys(imageSRC).length)
        objInit();
}
function imageLoad()
{
    imageSRC["Player"] = "https://lienaed.github.io/Code/Images/Ghost.png";
    imageSRC["Attack"] = "https://lienaed.github.io/Code/Images/Attack.png";
    imageSRC["Arrow"] = "https://lienaed.github.io/Code/Images/Arrow.png";
    imageSRC["Lance"] = "https://lienaed.github.io/Code/Images/Lance.png";
    imageSRC["GateKeeper"] = "https://lienaed.github.io/Code/Images/GateKeeper.png"
    imageSRC["Resonance"] = "https://lienaed.github.io/Code/Images/Resonance.png"

    for (let i in imageSRC)
    {
        const image = new Image();
        image.src = imageSRC[i];
        image.onload = () =>
        {
            imageList[i] = image;
            checkLoad();
        }

    }
}
imageLoad();

//Objects Initialization
function objInit()
{
    player = (new Player (32, 64, board.width / 2 - 50, board.height / 2 - 50, imageList["Player"]));
    boss = (new Boss (400, 360, board.width / 2 - 200, 150, imageList["GateKeeper"]));

    square = (new Resonance (-100, 100, boss, imageList["Resonance"], 1));
    circle = (new Resonance (200, -100, boss, imageList["Resonance"], 2));
    triangle = (new Resonance (500, 100, boss, imageList["Resonance"], 3));
    resonance1 = (new Resonance (-100, 300, boss, imageList["Resonance"], 4));
    resonance2 = (new Resonance (200, 400, boss, imageList["Resonance"], 5));
    resonance3 = (new Resonance (400, 400, boss, imageList["Resonance"], 6));
    objects.push (player, boss, square, circle, triangle, resonance1, resonance2, resonance3);
    loop();
}

//Collision
function collision (a, b, flag)
{
    if(a.x < b.x + b.width && a.x + a.width > b.x &&
    a.y < b.y + b.height && a.y + a.height > b.y)
    {
        if (!flag)
        {
            a.onCollision(b.label);
            b.onHit = 1;
        }
        else
            a.onCollision (b.x, b.y, b.width, b.height);
    }
}


//Main Loop
function loop ()
{
    if (freezeFrame > 0) 
    {
        freezeFrame--;
        setTimeout(() => loop(), 16);
        return;
    }

    draw.clearRect (0, 0, board.width, board.height);
    objects.sort ((a, b) => b.label - a.label);

    //Update
    ui.update();
    for (var i of objects)
    {
        i.update();
        i.render();
        if (keys["KeyB"])
        {
            for (i of objects)
            {
                draw.save();
                draw.strokeStyle = "red";
                draw.lineWidth = 2;
                draw.strokeRect(i.x, i.y, i.width, i.height);
                draw.restore();
            }
        }
    }

    //Collision Detect
    var b = objects.find (obj => obj.label == 1);
    var a = objects.filter (obj => obj.label < 0);
    var p = objects.find (obj => obj.label == 0);

    if (p && b && p.invincible < 0)
    {
        collision (p, b, 1);
    }
    for (i of a)
    {
        if (i.onHit == 0)
        {
            collision (b, i, 0);
        }
    }


    requestAnimationFrame (loop);
}

