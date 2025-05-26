class Character
{
    constructor (width, height, x, y, label)
    {
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.label = label;
        this.friction = 0.95;
        this.staticFriction = 0.2;
        this.moveSpeed = 6;
        this.gravityForce = 0.7;

        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.faceX = 1;
        this.faceY = 0;

        this.w = 0;
        this.s = 0;
        this.a = 0;
        this.d = 0;
        this.hitbox = {};
    }

    move (w, s, a, d)
    {
        if (a && this.vx >= -this.moveSpeed)
            this.vx = -this.moveSpeed;
        if (d && this.vx <= this.moveSpeed)
            this.vx = this.moveSpeed;

        this.vx *= this.friction;
        this.vy *= this.friction;

        if (Math.sqrt ((Math.abs (this.vx))**2 + (Math.abs (this.vy))**2) < this.staticFriction)
        {
            this.vx = 0;
            this.vy = 0;
        }
    }

    applyMove()
    {
        this.x += this.vx;
        this.y += this.vy;
            
        if (this.x <= 0) 
        {
            this.x = 0;
        }
        if (this.x >= board.width - this.width) 
        {
            this.x = board.width - this.width;
        }
        if (this.y <= 0) 
        {
            this.y = 0;
        }
        if (this.y >= board.height - this.height) 
        {
            this.y = board.height - this.height;
        }
    }

    borderDetect() 
    {
        if (this.x <= 0 && this.vx < 0) this.vx = 0;
        if (this.x >= board.width - this.width && this.vx > 0) this.vx = 0;
        if (this.y <= 0 && this.vy < 0) this.vy = 0;
        if (this.y >= board.height - this.height && this.vy > 0) this.vy = 0;
    }

    onCollision()
    {
    }
    
    render()
    {
        draw.drawImage (this.image, this.x, this.y, this.width, this.height);
    }

    update ()
    {}
}