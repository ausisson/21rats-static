var delay = 300;

const coinFlip = () => {
	return Math.floor(Math.random() * 2) == 1 ? true : false;
}

function getRandomNumber (low, high) {
    let r = Math.floor(Math.random() * (high - low + 1) + low);
    return r;
}

function updateText(text,h1) {
	const h1Class = h1.classList;
	h1.innerHTML = text
	.split("")
	.map(letter => {
	  return `<span className="${h1Class}">` + letter + `</span>`;
	})
	.join("");
	const letterClass = "letter";
	Array.from(h1.children).forEach((span, index) => {
		span.classList.add(letterClass);
		let animatedClass = coinFlip() ? "wavy" : "wavy"
		span.classList.add(animatedClass);
		span.style.setProperty("--xA",getRandomNumber(-8,8) + "px");
		span.style.setProperty("--yA",getRandomNumber(-8,8) + "px");
		span.style.setProperty("--xB",getRandomNumber(-8,8) + "px");
		span.style.setProperty("--yB",getRandomNumber(-8,8) + "px");
		setTimeout(()=>{ changeLocation(span) },.5);
	});

}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

function changeLocation (event) {
	const span = event.target ? event.target : event;
	//const xC = span.style.getPropertyValue("--xB");
	//const yC = span.style.getPropertyValue("--yB");
	const xC = getRandomNumber(-8,8) + "px";
	const yC = getRandomNumber(-8,8) + "px";
	span.style.setProperty("--xC",yC);
	span.style.setProperty("--yC",yC);	
	return span;
}

function animateHover (element) {
	Array.from(element.children).forEach(( span ) => {
		const offset = getOffset(span);
		span.style.setProperty("--currentX",offset._x);
		span.style.setProperty("--currentY",offset._y);
		span.style.animationIterationCount = 1;
		span.style.animationDirection = "normal";
		span.style.animationDuration = ".25s";
		span.style.animationFillMode = "forwards";
		span.style.animationName = "reset";
	});
}

function reverseAnimation (element,handleNext) {
	let animationDuration = ".25s";
	Array.from(element.children).forEach(( span ) => {
		span.style.setProperty("--currentX",0);
		span.style.setProperty("--currentY",0);
		span.style.animationName = "reset-reverse";
		span.style.animationDuration = animationDuration;
	});
	handleNext(parseInt(animationDuration) * 1000);
}

document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.wavy').forEach(el => {

        el.addEventListener("mouseenter", (event) => {
			let h1 = event.target;
			animateHover(h1);
		});

        el.addEventListener("mouseleave", (event) => {
			const element = event.target;
			const handleNext = (time) => { 
				const value = element.dataset.value;
				const ele = element;
				setTimeout(() => {
					updateText( value , ele );
				},time)
			}
			reverseAnimation( element, handleNext );
		});
        
        updateText(el.dataset.value, el);

    })

})