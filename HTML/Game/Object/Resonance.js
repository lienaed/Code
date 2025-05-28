class Resonance extends Character
{
    constructor(offsetX, offsetY, host, src, type)
    {
        super (50, 50, 0, 0, 2);
        this.image = src;
        this.host = host;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.type = type
    }

    update()
    {
        this.x = this.host.x + this.offsetX;
        this.y = this.host.y + this.offsetY;
    }

    render()
    {
        draw.drawImage (this.image, this.type * 64, 0, 52, 46, this.x, this.y, 50, 50);
    }
}