



var exitEvent = (event) => {
	
	let parent = event.currentTarget;
	const id = parent.id;
	const elements = document.querySelectorAll(`.${id}`);
	elements.forEach((el) => {
		animate(el, {
			scale:1
		})
	});
	
}

var hoverEvent = (event) => {
	let parent = event.currentTarget;
	const id = parent.id;
	animate(`.${id}`, {
		scale:1.5,

	}, {type:"spring",stiffness:500,delay:stagger(.01)})
};


var clickEvent = (event) => {
	let parent = event.currentTarget;
	const w = window.innerWidth;
	const h = window.innerHeight;
	parent.removeEventListener("mouseover",hoverEvent);
	parent.removeEventListener("mouseleave",exitEvent);
	document.querySelectorAll(`.portfolio-link`).forEach((el)=> {
		if(el.id === parent.id){
			return;
		}
		animate(el,{
			opacity:0
		});
	})
	animate('.myname',{
		opacity:0
	})
	document.querySelectorAll(`.${parent.id}`).forEach((el)=> {
		const offset = getOffset(el);
		const xChange = getRandomNumber((-1*offset.left),(w - offset.left));
		const yChange = getRandomNumber((-1*offset.top),(h-offset.top));
		console.log(xChange);
		animate(el,{
			scale: 7,
			x: xChange,
			y: yChange
		},{type:"tween",ease:["anticipate","circOut"]})
		setTimeout((el)=> {
			animate(el,{
				scale: 370,
				x: w/2 - offset.left + getRandomNumber(1,100),
				y: h/2 - offset.top + getRandomNumber(1,100)
			},{type:"tween",ease:["anticipate","circOut"]})

		},750,el)
		setTimeout((el)=>{
			animate(el,{
				scale:0,
			}).then(()=>{location.href=`./${parent.id}.html`
			console.log(parent.id)})
		},1500,el)
	});
	
	//animation.then(()=> {})
	/*animation.then(()=> {
		document.querySelector(".portfolio").innerHTML = "<a href=\"https:\/\/youtube.com\/@21ratscounting\"> hello! </div>";
	});*/
}

function getRandomNumber (low, high) {
    let r = Math.floor(Math.random() * (high - low + 1) + low);
    return r;
}

function getOffset(el) {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left + window.scrollX,
		top: rect.top + window.scrollY
	};
}

const updateText = (el) => {
	let dataValue = el.id;
	let charString = el.innerHTML
		.split("")
		.map((letter) => {
			return `<span class="${dataValue}"> ${letter} </span>`
		}).join("");
	el.innerHTML = charString;
};


document.addEventListener('DOMContentLoaded', () => {

	document.querySelectorAll(".portfolio-link").forEach(el => {
		updateText(el);
		el.addEventListener("mouseover",hoverEvent);
		el.addEventListener("mousedown",clickEvent);
		el.addEventListener("mouseleave",exitEvent);

	});

});