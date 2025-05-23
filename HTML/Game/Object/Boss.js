class Boss extends Character
{
    constructor (width, height, x, y, src)
    {
        super (width, height, x, y, 1);
        this.image = src;
        this.maxHp = 100;
        this.Hp = 100;
        this.barW = 1000;
        this.barH = 30;
        this.barX = board.width / 2 - 500;
        this.barY = board.height - 50;
    }

    HpBar()
    {
        var bar = (this.Hp / this.maxHp) * this.barW;

        draw.fillStyle = "#444";
        draw.fillRect (this.barX, this.barY, this.barW, this.barH);

        draw.fillStyle = "#f11";
        draw.fillRect (this.barX, this.barY, bar, this.barH);
    }

    onCollision()
    {
        this.Hp -= 5;
    }

    update()
    {
        this.HpBar();
        if (this.Hp <= 0)
        {
            this.hp = 0;
        }
    }
}