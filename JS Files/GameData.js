canvas = document.getElementById("Canvas-EvoIsland");
ctx = canvas.getContext("2d");

/**
0 is Header
1 is Full Screen Button
2 is Small Screen Button
3 is Ocean Tile
4 is Sand Tile
5 is Drax
6 is Canisqua
7 is Unicubb
8 is Troffinch
9 i Feliphene
10 is Switch Button
11 is Up Button
12 is Right Button
13 is Down Button
14 is Left Button
15 is Inventory Button
16 is Inventory Box
17 is Music On
18 is Music Off
19 is Sound Effects On
20 is Sound Effect Off
21 is Full Button
22 is Player Selected
23 is Veemooth
24 is Velibolt
25 is Velox
26 is Igupunk
27 is Iguzzle
28 is Owluck
29 is Indigoat
30 is Full Button Pressed
31 is Western Dragon Evobar
32 is Wolfdog Evobar
33 is Bear Evobar
34 is Tropical Bird Evobar
35 is Feline Evobar
36 is Bovine Evobar
37 is JP Evobar
38 is JP Second Evobar
39 is Iguana Evobar
40 is Iguana Second Evobar
41 is Owl Evobar
42 is Goat Evobar
**/

gifname = ["Gif Files/Header.gif","Gif Files/FullScreenButton.gif","Gif Files/SmallScreenButton.gif","Gif Files/OceanTile.gif","Gif Files/SandTile.gif","Gif Files/Drax.gif","Gif Files/Canisqua.gif","Gif Files/Unicubb.gif","Gif Files/Troffinch.gif","Gif Files/Feliphene.gif","Gif Files/SwitchButton.gif","Gif Files/UpButton.gif","Gif Files/RightButton.gif","Gif Files/DownButton.gif","Gif Files/LeftButton.gif","Gif Files/InventoryButton.gif","Gif Files/InventoryBox.gif","Gif Files/MusicOnButton.gif","Gif Files/MusicOffButton.gif","Gif Files/SoundEffectOnButton.gif","Gif Files/SoundEffectOffButton.gif","Gif Files/FullButton.gif","Gif Files/PlayerSelected.gif","Gif Files/Veemooth.gif","Gif Files/Velibolt.gif","Gif Files/Velox.gif","Gif Files/Igupunk.gif","Gif Files/Iguzzle.gif","Gif Files/Owluck.gif","Gif Files/Indigoat.gif","Gif Files/FullButtonPressed.gif","Gif Files/WesternDragonEvobar.gif","Gif Files/WolfdogEvobar.gif","Gif Files/BearEvobar.gif","Gif Files/TropicalBirdEvobar.gif","Gif Files/FelineEvobar.gif","Gif Files/BovineEvobar.gif","Gif Files/JPEvobar.gif","Gif Files/JPSecondEvobar.gif","Gif Files/IguanaEvobar.gif","Gif Files/IguanaSecondEvobar.gif","Gif Files/OwlEvobar.gif","Gif Files/GoatEvobar.gif"];
gifload = [];

preloadname = ["Png Files/Wooden_Raft.png","Png Files/Pixpet_Transporter.png","Png Files/PixeldustTrails.png","Png Files/Pixeldust_Boots.png","Png Files/Devolution_Fruit_Thermos_Bottle.png","Png Files/UnicubbSmallRight.png","Png Files/UnicubbSmallLeft.png","Png Files/UnicubbSmallFront.png","Png Files/UnicubbSmallBack.png","Png Files/TroffinchSmallRight.png","Png Files/TroffinchSmallLeft.png","Png Files/TroffinchSmallFront.png","Png Files/TroffinchSmallBack.png","Png Files/DraxSmallRight.png","Png Files/DraxSmallLeft.png","Png Files/DraxSmallFront.png","Png Files/DraxSmallBack.png","Png Files/FelipheneSmallRight.png","Png Files/FelipheneSmallLeft.png","Png Files/FelipheneSmallFront.png","Png Files/FelipheneSmallBack.png","Png Files/CanisquaSmallRight.png","Png Files/CanisquaSmallLeft.png","Png Files/CanisquaSmallFront.png","Png Files/CanisquaSmallBack.png","Png Files/AltudraxSmallLeft.png","Png Files/LuputrixSmallLeft.png","Png Files/UrsufuzzSmallLeft.png","Png Files/ParrogrineSmallLeft.png","Png Files/KyagrowlSmallLeft.png","Png Files/PentadileSmallBack.png","Png Files/PentadileSmallFront.png","Png Files/SawrotagSmallBack.png","Png Files/SawrotagSmallFront.png","Png Files/VeemoothSmallRight.png","Png Files/VeemootSmallLeft.png","Png Files/VeemoothSmallFront.png","Png Files/VeemoothSmallBack.png","Png Files/Potion_of_Gigantism.png","Png Files/VeliboltSmallRight.png","Png Files/VeliboltSmallLeft.png","Png Files/VeliboltSmallFront.png","Png Files/VeliboltSmallBack.png","Png Files/VeloxSmallRight.png","Png Files/VeloxSmallLeft.png","Png Files/VeloxSmallFront.png","Png Files/VeloxSmallBack.png","Png Files/IgupunkSmallRight.png","Png Files/IgupunkSmallLeft.png","Png Files/IgupunkSmallFront.png","Png Files/IgupunkSmallBack.png","Png Files/IguzzleSmallRight.png","Png Files/IguzzleSmallLeft.png","Png Files/IguzzleSmallFront.png","Png Files/IguzzleSmallBack.png","Png Files/OwluckSmallRight.png","Png Files/OwluckSmallLeft.png","Png Files/OwluckSmallFront.png","Png Files/OwluckSmallBack.png","Png Files/IndigoatSmallRight.png","Png Files/IndigoatSmallLeft.png","Png Files/IndigoatSmallFront.png","Png Files/IndigoatSmallBack.png","Png Files/BovitaurSmallLeft.png","Png Files/VelirexSmallLeft.png","Png Files/IguroarSmallLeft.png","Png Files/RoyowlSmallLeft.png","Png Files/ImprexSmallLeft.png"];
preload = [];

for(let loader = 0;loader < gifname.length;loader++){
gifload.push(new Image());
gifload[loader].src = gifname[loader];
}

for(let loader = 0;loader < preloadname.length;loader++){
preload.push(new Image());
preload[loader].src = preloadname[loader];
}

//Preload files are deleted once files are loaded
preload = [];

fullscreen = new Image();
fullscreen.src = "Gif Files/FullScreenButton.gif";


currentpixpet = 0;
selectanimation = 0;
selectloop = 0;
pixpets = [];
pixpets.push(new pixpet("Drax",3,5));

items = [];

completion = 0;

ws = canvas.width;
hs = canvas.height;
mousex = 0;
mousey = 0;
mousedown = false;
mouseup = true;
//^mouse up is solely used for click button animations

seconds = 0;
starttimer = false;

itemamount = true;
pixpetamount = 8;
timer = false;
timerbonus = 1;

//score is mainly used for animation
scoreanimation = seconds;
score = 0;
endgame = true;
difficultypage = true;

//dummy variables
PATS = 3;
prize = 0;

//music handler, intro >> main theme, main theme is preloaded
music = new Audio("Audio Files/EvoIslandMainTheme.ogg")
music = new Audio("Audio Files/EvoIslandIntro.ogg");
music.volume = 0.7;
music.loop = false;
music.play()

music.onended = function(){
    let keepvolume = music.volume; //makes the music keep its volume when resetting
    music.pause();
    music = new Audio("Audio Files/EvoIslandMainTheme.ogg")
    music.volume = keepvolume
    music.loop = true;
    music.play();
}

sounds = [0,0,0,0,0,0];
soundeffectvolume = 1;
soundsloop = 0;

tileload = 
    [ [1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
      [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
      [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
      [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
      [1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
      [1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
    ];  

tooltips = function(){    
    
//score keeper
if(timerbonus == 1||(timerbonus > 1&&timer > 0)){  

if(score < Math.ceil(((1000-scoreanimation*10)+(!itemamount ? 50 : 0))*(timerbonus)*(1+((pixpetamount-8)*0.1)))){

score += Math.ceil(((1000-scoreanimation*10)+(!itemamount ? 50 : 0))*(timerbonus)*(1+((pixpetamount-8)*0.1)))/30;
if(score >= Math.ceil(((1000-scoreanimation*10)+(!itemamount ? 50 : 0))*(timerbonus)*(1+((pixpetamount-8)*0.1)))){ score = Math.ceil(((1000-scoreanimation*10)+(!itemamount ? 50 : 0))*(timerbonus)*(1+((pixpetamount-8)*0.1))) }

} else { 
    
score = Math.ceil(((1000-scoreanimation*10)+(!itemamount ? 50 : 0))*(timerbonus)*(1+((pixpetamount-8)*0.1)));
if(score < 0) { score = 0 }
    
}
}
  
ctx.globalAlpha = 1;   
    
if(difficultypage){
textmaker("BRING ALL PIXPETS TO EVO ISLAND",265,70,15,true); 
textmaker("CHOOSE YOUR DIFFICULTY",265,100,25,true); 
} else if(timerbonus == 1||(timerbonus > 1&&timer > 0)) {  
textmaker("FINAL SCORE: "+Math.floor(score),260,125,25,true);
} else {
textmaker("YOUR TIME IS UP",260,125,25,true); 
}

    if(!difficultypage){
        
    if((score == Math.ceil(((1000-scoreanimation*10)+(!itemamount ? 50 : 0))*(timerbonus)*(1+((pixpetamount-8)*0.1)))||Math.ceil(((1000-scoreanimation*10)+(!itemamount ? 50 : 0))*(timerbonus)*(1+((pixpetamount-8)*0.1))) < 0)||(timerbonus > 1&&timer == 0)){
    collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),150*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    ctx.drawImage(!mouseup&&ctx.globalAlpha == 1 ? gifload[30] : gifload[21],(264-gifload[21].width/6)*(hs/297),150*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),150*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){ 
      difficultypage = true; 
      music.play();
      currentpixpet = 0;
      pixpets = [];
      pixpets.push(new pixpet("Drax",3,5));
      items = [];
      
      if(timerbonus == 1){
     timer = false;
     } else if(timerbonus == 1.25) {
     timer = 120;
     } else {
     timer = 60;
     }
        
    }
    textmaker("TRY AGAIN",265,173,12,true);
        
   if(timer !== 0){
        
   (collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),200*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&PATS > 0) ? ctx.globalAlpha = 1 : (PATS <= 0) ? ctx.globalAlpha = 0.5 : ctx.globalAlpha = 0.85;
    ctx.drawImage(!mouseup&&ctx.globalAlpha == 1 ? gifload[30] : gifload[21],(264-gifload[21].width/6)*(hs/297),200*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
   
     //Score sending goes here, can't send if timer is up
       if(collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),200*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown&&PATS > 0)
     {   
      difficultypage = true; 
      music.play();
      currentpixpet = 0;
      pixpets = [];
      pixpets.push(new pixpet("Drax",3,5));
      items = [];
      PATS -= 1;
      prize += score/250;
      
      if(timerbonus == 1){
      timer = false;
        } else if(timerbonus == 1.25) {
      timer = 120;
        } else {
      timer = 60;
      }
    
     } 
       
    textmaker("SEND SCORE",266,223,12,true); 
    } //end of end screen code
        
    }
        
    } else {
     
      collision(mousex,mousey,0,0,(144-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    ctx.drawImage(!mouseup&&ctx.globalAlpha == 1 ? gifload[30] : gifload[21],(144-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(144-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){ 
     
     if(timerbonus == 1){
     timerbonus = 1.25;
     timer = 120;
     } else if(timerbonus == 1.25) {
     timerbonus = 1.5;
     timer = 60;
     } else {
     timerbonus = 1;
     timer = false;
     }
        
    }
    textmaker((!timer) ? "TIMER: NONE" :"TIMER: "+((timerbonus == 1.5) ? "60" : "120")+"S",145,162,10,true);    
        
     collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    ctx.drawImage(!mouseup&&ctx.globalAlpha == 1 ? gifload[30] : gifload[21],(264-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){ 
        (itemamount) ? itemamount = false : itemamount = true;
    }
    textmaker("TOOLS: "+((itemamount) ? "ON" : "OFF"),265,162,10,true);    
    
       collision(mousex,mousey,0,0,(384-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    ctx.drawImage(!mouseup&&ctx.globalAlpha == 1 ? gifload[30] : gifload[21],(384-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(384-gifload[21].width/6)*(hs/297),140*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){ 
        pixpetamount += 2;
        if(pixpetamount > 12) { pixpetamount = 8 }
    }
    textmaker((pixpetamount == 8) ? "NORMAL" : (pixpetamount == 10) ? "HARD" : "EXTREME",386,162,10,true);         
        
   collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),210*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    ctx.drawImage(!mouseup&&ctx.globalAlpha == 1 ? gifload[30] : gifload[21],(264-gifload[21].width/6)*(hs/297),210*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297));
    if(collision(mousex,mousey,0,0,(264-gifload[21].width/6)*(hs/297),210*(hs/297),gifload[21].width/3*(hs/297),gifload[21].height/3*(hs/297))&&mousedown){ 
    startgame();
    }
    textmaker("PLAY",265,235,15,true);       
        
    }
   
ctx.globalAlpha = 1; 
 
}

mousemake = function(event, mousedown) {
  mousex = event.clientX - canvas.getBoundingClientRect().left;
  mousey = event.clientY - canvas.getBoundingClientRect().top;
}

mousedowncheck = function(){
 mousedown = true;
 mouseup = false;

 //music does not play unti clicked in some browsers
 if(music.volume == 0.7&&!(endgame&&!difficultypage)) { music.play() }

}

startgame = function(){

if(timerbonus == 1){
timer = false;
} else if(timerbonus == 1.25){
timer = 120;
} else {
timer = 60;
}
    
    
endgame = false;
difficultypage = false;
tileload = 
    [ [2,1,(pixpetamount > 10) ? 2 : 1,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [2,1,(pixpetamount > 8) ? 2 : 1,1,0,0,0,0,0,0,0,0,0,1,1,1],
      [2,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
      [2,1,2,1,0,0,0,0,0,0,0,0,0,1,1,1],
      [2,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1],
      [2,1,(pixpetamount > 8) ? 2 : 1,1,0,0,0,0,0,0,0,0,0,1,1,1],
      [2,1,(pixpetamount > 10) ? 2 : 1,0,0,0,0,0,0,0,0,0,0,0,1,1],
    ];    
seconds = 0;
score = 0;
starttimer = false;
pixpets = [];
items = [];
    
tilerandom = [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[2,3]]
pixpetnames = ["Drax","Canisqua","Unicubb","Troffinch","Feliphene","Veemooth","Velibolt","Velox","Igupunk","Iguzzle","Owluck","Indigoat"];    
    
if(pixpetamount >= 10) { tilerandom.push([2,1],[2,5]); } 
if(pixpetamount >= 12) { tilerandom.push([2,0],[2,6]); }  
      
for(let pixpetmake = 0;pixpetmake < pixpetamount;pixpetmake++){   
tilepicked = Math.floor(Math.random()*tilerandom.length);
pixpets.push(new pixpet(pixpetnames[0],tilerandom[tilepicked][0],tilerandom[tilepicked][1]));
tilerandom.splice(tilepicked,1);
pixpetnames.splice(0,1);   
}
   
pixpets.push(new pixpet("Pentadile",7,6));
pixpets.push(new pixpet("Pentadile",11,2));
    
if(pixpetamount >= 10){
pixpets.push(new pixpet("Pentadile",9,4));
}
    
if(pixpetamount == 12){
pixpets.push(new pixpet("Pentadile",5,0)); 
}    
    
selectloop = 0;
selectanimation = 0;
      
items.push(new item("Wooden_Raft",4,3));
raftlocator = items[items.length-1];

if(itemamount){   
  
itemnames = ["Pixeldust_Boots","Devolution_Fruit_Thermos_Bottle","Pixpet_Transporter", "Potion_of_Gigantism"];
itemstaken = 0; 
    
while(itemstaken < 2){
itemrandomizer = Math.floor(Math.random()*itemnames.length);
 
if(itemrandomizer == 0&&itemnames[itemrandomizer] !== "Taken"){
items.push(new item("Pixeldust_Boots",3,1));
itemnames[itemrandomizer] = "Taken"; 
itemstaken += 1;
} else if(itemrandomizer == 1&&itemnames[itemrandomizer] !== "Taken"){
items.push(new item("Pixpet_Transporter",3,4));
items.push(new item("Pixpet_Transporter",13,4));
itemnames[itemrandomizer] = "Taken";  
itemstaken += 1;
} else if(itemrandomizer == 2&&itemnames[itemrandomizer] !== "Taken") {
items.push(new item("Devolution_Fruit_Thermos_Bottle",3,5));
itemnames[itemrandomizer] = "Taken"; 
itemstaken += 1;
} else if(itemrandomizer == 3&&itemnames[itemrandomizer] !== "Taken") {
items.push(new item("Potion_of_Gigantism",3,2));
itemnames[itemrandomizer] = "Taken"; 
itemstaken += 1;
} 
    
} //while loop
    
}
    
}

//basic non-advanced collision
collision = function(x1, y1, w1, h1, x2, y2, w2, h2) {

  if (x1 <= x2 + w2 && x1 + w1 >= x2 && y1 <= y2 + h2 && y1 + h1 >= y2) {
    return true;
  } else {
    return false;
  }

}

//global sound effects to deal with multiple sound effects efficently
soundeffect = function(file){

  sounds[soundsloop] = new Audio(file);
  sounds[soundsloop].volume = soundeffectvolume;
  sounds[soundsloop].play();
  soundsloop += 1; 
  if(soundsloop > 5){
  soundsloop = 0;
  }
    
}

keydowncode = function(keyhandler=0){
 
//can only use hotkeys during gameplay
if(!endgame){  
    
  //switch hotkey
  if((event !== undefined&&event.keyCode == 81)||(event == undefined&&keyhandler == 81)){  
    
    currentpixpet += 1;    
    if(currentpixpet >= pixpetamount){
    currentpixpet = 0;
    }  
    selectanimation = 0;
    selectloop = 0;
    
  } else if((pixpets[currentpixpet].Held == -1&&pixpets[currentpixpet].RestartAni <= 0)||(pixpets[currentpixpet].Held !== -1&&pixpets[pixpets[currentpixpet].Held].RestartAni <= 0)) {
  
   //if a pixpet is stacked they 'control' their host's commands
   if(pixpets[currentpixpet].Held == -1){    
   pixpets[currentpixpet].keyDown(event == undefined ? keyhandler : event.keyCode);   
   } else {
   pixpets[pixpets[currentpixpet].Held].keyDown(event == undefined ? keyhandler : event.keyCode); 
   }
      
  }
     
}    
}

textmaker = function(text,x,y,size,sizeswitch=false){
   
if(sizeswitch){
ctx.font = "900 "+size*(hs/297)+"px SG12";
ctx.strokeStyle = "black";
ctx.lineWidth = (size/25)*4*(hs/297);
ctx.strokeText(text,x*(hs/297)-(ctx.measureText(text).width/1.95),y*(hs/297),ctx.measureText(text).width); 
ctx.fillStyle = "white";
ctx.fillText(text,x*(hs/297)-(ctx.measureText(text).width/1.95),y*(hs/297),ctx.measureText(text).width);  
} else {
ctx.font = "900 "+size*(hs/297)+"px SG12";
ctx.strokeStyle = "black";
ctx.lineWidth = (size/25)*4*(hs/297);
ctx.strokeText(text,x*(hs/297),y*(hs/297),ctx.measureText(text).width*(hs/297)); 
ctx.fillStyle = "white";
ctx.fillText(text,x*(hs/297),y*(hs/297),ctx.measureText(text).width*(hs/297));  
}
    
}

fullscreencode = function(){
    
 if(ws == 528){
    
   if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) { /* Firefox */
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) { /* IE/Edge */
    canvas.msRequestFullscreen();
  } 
    
//If both are supported choose the lesser, if not choose the one that is supported. This helps with mobile support
ws = (window.innerWidth && document.documentElement.clientWidth) ? 
Math.min(window.innerWidth, document.documentElement.clientWidth) : 
window.innerWidth || 
document.documentElement.clientWidth || 
document.body.clientWidth;
     
hs = Math.floor(ws/(528/297));
canvas.width = ws
canvas.height = hs;
fullscreen.src = "Gif Files/SmallScreenButton.gif";
mousedown = false;   
 } else {
   
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen(); 
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen(); 
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
  
     

ws = 528;
hs = 297;
canvas.width = 528;
canvas.height = 297;
fullscreen.src = "Gif Files/FullScreenButton.gif";
mousedown = false;
 }    
    
}

maingame = function(){
   
//if made small screen through tab hiding it will be become small screen automatically

if((!document.fullscreenElement&&!document.mozFullScreenElement&&!document.webkitFullscreenElement&&!document.msFullscreenElement&&!document.webkitCurrentFullScreenElement)){  
 canvas.width = 528;
 canvas.height = 297;
 ws = canvas.width;
 hs = canvas.height;
 fullscreen.src = "Gif Files/FullScreenButton.gif";
}
 
if(canvas.width !== 528){
ws =  (window.innerWidth && document.documentElement.clientWidth) ? 
Math.min(window.innerWidth, document.documentElement.clientWidth) : 
window.innerWidth || 
document.documentElement.clientWidth || 
document.body.clientWidth;
hs = Math.floor(ws/(528/297));
canvas.width = ws
canvas.height = hs;
}
    
    
ctx.clearRect(0,0,canvas.width,canvas.height);
    
    
//header
ctx.globalAlpha = 1;
ctx.drawImage(gifload[0],0,0,(hs/297)*528,(hs/297)*50);
    
(collision(mousex,mousey,0,0,(hs/297)*485,(hs/297)*8,(hs/297)*30,(hs/297)*30)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;    
ctx.drawImage(fullscreen,(hs/297)*485, (hs/297)*8, (hs/297)*30, (hs/297)*30);
    
if(collision(mousex,mousey,0,0,(hs/297)*485,(hs/297)*8,(hs/297)*30,(hs/297)*30)&&mousedown){
 fullscreencode();
}

ctx.globalAlpha = 1;     
    
//tile loader
for(let tileloady = 0;tileloady < 7;tileloady++){      
 for(let tileload = 0;tileload < 16;tileload++){
  ctx.drawImage(((tileload <= 2||tileload >= 14)||((tileloady >= 1&&tileloady <= 5)&&(tileload == 3||tileload == 13))) ? gifload[4] : gifload[3],(tileload*32+8)*(hs/297),((tileloady*32)+50)*(hs/297),32*(hs/297),32*(hs/297));
 
  if(!endgame){  
     
   //You can also control pixpets by clicking tiles
   if(collision(mousex,mousey,0,0,(tileload*32+8)*(hs/297),(tileloady*32+50)*(hs/297),32*(hs/297),32*(hs/297))&&mousedown&&tileloady == pixpets[currentpixpet].Y&&tileload-1 == pixpets[currentpixpet].X&&pixpets[currentpixpet].X < 15){
   keydowncode(39);
   } else if(collision(mousex,mousey,0,0,(tileload*32+8)*(hs/297),(tileloady*32+50)*(hs/297),32*(hs/297),32*(hs/297))&&mousedown&&tileloady == pixpets[currentpixpet].Y&&tileload+1 == pixpets[currentpixpet].X&&pixpets[currentpixpet].X > 0){
   keydowncode(37);
   } else if(collision(mousex,mousey,0,0,(tileload*32+8)*(hs/297),(tileloady*32+50)*(hs/297),32*(hs/297),32*(hs/297))&&mousedown&&tileloady+1 == pixpets[currentpixpet].Y&&tileload == pixpets[currentpixpet].X&&pixpets[currentpixpet].Y > 0){
   keydowncode(38); 
   } else if(collision(mousex,mousey,0,0,(tileload*32+8)*(hs/297),(tileloady*32+50)*(hs/297),32*(hs/297),32*(hs/297))&&mousedown&&tileloady-1 == pixpets[currentpixpet].Y&&tileload == pixpets[currentpixpet].X&&pixpets[currentpixpet].Y < 6&&!collision(mousex,mousey,0,0,45*(hs/297),255*(hs/297),64/3*(hs/297),36/3*(hs/297))){
   keydowncode(40);
   }
     
  }   
     
 }
}
      
textmaker("EVO ISLAND",300,33.5,25);  
    
if(timer !== false){   
  
if(endgame&&difficultypage){   
textmaker("TIMER: "+Math.floor(timer/60)+'"'+Math.floor(timer%60)+'"'+Math.floor((timer%1*100)),15,43,18); 
} else {
textmaker("TIMER: "+Math.floor(timer/60)+'"'+("0"+Math.floor(timer%60)).slice(-2)+'"'+("0"+Math.floor((timer%1*100))).slice(-2),15,43,18);
} 
    
if(!endgame&&starttimer){
timer -= (1/30);
    
if(timer <= 0){
timer = 0;
endgame = true;
difficultypage = false;
}

}
    
}   
    
if(endgame&&difficultypage){   
textmaker('TIME: 0"00"00',15,(timer!== false) ? 23 : 33,18); 
} else {
textmaker("TIME: "+Math.floor(seconds/60)+'"'+("0"+Math.floor(seconds%60)).slice(-2)+'"'+("0"+Math.floor(seconds%1*100)).slice(-2), 15, (timer!== false) ? 23 : 33,18); 
    
if(!endgame&&starttimer){
seconds += (1/30);
} 
   
}   
    
//load items then pixpets
for(let itemload = 0;itemload < items.length;itemload++){
items[itemload].draw();    
}    
    
//completion will update every tick in case of items being added/deleted during gameplay
completion = pixpetamount; 
    
for(let pixpetload = 0;pixpetload < pixpets.length;pixpetload++){
    
pixpets[pixpetload].draw(pixpetload);
  
if(pixpets[pixpetload].X > 12&&pixpets[pixpetload].sandtile()&&pixpets[pixpetload].Held == -1){
completion -= 1;
}
    
}
 
//pixpets that stack get priority
for(let pixpetload = 0;pixpetload < pixpets.length;pixpetload++){
if(pixpets[pixpetload].Held !== -1) { pixpets[pixpetload].information() } 
}
    
if(completion <= 0&&!endgame){
scoreanimation = seconds;
endgame = true;
difficultypage = false;
    
//All 5 pixpets get an evolution animation when a game is won
for(let quickani = 0;quickani < pixpetamount;quickani++){ pixpets[quickani].EvolutionAni = 20-quickani; }
    
music.pause();
soundeffect("Audio Files/EvoIslandEndJingle.wav");
}
    
ctx.globalAlpha = 1; 
    
if(!endgame){
    
ctx.drawImage(gifload[16],100*(hs/297),260*(hs/297),100/3*(hs/297),100/3*(hs/297));
    
//Item and pixpet information can both be activated at the same time
if(pixpets[currentpixpet].Inventory !== -1)
{ pixpets[currentpixpet].Inventory.information(pixpets.indexOf(pixpets[currentpixpet].Inventory)); } 
    
}
    
if(!endgame){   
    
    //up button drawer
    collision(mousex,mousey,0,0,45*(hs/297),255*(hs/297),64/3*(hs/297),36/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85; 
    ctx.drawImage(gifload[11],45*(hs/297),255*(hs/297),64/3*(hs/297),36/3*(hs/297));
    if(collision(mousex,mousey,0,0,45*(hs/297),255*(hs/297),64/3*(hs/297),36/3*(hs/297))&&mousedown){ keydowncode(38) }                                                                                              
    //down button drawer
    collision(mousex,mousey,0,0,45*(hs/297),281*(hs/297),64/3*(hs/297),36/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85; 
    ctx.drawImage(gifload[13],45*(hs/297),281*(hs/297),64/3*(hs/297),36/3*(hs/297));
    if(collision(mousex,mousey,0,0,45*(hs/297),281*(hs/297),64/3*(hs/297),36/3*(hs/297))&&mousedown){ keydowncode(40) }
    //left button drawer
    collision(mousex,mousey,0,0,30*(hs/297),263*(hs/297),36/3*(hs/297),64/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85; 
    ctx.drawImage(gifload[14],30*(hs/297),263*(hs/297),36/3*(hs/297),64/3*(hs/297));
    if(collision(mousex,mousey,0,0,30*(hs/297),263*(hs/297),36/3*(hs/297),64/3*(hs/297))&&mousedown){ keydowncode(37) }
    //right button drawer
    collision(mousex,mousey,0,0,69*(hs/297),263*(hs/297),36/3*(hs/297),64/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85; 
    ctx.drawImage(gifload[12],69*(hs/297),263*(hs/297),36/3*(hs/297),64/3*(hs/297));
    if(collision(mousex,mousey,0,0,69*(hs/297),263*(hs/297),36/3*(hs/297),64/3*(hs/297))&&mousedown){ keydowncode(39) }
    //inventory button drawer (E hotkey)
    collision(mousex,mousey,0,0,45*(hs/297),268*(hs/297),64/3*(hs/297),36/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85; 
    ctx.drawImage(gifload[15],45*(hs/297),268*(hs/297),64/3*(hs/297),36/3*(hs/297));
    if(collision(mousex,mousey,0,0,45*(hs/297),268*(hs/297),64/3*(hs/297),36/3*(hs/297))&&mousedown){ keydowncode(32); mousedown = false; } 
    
}
    
    //sound effects
    collision(mousex,mousey,0,0,495*(hs/297),238*(hs/297),64/3*(hs/297),64/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85; 
    ctx.drawImage((soundeffectvolume == 0) ? gifload[20] : gifload[19],495*(hs/297),238*(hs/297),64/3*(hs/297),64/3*(hs/297));
    if(collision(mousex,mousey,0,0,495*(hs/297),238*(hs/297),64/3*(hs/297),64/3*(hs/297))&&mousedown){ (soundeffectvolume == 0) ? soundeffectvolume = 1 : soundeffectvolume = 0; mousedown = false;} 
    
    //music
    collision(mousex,mousey,0,0,495*(hs/297),268*(hs/297),64/3*(hs/297),64/3*(hs/297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85; 
    ctx.drawImage((music.volume == 0) ? gifload[18] : gifload[17],495*(hs/297),268*(hs/297),64/3*(hs/297),64/3*(hs/297));
    if(collision(mousex,mousey,0,0,495*(hs/297),268*(hs/297),64/3*(hs/297),64/3*(hs/297))&&mousedown){ (music.volume == 0) ? music.volume = 0.7 : music.volume = 0; mousedown = false;} 
 
    //selected pixpet animation
    if(selectloop < 3&&!endgame){ 
    ctx.globalAlpha = 1;
    ctx.drawImage(gifload[22],(pixpets[currentpixpet].X*32+18)*(hs/297),(pixpets[currentpixpet].Y*32+30-selectanimation)*    (hs/297),gifload[22].width/3*(hs/297),gifload[22].height/3*(hs/297)); 
    
    if(selectloop < 3){       
    selectanimation += 0.25;
    if(selectanimation > 3){
    selectanimation = 0;
    selectloop += 1;
      }    
     }
    }    
    
if(endgame){
tooltips();
} 
    
mousedown = false;
    
//second overflow
if(seconds > 2500){
seconds = 2500;
}
    
}

//buttons, mouse moving, clicking
canvas.addEventListener("keydown", keydowncode);
canvas.addEventListener("mousemove", mousemake);
canvas.addEventListener("mousedown", mousedowncheck);
canvas.addEventListener("mouseup", mouseupcheck => mouseup = true);

//game animation
setInterval(maingame, 1000 / 30);
