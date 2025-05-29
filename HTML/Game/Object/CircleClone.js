class CircleClone extends Character 
{
    constructor(x, y, size) 
    {
        super(size, size, x, y, 3);
        this.stage = 0;
        this.alpha = 0.2;
        this.scale = 1;
        this.existTime = 0;
        this.onHit = false;
        this.size = size;
        this.blackout = false;
        this.image = imageList["Resonance"];
    }

    update() 
    {
        this.existTime++;

        if (this.stage === 0) 
        {
            this.alpha += 0.02;
            if (this.alpha >= 0.8) 
            {
                this.alpha = 0.8;
                this.stage = 1;
            }
        }

        else if (this.stage === 3) 
        {
            this.label = 2;
            this.blackout = true;
        }

        else if (this.stage === 4) 
        {

            this.label = 3;
            this.alpha -= 0.05;
            if (this.alpha <= 0) 
            {
                this.onHit = true;
            }
        }
    }

    render() 
    {
        draw.save();
        draw.globalAlpha = this.alpha;

        if (this.blackout) 
        {
            draw.fillStyle = "black";
            draw.beginPath();
            draw.arc(this.x + this.width / 2, this.y + this.height / 2, this.size / 2, 0, Math.PI * 2);
            draw.closePath();
            draw.fill();
            draw.closePath();
        } 
        else 
        {
            draw.drawImage(this.image, 128, 0, 52, 46, this.x, this.y, this.width, this.height);
        }

        draw.restore();
    }
}
