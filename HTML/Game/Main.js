//Variables
const board = document.getElementById ("Board");
board.width = window.innerWidth;
board.height = window.innerHeight;
const draw = board.getContext ("2d");
var objects = new Array();

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
    imageSRC["Attack"] = "https://lienaed.github.io/Code/Images/Attack.png";

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
    loop();
}


//Main Loop
function loop ()
{
    draw.clearRect (0, 0, board.width, board.height);
    for (var i of objects)
    {
        i.update();
        i.render();
    }

    requestAnimationFrame (loop);
}

