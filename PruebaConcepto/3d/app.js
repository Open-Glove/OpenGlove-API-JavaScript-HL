/* Global vars */
var clock;
var frameDelta = 0;
var container, stats;
var renderer, camera, scene;
var mesh;
var group;
var quaternion;

var effectController;
var startingAngle = 0.01;
var minCloseAngle = 0.0;
var maxCloseAngle = 1.4;
var closeAngleStep = 0.025;

//2 points given to draw the palm of the hand
var handP1 = new THREE.Vector3( -100, -100, 10 );
var handP2 = new THREE.Vector3( 100, 100, -10 );

//2 points given to draw the fingers
var falangeP1 = new THREE.Vector3( 10, 30, 10 );
var falangeP2 = new THREE.Vector3( -10, 0, -10 );

//Objects Materials
var material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
var F1material = new THREE.MeshBasicMaterial({color: 0xFF0000});
var Falange1material = new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true});
var Falange2material = new THREE.MeshBasicMaterial({color: 0x0000FF, wireframe: true});
var Falange3material = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true});

var finger1Mesh;
var finger2Mesh;
var finger3Mesh;
var finger4Mesh;
var finger5Mesh;

var finger1Falange = new Array();
var finger2Falange = new Array();
var finger3Falange = new Array();
var finger4Falange = new Array();
var finger5Falange = new Array();


/* Code Execution */

//Show the FPS counter
FPSStats.showStats();

//Initialize the renderer, camera and scene
Setup.init();

//Render the objects to the scene
drawScene();

//Runs 60 times a second
animate();


/*
* Render the objects in the scene
*/
function drawScene(){
	group = new THREE.Object3D();

	group.position.set( 0,0,0 );

  group.rotation.order = "YXZ";

	//Draw the palm of the hand
	var handMesh = drawModel(handP1, handP2, material);

	//Draw the fingers and place them in the right positions
	finger1Falange[0] = drawModel(falangeP1, falangeP2, Falange1material);
	finger1Falange[1] = drawModel(falangeP1, falangeP2, Falange2material);
	finger1Falange[2] = drawModel(falangeP1, falangeP2, Falange3material);

	finger1Falange[0].position.x = -90;
	finger1Falange[0].position.y = 100;
	finger1Falange[0].position.z = 0;

	finger1Falange[1].position.x = 0;
	finger1Falange[1].position.y = 30;
	finger1Falange[1].position.z = 0;

	finger1Falange[2].position.x = 0;
	finger1Falange[2].position.y = 30;
	finger1Falange[2].position.z = 0;

	finger2Falange[0] = drawModel(falangeP1, falangeP2, Falange1material);
	finger2Falange[1] = drawModel(falangeP1, falangeP2, Falange2material);
	finger2Falange[2] = drawModel(falangeP1, falangeP2, Falange3material);

	finger2Falange[0].position.x = -30;
	finger2Falange[0].position.y = 100;
	finger2Falange[0].position.z = 0;

	finger2Falange[1].position.x = 0;
	finger2Falange[1].position.y = 30;
	finger2Falange[1].position.z = 0;

	finger2Falange[2].position.x = 0;
	finger2Falange[2].position.y = 30;
	finger2Falange[2].position.z = 0;

	finger3Falange[0] = drawModel(falangeP1, falangeP2, Falange1material);
	finger3Falange[1] = drawModel(falangeP1, falangeP2, Falange2material);
	finger3Falange[2] = drawModel(falangeP1, falangeP2, Falange3material);

	finger3Falange[0].position.x = 30;
	finger3Falange[0].position.y = 100;
	finger3Falange[0].position.z = 0;

	finger3Falange[1].position.x = 0;
	finger3Falange[1].position.y = 30;
	finger3Falange[1].position.z = 0;

	finger3Falange[2].position.x = 0;
	finger3Falange[2].position.y = 30;
	finger3Falange[2].position.z = 0;

	finger4Falange[0] = drawModel(falangeP1, falangeP2, Falange1material);
	finger4Falange[1] = drawModel(falangeP1, falangeP2, Falange2material);
	finger4Falange[2] = drawModel(falangeP1, falangeP2, Falange3material);

	finger4Falange[0].position.x = 90;
	finger4Falange[0].position.y = 100;
	finger4Falange[0].position.z = 0;

	finger4Falange[1].position.x = 0;
	finger4Falange[1].position.y = 30;
	finger4Falange[1].position.z = 0;

	finger4Falange[2].position.x = 0;
	finger4Falange[2].position.y = 30;
	finger4Falange[2].position.z = 0;

	finger5Falange[0] = drawModel(falangeP1, falangeP2, Falange1material);
	finger5Falange[1] = drawModel(falangeP1, falangeP2, Falange2material);
	finger5Falange[2] = drawModel(falangeP1, falangeP2, Falange3material);

	finger5Falange[0].position.x = -90;
	finger5Falange[0].position.y = -20;
	finger5Falange[0].position.z = 0;
	finger5Falange[0].rotation.z = 1;

	finger5Falange[1].position.x = 0;
	finger5Falange[1].position.y = 30;
	finger5Falange[1].position.z = 0;

	finger5Falange[2].position.x = 0;
	finger5Falange[2].position.y = 30;
	finger5Falange[2].position.z = 0;


	//creates the hierarchy
	group.add(handMesh);

	finger1Falange[1].add(finger1Falange[2]);
	finger1Falange[0].add(finger1Falange[1]);
	group.add(finger1Falange[0]);

	finger2Falange[1].add(finger2Falange[2]);
	finger2Falange[0].add(finger2Falange[1]);
	group.add(finger2Falange[0]);

	finger3Falange[1].add(finger3Falange[2]);
	finger3Falange[0].add(finger3Falange[1]);
	group.add(finger3Falange[0]);

	finger4Falange[1].add(finger4Falange[2]);
	finger4Falange[0].add(finger4Falange[1]);
	group.add(finger4Falange[0]);

	finger5Falange[1].add(finger5Falange[2]);
	finger5Falange[0].add(finger5Falange[1]);
	group.add(finger5Falange[0]);

	//add all the objects to the scene
	scene.add(group);
}

/*
* draw the cube
*/
function drawModel(p1, p2, material) {

	/*
		 f____g
		 /|  /|
	   b/_|_/_|h
		|e/ |c/
		|/__|/
		a   d
	*/


	var vertices = [
        new THREE.Vector3(p2.x,p2.y,p1.z),	//C
        new THREE.Vector3(p2.x,p2.y,p2.z),	//G
        new THREE.Vector3(p2.x,p1.y,p1.z),	//D
        new THREE.Vector3(p2.x,p1.y,p2.z),	//H
        new THREE.Vector3(p1.x,p2.y,p2.z),	//F
        new THREE.Vector3(p1.x,p2.y,p1.z),	//B
        new THREE.Vector3(p1.x,p1.y,p2.z),	//E
        new THREE.Vector3(p1.x,p1.y,p1.z)	//A
    ];

	var faces = [
        new THREE.Face3(0,2,1),
        new THREE.Face3(2,3,1),
        new THREE.Face3(4,6,5),
        new THREE.Face3(6,7,5),
        new THREE.Face3(4,5,1),
        new THREE.Face3(5,0,1),
        new THREE.Face3(7,6,2),
        new THREE.Face3(6,3,2),
        new THREE.Face3(5,7,0),
        new THREE.Face3(7,2,0),
        new THREE.Face3(1,3,4),
        new THREE.Face3(3,6,4)
	];

	var geometry = new THREE.Geometry();
	geometry.vertices = vertices;
	geometry.faces = faces;
	geometry.computeCentroids();
	geometry.mergeVertices();

	mesh = new THREE.Mesh(geometry, material);

	return mesh;
}

/*
* Animate the scene
*/

function transformFlexValue(value,in_min,in_max,out_min,out_max){
	new_value = ( (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min );
	if(new_value<0){
		return 0;
	}
	if(new_value>1.4){
		return 1.4;
	}
	return new_value;
}

function moveFinger(flex,value){

	switch(flex) {
	    case 0:
					finger5Falange[1].rotation.x = transformFlexValue(value,0,100,0,1.4);
					finger5Falange[2].rotation.x = transformFlexValue(value,0,100,0,1.4);
	        break;
	    case 1:
					finger1Falange[1].rotation.x = transformFlexValue(value,0,100,0,1.4);
					finger1Falange[2].rotation.x = transformFlexValue(value,0,100,0,1.4);
	        break;
			case 2:
					finger2Falange[1].rotation.x = transformFlexValue(value,0,100,0,1.4);
					finger2Falange[2].rotation.x = transformFlexValue(value,0,100,0,1.4);
	        break;
			case 3:
					finger3Falange[1].rotation.x = transformFlexValue(value,0,100,0,1.4);
					finger3Falange[2].rotation.x = transformFlexValue(value,0,100,0,1.4);
	        break
			case 4:
					finger4Falange[1].rotation.x = transformFlexValue(value,0,100,0,1.4);
					finger4Falange[2].rotation.x = transformFlexValue(value,0,100,0,1.4);
	        break;
	    case 5:
					finger5Falange[0].rotation.y = transformFlexValue(value,0,100,0,1.4);
	        break;
			case 6:
	        finger1Falange[0].rotation.x = transformFlexValue(value,0,100,0,1.4);
	        break;
			case 7:
					finger2Falange[0].rotation.x = transformFlexValue(value,0,100,0,1.4);
	        break;
	    case 8:
					finger3Falange[0].rotation.x = transformFlexValue(value,0,100,0,1.4);
	        break;
			case 9:
					finger4Falange[0].rotation.x = transformFlexValue(value,0,100,0,1.4);
	        break;
	}
	renderer.render( scene, camera );
}

var lastValueX = 0;
var	lastValueY=0;
var	lastValueZ=0;
var precision = 0.05;
var frameDelta2 = 0;

function rotateOpenGlove(GcX, GcY, GcZ){

	if(GcX<=lastValueX-precision || GcX>=lastValueX+precision){
			lastValueX=GcX;
	}
	if(GcY<=lastValueY-precision || GcY>=lastValueY+precision){
		lastValueY=GcY;
	}
	if(GcZ<=lastValueZ-precision || GcZ>=lastValueZ+precision){
		lastValueZ=GcZ;
	}
	group.quaternion.setFromEuler(new THREE.Euler(lastValueY, lastValueZ, 0,"ZYX"));
	renderer.render( scene, camera );
}

var GcXX=0;
var GcYY=0;
var GcZZ=0;

function rotateOpenGloveByGyro(GcX, GcY, GcZ){
	console.log(" "+GcX+ " "+GcY+" "+GcZ);
	
	if(GcX<-25){
		GcXX=GcXX-0.1;
		group.rotation.x=-GcXX;
		console.log(">>");
	}
	if(GcX>25){
		GcXX=GcXX+0.1;
		group.rotation.x=-GcXX;
		console.log("<<");
	}
	
	if(GcY<-25){
		GcYY=GcYY+0.1;
		group.rotation.y=GcYY;
		console.log(">>");
	}
	if(GcY>25){
		GcYY=GcYY-0.1;
		group.rotation.y=GcYY;
		console.log("<<");
	}	

/*	if(GcY<0.4){
		GcYY=GcYY+0.1;
		group.rotation.x=GcYY;
		console.log("UP");
	}
	if(GcY>-0.4){
		GcYY=GcYY-0.1;
		group.rotation.x=GcYY;
		console.log("DOWN");
	}*/
}

function animate() {
	requestAnimationFrame( animate );
	//


	//hand Rotation
	if(effectController.spin) {
		//group.rotation.y = frameDelta;
		//console.log(group.rotation.y);
	}

	//updates fps counter
	stats.update();

	//updates the scene
	renderer.render( scene, camera );
}

/*
* Creates the controls
*/
function setupGui() {

	effectController = {
		spin: false,
		finger1Phalanges0: startingAngle,
		finger1Phalanges1: startingAngle,
		finger1Phalanges2: startingAngle,
		finger2Phalanges0: startingAngle,
		finger2Phalanges1: startingAngle,
		finger2Phalanges2: startingAngle,
		finger3Phalanges0: startingAngle,
		finger3Phalanges1: startingAngle,
		finger3Phalanges2: startingAngle,
		finger4Phalanges0: startingAngle,
		finger4Phalanges1: startingAngle,
		finger4Phalanges2: startingAngle,
		finger5Phalanges0: startingAngle,
		finger5Phalanges1: startingAngle,
		finger5Phalanges2: startingAngle
	};

	var h;
	var gui = new dat.GUI();

	h = gui.addFolder( "Hand Rotation" );
	h.add( effectController, "spin" );

	h = gui.addFolder( "Finger 1 control" );
	h.add( effectController, "finger1Phalanges0", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 1");
	h.add( effectController, "finger1Phalanges1", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 2");
	h.add( effectController, "finger1Phalanges2", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 3");

	h = gui.addFolder( "Finger 2 control" );
	h.add( effectController, "finger2Phalanges0", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 1");
	h.add( effectController, "finger2Phalanges1", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 2");
	h.add( effectController, "finger2Phalanges2", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 3");

	h = gui.addFolder( "Finger 3 control" );
	h.add( effectController, "finger3Phalanges0", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 1");
	h.add( effectController, "finger3Phalanges1", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 2");
	h.add( effectController, "finger3Phalanges2", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 3");

	h = gui.addFolder( "Finger 4 control" );
	h.add( effectController, "finger4Phalanges0", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 1");
	h.add( effectController, "finger4Phalanges1", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 2");
	h.add( effectController, "finger4Phalanges2", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 3");

	h = gui.addFolder( "Finger 5 control" );
	h.add( effectController, "finger5Phalanges0", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 1");
	h.add( effectController, "finger5Phalanges1", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 2");
	h.add( effectController, "finger5Phalanges2", minCloseAngle, maxCloseAngle, closeAngleStep ).name("Phalanx 3");

}
