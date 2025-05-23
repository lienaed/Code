class Player extends Character
{
    constructor (width, height, x, y, src)
    {
        super (width, height, x, y, 0);
        this.image = src;

        this.Hp = 100;
        this.maxHp = 100;
        this.HpBarW = 200;
        this.HpBarH = 20;
        this.HpBarX = 20;
        this.HpBarY = 20;
        this.invincible = 0;

        this.energy = 100;
        this.maxEnergy = 100;
        this.energyBarW = 200;
        this.energyBarH = 20;
        this.energyBarX = 20;
        this.energyBarY = 50;

        this.disableControl = 0;

        this.initJumpForce = 20;
        this.jumpForce = 0;
        this.jumpState = 0;
        this.enableJump = 0;
        this.setJumpBuffer = 2;
        this.jumpBuffer = 0;

        this.launchForce = 20;
        this.launchBuffer = 80;
        this.maxLaunchForce = 70;
        this.launchState = 0;
        this.launchDX = 0;
        this.launchDY = 0;
        this.launchGradient = 0;
        this.launchTimer = 0;
        this.currentForce = 0;

        this.dashState = 0;
        this.dashTimer = 0;
        this.dashTime = 6;
        this.dashSpeed = 160;

        this.attackState = 0;
        this.attackDamage = 20;
        this.attackFrame = 15;
        this.attackCooldown = 4;
        this.attackTimer = 0;
        this.attackBuffer = 0;
        this.setAttackBuffer = 10;
    }

    gravity()
    {
        this.vy += this.gravityForce;
    }

    jump()
    {
        if (!this.enableJump)
        {
            this.jumpForce = this.initJumpForce;
            if (this.y == board.height - this.height)
                this.jumpState = 2;
        }
        else
        {
            if (this.enableJump == 2)
                this.jumpState--;

            if (this.jumpState >= 0)
            {
                if (this.jumpForce > 0)
                {
                    if (this.vy >= -this.jumpForce)
                    {
                        this.vy = -this.jumpForce;
                        this.jumpForce -= 2;
                    }
                }
            }
        }
    }

    launch()
    {
        if (!this.launchState)
        {
            this.currentForce = parseFloat (this.launchForce);
            this.launchTimer = this.launchBuffer;
        }

        if (this.launchState == 2)
        {
            console.log ("Launching");
            this.vx *= 0.89;
            this.vy *= 0.89;
            this.currentForce += (this.maxLaunchForce - this.launchForce) / this.launchBuffer;
            this.launchDX = parseFloat (mouseX - (this.x + this.width / 2));
            this.launchDY = parseFloat (mouseY - (this.y + this.height / 2));

            this.launchTimer--;
            if (this.launchTimer <= 0)
                this.launchState = 3;
        }

        if (this.launchState == 3)
        {
            console.log ("Launched");

            this.launchGradient = Math.sqrt (this.launchDX ** 2 + this.launchDY ** 2);
            if (this.launchGradient > 0)
            {
                this.vx = (this.launchDX / this.launchGradient) * this.currentForce;
                this.vy = (this.launchDY / this.launchGradient) * this.currentForce;
            }

            this.launchState = 0;
        }
    }

    dash()
    {
        if (this.dashState)
        {
            if (this.dashTimer > this.dashTime * 0.4)
                this.vy = 0;
            
            if (this.dashTimer == this.dashTime - 1)
                this.vx = this.faceX ? this.dashSpeed : -this.dashSpeed;
            this.vx *= 0.7;

            this.dashTimer--;
            if (this.dashTimer <= 0)
                this.dashState = 0;
        }
        else
        {
            this.dashTimer = this.dashTime;
        }
    }

    attack()
    {
        this.attackBuffer--;
        if (this.attackBuffer > 0 && !this.attackState)
        {
            this.attackState = 1;
            this.attackBuffer = 0;
        }

        if (this.attackState == 1)
        {
            this.attackTimer = this.attackFrame;
            this.attackIndex = objects.length;
            objects.push (new Attack (100, 50, this.x, this.y, this, this.faceX, imageList["Attack"]));
            this.attackState = 2;
        }
        else if (this.attackState == 2)
        {
            this.attackTimer--;
            if (this.attackTimer <= 0)
                this.attackState = 0;
            else if (this.attackTimer <= this.attackCooldown)
            {
                objects = objects.filter (obj => obj.label !== -1);
            }
            if (this.attackTimer > 0 && this.y < board.height - this.height)
            {
                this.vx = this.faceX ? 1 : -1;
                this.vy = Math.abs (this.vy) > 1 ? this.vy * 0.7 : 1;
            }
        }
    }

    inputManager()
    {
        //Jump
        if (keys["Space"])
            this.enableJump = 1;
        else
            this.enableJump = 0;
        if (keys["Space"] && !prevKeys["Space"])
            this.enableJump = 2;

        //Launch
        if ((keys["KeyG"] || keys["Mouse3"]) && (!prevKeys["KeyG"] && !prevKeys["Mouse3"]))
            this.launchState = 1;

        if ((keys["KeyG"] || keys["Mouse3"]) && this.launchState)
        {
            this.launchState = 2;
        }
        if ((!keys["KeyG"] && !keys["Mouse3"]) && (prevKeys["KeyG"] || prevKeys["Mouse3"]) && this.launchState)
            this.launchState = 3;

        //Dash
        if (keys["ShiftLeft"] || keys["Mouse4"])
        {
            this.dashState = 1;
        }

        //Attack
        if (keys["Mouse0"] && !prevKeys["Mouse0"] && !this.attackState)
        {
            this.attackBuffer = this.setAttackBuffer;
        }

        //Move
        if (keys["KeyW"])
            this.w = 1;
        else
            this.w = 0;
        if (keys["KeyS"])
            this.s = 1;
        else
            this.s = 0;
        if (keys["KeyA"])
        {
            this.a = 1;
            this.faceX = 0;
        }
        else
            this.a = 0;
        if (keys["KeyD"])
        {
            this.d = 1;
            this.faceX = 1;
        }
        else
            this.d = 0;

        prevKeys = Object.assign ({}, keys);
    }

    onCollision(targetX, targetY, targetW, targetH)
    {
        if (this.invincible <= 0)
            this.Hp -= 10;
        this.invincible = 50;
        freezeFrame = 2;

        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        const targetCenterX = targetX + targetW / 2;
        const targetCenterY = targetY + targetH / 2;

        const dx = centerX - targetCenterX;
        const dy = centerY - targetCenterY;

        const overlapX = (this.width + targetW) / 2 - Math.abs(dx);
        const overlapY = (this.height + targetH) / 2 - Math.abs(dy);

        if (overlapX < overlapY)
        {
            this.x += dx > 0 ? overlapX : -overlapX;
            this.vx = dx > 0 ? 5 : -5;
        }
        else
        {
            this.y += dy > 0 ? overlapY : -overlapY;
            this.vy = this.y < targetY + targetH ? -10 : 0;
        }

        this.disableControl = 20;
    }

    HpBar()
    {
        if (this.Hp < 0)
            this.Hp = 0;

        var bar = (this.Hp / this.maxHp) * this.HpBarW;
                
        draw.fillStyle = "#444";
        draw.fillRect (this.HpBarX, this.HpBarY, this.HpBarW, this.HpBarH);

        draw.fillStyle = "#f11";
        draw.fillRect (this.HpBarX, this.HpBarY, bar, this.HpBarH);
    }

    energyBar()
    {
        if (this.energy < 0)
            this.energy = 0;

        var bar = (this.energy / this.maxEnergy) * this.energyBarW;
        
        draw.fillStyle = "#444";
        draw.fillRect (this.energyBarX, this.energyBarY, this.energyBarW, this.energyBarH);

        draw.fillStyle = "#1f1";
        draw.fillRect (this.energyBarX, this.energyBarY, bar, this.energyBarH);
    }

    update()
    {
        this.invincible--;

        if (this.disableControl > 0)
        {
            this.disableControl--;
            this.w = this.a = this.s = this.d = 0;
        }
        else
            this.inputManager();

        if (!this.launchState && !this.dashState)
            this.move (this.w, this.s, this.a, this.d);
        if (!this.launchState)
            this.gravity();
        this.jump();

        this.launch();
        this.dash();
        this.attack();

        this.applyMove();
        this.borderDetect();
        this.render();
        this.HpBar();
        this.energyBar();
    }
}