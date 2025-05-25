class Boss extends Character
{
    constructor (width, height, x, y, src)
    {
        super (width, height, x, y, 1);
        this.image = src;
    }

    onCollision()
    {
        ui.bossHp -= 5;
        ui.combo += 10;
    }

    update()
    {

    }
}