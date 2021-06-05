from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.hashers import make_password,check_password
from .models import *
from django.http import HttpResponse, JsonResponse
import os
from pydub import AudioSegment
from pydub.utils import make_chunks

# Create your views here.
def home(request):
	return render(request, 'home.html')

def logout(request):
	try:
		del request.session['user']
	except KeyError:
		pass
	return redirect('home')

def gaze(request, itv_id):
	res_data = {}
	res_data['itv_id'] = itv_id
	try:
		interview = get_object_or_404(Interview, id=itv_id)
		results = Result.objects.filter(interview_id=interview)
		res_data['results'] = results
		res_data['result_num'] = len(results)
	except:
		redirect('home')
	return render(request, "gaze.html", res_data)

def temp(request):
	return render(request, "temp.html")

def result(request, itv_id):
	res_data = {}
	try:
		interview = get_object_or_404(Interview, id=itv_id)
		results = Result.objects.filter(interview_id=interview)
		res_data['results'] = results
	except:
		redirect('home')
	return render(request, "result.html", res_data)

def interview(request, itv_id):
	res_data = {}
	res_data['itv_id'] = itv_id
	return render(request, "interview.html", res_data)

def question(request):
	res_data = {}
	try:
		category = Category.objects.order_by('name')
		sub_category = Sub_category.objects.order_by('name')
		question = Question.objects.order_by('title')
		res_data['category'] = category
		res_data['sub_category'] = sub_category
		res_data['question'] = question
	except:
		return redirect('home')
	return render(request, 'question.html', res_data)


def signup(request):
	if request.method == 'GET':
		user_id = request.session.get('user')
		if user_id:
			return redirect('home')
		return render(request, 'signup.html')
	elif request.method == 'POST':
		name = request.POST.get('name', None)
		password = request.POST.get('password', None)
		email = request.POST.get('email', None)
		re_password = request.POST.get('re-password', None)
		res_data = {}
		if password != re_password:
			res_data['error'] = '비밀번호가 다릅니다.'
		else:
			user = User(
				name = name,
				email = email,
				password = make_password(password)
			)
			user.save()
			return redirect('signin')
		return render(request, 'signup.html', res_data)

def signin(request):
	if request.method == 'GET':
		user_id = request.session.get('user')
		if user_id:
			return redirect('home')
		return render(request, 'signin.html')
	elif request.method == 'POST':
		email = request.POST.get('email', None)
		password = request.POST.get('password', None)
		res_data = {}
		try:
			user = User.objects.get(email=email)
		except:
			res_data['error'] = '존재하지 않는 이메일입니다.'
			return render(request, 'signin.html', res_data)
		if check_password(password, user.password):
			request.session['user'] = user.id
			return redirect('home')
		else:
			res_data['error'] = '비밀번호가 틀렸습니다.'
		return render(request, 'signin.html', res_data)

def history(request):
	res_data = {}
	user_id = request.session.get('user')
	interviews = Interview.objects.filter(user_id=user_id).order_by('-created_at')
	res_data['interviews'] = interviews
	return render(request, "history.html", res_data)

def create_result(request):
	question_num = int(request.POST.get('question_num',None))
	if question_num > 0 :
		try:
			user = get_object_or_404(User, id=request.session.get('user'))
			itv = Interview(user_id = user)
			itv.save()
			for i in range(question_num):
				ques_id = request.POST.get(f'result{i}', None)
				ques = get_object_or_404(Question, id=ques_id)
				res = Result(
					interview_id = itv,
					question_id = ques
				)
				res.save()
		except:
			return redirect('home')
		return redirect('/interview/'+str(itv.id))
	return redirect('question')



##업로드비디오

def extract_audio(video_url):
	audioSegment = AudioSegment.from_file(video_url, 'webm')
	audio_url = video_url.replace('webm', 'wav').replace('video','voice')
	audioSegment.export(audio_url, format='wav')
	return audio_url

def upload_video(file, file_name):
	video_url = f"data/webm/{file_name}.webm"
	with open(video_url, 'wb+') as f:
		for chunk in file.chunks():
			f.write(chunk)
	return video_url
	
#비디오 업로드, 오디오 추출, 추출한 오디오 모델에 돌리기
def next_question(request, res_id):
	file_name = "video"+str(res_id)
	#비디오 업로드
	video_url = upload_video(request.FILES['file'], file_name)

	#오디오 추출
	audio_url = extract_audio(video_url)

	#추출한 오디오 모델에 돌리기(아직)

	#해당하는 result객체 가져와서 거기에 저장
	result = get_object_or_404(Result, id=res_id)
	result.video_url = video_url
	result.save()
	print(res_id)
	
	return HttpResponse(status=200)