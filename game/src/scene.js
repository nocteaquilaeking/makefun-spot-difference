export const differences = [
 ['sun','Sun size',463,76,29,'resized'],['cloud','Little cloud',284,65,28,'missing'],['bird','Third seabird',359,133,19,'extra'],['flag','Lighthouse pennant',119,89,24,'flipped'],['stripe','Lighthouse stripe',116,247,29,'color'],['window','Keeper window',116,190,15,'missing'],['roof','Coral rooftop',315,285,30,'color'],['door','Blue house door',398,340,17,'color'],['chimney','House chimney',343,260,16,'missing'],['sail','Sailboat emblem',235,350,16,'extra'],['buoy','Floating buoy',347,427,17,'moved'],['porthole','Boat porthole',456,393,16,'missing'],['palm','Palm coconut',532,250,16,'missing'],['star','Starfish on the shore',97,506,20,'extra'],['rope','Pier rope coil',436,493,20,'resized'],['lamp','Pier lantern',378,444,17,'color']
].map(([id,label,x,y,radius,change])=>({id,label,x,y,radius,change}));
export function drawScene(c,active=new Set()) {
 const has=id=>active.has(id);
 const path=(points,fill,stroke,width=2)=>{c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));if(fill){c.closePath();c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke()}};
 const ellipse=(x,y,rx,ry,color)=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=color;c.fill()};
 const rect=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(x,y,w,h)};
 const line=(p,col,w=2)=>path(p,null,col,w);
 let sky=c.createLinearGradient(0,0,0,340);sky.addColorStop(0,'#eab58d');sky.addColorStop(1,'#ffe2aa');rect(0,0,600,560,sky);
 ellipse(463,76,has('sun')?21:30,has('sun')?21:30,'#fff0bc');
 function cloud(x,y,s){ellipse(x,y,38*s,8*s,'#fff0d0');ellipse(x-12*s,y-6*s,18*s,12*s,'#fff0d0');ellipse(x+13*s,y-4*s,21*s,10*s,'#fff0d0')}
 cloud(76,67,1.2);cloud(385,42,.65);if(!has('cloud'))cloud(284,65,.7);cloud(510,159,.8);
 path([[0,269],[65,218],[99,238],[166,194],[226,236],[277,223],[350,264],[412,229],[475,251],[535,218],[600,250],[600,335],[0,335]],'#a8b7a3');
 path([[0,294],[79,252],[149,279],[210,253],[289,290],[379,262],[450,282],[523,257],[600,280],[600,340],[0,340]],'#7eaaa0');
 let sea=c.createLinearGradient(0,290,0,560);sea.addColorStop(0,'#72b7b0');sea.addColorStop(1,'#287e88');rect(0,298,600,262,sea);
 for(let i=0;i<55;i++){let x=(i*137+23)%600,y=311+(i*43)%226;line([[x,y],[x+12+i%4*5,y]],i%3?'#a8d3bd77':'#f5ddac99',1.5)}
 path([[0,358],[42,332],[173,321],[271,337],[388,326],[485,339],[600,325],[600,371],[0,389]],'#526f69');
 // Lighthouse island and stone path.
 path([[16,354],[58,319],[151,315],[198,341],[180,366],[21,375]],'#92977a');
 path([[82,322],[95,156],[137,156],[151,326]],'#f7e6bf','#385c60',2);
 path([[88,240],[144,240],[147,270],[86,270]],has('stripe')?'#739d8d':'#ca7960');
 rect(89,148,54,14,'#35555c');rect(95,124,42,24,'#ffe4a1');for(let x=97;x<139;x+=13)rect(x,124,3,24,'#49666a');
 path([[87,123],[116,104],[145,123]],'#3b6166');line([[116,104],[116,82]],'#3b6166',3);
 path(has('flag')?[[116,83],[97,89],[116,96]]:[[116,83],[138,89],[116,96]],'#c56f54');
 if(!has('window')){ellipse(116,190,7,10,'#355b65');line([[116,180],[116,200]],'#f4d4a3',2)}
 path([[107,326],[107,302],[124,302],[124,326]],'#426c70');
 for(let y=280;y<320;y+=12)line([[90,y],[100,y]],'#b5ad8c',1);
 function bird(x,y){c.beginPath();c.moveTo(x-10,y);c.quadraticCurveTo(x-3,y-7,x,y);c.quadraticCurveTo(x+4,y-7,x+11,y);c.strokeStyle='#44696b';c.lineWidth=2;c.stroke()}
 bird(320,112);bird(389,109);if(has('bird'))bird(359,133);bird(181,88);
 function house(x,y,w,h,col,roof){rect(x,y,w,h,col);path([[x-7,y],[x+w/2,y-27],[x+w+7,y]],roof,'#725e52',1.5);rect(x+9,y+15,12,18,'#456e70');rect(x+w-23,y+15,12,18,'#456e70');line([[x+15,y+15],[x+15,y+33]],'#efd8aa');rect(x+w/2-6,y+h-24,13,24,'#6c877b')}
 house(266,291,81,65,'#edcda0',has('roof')?'#708c83':'#be755e');if(!has('chimney'))rect(337,250,12,23,'#d0b18c');
 house(359,304,75,58,'#99b8ac','#586e6a');rect(391,326,14,36,has('door')?'#b97856':'#386574');
 house(446,286,58,67,'#e7b786','#a46555');
 for(let x=270;x<500;x+=17){line([[x,365],[x,376]],'#3c625e',3)}line([[263,368],[510,368]],'#c5b58b',4);
 // Sailboat with stitched cream canvas.
 line([[220,304],[220,398]],'#49646a',3);path([[216,308],[171,372],[216,372]],'#fff0c6','#c0b68f',1);path([[226,321],[258,372],[226,372]],'#e9c994','#b09d79',1);line([[211,325],[184,366]],'#dbccb0',1);
 if(has('sail')){path([[235,340],[242,350],[235,359],[229,350]],'#b57d59')}
 path([[164,382],[269,382],[252,400],[187,400]],'#a95f4e','#4b6863',2);rect(178,380,80,5,'#f1d3a0');line([[191,405],[255,405]],'#b6d5bb',2);
 // Moored fishing boat.
 path([[406,380],[510,380],[494,410],[427,410]],'#e0ad72','#365e64',2);path([[416,395],[501,395],[494,410],[427,410]],'#476d75');rect(439,356,38,24,'#e9dab5');rect(445,360,23,12,'#4d7f85');line([[460,354],[460,329]],'#486c70',3);path([[460,329],[479,333],[460,339]],'#c5795b');if(!has('porthole'))ellipse(456,393,5,5,'#f8e7b9');
 let by=has('buoy')?441:427;ellipse(347,by+8,12,3,'#346d74');ellipse(347,by,6,9,'#d78861');rect(341,by-2,12,4,'#f2dfb5');
 // Sweeping foreground beach.
 path([[0,432],[36,448],[76,462],[147,470],[210,494],[282,530],[330,560],[0,560]],'#e4bd89');path([[0,425],[40,444],[84,457],[150,465],[216,490],[286,527]],null,'#e8e3b7',5);
 for(let i=0;i<32;i++)ellipse((i*47)%230,480+(i*19)%80,1.4,.8,'#ba976e');
 if(has('star')){let pts=[];for(let i=0;i<10;i++){let a=i*Math.PI/5-Math.PI/2,r=i%2?5:13;pts.push([97+Math.cos(a)*r,506+Math.sin(a)*r])}path(pts,'#b87556')}
 // Wooden jetty, with planks, pilings and a lantern.
 path([[600,443],[405,443],[331,560],[600,560]],'#a7825d','#526a62',2);
 for(let i=0;i<10;i++){let y=450+i*13;line([[400-(y-443)*.64,y],[600,y]],'#715e49',2)}
 for(let x=423;x<600;x+=43)line([[x,445],[x-24,560]],'#bd9970',1);
 for(let [x,y] of [[408,448],[358,532],[563,448]]){rect(x-5,y-15,10,40,'#5c6653');ellipse(x,y-15,7,4,'#c2aa7a');line([[x-3,y+2],[x+3,y+2]],'#d6bf8a',3)}
 line([[408,433],[358,517]],'#e6d0a0',3);
 let rr=has('rope')?15:9;c.strokeStyle='#e0c28c';c.lineWidth=3;for(let i=0;i<3;i++){c.beginPath();c.ellipse(436,493,rr-i*2,5-i,0,0,7);c.stroke()}
 line([[378,444],[378,409]],'#3f5b59',3);rect(370,420,16,21,'#3c5b5d');rect(373,423,10,14,has('lamp')?'#a5c7bd':'#fbdc8b');path([[367,421],[378,412],[389,421]],'#3e5d5b');
 // Palm on the far shore.
 path([[543,363],[529,269],[536,267],[555,363]],'#9d8258');for(let y=281;y<360;y+=12)line([[534+(y-281)*.16,y],[541+(y-281)*.16,y-2]],'#6d7452',2);
 for(let [dx,dy] of [[-57,-12],[-45,17],[-22,-38],[27,-42],[58,-17],[51,13]]){c.beginPath();c.moveTo(533,267);c.quadraticCurveTo(533+dx*.55,267+dy-20,533+dx,267+dy);c.quadraticCurveTo(533+dx*.5,267+dy+3,533,267);c.fillStyle=dy>0?'#4f806b':'#5b8c70';c.fill()}
 if(!has('palm'))ellipse(532,250,6,7,'#876b4f');ellipse(540,264,6,7,'#95744d');
 // Beach grasses and shells.
 for(let x of [18,29,49,199,213]){line([[x,532],[x-7,510]],'#7b8a61',2);line([[x,532],[x+4,505]],'#7b8a61',2)}ellipse(144,520,6,3,'#f6ddb0');ellipse(165,536,4,2,'#f6ddb0');
}
