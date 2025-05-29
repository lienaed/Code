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
            this.width = 50;
            this.height = 50;
            this.imageH = 54;
            this.imageX = 0;
        }

        this.radius = 300;
        this.angle = -Math.PI * (this.number - 1) / 3 - Math.PI / 6;
        this.restX = 0;
        this.restY = 0;

        this.triangleState = 0;
        this.triangleDestX = 0;
        this.triangleDestY = 0;
        this.triangleScale = 1;
        this.triangleCenterX = 0;
        this.triangleCenterY = 0;
        this.triangleCount = 0;

        this.squareState = 0;
        this.squareScale = 1;
        this.squareCenterX = 0;
        this.squareCenterY = 0;
        this.squareVx = 0;
        this.squareVy = 0;
        this.squareBounceCount = 0;


        this.circleState = 0;
        this.circleAlpha = 1;
        this.circleTimer = 0;
        this.circleScale = 1;
        this.circleCenterX = 0;
        this.circleCenterY = 0;

        this.traceState = 0;
        this.traceVx = 0;
        this.traceVy = 0;
        this.traceTimer = 0;
    }


    rest()
    {
        this.x = this.restX;
        this.y = this.restY;
    }

    triangleAttack()
    {
        //Orientation
        if (this.triangleState == 0)
        {
            var dx = player.x - this.x;
            var dy = player.y - this.y;
            this.triangleDestX = player.x;
            this.triangleDestY = player.y;
            var len = Math.sqrt (dx ** 2 + dy ** 2);
            
            this.vx = (dx / len) * 10;
            this.vy = (dy / len) * 10;
            this.triangleState = 1;
        }

        //Approach
        else if (this.triangleState == 1)
        {
            this.x += this.vx;
            this.y += this.vy;
            if (Math.abs (this.x - this.triangleDestX) < 5 && Math.abs (this.y - this.triangleDestY) < 5)
            {
                this.triangleState = 2;
                if (this.triangleScale >= 4)
                    this.triangleState = 3;

            }
        }

        //Scale up
        else if (this.triangleState == 2)
        {
            if (this.triangleScale >= 4)
            {
                this.triangleState = 3;
            }
            if (this.triangleScale == 1) 
            {
                this.triangleCenterX = this.x + this.width / 2;
                this.triangleCenterY = this.y + this.height / 2;
            }

            this.triangleScale += 0.02;
            this.width = 50 * this.triangleScale;
            this.height = 50 * this.triangleScale;

            this.x = this.triangleCenterX - this.width / 2;
            this.y = this.triangleCenterY - this.height / 2;
        }

        //Damage
        else if (this.triangleState == 3)
        {
            this.triangleCount++;
            if (this.triangleCount >= 280)
            {
                this.triangleState = 4;
                this.triangleCount = 0;
            }
            if (this.triangleCount >= 80 && this.triangleCount < 200)
            {
                this.triangleCount = 200;
                this.triangleState = 0;
            }
        }

        //return
        else if (this.triangleState == 4)
        {
            this.triangleScale -= 0.02;
            if (this.triangleScale < 1)
                this.triangleScale = 1;

            this.width = 50 * this.triangleScale;
            this.height = 50 * this.triangleScale;

            this.x += (this.restX - this.x) * 0.1;
            this.y += (this.restY - this.y) * 0.1;

            if (Math.abs (this.x - this.restX) < 1 && Math.abs (this.y - this.restY) < 1 && this.triangleScale <= 1)
            {
                this.triangleState = -1;
                this.x = this.restX;
                this.y = this.restY;
                this.width = 50;
                this.height = 50;
            }
        }

        //rest
        else if (this.triangleState == -1)
        {
            boss.symbolRestCount = 0;
            this.triangleState = 0;
        }
    }

    squareAttack() 
    {
        // Scale up
        if (this.squareState == 0) 
        {
            if (this.squareScale == 1) 
            {
                this.squareCenterX = this.x + this.width / 2;
                this.squareCenterY = this.y + this.height / 2;
            }

            this.squareScale += 0.02;
            if (this.squareScale >= 3.5) 
            {
                this.squareScale = 3.5;
                this.squareState = 1;

                const dx = player.x + player.width / 2 - (this.x + this.width / 2);
                const dy = player.y + player.height / 2 - (this.y + this.height / 2);
                const len = Math.sqrt(dx * dx + dy * dy);

                this.squareVx = (dx / len) * 10;
                this.squareVy = (dy / len) * 10;
            }

            this.width = 50 * this.squareScale;
            this.height = 50 * this.squareScale;
            this.x = this.squareCenterX - this.width / 2;
            this.y = this.squareCenterY - this.height / 2;
        }

        //Bounce
        else if (this.squareState == 1) 
        {
            this.x += this.squareVx;
            this.y += this.squareVy;

            if (this.x <= 0 || this.x + this.width >= board.width) 
            {
                this.squareVx = -this.squareVx * 1.2;
                this.squareBounceCount++;
            }
            if (this.y <= 0 || this.y + this.height >= board.height) 
            {
                this.squareBounceCount++;
                this.squareVy = -this.squareVy * 1.2;
            }

            if (this.squareBounceCount >= 10) 
            {
                this.squareState = 2;
            }
        }

        //Slow down
        else if (this.squareState == 2) 
        {
            this.x += this.squareVx;
            this.y += this.squareVy;

            this.squareVx *= 0.9;
            this.squareVy *= 0.9;

            if (Math.abs(this.squareVx) < 1 && Math.abs(this.squareVy) < 1) 
            {
                this.squareState = 3;
            }
        }

        //Return
        else if (this.squareState == 3) 
        {
            this.squareScale -= 0.05;
            if (this.squareScale < 1)
                this.squareScale = 1;

            this.width = 50 * this.squareScale;
            this.height = 50 * this.squareScale;

            this.x += (this.restX - this.x) * 0.2;
            this.y += (this.restY - this.y) * 0.2;

            if (Math.abs(this.x - this.restX) < 1 && Math.abs(this.y - this.restY) < 1 && this.squareScale === 1) 
            {
                this.squareState = -1;
                this.x = this.restX;
                this.y = this.restY;
                this.width = 50;
                this.height = 50;
            }
        }

        //Rest
        else if (this.squareState == -1) 
        {
            boss.symbolRestCount = 0;
            this.squareState = 0;
            this.squareBounceCount = 0;
        }
    }

    circleAttack()
    {
        //Initialize
        if (this.circleState == 0)
        {
            this.circleAlpha = 1;
            this.circleTimer = 0;
            this.circleState = 1;
        }

        //Fade out
        else if (this.circleState == 1)
        {
            //Scale up
            if (this.circleScale == 1)
            {
                this.circleCenterX = this.x + this.width / 2;
                this.circleCenterY = this.y + this.height / 2;
            }
            this.circleAlpha -= 0.02;
            this.circleScale += 0.01;
            this.width = 70 * this.circleScale;
            this.height = 70 * this.circleScale;
            this.x = this.circleCenterX - this.width / 2;
            this.y = this.circleCenterY - this.height / 2;

            //Create Clones
            if (this.circleAlpha <= 0) 
            {
                this.circleAlpha = 0;
                this.circleState = 2;
                this.circleTimer = 0;

                for (let i = 0; i < 40; i++) 
                {
                    let x = Math.random() * board.width;
                    let y = Math.random() * board.height;
                    objects.push(new CircleClone(x, y, this.width));
                }
            }
        }

        //Generate Circles
        else if (this.circleState == 2)
        {
            this.circleTimer++;
            if (this.circleTimer > 120) 
            {
                for (let obj of objects) 
                {
                    if (obj instanceof CircleClone) 
                        obj.stage = 3;
                }
                this.circleState = 3;
                this.circleTimer = 0;
            }
        }

        //Apply Damage
        else if (this.circleState == 3)
        {
            this.circleTimer++;
            if (this.circleTimer > 100) 
            {
                for (let obj of objects) 
                {
                    if (obj instanceof CircleClone) 
                        obj.stage = 4;
                }
                this.circleState = 4;
            }
        }

        //Clear / Fade in
        else if (this.circleState == 4)
        {
            //Scale down
            this.circleAlpha += 0.02;
            this.circleScale -= 0.01;
            this.width = 70 * this.circleScale;
            this.height = 70 * this.circleScale;
            this.x = this.circleCenterX - this.width / 2;
            this.y = this.circleCenterY - this.height / 2;

            //Reset
            if (this.circleAlpha >= 1) 
            {
                this.circleAlpha = 1;
                this.circleScale = 1;
                this.circleState = -1;
            }
        }

        else if (this.circleState == -1)
        {
            boss.symbolRestCount = 0;
            objects = objects.filter(obj => !(obj instanceof CircleClone && obj.onHit));
            this.circleState = 0;
        }
    }

    resonanceTrace() 
    {

        if (this.traceState == 0) 
        {
            this.traceState = 1;
        }

        else if (this.traceState == 1) 
        {
            const dx = player.x + player.width / 2 - (this.x + this.width / 2);
            const dy = player.y + player.height / 2 - (this.y + this.height / 2);
            const len = Math.sqrt(dx * dx + dy * dy);

            const speed = 2;
            const vx = (dx / len) * speed;
            const vy = (dy / len) * speed;

            this.x += vx;
            this.y += vy;

            this.traceTimer++;
            if (this.traceTimer > 500)
            {
                this.traceState = 2;
                boss.traceState = 1; 
            }
        }

        else if (this.traceState == 2)
        {
            this.x += (this.restX - this.x) * 0.2;
            this.y += (this.restY - this.y) * 0.2;

            if (Math.abs(this.x - this.restX) < 1 && Math.abs(this.y - this.restY) < 1)
                this.traceState = -1;
        }

        if (this.traceState === -1)
        {
            this.traceState = 0;
            this.traceVx = 0;
            this.traceVy = 0;
            this.traceTimer = 0;
        }
    }


    resonanceDash() 
    {
        if (boss.dashState == 2 || boss.dashState == 3)
        {
            const angle = this.host.dashAngle + Math.PI;
            const baseIndex = this.number - 4;
            const offsetAngle = (baseIndex - 1) * Math.PI / 6;

            const finalAngle = angle + offsetAngle;
            const distance = 250;

            const cx = this.host.x + this.host.width / 2;
            const cy = this.host.y + this.host.height / 2;

            const targetX = cx + Math.cos(finalAngle) * distance - this.width / 2;
            const targetY = cy + Math.sin(finalAngle) * distance - this.height / 2;

            this.x += (targetX - this.x) * 0.4;
            this.y += (targetY - this.y) * 0.4;
        }
    }


    update()
    {
        this.restX = this.host.centerX + Math.cos (this.angle) * this.radius - this.imageW / 2;
        this.restY = this.host.centerY + Math.sin (this.angle) * this.radius - this.imageH / 2;
    }

    render()
    {
        draw.save();
        draw.globalAlpha = this.circleAlpha;
        draw.drawImage(this.image, this.imageX, 0, this.imageW, this.imageH, this.x, this.y, this.width, this.height);
        draw.restore();
    }
}   