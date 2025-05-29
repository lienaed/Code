class Arrow extends Character
{
    constructor (width, height, x, y, host, src, offset)
    {
        super (width, height, x, y, -2);
        this.host = host;
        this.image = src;
        this.launch = 0;
        this.onHit = 0;
        this.mouseDX = 0;
        this.mouseDY = 0;
        this.angle = 0;
        this.offset = 50;
        this.scatterAngle = offset;
        this.velocity = 50;
        this.vx = 0;
        this.vy = 0;
    }

    update()
    {
        if (this.onHit)
            objects = objects.filter (obj => obj !== this);

        this.mouseDX = mouseX - this.host.centerX;
        this.mouseDY = this.host.centerY - mouseY;
        this.host.faceX = mouseX > this.host.x ? 1 : -1;

        if (this.host.arrowState == 2 && !this.launch)
        {
            this.angle = Math.atan2 (this.mouseDY, this.mouseDX) + (this.scatterAngle || 0);
            this.x = this.host.centerX + Math.cos (this.angle) * this.offset;
            this.y = this.host.centerY - Math.sin (this.angle) * this.offset;
        }

        else if (this.host.arrowLaunch || this.launch)
        {
            this.launch = 1;
            this.vx = Math.cos (this.angle) * this.velocity;
            this.vy = -Math.sin (this.angle) * this.velocity;
            this.x += this.vx;
            this.y += this.vy;
        }

    }

    render()
    {
        draw.save();
            draw.translate(this.x, this.y);
            draw.rotate(-this.angle);
            draw.drawImage( this.image, 0, 0, 26, 43,  -this.width / 2, -this.height / 2, this.width, this.height);
        draw.restore();
    }
}