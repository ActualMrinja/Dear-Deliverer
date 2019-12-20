canvas = document.getElementById("Canvas-DearDeliverer");
ctx = canvas.getContext("2d");

/**
0 is header
1 is full screen button
2 is small screen button
3 is snow
4 is cloud
5 is pydeer
6 is player joystick
7 is Joystick Top
8 is Deliver Icon
9 is Sweet Delivery
10 is Snow Heart
11 is Empty Heart
12 is Score Plus Icon
13 is Chimney
14 is Silver Delivery
15 is Golden Delivery
16 is Invincible Heart
17 is Heart Up Icon
18 is Music On 
19 is Music Off
20 is Sound On
21 is Sound Off
22 is Button Unclick
23 is Button Click
24 is Heart Of Ice Icon
**/

gifname = ["Gif Files/Header.gif", "Gif Files/FullScreenButton.gif", "Gif Files/SmallScreenButton.gif", "Gif Files/Snow.gif", "Gif Files/Cloud.gif", "Gif Files/Pydeer.gif", "Gif Files/PlayerJoystick.gif", "Gif Files/JoystickTop.gif", "Gif Files/Sweet_DeliveryIcon.gif", "Gif Files/SweetDelivery.gif", "Gif Files/SnowHeart.gif", "Gif Files/EmptyHeart.gif", "Gif Files/ScorePlusIcon.gif", "Gif Files/Chimney.gif", "Gif Files/SilverDelivery.gif", "Gif Files/GoldenDelivery.gif", "Gif Files/InvincibleHeart.gif", "Gif Files/HeartUpIcon.gif", "Gif Files/MusicOn.gif", "Gif Files/MusicOff.gif", "Gif Files/SoundOn.gif", "Gif Files/SoundOff.gif", "Gif Files/ButtonUnclick.gif", "Gif Files/ButtonClick.gif", "Gif Files/HeartOfIceIcon.gif"];
gifload = [];

preloadname = ["Png Files/Pydeer.png", "Png Files/Taffyglider.png", "Png Files/Mobath.png", "Png Files/Troffinch.png", "Png Files/Parrogrine.png"];
preload = [];

for (let loader = 0; loader < gifname.length; loader++) {
    gifload.push(new Image());
    gifload[loader].src = gifname[loader];
}

for (let loader = 0; loader < preloadname.length; loader++) {
    preload.push(new Image());
    preload[loader].src = preloadname[loader];
}

ws = 528;
hs = 297;

mousex = 0;
mousey = 0;
mousedown = false;
mouseup = true;
keyup = [];

livestotal = 3;
score = 99999;
seconds = 0;

chimneyfound = [550, 250, true];

pixpets = [new pixpet("Pydeer", 150, 140)]
itemsmake = []

//dummy variables
PATS = 3;
prize = 0;

//music handler, intro >> main theme, main theme is preloaded
music = new Audio("Audio Files/DearDelivererMainTheme.mp3")
music = new Audio("Audio Files/DearDelivererIntro.mp3");
music.volume = 0.7;
music.loop = false;
music.play()

music.onended = function() {
    let keepvolume = music.volume; //makes the music keep its volume when resetting
    music.pause();
    music = new Audio("Audio Files/DearDelivererMainTheme.mp3")
    music.volume = keepvolume
    music.loop = true;
    music.play();
}

sounds = [0, 0, 0, 0, 0, 0];
soundeffectvolume = 1;
soundsloop = 0;
endgame = true;
tipon = false;

//x,y,degrees, and type
backgroundmake = [];

for (let loader = 0; loader < 15; loader++) {
    backgroundmake.push(Math.ceil(Math.random() * 528), Math.ceil(Math.random() * 297), 0, (Math.floor(Math.random() * 10) + 1 == 1) ? 4 : 3)
}


//basic non-advanced collision
collision = function(x1, y1, w1, h1, x2, y2, w2, h2) {

    if (x1 <= x2 + w2 && x1 + w1 >= x2 && y1 <= y2 + h2 && y1 + h1 >= y2) {
        return true;
    } else {
        return false;
    }

}

//circle collision
circlecollision = function(x1, x2, y1, y2, radius) {

    if (Math.pow(Math.pow(x1 - x2 * (hs / 297), 2) + Math.pow(y1 - y2 * (hs / 297), 2), 0.5) <= (radius * hs / 297)) {
        return true;
    } else {
        return false;
    }

}

//global sound effects to deal with multiple sound effects efficently
soundeffect = function(file) {

    sounds[soundsloop] = new Audio(file);
    sounds[soundsloop].volume = soundeffectvolume;
    sounds[soundsloop].play();
    soundsloop += 1;
    if (soundsloop > 5) {
        soundsloop = 0;
    }

}

mousemake = function(event) {
    mousex = event.clientX - canvas.getBoundingClientRect().left;
    mousey = event.clientY - canvas.getBoundingClientRect().top;
}

mobilemousemake = function(event) {
    mousex = event.touches[0].clientX - canvas.getBoundingClientRect().left;
    mousey = event.touches[0].clientY - canvas.getBoundingClientRect().top;
    mousedown = true;
}

mousedowncheck = function() {
    mousedown = true;
    mouseup = false;

    //music does not play unti clicked in some browsers
    if (music.volume == 0.7 && pixpets[0].Health > 0) {
        music.play()
    }
}

keydowncode = function(keyhandler = 0) {

    //can only use hotkeys during gameplay 
    if (event !== undefined && keyup.indexOf(event.keyCode) == -1) {
        keyup.push(event.keyCode)
    }
    pixpets[0].keyDown(keyhandler !== 0 ? keyhandler : event.keyCode);

}



textmaker = function(text, x, y, size, sizeswitch = false) {

    ctx.globalAlpha = 1;
    
    //loop allows line breaks to be available with \n
    for (let textsplit = 0; textsplit < text.split("\n").length; textsplit++) {

        if (sizeswitch) {
            ctx.font = "100 " + size * (hs / 297) + "px SG12";
            ctx.strokeStyle = "black";
            ctx.lineWidth = (size / 25) * ((24/size)+4) * (hs / 297);
            ctx.strokeText(text.split("\n")[textsplit], (x+((window.devicePixelRatio == 1 ? 1 : window.devicePixelRatio*1.3)-1)) * (hs / 297) - (ctx.measureText(text.split("\n")[textsplit]).width / 2), (y + (textsplit * size * 1.25)) * (hs / 297), ctx.measureText(text.split("\n")[textsplit]).width);
            ctx.fillStyle = "#ffffff";
            ctx.fillText(text.split("\n")[textsplit], x * (hs / 297) - (ctx.measureText(text.split("\n")[textsplit]).width / 2), (y + (textsplit * size * 1.25)) * (hs / 297), ctx.measureText(text.split("\n")[textsplit]).width);
        } else {
            ctx.font = "100 " + size * (hs / 297) + "px SG12";
            ctx.strokeStyle = "black";
            ctx.lineWidth = (size / 25) * ((24/size)+4) * (hs / 297);
            ctx.strokeText(text.split("\n")[textsplit], (x +((window.devicePixelRatio == 1 ? 1 : window.devicePixelRatio*1.3)-1)) * (hs / 297), (y + (textsplit * size * 1.25)) * (hs / 297), ctx.measureText(text.split("\n")[textsplit]).width * (hs / 297));
            ctx.fillStyle = "#ffffff";
            ctx.fillText(text.split("\n")[textsplit], x * (hs / 297), (y + (textsplit * size * 1.25)) * (hs / 297), ctx.measureText(text.split("\n")[textsplit]).width * (hs / 297));
        }

    }

}

fullscreencode = function() {

    if (ws == 528) {

        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) {
            /* Firefox */
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) {
            /* Chrome, Safari and Opera */
            canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) {
            /* IE/Edge */
            canvas.msRequestFullscreen();
        }

        //If both are supported choose the lesser, if not choose the one that is supported. This helps with mobile support
        ws = (window.innerWidth && document.documentElement.clientWidth) ?
            Math.min(window.innerWidth, document.documentElement.clientWidth) :
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;

        hs = Math.floor(ws / (528 / 297));
        canvas.width = ws
        canvas.height = hs;
        mousedown = false;
    } else {

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE/Edge */
            document.msExitFullscreen();
        }

        ws = 528;
        hs = 297;
        canvas.width = 528;
        canvas.height = 297;
        mousedown = false;
    }

}

//skill buttons display and code goes here
skillbuttons = function(x, y, itemOwned) {
    circlecollision(mousex, x + 15, mousey, y + 15, 15) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    ctx.drawImage(gifload[8], x * (hs / 297), y * (hs / 297), 45 * (hs / 297), 45 * (hs / 297))

    if (ctx.globalAlpha == 1) {
        textmaker("PRESS TO DROP A PRESENT DOWN CHIMNEYS\nSILVER AND GOLDEN PRESENT VARITIES APPEAR RANDOMLY", 90, 270, 11)

        if (mousedown && pixpets[0].Reload == 0) {
            pixpets[0].Reload = 0.5;
            pixpets[0].skill(0, "Sweet_Delivery");
            mousedown = false;
        }

    }

    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 7.5 * (hs / 297);
    ctx.arc((x + 45/2) * (hs / 297), (y + 45/2) * (hs / 297), 45/2 * (hs / 297), Math.PI / 180 * -90, (((360 / 0.5) * pixpets[0].Reload) - 90) * Math.PI / 180, false)
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "#ff7f73";
    ctx.lineWidth = 2.625 * (hs / 297);
    ctx.arc((x + 45/2) * (hs / 297), (y + 45/2) * (hs / 297), 45/2 * (hs / 297), Math.PI / 180 * -90, (((360 / 0.5) * pixpets[0].Reload) - 90) * Math.PI / 180, false)
    ctx.stroke();
    ctx.closePath();
}

//loads snow animation
backgroundload = function() {

    for (let loader = 0; loader < backgroundmake.length; loader += 4) {

        ctx.globalAlpha = 1;

        ctx.save();
        ctx.translate(backgroundmake[loader] * (hs / 297), backgroundmake[loader + 1] * (hs / 297))
        ctx.rotate((Math.PI / 180) * backgroundmake[loader + 2]);
        ctx.drawImage(gifload[backgroundmake[loader + 3]], -(hs / 297) * gifload[backgroundmake[loader + 3]].width / 3 / 2, -(hs / 297) * gifload[backgroundmake[loader + 3]].height / 3 / 2, (hs / 297) * gifload[backgroundmake[loader + 3]].width / 3, (hs / 297) * gifload[backgroundmake[loader + 3]].height / 3);
        ctx.restore();

        if (backgroundmake[loader + 3] == 4) {
            backgroundmake[loader] -= 2.5
        }
        if (backgroundmake[loader + 3] == 3) {
            backgroundmake[loader + 1] += 2.5
        }
        if (backgroundmake[loader + 3] == 3) {
            backgroundmake[loader + 2] += 10
        }

        if (backgroundmake[loader + 1] > 300 || backgroundmake[loader] < -50) {

            (Math.floor(Math.random() * 10) + 1 == 1) ? backgroundmake[loader + 3] = 4: backgroundmake[loader + 3] = 3

            if (backgroundmake[loader + 3] == 3) {
                backgroundmake[loader] = Math.ceil(Math.random() * 528)
                backgroundmake[loader + 1] = 0
            } else {
                backgroundmake[loader] = 600;
                backgroundmake[loader + 1] = Math.random() * 297;
                backgroundmake[loader + 2] = 0;
            }
        }

    }

if(pixpets[0].Health > 0&&!endgame){
    
    /**
    Mobath Spawning
    Score 100-200 - 1/3
    Score 50-99 - 1/4
    Score 0-49 - 1/5
    **/
    if (score < 50 && seconds % 1 > 0.9 + 2 / 30 && Math.floor(Math.random() * 5) + 1 == 1) {
        pixpets.push(new pixpet("Mobath", 550, Math.random() * 147 + 50));
    } else if (score >= 50 && score < 100 && Math.floor(Math.random() * 4) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Mobath", 550, Math.random() * 147 + 50));
    } else if (score >= 100 && score < 200 && Math.floor(Math.random() * 3) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Mobath", 550, Math.random() * 147 + 50));
    }

    /**
    Taffyglider Spawning
    Score 200+ - 1/8
    Score 150-199 - 1/9
    Score 50-149 - 1/10
    **/
    if (score >= 200 && seconds % 1 > 0.9 + 2 / 30 && Math.floor(Math.random() * 8) + 1 == 1) {
        pixpets.push(new pixpet("Taffyglider", 550, Math.random() * 147 + 50));
    } else if (score >= 150 && score < 200 && Math.floor(Math.random() * 9) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Taffyglider", 550, Math.random() * 147 + 50));
    } else if (score >= 50 && score < 150 && Math.floor(Math.random() * 10) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Taffyglider", 550, Math.random() * 147 + 50));
    }

    /**
    Troffinch Spawning
    Score 200+ - 1/5 (1/5 a flock - 4/5 for a flydown)
    **/
    if (score >= 200 && seconds % 1 > 0.9 + 2 / 30 && Math.floor(Math.random() * 5) + 1 == 1) {
        
        if(Math.floor(Math.random() * 5) + 1 == 1){
        pixpets.push(new pixpet("Troffinch", 550, Math.random() * 147 + 50));
        pixpets.push(new pixpet("Troffinch", 700, pixpets[pixpets.length-1].Y-50));
        pixpets.push(new pixpet("Troffinch", 700, pixpets[pixpets.length-2].Y+50));
        pixpets.push(new pixpet("Troffinch", 850, pixpets[pixpets.length-3].Y-100));
        pixpets.push(new pixpet("Troffinch", 850, pixpets[pixpets.length-4].Y+100));
        } else {
         pixpets.push(new pixpet("Troffinch", pixpets[0].X, 50));
         pixpets[pixpets.length-1].Rotate = -90;
        }
            
    } 

    /**
    Parrogrine Spawning
    Score 750+ - 1/15
    Score 600-749 - 1/16
    Score 500-599 - 1/18
    Score 400-499 - 1/20
    **/
    if (score >= 750 && seconds % 1 > 0.9 + 2 / 30 && Math.floor(Math.random() * 15) + 1 == 1) {
        pixpets.push(new pixpet("Parrogrine", 550, Math.random() * 147 + 50));
    } else if (score >= 600 && score < 750 && Math.floor(Math.random() * 16) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Parrogrine", 550, Math.random() * 147 + 50));
    } else if (score >= 500 && score < 600 && Math.floor(Math.random() * 18) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Parrogrine", 550, Math.random() * 147 + 50));
    } else if (score >= 400 && score < 500 && Math.floor(Math.random() * 20) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Parrogrine", 550, Math.random() * 147 + 50));
    }
    

    //A skill bubble generates every 8 seconds, 50% for primary or secondary skill
    if (Math.ceil(seconds) % 10 == 0 && seconds % 1 > 0.9 + 2 / 30) {
            let bubblePick = Math.floor(Math.random() * 3);
            itemsmake.push(new itembuild(bubblePick == 0 ? "HeartOfIceIcon" : bubblePick == 1 ? "HeartUpIcon" : "ScorePlusIcon", 450, Math.random() * 147 + 50));
        }

    }

    //50% a chimney spawns every second  
    if (seconds % 1 > 0.9 + 2 / 30 && Math.floor(Math.random() * 1) + 1 == 1 && chimneyfound[2] == true && chimneyfound[1] >= 300) {
        chimneyfound[0] = 550;
        chimneyfound[1] = 100 + Math.floor(Math.random() * 151);
        chimneyfound[2] = false;
    }


}

endgamemake = function() {

    if (!endgame) {
        textmaker("YOU SURVIVED FOR " + Math.floor(seconds) + " " + (Math.floor(seconds) == 1 ? "SECOND" : "SECONDS") + "\nSCORE: " + score, 264, 100, 20, true);

        //Dummy variables go here
        if (PATS > 0) {

            collision(mousex, mousey, 0, 0, 155 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
            ctx.drawImage(!mouseup && ctx.globalAlpha == 1 ? gifload[23] : gifload[22], 155 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297));
            if (ctx.globalAlpha == 1 && mousedown) {
                mousedown = false;
                endgame = true;
                
                //End jingle is paused  
                for (let autopause = 0; autopause < sounds.length; autopause++) {
                  if (sounds[autopause].pause) {
                  sounds[autopause].volume = 0
                   }
                }
                
                music.play();
            }

            collision(mousex, mousey, 0, 0, 275 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
            ctx.drawImage(!mouseup && ctx.globalAlpha == 1 ? gifload[23] : gifload[22], 275 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297));
            if (ctx.globalAlpha == 1 && mousedown) {
                mousedown = false;
                PATS -= 1;
                prize += 1;
                endgame = true;
                
                //End jingle is paused  
                for (let autopause = 0; autopause < sounds.length; autopause++) {
                  if (sounds[autopause].pause) {
                  sounds[autopause].volume = 0
                   }
                }
                
                music.play();
            }
            textmaker("TRY AGAIN", 204, !mouseup && collision(mousex, mousey, 0, 0, 155 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? 182 : 180, 12, true);
            textmaker("SEND SCORE", 324, !mouseup && collision(mousex, mousey, 0, 0, 275 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? 182 : 180, 12, true);
        } else {

            collision(mousex, mousey, 0, 0, 215 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
            ctx.drawImage(!mouseup && ctx.globalAlpha == 1 ? gifload[23] : gifload[22], 215 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297));
            if (ctx.globalAlpha == 1 && mousedown) {
                mousedown = false;
                endgame = true;
                
                //End jingle is paused  
                for (let autopause = 0; autopause < sounds.length; autopause++) {
                  if (sounds[autopause].pause) {
                  sounds[autopause].volume = 0
                   }
                }
                
                music.play();
            }
            textmaker("TRY AGAIN", 264, !mouseup && collision(mousex, mousey, 0, 0, 215 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? 182 : 180, 12, true);
        }

    } else {
        pixpets.splice(1, pixpets.length - 1);

        collision(mousex, mousey, 0, 0, 400 * (hs / 297), 150 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
        ctx.drawImage(!mouseup && ctx.globalAlpha == 1 ? gifload[23] : gifload[22], 400 * (hs / 297), 150 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297));

        if (ctx.globalAlpha == 1 && mousedown) {
            score = 0;
            seconds = 0;
            endgame = false;
            tipon = false;
            pixpets = [new pixpet("Pydeer", pixpets[0].X, pixpets[0].Y)];
        }

        textmaker("PLAY", 449, !mouseup && collision(mousex, mousey, 0, 0, 400 * (hs / 297), 150 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? 174 : 172, 14, true);

        collision(mousex, mousey, 0, 0, 350 * (hs / 297), 100 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
        ctx.drawImage(!mouseup && ctx.globalAlpha == 1 ? gifload[23] : gifload[22], 350 * (hs / 297), 100 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297));

        if (ctx.globalAlpha == 1 && mousedown) {
            livestotal += 1;
            if (livestotal > 3) {
                livestotal = 1
            }
        }

        textmaker("LIVES: " + livestotal, 399, !mouseup && collision(mousex, mousey, 0, 0, 350 * (hs / 297), 100 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? 124 : 122, 14, true);

        collision(mousex, mousey, 0, 0, 350 * (hs / 297), 200 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
        ctx.drawImage(!mouseup && ctx.globalAlpha == 1 ? gifload[23] : gifload[22], 350 * (hs / 297), 200 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297));

        if (ctx.globalAlpha == 1 && mousedown) {
            tipon = !tipon
        }

        ctx.globalAlpha = 1;
        textmaker("TIPS", 399, !mouseup && collision(mousex, mousey, 0, 0, 350 * (hs / 297), 200 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? 224 : 222, 14, true);

        if (tipon == true) {
            textmaker("Collect points by:\n-Dropping presents through chimneys\n-PC bubbles\n\nPresents give more points depending on\ntheir coloring and amount of lives\nstarted off with\n\nMove with arrow keys, joystick,\nor WASD\n\nDo not touch chimneys or other pixpets".toUpperCase(), 10, 80, 14);
        }

    }

}

maingame = function() {

    //if made small screen through tab hiding it will be become small screen automatically

    if ((!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement && !document.webkitCurrentFullScreenElement)) {
        canvas.width = 528;
        canvas.height = 297;
        ws = canvas.width;
        hs = canvas.height;
    }

    if (canvas.width !== 528) {
        ws = (window.innerWidth && document.documentElement.clientWidth) ?
            Math.min(window.innerWidth, document.documentElement.clientWidth) :
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        hs = Math.floor(ws / (528 / 297));
        canvas.width = ws
        canvas.height = hs;
    }


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (pixpets[0].Health > 0 && !endgame) {
        seconds += 1 / 30;
    }

    //chimney is split into two parts to create a depth illusion and must be drawn before items and after items
    if (chimneyfound[2] == false || chimneyfound[1] < 300) {
        chimneyfound[0] -= 4;
        if (chimneyfound[2] == true) {
            chimneyfound[1] += 5
        }
        if (chimneyfound[0] < -100) {
            chimneyfound[2] = true
        }

        ctx.drawImage(gifload[13], 0, 0, gifload[13].width, 80, chimneyfound[0] * (hs / 297), chimneyfound[1] * (hs / 297), gifload[13].width / 3 * (hs / 297), 80 / 3 * (hs / 297));
    }

    if (pixpets[0].Health > 0) {
        for (loaditems = 0; loaditems < itemsmake.length; loaditems++) {
            itemsmake[loaditems].draw(loaditems);
        }
    }

    if (chimneyfound[2] == false || chimneyfound[1] < 300) {
        ctx.drawImage(gifload[13], 0, 80, gifload[13].width, gifload[13].height - 40, chimneyfound[0] * (hs / 297), (chimneyfound[1] + (80 / 3)) * (hs / 297), gifload[13].width / 3 * (hs / 297), (gifload[13].height - 80) / 3 * (hs / 297));
    }

    for (loadpixpets = 0; loadpixpets < pixpets.length; loadpixpets++) {
        pixpets[loadpixpets].draw(loadpixpets);
    }

    //if a key is still being pressed continue to move character
    if (keyup.length > 0) {

        for (multikey in keyup) {
            keydowncode(keyup[multikey])
        }

    }

    //header
    backgroundload();

    ctx.globalAlpha = 1;
    ctx.drawImage(gifload[0], 0, 0, (hs / 297) * 528, (hs / 297) * 50);
    ctx.drawImage(gifload[5], 220 * (hs / 297), 1 * (hs / 297), gifload[5].width / 5.5 * (hs / 297), gifload[5].height / 5.5 * (hs / 297));
    textmaker("DEAR DELIVERER", 280, 33.5, 20);

    //overload
    if (score > 99999) {
        score = 99999
    }
    
    textmaker("SCORE: " + (endgame ? "000" : score), 20, 33.5, 20);

    (collision(mousex, mousey, 0, 0, (hs / 297) * 485, (hs / 297) * 8, (hs / 297) * 30, (hs / 297) * 30)) ? ctx.globalAlpha = 1: ctx.globalAlpha = 0.85;
    ctx.drawImage((ws == 528) ? gifload[1] : gifload[2], (hs / 297) * 485, (hs / 297) * 8, (hs / 297) * 30, (hs / 297) * 30);

    if (collision(mousex, mousey, 0, 0, (hs / 297) * 485, (hs / 297) * 8, (hs / 297) * 30, (hs / 297) * 30) && mousedown) {
        fullscreencode();
    }

    if (!endgame && pixpets[0].Health > 0) {

        //Joystick button uses pythagoream theorem to make it more exact
        circlecollision(mousex, 27.5, mousey, 267.5, 22.5) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
        ctx.drawImage(gifload[6], 5 * (hs / 297), 245 * (hs / 297), 45 * (hs / 297), 45 * (hs / 297));
        ctx.drawImage(gifload[7], (ctx.globalAlpha == 1 && (!mouseup||mousedown)) ? mousex - 6.5 * (hs / 297) : 20 * (hs / 297), (ctx.globalAlpha == 1 && mouseup == false) ? mousey - 7.5 * (hs / 297) : 260 * (hs / 297), 15 * (hs / 297), 15 * (hs / 297));

        //Scaling applies here to match moving through keys as much as possible
        if (ctx.globalAlpha == 1 && (!mouseup||mousedown)) {
            pixpets[0].keyDown(0, [(mousex - 27.5 * (hs / 297)) / 1.5 / (hs / 297), (mousey - 267.5 * (hs / 297)) / 1.5 / (hs / 297)]);
        }

        ctx.globalAlpha = 1;
        skillbuttons(470, 245, 0);
    }

    if ((pixpets[0].Health <= 0&&pixpets[0].DeathAnimation == 2) || endgame) {
        endgamemake();
    } else {

        //code for lives goes here
        for (let livecount = 0; livecount < livestotal; livecount++) {
            ctx.globalAlpha = 1;
            ctx.drawImage(livecount + 1 <= pixpets[0].Health ? (pixpets[0].Invincibility > 0 ? gifload[16] : gifload[10]) : gifload[11], (10 + (livecount * 30)) * (hs / 297), 55 * (hs / 297), 19 * (hs / 297), 19 * (hs / 297));
        }

    }

    collision(mousex, mousey, 0, 0, 185 * (hs / 297), 2 * (hs / 297), 21 * (hs / 297), 21 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    if (ctx.globalAlpha == 1 && mousedown) {
        music.volume = (music.volume == 0.7 ? 0 : 0.7)
    }
    ctx.drawImage(music.volume == 0.7 ? gifload[18] : gifload[19], 185 * (hs / 297), 2 * (hs / 297), 21 * (hs / 297), 21 * (hs / 297));

    collision(mousex, mousey, 0, 0, 185 * (hs / 297), 25 * (hs / 297), 21 * (hs / 297), 21 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    if (ctx.globalAlpha == 1 && mousedown) {
        soundeffectvolume = (soundeffectvolume == 1 ? 0 : 1)
        for (let autopause = 0; autopause < sounds.length; autopause++) {
            if (sounds[autopause].pause) {
                sounds[autopause].volume = soundeffectvolume
            }
        }
    }
    ctx.drawImage(soundeffectvolume == 1 ? gifload[20] : gifload[21], 185 * (hs / 297), 25 * (hs / 297), 21 * (hs / 297), 21 * (hs / 297));

    mousedown = false;
}

//buttons, mouse moving, clicking
canvas.addEventListener("keydown", keydowncode);
canvas.addEventListener("keyup", keyupcode => keyup.splice(keyup.indexOf(event.keyCode), 1));
canvas.addEventListener("mousemove", mousemake);
canvas.addEventListener("touchmove", mobilemousemake);
canvas.addEventListener("mousedown", mousedowncheck);
canvas.addEventListener("mouseup", mouseupcheck => mouseup = true);

//game animation
setInterval(maingame, 1000 / 30);
