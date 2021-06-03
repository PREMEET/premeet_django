from django.contrib import admin
from .models import *


# Register your models here.
class UserAdmin(admin.ModelAdmin):
	list_display = (
		'email', 
		'name',
		'password',
	)
class InterviewAdmin(admin.ModelAdmin):
	list_display = (
		'id',
		'created_at',
	)
	list_display_links = (
		'id',
		'created_at',
	)
class CategoryAdmin(admin.ModelAdmin):
	list_display = (
		'id', 
		'name',
	)
	list_display_links = (
		'id',
		'name',
	)
class SubcategoryAdmin(admin.ModelAdmin):
	list_display = (
		'id', 
		'name',
	)
	list_display_links = (
		'id',
		'name',
	)
class QuestionAdmin(admin.ModelAdmin):
	list_display = (
		'id', 
		'title',
	)
	list_display_links = (
		'id',
		'title',
	)
class ResultAdmin(admin.ModelAdmin):
	list_display = (
		'id', 
		'um_count',
		'geu_count',
		'eo_count',
	)

admin.site.register(User, UserAdmin)
admin.site.register(Interview, InterviewAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Sub_category, SubcategoryAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Result, ResultAdmin)