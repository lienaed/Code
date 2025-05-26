class Arrow extends Character
{
    constructor (width, height, x, y, host, src)
    {
        super (width, height, x, y, -2);
        this.host = host;
        this.image = src;
        this.onhit = 0;
        this.launch = 0;
    }

    update()
    {
        if (this.onhit)
            objects = objects.filter (obj => obj.label !== -1);
    }
}