class Attack extends Character
{
    constructor (width, height, x, y, host, dir, src)
    {
        console.log ("Attack");
        super (width, height, x, y, -1);
        this.dir = dir;
        this.host = host;
        this.image = src;
    }

    update ()
    {
        this.x = this.dir ? this.host.x + this.host.width : this.host.x - this.host.width;
        this.y = this.host.y;
    }

    render ()
    {
        if (this.dir)
        {
            draw.drawImage (this.image, 0, 0, 64, 22, this.x, this.y, this.width, this.height);
        }
        else
        {
            draw.save ();
            draw.translate (this.x + this.width / 2, this.y);
            draw.scale (-1, 1);
            draw.drawImage (this.image, 0, 0, 64, 22, 0, 0, this.width, this.height);
            draw.restore ();
        }
    }
}