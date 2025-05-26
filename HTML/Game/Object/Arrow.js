class Arrow extends Character
{
    constructor (width, height, x, y, host, src)
    {
        super (width, height, x, y, -2);
        this.host = host;
        this.image = src;
        this.onhit = 0;
        this.launch = 0;
        this.mouseDX = 0;
        this.mouseDY = 0;
    }

    update()
    {
        if (this.onhit)
            objects = objects.filter (obj => obj.label !== -1);

        this.mouseDX = mouseX - this.host.centerX;
        this.mouseDY = mouseY - this.host.centerY;
        this.host.faceX = mouseX > this.host.x ? 1 : -1;

        this.x = this.host.centerX ;
        this.y = this.host.centerY ;
    }

    render()
    {
        
    }
}