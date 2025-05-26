class Arrow extends Character
{
    constructor (width, height, x, y, host, dirX, dirY, src)
    {
        super (width, height, x, y, -2);
        this.host = host;
        this.image = src;
    }
}