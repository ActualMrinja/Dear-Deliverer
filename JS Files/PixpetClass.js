pixpet = function(species, x, y) {
    this.Image = preload[preloadname.indexOf("Png Files/" + species + ".png")]
    this.Animation = 0;
    this.Species = species;
    this.X = x;
    this.Y = y;
 
    if (this.Species == "Taffyglider" || this.Species == "Mobath" || this.Species == "Parrogrine") {
        this.Rotate = 310;
    } else {
        this.Rotate = 0;
    }

    this.FadeOut = 0;

    //Health is for both players and enemies
    this.Health = livestotal

    //EnemyReload is only for Taffygliders and Parrogrines
    this.Reload = this.Species == "Parrogrine" ? 3 : 0;
    
    this.Invincibility = 0;

    this.BatVelocity = 1.5;
    this.BatVelocityY = 1.5;
    
    this.DeathAnimation = 2;
}

pixpet.prototype.keyDown = function(keyCode, sprintAmount = []) {

    if (!endgame && this.Health > 0) {

        if (this.X < 500 && (keyCode == 39 || keyCode == 68)) {
            this.X += 10;
        } else if (this.X > 0 && (keyCode == 37 || keyCode == 65)) {
            this.X -= 10;
        } else if (this.Y < 280 && (keyCode == 40 || keyCode == 83)) {
            this.Y += 10;
        } else if (this.Y > 50 && (keyCode == 38 || keyCode == 87)) {
            this.Y -= 10;
        }

        if (this.Reload == 0&&keyCode == 32) {
            this.Reload = 0.5;
            this.skill(0, "Sweet_Delivery");
        }

        //Moving with a joystick has a wider amount of options
        if (sprintAmount !== []) {
            if ((sprintAmount[0] > 0 && this.X < 500) || (sprintAmount[0] < 0 && this.X > -28)) {
                this.X += sprintAmount[0]
            };
            if ((sprintAmount[1] > 0 && this.Y < 280) || (sprintAmount[1] < 0 && this.Y > 25)) {
                this.Y += sprintAmount[1]
            };
        }

    }

}

pixpet.prototype.delete = function(index) {

    //lowers index by one so an item is not missed when looping
    if (index + 1 < pixpets.length && loadpixpets > -1) {
        loadpixpets -= 1;
    }

    pixpets.splice(index, 1);
    return;
}

//hurt function which includes all pixpets
pixpet.prototype.hurt = function(index, damage) {
    soundeffect("Audio Files/HeartBreak.mp3");
    this.Health -= damage;
    this.FadeOut = 8;

    if (this.Health <= 0) {
        this.Health = 0;
        this.DeathAnimation = 0;
        music.pause();
        soundeffect("Audio Files/DearDelivererEndJingle.mp3");
    }

}

//player collision is text heavy, so a command for any enemy to use is more efficent
pixpet.prototype.playercollision = function(index) {

    if (collision(pixpets[0].X - pixpets[0].Image.width / 3 / 2 / 2, pixpets[0].Y - pixpets[0].Image.height / 3 / 2, pixpets[0].Image.width / 3 / 2, pixpets[0].Image.height / 3, this.X - this.Image.width / 3 / 2 / 2, this.Y - this.Image.height / 3 / 2, this.Image.width / 3 / 2, this.Image.height / 3)) {

        pixpets[0].hurt(0, 1);
        
        return true;
    } else {
        return false;
    }

}

//skills can be used by anyone, however they must be called beforehand
pixpet.prototype.skill = function(index, skilltype) {

    switch (skilltype) {

        case "Sweet_Delivery":

            //Presents have a 5% to be golden, 15% to be silver, 80% to be normal
            let rarityChance = Math.floor(Math.random() * 100) + 1;

                itemsmake.push(new itembuild(rarityChance <= 5 ? "GoldenDelivery" : rarityChance <= 20 ? "SilverDelivery" : "SweetDelivery", this.X, this.Y + 25))

            break;

        case "Parrogrine":

            if (this.X > 485) {
                this.X -= 2.5
            }

            //Parrogrine's have contact damage
            if (pixpets[0].FadeOut == 0 && pixpets[0].Health > 0 && pixpets[0].Invincibility <= 0) {
                this.playercollision(index)
            }

            //After cooldown Parrogrines sprint
            if (this.Reload == 0) {
                if(this.X >= 485) { soundeffect("Audio Files/SleighBell.mp3"); }
                this.X -= 24;
            } else {
               this.Rotate = Math.atan2(this.Y - pixpets[0].Y, this.X - pixpets[0].X) * (180 / Math.PI) 
               this.Y += (pixpets[0].Y - this.Y) / 20;
            }

            break;

        case "Troffinch":

            if (this.X > -20) {
   
                if(this.Rotate == 0){
                this.X -= 8;
                } else {
                this.Y += 8;
                }
 
                //Troffinches's have contact damage
                if (pixpets[0].FadeOut == 0 && pixpets[0].Health > 0 && pixpets[0].Invincibility <= 0) {
                    this.playercollision(index)
                }

            } else {
                this.delete(index);
            }
            break;

        case "Taffyglider":

            if (this.X > -20) {
                this.X -= 5;
                this.Y += (pixpets[0].Y - this.Y) / 20;

                //Taffyglider's have contact damage
                if (pixpets[0].FadeOut == 0 && pixpets[0].Health > 0 && pixpets[0].Invincibility <= 0) {
                    this.playercollision(index)
                }


            } else {
                this.delete(index);
            }
            break;

        case "Mobath":

            if (this.X > -20) {
                this.X -= 5;
                this.Y += this.BatVelocity;
                this.BatVelocity += this.BatVelocity > 0 ? (Math.random() * 2 / 40) + 0.05 : -(Math.random() * 2 / 40) - 0.05;

                if (Math.abs(this.BatVelocity) > 3) {
                    this.BatVelocity *= -0.5
                }

                //Mobath's have contact damage
                if (pixpets[0].FadeOut == 0 && pixpets[0].Health > 0 && pixpets[0].Invincibility <= 0) {
                    this.playercollision(index)
                }

            } else {
                this.delete(index);
            }
            break;

    }

}

pixpet.prototype.draw = function(index) {

    //Invincibility through losing lives includes a fading out sequence
    if (this.FadeOut > 0) {
        ctx.globalAlpha = 1 - (this.FadeOut % 4 / 4);
        this.FadeOut -= 1 / 6
    } else {
        this.FadeOut = 0;
        ctx.globalAlpha = 1;
    }

    ctx.save();
    ctx.translate(this.X * (hs / 297), this.Y * (hs / 297));
    ctx.rotate(Math.PI / 180 * this.Rotate);
    ctx.drawImage(this.Image, this.Image.width / 2 * Math.floor(this.Animation) + 0.3, 0, this.Image.width / 2 - 0.3, this.Image.height, -this.Image.width / 3 / 2 / 2 * (hs / 297), -this.Image.height / 3 / 2 * (hs / 297), this.Image.width / 3 / 2 * (hs / 297), this.Image.height / 3 * (hs / 297));

    ctx.restore();

    this.Animation += this.Species == "Troffinch" ? 0.5 : 0.2;
    if (this.Animation >= 2) {
        this.Animation = 0;
    }

    if (this.Species !== "Pydeer") {

        this.skill(index, this.Species);

    } else if(chimneyfound[2] == false&&collision(chimneyfound[0], chimneyfound[1], gifload[13].width / 3, gifload[13].height, this.X - this.Image.width / 3 / 2 / 2, this.Y - this.Image.height / 3 / 2, this.Image.width / 3 / 2, this.Image.height / 3)&&this.Health > 0) {
    this.hurt(0,3);
    } else {
      //coordinate constraints
      if (this.X > 500) {
        this.X = 500
       }
       if (this.X < 0) {
        this.X = 0
       }
       if (this.Y > 280&&this.Health > 0) {
        this.Y = 280
       }
       if (this.Y < 50&&this.Health > 0) {
        this.Y = 50
       }
    }


    if (this.Invincibility > 0) {
        this.Invincibility -= 1 / 30
    }

        this.Reload -= 1 / 30

        if (this.Reload < 0) {
            this.Reload = 0;
        }

    //Starting screen animation
    if (endgame) {

        if (this.X < 100 && this.BatVelocity < 0) {
            this.BatVelocity += 1;
        } else if (this.X > 300 && this.BatVelocity > 0) {
            this.BatVelocity -= 1;
        } else {
            this.X += this.BatVelocity;
        }

        this.BatVelocity += (this.BatVelocity > 0) ? Math.random() * 3 / 50 : -Math.random() * 3 / 50;

        if (this.Y < 80 && this.BatVelocityY < 0) {
            this.BatVelocityY += 1;
        } else if (this.Y > 200 && this.BatVelocityY > 0) {
            this.BatVelocityY -= 1;
        } else {
            this.Y += this.BatVelocityY;
        }

        this.BatVelocityY += (this.BatVelocityY > 0) ? Math.random() * 3 / 50 : -Math.random() * 3 / 50;
    }

   //Death animation
   if(this.DeathAnimation < 2&&this.Health == 0){
    
    if(this.Rotate < 60&&this.DeathAnimation == 0){
    this.Rotate += 2;
    this.X += 2.5;
    this.Y += this.Rotate/10;
    } else if(this.DeathAnimation == 0) {
    this.DeathAnimation = 1;
    } else if(this.Rotate > -60&&this.DeathAnimation == 1){
    this.Rotate -= 8;
    this.Y -= Math.abs((60-this.Rotate)/2.5);
    this.X += 2.5;
    } else {
    this.Rotate = 0;
    this.DeathAnimation = 2;
    }
       
   }
    
    

}
