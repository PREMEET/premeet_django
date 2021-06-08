const resContainer = document.querySelectorAll('.js-resContainer');
const wrapper = document.querySelector('.js-wrapper');

class Toggle{
	constructor(container, itemCN, className){
		this.container = container;
		this.itemCN = itemCN;
		this.items = container.querySelectorAll('.'+itemCN);
		this.className = className;

		container.addEventListener('click',this.toggle.bind(this));
	}
	toggle(event){
		const targetCL = event.target.classList;
		const parentTargetCL = event.target.parentElement.classList;
		if(!targetCL.contains(this.itemCN)) return;
		parentTargetCL.toggle(this.className);
	}
}

function setData(){
	resContainer.forEach((result)=>{
		const box = result.querySelectorAll('.js-resBox');
		const lens = box[0].querySelectorAll('.js-res');
		const voices = box[1].querySelectorAll('.js-res');
		const faces = box[2].querySelectorAll('.js-res');
		const gazes = box[3].querySelectorAll('.js-res');

		let total_voice = 0;
		let total_face = 0;
		let total_gaze = 0;
		lens.forEach((len)=>{len.innerHTML = ((60/Number(len.dataset.time))*Number(len.dataset.count)).toFixed(0)+'자'});
		voices.forEach((voice)=>{total_voice = total_voice + Number(voice.dataset.time);});
		voices.forEach((voice)=>{
			if(voice.dataset.time > 0)
				voice.style.display="block";
			voice.style.height = ((Number(voice.dataset.time)/total_voice)*100).toFixed(0) + '%'
			voice.querySelector('.js-resCount').innerHTML=voice.dataset.time + '회';
		});
		faces.forEach((face)=>{total_face = total_face + Number(face.dataset.time);});
		faces.forEach((face)=>{face.innerHTML = ((Number(face.dataset.time)/total_face)*100).toFixed(0) + '%'});
		gazes.forEach((gaze)=>{total_gaze = total_gaze + Number(gaze.dataset.time);});
		gazes.forEach((gaze)=>{gaze.innerHTML = ((Number(gaze.dataset.time)/total_gaze)*100).toFixed(0) + '%'});
	});
}

window.onload = () => {	
	new Toggle(wrapper,'js-item','open');
	setData();
}