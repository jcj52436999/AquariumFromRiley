paper.install(window);
paper.setup('myCanvas');
view.onFrame = function (event){};
var screenW = view.size.width;
var screenH = view.size.height;
var fishList = [];
var bubbleList = [];





var leftFishImages = [
    "http://www.foothills.net/siteadmin/ui/unify/plugins/layer-slider/examples/sliderimages/med-fish-close.png",
    "http://ian.umces.edu/imagelibrary/albums/userpics/10043/normal_ian-symbol-acanthurus-lineatus.png"
];

var rightFishImages = [
    "http://s3.postimg.org/gvrywakeb/balik_3_11.png",
    "http://www.outworldz.com/Sculpts/cgi/files/textures-under-the-sea/textures-under%20the%20sea/fish-tropical%20yellow.png",
    "http://orig08.deviantart.net/392e/f/2010/139/5/1/tropical_fish_7_by_it_s.png",
    "http://i769.photobucket.com/albums/xx333/MrPoolsClosed/Tropical-Fish.png"
];

var random = function(min, max) {
    var num = Math.floor((Math.random() * (max + 1 - min) + min));
    return num;
};
var randomDecimal = function(min, max) {
    var num = (Math.random() * (max - min) + min);
    return num;
};

/*
//Sarah's bubble
var makeBubble = function(fillColor) {
    var bubble = new Path.Circle({
        center: new Point(random(0, screenW), random(0, screenH)),
        radius: random(5, 40),
        strokeColor: '#FFF',
        fillColor: fillColor
    });
    return {
        item: bubble,
        speed: randomDecimal(0.5, 4)
    };
};
makeBubble('red');
*/

// a list of bubble colors
var blue = ["#001c23", "#1a3e51", "#3b7784", "#759da3", "#e3ede7"];
var green = ["#96c120", "#d9e2c0", "#d3e5a2", "#434738", "#89995d"];
var pink = ["#f7edf0", "#f4cbc6", "#f4afab", "#e26d5a", "#ef7674"];
var grayscale = ["#000000", "#b2b2b2", "#a5a5a5", "#ffffff", "#d8d8d8"];
var colorList = [blue, green, pink, grayscale];



//creates a function to make the bubble 
var makeBubble = function(xLoc, yLoc, bubRadius, colorPick) {
	var bubble = new Path.Circle(new Point(xLoc, yLoc), bubRadius);
//	var bubbleColor = colorChoice;
	bubble.fillColor = colorPick;

	return {
		item: bubble,
		speed: randomDecimal(0.5, 4)
	};
};


//function for generating random bubbles
var addBubble = function(numBubble) {
	for (var i = 0; i < numBubble; ++i) {
	var myBubble = makeBubble(random(0, screenW), random(0, screenH), random(5, 30), colorPick[random(0,4)]);
	bubbleList.push(myBubble);
	 console.log(bubbleList);
	}
};


// calls the function to make a bubble
/*
var bubbleAmount = 200;
for (i=0;i<bubbleAmount; i++) {
	addBubble(1);
}
*/
// makes the bubble float
var moveBubble = function(bubble) {
	bubble.item.position.y -= bubble.speed;
	if ( bubble.item.position.y < -100) {
		bubble.item.position.y = screenH + 100;
	}
};




var makeFish = function(x, y, imageURL, speed, scaleFactor) {
    var raster = new Raster({
        source: imageURL,
        position: [x, y]
    });
    raster.scale(scaleFactor);
    return {
        item: raster, 
        speed: speed
    };
};

var addFish = function(numFish) {
    numFish = Math.round(numFish / 2);
    for (var i = 0; i < numFish; ++i) {
        //make a left moving fish and add it to the array:
        var x = random(0, screenW);
        var y = random(0, screenH);
        var url = leftFishImages[random(0, leftFishImages.length)];
        var fish = makeFish(x, y, url, -1 * randomDecimal(1, 6), randomDecimal(0.1, 0.2));
        fishList.push(fish);
        
        //make a right moving fish and add it to the array:
        x = random(0, screenW);
        y = random(0, screenH);
        url = rightFishImages[random(0, leftFishImages.length)];
        fish = makeFish(x, y, url, randomDecimal(1, 6), randomDecimal(0.1, 0.2));
        fishList.push(fish);
    }
//    console.log(fishList);
};
//  more
var moveFish = function (fish) {
    fish.item.position.x += fish.speed;
    if (fish.item.position.x < -100 ) {
        fish.item.position.x = screenW + 100;
    }
    if (fish.item.position.x > screenW + 100) {
        fish.item.position.x = -100;
    }
};

//call the addFish function and pass 
//in the number of fish you would like to generate
//as an argument
//var fishAmount = 20;
//addFish(fishAmount);

var bubbleAmount;
//function takes in user input
var sendColor = function() {
	project.activeLayer.removeChildren();
	paper.view.draw();
	var blue = ["#001c23", "#1a3e51", "#3b7784", "#759da3", "#e3ede7"];
	var green = ["#96c120", "#d9e2c0", "#d3e5a2", "#434738", "#89995d"];
	var pink = ["#f7edf0", "#f4cbc6", "#f4afab", "#e26d5a", "#ef7674"];
	var grayscale = ["#000000", "#b2b2b2", "#a5a5a5", "#ffffff", "#d8d8d8"];
	var colorList = [blue, green, pink, grayscale];
	

//gets the number of fish  
	var g = document.getElementById("fishNumber");
	var fishAmount = g.value;
	console.log(fishAmount);

//gets the number of bubbles
	var f = document.getElementById("bubbleNumber");
	bubbleAmount = f.value;
	console.log(bubbleAmount);
  
//gets the bubble color
	var e = document.getElementById("colorPick");
	var colorChoice = e.options[e.selectedIndex].value;
	console.log(colorChoice);
	
	if (colorChoice == "blue") {

		colorPick = colorList[0];

	} else if (colorChoice == "green") {

		colorPick = colorList[1];

	} else if (colorChoice == "pink") {

		colorPick = colorList[2];

	} else if ( colorChoice == "gray") {

		colorPick = colorList[3];
	};

	console.log("user selected: " + colorPick);

	for (i=0;i<bubbleAmount; i++) {
		addBubble(1);
	}
	addFish(fishAmount);

};

view.onFrame = function (event) {
    // make a for loop that moves all 20 of the fish
    // in the fishList array
    for (i = 0; i < fishList.length; i++) {
        moveFish(fishList[i]);
    }

	for (k = 0; k < bubbleList.length; k++) {
		moveBubble(bubbleList[k]);
	}
};

view.draw();

