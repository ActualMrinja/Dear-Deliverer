itembuild = function(type, x, y) {

    this.Image = gifload[gifname.indexOf("Gif Files/" + type + ".gif")]
    this.Type = type;
    this.X = x;
    this.Y = y;
    this.Rotate = 0;
    this.Velocity = 3;

    if (this.Type.split("Icon").length == 1) {
        soundeffect("Audio Files/PresentDrop.mp3");
    }

}

itembuild.prototype.delete = function(index) {

    //lowers index by one so an item is not missed when looping
    if (index + 1 < itemsmake.length && loaditems > -1) {
        loaditems -= 1;
    }

    itemsmake.splice(index, 1);
    return true;

}

//player collision is text heavy, so a command for any bullet to use is more efficent
itembuild.prototype.pixpetcollision = function(index, pixpetindex) {

    if (collision(pixpets[pixpetindex].X - pixpets[pixpetindex].Image.width / 3 / 2 / 2, pixpets[pixpetindex].Y - pixpets[pixpetindex].Image.height / 3 / 2, pixpets[pixpetindex].Image.width / 3 / 2, pixpets[pixpetindex].Image.height / 3, this.X - this.Image.width / 3 / 2, this.Y - this.Image.height / 3 / 2, this.Image.width / 3, this.Image.height / 3)) {

        return true;

    } else {
        
        return false;
    }

}

itembuild.prototype.draw = function(index) {

    ctx.save();

    this.Type.split("Icon").length > 1 ? ctx.globalAlpha = (this.X % 100) / 100 : ctx.globalAlpha = 1;

    ctx.translate(this.X * (hs / 297), this.Y * (hs / 297));
    ctx.rotate(Math.PI / 180 * this.Rotate);
    ctx.drawImage(this.Image, -this.Image.width / 3 / 2 * (hs / 297), -this.Image.height / 3 / 2 * (hs / 297), this.Image.width / 3 * (hs / 297), this.Image.height / 3 * (hs / 297));
    ctx.restore();

    //touching the sides of a chimney will destroy the item   
    if (this.Type.split("Icon").length == 1&&(collision(chimneyfound[0], chimneyfound[1] + (80 / 3), 5, (gifload[14].height - 80) / 3, this.X - this.Image.width / 3 / 2, this.Y - this.Image.height / 3 / 2, this.Image.width / 3, this.Image.height / 3) || collision(chimneyfound[0] + gifload[13].width / 3 - 5, chimneyfound[1] + (80 / 3), 5, (gifload[13].height - 80) / 3, this.X - this.Image.width / 3 / 2, this.Y - this.Image.height / 3 / 2, this.Image.width / 3, this.Image.height / 3))) {
        if(chimneyfound[2] == false){ soundeffect("Audio Files/ItemBreak.mp3"); }
        this.delete(index);
    } else if (this.Type.split("Icon").length == 1&& collision(chimneyfound[0], chimneyfound[1] + (80 / 3), gifload[13].width / 3, 5, this.X - this.Image.width / 3 / 2, this.Y - this.Image.height / 3 / 2, this.Image.width / 3, this.Image.height / 3) && chimneyfound[2] == false) {
        score += this.Type == "GoldenDelivery" ? 8 * (6 - livestotal) : this.Type == "SilverDelivery" ? 4 * (6 - livestotal) : 2 * (6 - livestotal);
        chimneyfound[2] = true;
        soundeffect("Audio Files/Score.mp3");
    }

    if (this.Type == "SweetDelivery" || this.Type == "SilverDelivery" || this.Type == "GoldenDelivery") {
        this.Y += this.Velocity;
        this.Velocity += 0.5;

    }

    //Code that automatically makes every skill bubble have the same ability
    if (this.Type.split("Icon").length > 1) {

        this.X -= 4;
        this.Rotate += 4;

        if (this.pixpetcollision(index, 0)) {

            //Bonus points if the skill is switch
            if (this.Type == "ScorePlusIcon") {
                score += 5;
                soundeffect("Audio Files/Score.mp3");
            } else if(this.Type == "HeartOfIceIcon"){
                pixpets[0].Invincibility = 4;
                soundeffect("Audio Files/GlassBreakHarsh.mp3");
            } else if(this.Type == "HeartUpIcon"){
                if(pixpets[0].Health < livestotal) { 
                    pixpets[0].Health += 1; 
                    soundeffect("Audio Files/GlassBreak.mp3");
                } else {
                    score += 5;
                    soundeffect("Audio Files/Score.mp3")
                }
            }
            

            this.delete(index);
        }

    }

    //Item boundaries
    if (this.Y > 300 || this.X < -20 || this.X > 550 || this.Y < 25) {
        this.delete(index);
    }

}
