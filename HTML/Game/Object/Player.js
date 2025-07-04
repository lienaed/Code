class Player extends Character
{
    constructor (width, height, x, y, src)
    {
        super (width, height, x, y, 0);
        this.image = src;

        this.disableControl = 0;
        this.invincible = 0;
        this.flashCount = 0;

        this.initJumpForce = 20;
        this.jumpForce = 0;
        this.jumpCount = 0;
        this.jumpState = 0;
        this.setJumpBuffer = 2;
        this.jumpBuffer = 0;
        this.jumpEnergy = 6;

        this.launchForce = 30;
        this.launchCharge = 60;
        this.maxLaunchForce = 65;
        this.launchState = 0;
        this.launchDX = 0;
        this.launchDY = 0;
        this.launchGradient = 0;
        this.launchTimer = 0;
        this.currentForce = 0;
        this.launchEnergy = 25;
        this.enableLaunch = true;

        this.dashState = 0;
        this.dashTimer = 0;
        this.dashTime = 6;
        this.dashSpeed = 160;
        this.dashEnergy = 10;
        this.maxAirDash = 1;
        this.airDashCount = 0;

        this.attackState = 0;
        this.attackDamage = 20;
        this.attackFrame = 15;
        this.attackCooldown = 4;
        this.attackTimer = 0;
        this.attackBuffer = 0;
        this.setAttackBuffer = 10;
        this.attackEnergy = 5;

        this.arrowState = 0;
        this.setArrowCharge = 60;
        this.arrowCharge = 60;
        this.arrowLaunch = 0;
        this.arrowEnergy = 7;
        this.arrowOffset = 0;
        this.arrowCount = 0;

        this.lanceState = 0;
        this.lanceBuffer = 20;
        this.setLanceBuffer = 30;

        this.refillBuffer = 150;
        this.setRefillBuffer = 150;
    }

    gravity()
    {
        this.vy += this.gravityForce;
    }


    jump()
    {
        if (!this.jumpState)
        {
            this.jumpForce = this.initJumpForce;
        }
        else
        {
            if (this.jumpState == 2)
                this.jumpCount--;

            if (this.jumpForce > 0)
            {
                if (this.vy >= -this.jumpForce)
                {
                    this.vy = -this.jumpForce;
                    this.jumpForce -= 0.9;
                }
            }
        }
    }

    launch()
    {
        if (!this.launchState)
        {
            this.currentForce = parseFloat (this.launchForce);
            this.launchTimer = this.launchCharge;
        }

        if (this.launchState == 2)
        {
            console.log ("Launching");
            this.vx *= 0.89;
            this.vy *= 0.89;
            this.currentForce += (this.maxLaunchForce - this.launchForce) / this.launchCharge;
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
            if (this.invincible <= 0)
                this.invincible = 1;

            if (this.dashTimer > this.dashTime * 0.4)
                this.vy = 0;
            
            if (this.dashTimer == this.dashTime - 1)
            {
                if (this.faceX == 1)
                    this.vx = this.dashSpeed;
                else if (this.faceX == -1)
                    this.vx = -this.dashSpeed;
            }
                
            this.vx *= 0.6;

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
            objects.push (new Attack (170, 120, this.x, this.y, this, this.faceX, this.faceY, imageList["Attack"]));
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

            if (this.attackTimer > 0 && this.y < board.height - this.height && this.faceY == 0)
            {
                this.vx = this.faceX / 2;
                this.vy = Math.abs (this.vy) > 1 ? this.vy * 0.7 : 1;
            }
        }
    }

    arrow()
    {
        if (this.arrowState == 0)
        {
            this.arrowCharge = this.setArrowCharge;
        }

        else if (this.arrowState == 1 || this.arrowCharge <= 0)
        {
            this.arrowLaunch = 1;
            this.arrowState = 0;
        }

        if (this.arrowState == 3)
        {
            if (this.arrowCount < 3)
            {
                objects.push (new Arrow (25, 35, this.x, this.y, this, imageList["Arrow"], 0));
                this.arrowCount++;
            }
            else
            {
                this.arrowCount = 0;
                for (let offset of [-0.2, 0, 0.2])
                {
                    objects.push (new Arrow (25, 35, this.x, this.y, this, imageList["Arrow"], this.arrowOffset));
                }

            }
            this.arrowState = 2;
            ui.energy -= this.arrowEnergy;
        }
        else if (this.arrowState == 2)
        {
            this.arrowCharge--;
        }
    }

    lance()
    {
        if (this.lanceState == 0)
            this.lanceBuffer = this.setLanceBuffer;

        else if (this.lanceState == 1)
        {
            this.lanceBuffer--;
            if (this.lanceBuffer <= 0)
            {
                this.lanceState = 0;
            }

            this.disableControl = 1;
        }

        else if (this.lanceState == 2)
        {
            objects.push (new Lance (35, 35, this.x, this.y, this, imageList["Lance"]));
            this.lanceState = 1;
        }

    }

    inputManager()
    {
        //Jump
        if (keys["Space"] && this.jumpState)
            this.jumpState = 1;
        else
            this.jumpState = 0;

        if (keys["Space"] && !prevKeys["Space"] && this.jumpCount > 0)
        {
            if (this.jumpCount == 2)
            {
                this.jumpState = 2;
                this.airDashCount = 0;
            }

            else if (this.jumpCount == 1 && ui.energy >= this.jumpEnergy)
            {
                this.jumpState = 2;
                ui.energy -= this.jumpEnergy;
                this.airDashCount = 0;
            }

        }

        //Launch
        if ((keys["KeyG"] || keys["Mouse3"]) && (!prevKeys["KeyG"] && !prevKeys["Mouse3"]))
        {
            if (this.y >= board.height - this.height || this.enableLaunch)
            {
                this.launchState = 1;
                this.enableLaunch = 0;
            }

        }
        if ((keys["KeyG"] || keys["Mouse3"]) && this.launchState)
        {
            this.launchState = 2;
        }
        if ((!keys["KeyG"] && !keys["Mouse3"]) && (prevKeys["KeyG"] || prevKeys["Mouse3"]) && this.launchState)
            this.launchState = 3;

        //Dash
        if ((keys["ShiftLeft"] || keys["Mouse4"]) && (!prevKeys["ShiftLeft"] && !prevKeys["Mouse4"]) && !this.dashState && ui.energy >= this.dashEnergy)
        {
            if (this.y >= board.height - this.height || this.airDashCount < this.maxAirDash)
            {
                this.dashState = 1;
                ui.energy -= this.dashEnergy;

                if (this.y < board.height - this.height)
                    this.airDashCount++;
            }
        }

        //Attack
        if (keys["Mouse0"] && !prevKeys["Mouse0"] && !this.attackState && ui.energy >= this.attackEnergy)
        {
            this.attackBuffer = this.setAttackBuffer;
            ui.energy -= this.attackEnergy;
        }

        //Arrow
        if (keys["Mouse2"] && ui.energy >= this.arrowEnergy)
        {
            if (!prevKeys["Mouse2"] && !this.arrowState)
                this.arrowState = 3;
            else if (prevKeys["Mouse2"] && this.arrowState)
                this.arrowState = 2;
        }
        else if (!keys["Mouse2"] && prevKeys["Mouse2"] && this.arrowState)
            this.arrowState = 1;

        //Lance
        if (keys["KeyV"] && !prevKeys["KeyV"] && ui.combo > 30 && !this.lanceState)
        {
            this.lanceState = 2;
        }

        //Move
        this.w = keys["KeyW"] ? 1 : 0;
        this.s = keys["KeyS"] ? 1 : 0;
        this.a = keys["KeyA"] ? 1 : 0;
        this.d = keys["KeyD"] ? 1 : 0;

        //Face
        if (this.w) 
            this.faceY = 1;
        else if (this.s) 
            this.faceY = -1;
        else 
            this.faceY = 0;

        if (keys["KeyA"])
            this.faceX = -1;
        else if (keys["KeyD"])
            this.faceX = 1;


        prevKeys = Object.assign ({}, keys);
    }

    onCollision(targetX, targetY, targetW, targetH)
    {
        if (this.invincible <= 0)
            ui.Hp -= 10;
        this.invincible = 40;
        freezeFrame = 0;

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

    energyRefill()
    {
        if (ui.energy < ui.prevEnergy)
        {
            this.refillBuffer = this.setRefillBuffer;
        }
        else
        {
            this.refillBuffer--;
        }

        if (this.refillBuffer < 0)
        {
            ui.energy += 0.5;
        }
    }


    update()
    {
        console.log (this.arrowCount);
        this.invincible--;

        if (this.y == board.height - this.height)
        {
            this.jumpCount = 2;
            this.airDashCount = 0;
            this.enableLaunch = 1;
        }

        if (this.disableControl > 0)
        {
            this.disableControl--;
            this.w = this.a = this.s = this.d = 0;
        }
        else
            this.inputManager();

        if (!this.launchState && !this.dashState)
            this.move (this.w, this.s, this.a, this.d);
        if (!this.launchState && !this.lanceState)
            this.gravity();
        this.jump();

        this.launch();
        this.dash();
        this.attack();
        this.arrow();
        this.lance();

        this.energyRefill();
        this.applyMove();
        this.borderDetect();
        this.render();
    }

    render()
    {
        if (!this.lanceState)
        {
            if (this.invincible < 0)
            {
                if (this.faceX == 1)
                    draw.drawImage (this.image, 0, 0, 32, 64, this.x, this.y, this.width, this.height);
                else if (this.faceX == -1)
                    draw.drawImage (this.image, 64, 0, 32, 64, this.x, this.y, this.width, this.height);
            }
            else
            {
                if (this.flashCount < 20)
                {
                    if (this.faceX == 1)
                        draw.drawImage (this.image, 0, 0, 32, 64, this.x, this.y, this.width, this.height);
                    else if (this.faceX == -1)
                        draw.drawImage (this.image, 64, 0, 32, 64, this.x, this.y, this.width, this.height);
                }
                this.flashCount++;
                this.flashCount %= 40;
            }
        }
    }
}