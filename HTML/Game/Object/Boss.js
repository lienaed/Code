class Boss extends Character
{
    constructor (width, height, x, y, src)
    {
        super (width, height, x, y, 1);
        this.image = src;
        objects.push (new Resonance (-100, 100, this, imageList["Resonance"], 1));
        objects.push (new Resonance (200, -100, this, imageList["Resonance"], 2));
        objects.push (new Resonance (500, 100, this, imageList["Resonance"], 3));
        objects.push (new Resonance (-100, 300, this, imageList["Resonance"], 0));
        objects.push (new Resonance (200, 300, this, imageList["Resonance"], 0));
        objects.push (new Resonance (400, 400, this, imageList["Resonance"], 0));
    }

    onCollision(label)
    {
        if (label == -1)
        {
            ui.bossHp -= 4;
            ui.combo += 10;
        }

        else if (label == -2)
        {
            ui.bossHp -= 3;
            ui.combo += 5;
        }

        else if (label == -3)
        {
            ui.bossHp -= ui.combo * 0.2;
        }
    }

    update()
    {

    }

    render()
    {
        draw.drawImage (this.image, 0, 0, 220, 220, this.x - 25, this.y - 25, 450, 450);
    }
}