function setup() {
	// Create the canvas
	noStroke()
	w = windowWidth
	h = windowHeight
	tanksize = h/20
	ground_heights=[]
	p1shot = createVector(-69420,-69420)
	p2shot = createVector(-69420,-69420)
	p1trail = []
	p2trail = []
	turn = 1
	FIRE = false;
	for(i=0; i<10; i=i+1)
	{
		ground_height = Math.random()*h*0.75
		ground_heights[i]=ground_height
	}
	createCanvas(w, h);
}

function draw()
{
	background(10,10,69);

	fill(240,240,240)
	circle(w/2,h/1.1,h*0.9)
	mh = h*0.01
	fill(69, 150, 69);
	rect(p1shot.x-mh/2,p1shot.y-mh/2,mh,mh)
	fill(150, 69, 69);
	rect(p2shot.x-mh/2,p2shot.y-mh/2,mh,mh)

	fill(69, 150, 69);
	for(t=0; t<p1trail.length; t++) {
		v=p1trail[t]
		rect(v.x-mh/2,v.y-mh/2,tanksize/5,tanksize/5)
	}
	fill(150, 69, 69);
	for(t=0; t<p2trail.length; t++) {
		v=p2trail[t]
		rect(v.x-mh/2,v.y-mh/2,tanksize/5,tanksize/5)
	}
	gr = 50
	gg = 20
	gb = 50
	// Set colors
	fill(gr, gg, gb);
	//map and tanks bro!
	for(i=0; i<10; i=i+1)
	{
		rect(i*w/10, h-ground_heights[i], w/10, ground_heights[i]);
		if(i==1)
		{
			push()
			fill(69, 150, 69);
			tank1p = createVector((i*w/10)+(w/10-tanksize)/2,h-tanksize-ground_heights[i])
			rect(tank1p.x, tank1p.y, tanksize,tanksize);
			pop()
		}
		if(i==8)
		{
			push()
			fill(150, 69, 69);
			tank2p = createVector ((i*w/10)+(w/10-tanksize)/2,h-tanksize-ground_heights[i])
			rect(tank2p.x, tank2p.y, tanksize,tanksize);
			pop()
		}
	}

	push()
	if(turn == 1){
		tankX = (w/10)+(w/10-tanksize)/2+tanksize/2
		tankY = h-tanksize-ground_heights[1]+tanksize/2
	}
	else{
		tankX = ((w/10)*8)+(w/10-tanksize)/2+tanksize/2
		tankY = h-tanksize-ground_heights[8]+tanksize/2
	}
	translate(tankX, tankY)
	rotate(Math.atan2(mouseY-tankY, mouseX-tankX)-Math.PI/2)
	fill(69, 69, 69);
	if(turn==1||turn==0){
		rect(-tanksize/8, 0, tanksize/4,tanksize*1.3);
	}
	pop()

	if(FIRE)
	{
		fps = 1
		if(turn == 1){
			fill(69, 150, 69);
			if(frameCount%fps==0){
				p1trail.push(createVector(missleP.x,missleP.y))
			}
		}
		else{
			fill(150, 69, 69);
			if(frameCount%fps==0){
				p2trail.push(createVector(missleP.x,missleP.y))
			}
		}
		rect(missleP.x-tanksize/10,missleP.y-tanksize/10, tanksize/5,tanksize/5);
		missleP.x = missleP.x + missleV.x
		missleP.y = missleP.y + missleV.y
		missleV.y = missleV.y + 0.07
		missleX = Math.floor(missleP.x/(w/10))
		if(missleP.y > h-ground_heights[missleX])
		{
			FIRE = false
			ground_heights[missleX] = ground_heights[missleX]-(h/10)
			if(ground_heights[missleX]<h/12){
				ground_heights[missleX] = h/12
			}
			turn = 1-turn
		}
		else if(missleP.x>w || missleP.x<0){
			turn = 1-turn
			FIRE = false
		}
		else if(turn==1){
			if(Math.abs(missleP.x - (tank2p.x+tanksize/2)) < tanksize/2 &&
			   Math.abs(missleP.y - (tank2p.y+tanksize/2)) < tanksize/2) {
				turn = 3
				FIRE = false
			}
		}
		else if(turn==0){
			if(Math.abs(missleP.x - (tank1p.x+tanksize/2)) < tanksize/2 &&
			   Math.abs(missleP.y - (tank1p.y+tanksize/2)) < tanksize/2) {
				turn = 4
				FIRE = false
			}
		}
	}
	if(turn == 1){
		fill(69, 150, 69);
		textsay = "player 1 turn"
	}
	else if(turn == 0){
		fill(150, 69, 69);
		textsay = "player 2 turn"
	}
	else if(turn == 3){
		fill(69, 150, 69);
		textsay = "player 1 wins get a life player 2"
	}
	else if(turn == 4){
		fill(150, 69, 69);
		textsay = "player 2 wins get a life player 1"
	}
	textsize = h/10
	textSize(textsize);
	text(textsay, w/2-textWidth(textsay)/2, textsize+(h/100));
}
function mouseClicked()
{
	if(!FIRE){
		if(turn==1||turn==0){
					missleP = createVector(tankX,tankY)
		missleV = createVector((mouseX-missleP.x)/80,(mouseY-missleP.y)/80)
		FIRE = true;
		if(turn == 1){
			p1trail = []
			p1shot.x = mouseX
			p1shot.y = mouseY
		}
		else{
			p2trail = []
			p2shot.x = mouseX
			p2shot.y = mouseY
		}
		}
	}
}
function windowResized() {
	w = windowWidth
	h = windowHeight
	resizeCanvas(w, h);
}