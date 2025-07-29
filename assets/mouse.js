


const ROTATEVAL = -27;
const YVAL = 480;
const XVAL = 725;
const MAXROTATE = 50;
const MINROTATE = -50;


const handleMouse = (event) => {

	const mouseCoords = getMouseCoords(event);
	const angle = getAngle(mouseCoords);

	animate(".arm",{
		rotate:angle
	})
	
}

const getMouseCoords = (event) =>{
	return {x: Math.round(event.clientX), y:Math.round(event.clientY)}
}

const getArmCoords = () => {
	const boundingRect = document.querySelector(".arm").getBoundingClientRect();
	return {x:Math.round(boundingRect.x), y:Math.round(boundingRect.y)}
}

const getAngle = (coords) => {
	const opp = coords.y - YVAL;
	const adj = (coords.x - XVAL) < 0 ? coords.x-XVAL : -1;
	let angle = (Math.atan2(opp,adj)*180/Math.PI) + 180;
	if (angle > 90) {
		angle = angle - 360;
	}
	angle = angle > MAXROTATE ? MAXROTATE : angle;
	angle = angle < MINROTATE ? MINROTATE : angle
	return angle - 27;

}

document.addEventListener("mousemove", handleMouse);



/*so, if i rotate the square -27 degrees, then the arm is in a straight line, 
	so the arm has a slope of 0, as the y value is unchanging

this basically means, that i need to find a way to calculate rotating the slope around the rotation

at default, the slope of the line will be -.5
so hypothetically, if the arm is rotated -54 degrees, the slope of the line will be .5?

did the math (shittily, but still did it, and this works out)

y value = 490



*/