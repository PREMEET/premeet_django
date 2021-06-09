import Toggle from './result/Toggle.js';
import Dial from './result/Dial.js';
import Mention from './result/Mention.js';
new Toggle(root,'js-item','open');
const container = document.querySelector(".chart");

class App{
    constructor(){
		this.root = document.getElementById('root');
		this.finalData = {};
		this.setData();
		// this.update('result_data');
		this.score();
		this.mention();
    }
	score(){
		let score = document.getElementById('score');
		let score_value = document.querySelectorAll('.js-score');
		score_value[0].innerHTML = this.finalData['score'].score_gaze;
		score_value[1].innerHTML = this.finalData['score'].score_face;
		score_value[2].innerHTML = this.finalData['score'].score_habit;
		score_value[3].innerHTML = this.finalData['score'].score_speed; 
		const res_score = this.finalData['score'].score_face + this.finalData['score'].score_gaze + this.finalData['score'].score_speed + this.finalData['score'].score_habit;
		score.dataset.value = res_score;
		const dial = new Dial(container);
		dial.animateStart();
		const mention = document.querySelector('.js-score_mention');
		mention.style.display ="block";
		if(res_score > 80)
			mention.innerHTML = "훌륭합니다! 안 좋은 습관이 거의 없네요!"
		else{
			let temp1="";
			let temp2=25;
			console.log(score_value[0].dataset.text)
			if(temp2 > this.finalData['score'].score_gaze)
			{
				temp2 = this.finalData['score'].score_gaze;
				temp1 = score_value[0].dataset.text;
			}
			if(temp2 > this.finalData['score'].score_face)
			{
				temp2 = this.finalData['score'].score_face;
				temp1 = score_value[1].dataset.text;
			}
			if(temp2 > this.finalData['score'].score_habit)
			{
				temp2 = this.finalData['score'].score_habit;
				temp1 = score_value[2].dataset.text;
			}
			if(temp2 > this.finalData['score'].score_speed)
			{
				temp2 = this.finalData['score'].score_speed;
				temp1 = score_value[3].dataset.text;
			}
			mention.innerHTML = `"아쉬워요.. &nbsp;<span class="highlight">${temp1}</span> (을)를 신경써서 다시 도전!"`
		}
	}
	mention(){
		let list = this.root.querySelectorAll('.js-resContainer');
		for(let i =0; i<this.finalData['result'].length; i++)
			new Mention(list[i], this.finalData['result'][i]);
	}
	update(ENDPOINT){
		let id = window.location.pathname.split('/').reverse()[0];
		
		let url = `/${ENDPOINT}?id=${id}`
		let xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.responseType = 'json';
		xhr.send();
		xhr.onreadystatechange = (e) => {
			if (xhr.readyState == 4 && xhr.status == 200) {
				this.data = xhr.response.data;
			}
		}
	}
	setData(){
		let res = [];
		let sc = {
			score_gaze:0, 
			score_face:0, 
			score_habit:0, 
			score_speed:0,
		};

		const resContainer = this.root.querySelectorAll('.js-resContainer');
		resContainer.forEach((result)=>{
			let a = {
				voice_silence_percent:0,
				voice_speed:0,
				voice_habit_count:0,
				face_positive_percent:0,
				gaze_normal_percent:0,
			}

			const box = result.querySelectorAll('.js-resBox');
			const lens = box[0].querySelectorAll('.js-res');
			const voices = box[1].querySelectorAll('.js-res');
			const faces = box[2].querySelectorAll('.js-res');
			const gazes = box[3].querySelectorAll('.js-res');

			let voice_total = 0;
			let face_total = 0;
			let gaze_total = 0;
			let temp_habit = 100;
			lens.forEach((len)=>{
				const speed = ((60/Number(len.dataset.time))*Number(len.dataset.count)).toFixed(0);
				len.innerHTML = speed + '자';
				a.voice_speed = Number(speed);
				sc.score_speed += (Math.abs(a.voice_speed - 300))/10
				a.voice_silence_percent = (Number(len.dataset.silence)/Number(len.dataset.time))*100;
				if(a.voice_silence_percent > 20)
					temp_habit -= 20;
			});
			voices.forEach((voice)=>{voice_total = voice_total + Number(voice.dataset.time);});
			voices.forEach((voice)=>{
				if(voice.dataset.time > 0)
					voice.style.display="block";
				voice.style.height = ((Number(voice.dataset.time)/voice_total)*100).toFixed(0) + '%'
				voice.querySelector('.js-resCount').innerHTML=voice.dataset.time + '회';
				a.voice_habit_count += Number(voice.dataset.time);
				temp_habit -= (Number(voice.dataset.time))*10;
			});
			faces.forEach((face)=>{face_total = face_total + Number(face.dataset.time);});
			faces.forEach((face)=>{
				const face_percent = ((Number(face.dataset.time)/face_total)*100).toFixed(0);

				face.innerHTML = face_percent + '%'
				if(face.dataset.title === 'positive'){
					a.face_positive_percent = Number(face_percent);
					sc.score_face += Number(face_percent);
				}
			});
			gazes.forEach((gaze)=>{gaze_total = gaze_total + Number(gaze.dataset.time);});
			gazes.forEach((gaze)=>{
				const gaze_percent = ((Number(gaze.dataset.time)/gaze_total)*100).toFixed(0)
				gaze.innerHTML =  gaze_percent + '%'
				if(gaze.dataset.title === 'normal'){
					a.gaze_normal_percent = Number(gaze_percent);
					sc.score_gaze += Number(gaze_percent);
				}
			});
			res.push(a);
			if(temp_habit < 0)
				sc.score_habit += 0;
			else
				sc.score_habit += temp_habit;
		});
		this.finalData['result'] = res;
		
		sc.score_habit = Number(((sc.score_habit/this.finalData['result'].length)/4).toFixed(0));
		sc.score_speed = Number((((100-sc.score_speed)/this.finalData['result'].length)/4).toFixed(0));
		sc.score_face = Number(((sc.score_face/this.finalData['result'].length)/4).toFixed(0));
		sc.score_gaze = Number(((sc.score_gaze/this.finalData['result'].length)/4).toFixed(0));
		this.finalData['score'] = sc;
		console.log(this.finalData);
	}
}

window.onload = () => {
    new App();
};