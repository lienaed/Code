class Boss extends Character
{
    constructor (width, height, x, y, src)
    {
        super (width, height, x, y, 1);
        this.image = src;

        this.centerX = 0;
        this.centerY = 0;

        this.symbolState = 0;
        this.symbolRestCount = 0;
        this.symbolAttacking = 0;
        this.symbolAttackingObj = 0;

        this.bodyState = 0;
        this.bodyRestCOunt = 0;
        this.bodyAttacking = 0;
        this.bodyAttackType = 0;
    }

    rest()
    {

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
        this.centerX = this.x + this.width / 2;
        this.centerY = this.y + this.height / 2;


        if (this.symbolRestCount < 150)
        {
            this.symbolAttacking = 0;
            this.symbolRestCount++;
            triangle.rest();
            circle.rest();
            square.rest();
        }
        else
        {
            if (!this.symbolAttacking)
            {
                this.symbolAttackingObj = Math.floor (Math.random() * 3);
            }
            this.symbolAttacking = 1;

            if (this.symbolAttackingObj == 0)
                square.squareAttack();
            else
                square.rest();

            if (this.symbolAttackingObj == 1)
                triangle.triangleAttack();
            else
                triangle.rest();

            if (this.symbolAttackingObj == 2)
                circle.circleAttack();
            else
                circle.rest();
        }


        if (this.bodyRestCOunt < 150)
        {
            this.bodyRestCOunt++;
            this.rest();
            resonance1.rest();
            resonance2.rest();
            resonance3.rest();
        }
    }

    render()
    {
        draw.drawImage (this.image, 0, 0, 220, 220, this.x - 25, this.y - 25, 450, 450);
    }
}