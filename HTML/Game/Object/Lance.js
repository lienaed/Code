class Lance extends Character
{
    constructor (width, height, x, y, host, src)
    {
        super (width, height, x, y, -3);
        this.host = host;
        this.image = src;
        this.onhit = 0;
        this.lanceBuffer = 6;
        this.stage = 0;
        this.mouseDX = 0;
        this.mouseDY = 0;
        this.angle = 0;
        this.velocity = 50;
        this.imageW = 212;
        this.count = 0;
    }

    update()
    {
        if (this.count < 30)
        {
            this.count++;
            if (this.stage < this.lanceBuffer)
                this.stage += 0.34;

            this.mouseDX = mouseX - this.host.centerX;
            this.mouseDY = this.host.centerY - mouseY;
            this.angle = Math.atan2 (this.mouseDY, this.mouseDX);
        }
        else
        {
            this.vx = Math.cos (this.angle) * this.velocity;
            this.vy = -Math.sin (this.angle) * this.velocity;
            this.x += this.vx;
            this.y += this.vy;
        }

        if (this.onHit)
        {
            objects = objects.filter (obj => obj !== this);
            ui.energy += ui.combo;
            ui.combo = 0;
        }
    }

    render()
    {   
    draw.save();
    draw.translate (this.x, this.y);
    draw.rotate (-this.angle);
    draw.drawImage (this.image, Math.floor(this.stage) * 212, 0, 212, 64, -106, 0, 212, 64);
    draw.restore();
    }
}