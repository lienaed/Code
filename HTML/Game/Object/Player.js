class Player extends Character
{
    constructor (width, height, x, y, src)
    {
        super (width, height, x, y, 0);
        this.image = src;

        this.initJumpForce = 20;
        this.jumpForce = 0;
        this.jumpState = 0;
        this.enableJump = 0;
        this.setJumpBuffer = 2;
        this.jumpBuffer = 0;

        this.launchForce = 20;
        this.launchBuffer = 120;
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
        this.setAttackBuffer = 7;
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
        console.log (this.attackState, this.attackTimer);
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

    update()
    {
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
    }
}