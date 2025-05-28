class Resonance extends Character
{
    constructor(x, y, host, src)
    {
        super (50, 50, x, y, 2);
        this.image = src;
    }

    render()
    {
        draw.drawImage (this.image, 0, 0, 52, 46, this.x - 100, this.y + 200, 64, 58);
    }
}