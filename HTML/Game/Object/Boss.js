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
            ui.bossHp -= 5;
            ui.combo += 10;
        }

        else if (label == -2)
        {
            ui.bossHp -= 3;
            ui.combo += 5;
        }
    }

    update()
    {

    }
}