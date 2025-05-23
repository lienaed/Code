//Variables
const board = document.getElementById ("Board");
board.width = window.innerWidth;
board.height = window.innerHeight;
const draw = board.getContext ("2d");

var objects = new Array();
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
    imageSRC["Player"] = "https://lienaed.github.io/Code/Images/Black.jpg";
    imageSRC["Attack"] = "https://lienaed.github.io/Code/Images/Attack4.png";
    imageSRC["Boss"] = "https://lienaed.github.io/Code/Images/Red.png"

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
    objects.push (new Player (50, 50, board.width / 2 - 50, board.height / 2 - 50, imageList["Player"]));
    objects.push (new Boss (500, 500, board.width / 2, 0, imageList["Boss"]));
    loop();
}

function collision (a, b, flag)
{
    if(a.x < b.x + b.width && a.x + a.width > b.x &&
    a.y < b.y + b.height && a.y + a.height > b.y)
    {
        if (!flag)
            a.onCollision();
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

    for (var i of objects)
    {
        i.update();
        i.render();
    }

    var b = objects.find (obj => obj.label == 1);
    var a = objects.find (obj => obj.label == -1);
    var p = objects.find (obj => obj.label == 0);
    if (a && b && !a.onHit)
    {
        collision (b, a, 0);
        a.onHit = 1;
    }
    if (p && b)
    {
        collision (p, b, 1);
    }


    requestAnimationFrame (loop);
}

