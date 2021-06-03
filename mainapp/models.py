# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class User(models.Model):
    name = models.CharField(max_length=20, blank=True, null=True, verbose_name='사용자명')
    email = models.CharField(max_length=50, verbose_name='이메일')
    password = models.CharField(max_length=50, verbose_name='비밀번호')
    class Meta:
        db_table = 'USER'
        verbose_name = '사용자'
        verbose_name_plural = '사용자'
    def __str__(self):
        return self.email

class Interview(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='등록시간')
    class Meta:
        db_table = 'INTERVIEW'
        verbose_name = '면접'
        verbose_name_plural = '면접'

class Category(models.Model):
    name = models.CharField(max_length=50, verbose_name='카테고리명')
    class Meta:
        db_table = 'CATEGORY'
        verbose_name = '면접 카테고리'
        verbose_name_plural = '면접 카테고리'
    def __str__(self):
        return self.name

class Sub_category(models.Model):
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, verbose_name='서브 카테고리명')
    class Meta:
        db_table = 'SUB_CATEGORY'
        verbose_name = '면접 서브카테고리'
        verbose_name_plural = '면접 서브카테고리'
    def __str__(self):
        return self.name
    
class Question(models.Model):
    subcategory_id = models.ForeignKey(Sub_category, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, verbose_name='면접 질문')
    class Meta:
        db_table = 'QUESTION'
        verbose_name = '면접 질문'
        verbose_name_plural = '면접 질문'
    def __str__(self):
        return self.title

class Result(models.Model):
    interview_id = models.ForeignKey(Interview, on_delete=models.CASCADE, null=True)
    question_id = models.ForeignKey(Question, on_delete=models.SET_NULL, null=True, blank=True)
    video_url = models.CharField(max_length=200, verbose_name='영상 주소', null=True, blank=True)
    eye_tracking_image_url = models.CharField(max_length=200, verbose_name='이미지 주소', null=True, blank=True)
    result_text = models.CharField(max_length=2000, verbose_name='결과 멘트', null=True, blank=True)
    left_time = models.IntegerField(default=0)
    right_time = models.IntegerField(default=0)
    top_time = models.IntegerField(default=0)
    bottom_time = models.IntegerField(default=0)
    positive_time = models.IntegerField(default=0)
    normal_time = models.IntegerField(default=0)
    negative_time = models.IntegerField(default=0)
    um_count = models.IntegerField(default=0)
    geu_count = models.IntegerField(default=0)
    eo_count = models.IntegerField(default=0)
    class Meta:
        db_table = 'RESULT'
        verbose_name = '결과'
        verbose_name_plural = '결과'


