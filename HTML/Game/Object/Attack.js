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
        {
            this.dir = "u";
            [this.width, this.height] = [this.height, this.width];
        }

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
        {
            this.x = this.host.x + this.host.width;
            this.y = this.host.y - 20;
        }

        else if (this.dir == "l")
        {
            this.x = this.host.x - this.width;
            this.y = this.host.y - 20;
        }

        else if (this.dir == "u")
        {
            this.x = this.host.x - 20;
            this.y = this.host.y - this.height;
        }
    }

    render ()
    {
        if (this.dir == "u")
        {
            draw.save();
            draw.translate(this.host.x, this.y + this.height);
            draw.rotate(-Math.PI / 2);
            draw.drawImage(this.image, 0, 0, 61, 37, 0, 0, this.height, this.width);
            draw.restore();
        }

        else if (this.dir == "r")
        {
            draw.drawImage (this.image, 0, 0, 61, 37, this.x, this.y, this.width, this.height);
        }

        else if (this.dir == "l")
        {
            draw.save ();
            draw.translate (this.x + this.width, this.y);
            draw.scale (-1, 1);
            draw.drawImage (this.image, 0, 0, 61, 37, 0, 0, this.width, this.height);
            draw.restore ();
        }
    }
}