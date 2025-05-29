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
        this.bodyRestCount = 0;
        this.bodyAttacking = 0;
        this.bodyAttackType = 0;

        this.dashState = 0;
        this.dashCount = 0;
        this.dashMax = 3;
        this.dashAngle = 0;
        this.dashOriginX = 0;
        this.dashOriginY = 0;
        this.dashStartX = 0;
        this.dashStartY = 0;
        this.dashRest = 0;

        this.traceState = 0;
        this.traceReturnX = board.width / 2 - 200;
        this.traceReturnY = 150;
    }

    rest()
    {
        
    }

dash() 
{
    //Leave Screen
    if (this.dashState === 0) 
    {
        this.y -= 5;
        if (this.y + this.height + 100 < 0) 
        {
            this.dashOriginX = this.x;
            this.dashOriginY = this.y;
            this.dashState = 1;
        }
    }

    // Enter Dash
    else if (this.dashState == 1) 
    {
        var posX = player.x + player.width / 2;
        var posY = player.y + player.height / 2;
        switch (Math.floor (Math.random() * 2))
        {
            case 0:
                this.dashStartY = Math.random() > 0.5 ? -500 : board.height + 100;
                this.dashStartX = Math.random() * board.width;
                break;
            
            case 1:
                this.dashStartX = Math.random() > 0.5 ? -500 : board.width + 100;
                this.dashStartY = Math.random() * board.height;
                break;
        }

        this.x = this.dashStartX;
        this.y = this.dashStartY;
        var dx = posX - this.dashStartX;
        var dy = posY - this.dashStartY;
        this.vx = dx / Math.sqrt (dx ** 2 + dy ** 2) * 30;
        this.vy = dy / Math.sqrt (dx ** 2 + dy ** 2) * 30;

        this.dashAngle = Math.atan2 (dy, dx);

        this.dashState = 2;
    }

    // Dashing
    else if (this.dashState == 2) 
    {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -500 || this.x > board.width + 100 || this.y < -500 || this.y > board.height + 100) 
        {
            this.dashCount++;
            this.dashState = 3;
        }
    }

    //Pause
    else if (this.dashState == 3)
    {
        console.log (this.dashRest);
        this.dashRest++;
        if (this.dashRest > 30) 
        {
            this.dashRest = 0;
            if (this.dashCount >= this.dashMax)
            {
                this.dashState = 4;
            }
            else 
            {
                this.dashState = 1;
            }
        }
    }

    else if (this.dashState == 4)
    {
        this.x = this.dashOriginX;
        this.y = this.dashOriginY;
        this.dashState = -1;
    }

    // return
    else if (this.dashState == -1) 
    {
        this.y += 5;
        if (this.y >= 150) 
        {
            this.y = 150;
            this.dashState = 0;
            this.bodyAttacking = 0;
            this.bodyRestCount = 0;
            this.dashCount = 0;
        }
    }
}

    trace()
    {
        if (this.traceState == 0)
        {
            this.vy = 5;
            this.y += this.vy;
            if (this.y + this.height > board.height)
            {
                this.y = board.height - this.height;
            }
        }

        else if (this.traceState == 1)
        {
            this.x += (this.traceReturnX - this.x) * 0.1;
            this.y += (this.traceReturnY - this.y) * 0.1;

            if (Math.abs(this.x - this.traceReturnX) < 1 && Math.abs(this.y - this.traceReturnY) < 1) 
            {
                this.traceState = -1;
                this.x = this.traceReturnX;
                this.y = this.traceReturnY;
                this.bodyRestCount = 0;
                this.bodyAttacking = 0;
            }
        }

        else if (this.traceState == -1)
        {
            this.bodyRestCount = 0;
            this.traceState = 0;
        }

    }

    onCollision(label)
    {
        if (label == -1)
        {
            ui.bossHp -= 7;
            ui.combo += 10;
        }

        else if (label == -2)
        {
            ui.bossHp -= 2;
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

        //Symbols Rest
        if (this.symbolRestCount < 150)
        {
            this.symbolAttacking = 0;
            this.symbolRestCount++;
            triangle.rest();
            circle.rest();
            square.rest();
        }
        
        //Symbols Attack
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

        //Body rest
        if (this.bodyRestCount < 150)
        {
            this.bodyAttacking = 0;
            this.bodyRestCount++;
            this.rest();
            resonance1.rest();
            resonance2.rest();
            resonance3.rest();
        }

        //Body Attack
        else
        {
            if (!this.bodyAttacking)
            {
                this.bodyAttackType = Math.floor (Math.random() * 2);
                this.bodyAttacking = 1;
            }

            if (this.bodyAttackType == 0)
            {
                this.dash();
                resonance1.resonanceDash();
                resonance2.resonanceDash();
                resonance3.resonanceDash();
            }

            else if (this.bodyAttackType == 1)
            {
                this.trace();
                resonance1.resonanceTrace();
                resonance2.resonanceTrace();
                resonance3.resonanceTrace();
            }
        }
    }

    render()
    {
        draw.drawImage (this.image, 0, 0, 220, 220, this.x - 25, this.y - 25, 450, 450);
    }
}