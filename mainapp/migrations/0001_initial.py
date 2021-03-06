# Generated by Django 3.2.4 on 2021-06-08 05:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='카테고리명')),
            ],
            options={
                'verbose_name': '면접 카테고리',
                'verbose_name_plural': '면접 카테고리',
                'db_table': 'CATEGORY',
            },
        ),
        migrations.CreateModel(
            name='Interview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='등록시간')),
            ],
            options={
                'verbose_name': '면접',
                'verbose_name_plural': '면접',
                'db_table': 'INTERVIEW',
            },
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='면접 질문')),
            ],
            options={
                'verbose_name': '면접 질문',
                'verbose_name_plural': '면접 질문',
                'db_table': 'QUESTION',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=20, null=True, verbose_name='사용자명')),
                ('email', models.CharField(max_length=50, verbose_name='이메일')),
                ('password', models.CharField(max_length=50, verbose_name='비밀번호')),
            ],
            options={
                'verbose_name': '사용자',
                'verbose_name_plural': '사용자',
                'db_table': 'USER',
            },
        ),
        migrations.CreateModel(
            name='Sub_category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='서브 카테고리명')),
                ('category_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.category')),
            ],
            options={
                'verbose_name': '면접 서브카테고리',
                'verbose_name_plural': '면접 서브카테고리',
                'db_table': 'SUB_CATEGORY',
            },
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video_url', models.CharField(blank=True, max_length=200, null=True, verbose_name='영상 주소')),
                ('audio_length', models.IntegerField(default=0)),
                ('silence_time', models.IntegerField(default=0)),
                ('result_text', models.CharField(blank=True, max_length=2000, null=True, verbose_name='결과 멘트')),
                ('normal_time', models.IntegerField(default=0)),
                ('left_time', models.IntegerField(default=0)),
                ('right_time', models.IntegerField(default=0)),
                ('top_time', models.IntegerField(default=0)),
                ('bottom_time', models.IntegerField(default=0)),
                ('positive_time', models.IntegerField(default=0)),
                ('neutral_time', models.IntegerField(default=0)),
                ('um_count', models.IntegerField(default=0)),
                ('geu_count', models.IntegerField(default=0)),
                ('eo_count', models.IntegerField(default=0)),
                ('total_count', models.IntegerField(default=0)),
                ('interview_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='mainapp.interview')),
                ('question_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='mainapp.question')),
            ],
            options={
                'verbose_name': '결과',
                'verbose_name_plural': '결과',
                'db_table': 'RESULT',
            },
        ),
        migrations.AddField(
            model_name='question',
            name='subcategory_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.sub_category'),
        ),
        migrations.AddField(
            model_name='interview',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.user'),
        ),
    ]
