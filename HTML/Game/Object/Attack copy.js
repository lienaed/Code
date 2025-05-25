class Attack extends Character
{
    constructor (width, height, x, y, host, dirX, dirY, src)
    {
        console.log ("Attack");
        super (width, height, x, y, -1);
        this.host = host;
        this.image = src;
        this.onHit = 0;

        if (dirY == 1)
            this.dir = "u";
        else
        {
            if (dirX == 1)
                this.dir = "r";
            else if (dirX == -1)
                this.dir = "l";
        }
    }

    update ()
    {
        if (this.dir == "r")
            this.x = this.host.x + this.host.width;
        else if (this.dir == "l")
            this.x = this.host.x - this.host.width;

        this.y = this.host.y;
    }

    render ()
    {
        if (this.dir == "u")
        {
            draw.save();
            draw.translate(this.host.x, this.y);
            draw.rotate(-Math.PI / 2);
            draw.drawImage(this.image, 0, 0, 61, 37, 0, 0, this.width, this.height);
            draw.restore();
        }

        else if (this.dir == "r")
        {
            draw.drawImage (this.image, 0, 0, 61, 37, this.x, this.y, this.width, this.height);
        }

        else if (this.dir == "l")
        {
            draw.save ();
            draw.translate (this.x + this.width / 2, this.y);
            draw.scale (-1, 1);
            draw.drawImage (this.image, 0, 0, 61, 37, 0, 0, this.width, this.height);
            draw.restore ();
        }
    }
}