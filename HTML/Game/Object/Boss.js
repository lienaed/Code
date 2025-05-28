class Boss extends Character
{
    constructor (width, height, x, y, src)
    {
        super (width, height, x, y, 1);
        this.image = src;
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
        draw.drawImage (this.image, 0, 0, 240, 200, this.x, this.y, this.width, this.height);
    }
}