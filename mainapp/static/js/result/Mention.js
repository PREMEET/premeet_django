/*들어오는 객체의 display:block으로 바꾸고 innerText를 바꾼다.*/

export default class Mention{
	constructor(obj, data){
		this.mentions = obj.querySelectorAll('.js-mention');
		this.data = data;
		this.setData();
	}
	setData(){
		/*1. 영상분석 */
		if (!(this.data.voice_silence_percent <= 20))
			this.render(this.mentions[0],"답변 중 침묵시간이 너무 길어요.")
		
		/*2. 음성분석 */
		if (Math.abs(this.data.voice_speed - 300) > 100) {
			if (this.data.voice_speed - 300 < 0)
				this.render(this.mentions[1],"더 빠르고 정확하게 말하는 연습을 해봐요.")
			else
				this.render(this.mentions[1],"좀 더 차분하게 말해봅시다!")
		}
		else if (Math.abs(this.data.voice_speed - 300) > 50)
			this.render(this.mentions[1],"합격자들의 평균 말하기 속도는 1분당 300자 입니다.")
		
		if (!(this.data.voice_habit_count < 5))
			this.render(this.mentions[2],"말할때 특정 습관어가 많이 나오네요. 다음번엔 신경써서!");

		/*3. 표정분석 */
		if (this.data.face_positive_percent > 70) {
			this.render(this.mentions[3],"긍정적인 면접태도 좋습니다!");
		} else if (this.data.face_positive_percent > 30) {
			this.render(this.mentions[3],"밝은 표정으로 면접에 좋은 인상을 남겨주세요!");
		} else {
			this.render(this.mentions[3],"표정이 너무 굳었어요! 살짝만 웃어볼까요?");
		}
		/*4. 시선분석 */
		if (this.data.gaze_normal_percent > 50)
			this.render(this.mentions[4],"시선 처리가 좋습니다! 자신감이 느껴져요.");
		else
			this.render(this.mentions[4],"시선이 다른 곳에 치우쳐져 있어요. 집중!");
	}
	render(obj, text){
		obj.style.display = "block";
		obj.innerText = "\"" + text +"\"";
	}
}