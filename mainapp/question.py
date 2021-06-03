from django.shortcuts import render, redirect, get_object_or_404
from .models import *
import os 

def read_file(file_path):
	f = open(f"{file_path}", 'r')
	lines = f.readlines()
	temp=[]
	for line in lines:
		temp.append(line.rstrip('\n'))
	f.close()
	return temp

def add_data(path, file):
	temp = file.rstrip('.txt')
	temp_list = temp.split('_')
	category_name = temp_list[0]
	subcategory_name = temp_list[1]
	ques_list = read_file(f"{path}{category_name}_{subcategory_name}.txt")
	try: 
		category = get_object_or_404(Category, name=category_name)
	except:
		category = Category(name=category_name)
		category.save()
	try:
		subcategory = get_object_or_404(Sub_category, name=subcategory_name)
	except:
		subcategory = Sub_category(
			category_id = category,
			name = subcategory_name
		)
		subcategory.save()
	for ques in ques_list:
		try:
			question = get_object_or_404(Question, title=ques)
		except:
			question = Question(
				subcategory_id = subcategory,
				title = ques
			)
			question.save()
	return redirect('home')

def add_all_data(request):
	path = "data/txt/"
	file_list = os.listdir(path)
	for file in file_list:
		add_data(path,file)
	return redirect('home')
