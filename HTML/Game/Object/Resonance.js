class Resonance extends Character
{
    constructor(offsetX, offsetY, host, src, number)
    {
        super (50, 50, 0, 0, 2);
        this.image = src;
        this.host = host;
        this.offsetX = offsetX;
        this.offsetY = offsetY;

        this.imageH = 46;
        this.imageW = 52;
        this.imageX = number * 64;
        this.number = number;
        if (this.number > 3)
        {
            this.width = 30;
            this.height = 60;
            this.imageH = 54;
            this.imageX = 0;
        }

        this.radius = 300;
        this.angle = -Math.PI * (this.number - 1) / 3 - Math.PI / 6;

        this.triangleState = 0;

        this.squareState = 0;

        this.circleState = 0;
    }


    rest()
    {
        this.x = this.host.centerX + Math.cos (this.angle) * this.radius - this.imageW / 2;
        this.y = this.host.centerY + Math.sin (this.angle) * this.radius - this.imageH / 2;
    }

    triangleAttack()
    {
        if (this.triangleState == 0)
        {
            console.log ("triangle");
            var dx = player.x - this.x;
            var dy = player.y - this.y;
            var len = Math.sqrt (dx ** 2 + dy ** 2);
            
            this.vx = (dx / len) * 10;
            this.vy = (dy / len) * 10;
            this.triangleState = 1;
        }

        else if (this.triangleState == 1)
        {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x == player.x && this.y == player.y)
            {
                this.triangleState = 2;
            }
        }

        else if (this.triangleState == 2)
        {

        }

        else if (this.triangleState == -1)
        {
            boss.symbolRestCount = 0;
        }
    }

    squareAttack()
    {
        if (this.squareState == 0)
        {
            console.log ("square");
        }



        boss.symbolRestCount = 0;
    }

    circleAttack()
    {
        if (this.circleState == 0)
        {
            console.log ("circle");
        }


        boss.symbolRestCount = 0;
    }

    resonanceTrace()
    {

    }

    resonanceDash()
    {
        
    }

    update()
    {
    }

    render()
    {
        draw.drawImage (this.image, this.imageX, 0, this.imageW, this.imageH, this.x, this.y, 50, 50);
    }
}   