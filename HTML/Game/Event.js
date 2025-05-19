//Input
var mouseX = 0, mouseY = 0;
var keys = {};
var prevKeys = {};
window.addEventListener ("keydown", function (event) 
{
    keys[event.code] = 1;
    if (event.shiftKey)
        event.preventDefault();
});
window.addEventListener ("keyup", function (event) 
{
    keys[event.code] = 0;
});

window.addEventListener("contextmenu", (e) => e.preventDefault());
window.addEventListener ("mousemove", function (event)
{
    mouseX = parseFloat (event.clientX);
    mouseY = parseFloat (event.clientY);
})
window.addEventListener ("mousedown", function (event)
{
    keys["Mouse" + event.button] = 1;
});
window.addEventListener ("mouseup", function (event)
{
    keys["Mouse" + event.button] = 0;
});