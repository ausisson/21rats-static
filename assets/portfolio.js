



var hoverEvent = (event) => {
	let el = event.target;
	el.removeEventListener("mouseleave",exitEvent);
	const animation = animate(el, {
		x:200
	});
	animation.then(()=> {
		console.log("made it hoverEvent")
		el.addEventListener("mouseleave",exitEvent)
	});
};

var fixHover = (el) => {
	return () => {
		const animation = animate(el, {
			x:0
		})
	}
};

var exitEvent = (event) => {
	let el = event.target;
	const animation = animate(el, {
		x:0
	});
};

document.addEventListener('DOMContentLoaded', () => {

	document.querySelectorAll(".portfolio-link").forEach(el => {
		el.addEventListener("mouseenter",hoverEvent);
		//el.addEventListener("mouseleave",exitEvent)
	});

});