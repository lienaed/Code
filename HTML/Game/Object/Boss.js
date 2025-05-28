class Boss extends Character
{
    constructor (width, height, x, y, src1, src2)
    {
        super (width, height, x, y, 1);
        this.bodyImage = src1;
        this.pieceImage = src2;
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
        draw.drawImage (this.bodyImage, 0, 0, 240, 200, this.x, this.y, this.width, this.height);
        draw.drawImage (this.pieceImage, 0, 0, 52, 46, this.x - 100, this.y + 200, 64, 58);
    }
}