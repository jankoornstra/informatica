window.onload = function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	// Dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	// Snowflakes
	var mp = 100; // Maximum number of snowflakes
	var particles = []; // Empty array of snowflakes. Let's fill it:
	for(var i = 0; i < mp; i++) {
		particles.push({
			x: Math.random()*W, 	// X-coordinate
			y: Math.random()*H, 	// Y-coordinate
			r: Math.random()*4+1, 	// Radius
			d: Math.random()*mp 	// Density
		})
	}
	
	// Draw snowflakes and text
	function draw()
	{
		ctx.clearRect(0, 0, W, H); 	// Basically the whole page
		
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Alpha is set to 80%. Will set this manually later for certain particles.
		
		// SNOWFLAKES
		
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill(); // Draw particles
		
		// TEXT
		
		var text = 'Merry Christmas!';
		var x = canvas.width / 3;
		var y = canvas.height / 3;
		ctx.font = '50pt Calibri';
		ctx.textAlign = 'center';
		ctx.fillStyle = 'white';
		ctx.fillText(text, x, y); // Draw text
		
		// UPDATE SCREEN
		update();
	}
	
	// Function to move the snowflakes
	// Angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	
	var angle = 0;
	
	function update() {
		angle += 0.01;
		for(var i = 0; i < mp; i++) {
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H) {
				if(i%3 > 0) {//66.67% of the flakes
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else {
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0) {
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else {
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}
	
	// MAIN ANIMATION LOOP
	setInterval(draw, 30); 	// Interval between frames; animation speed goes up for lower values. 
}

// This code has been taken from the interwebs, but I forgot where I stole it... Will google it later...