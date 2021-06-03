# Generated by Django 3.2 on 2021-05-18 08:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='result',
            name='bottom_time',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='result',
            name='left_time',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='result',
            name='negative_time',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='result',
            name='normal_time',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='result',
            name='positive_time',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='result',
            name='right_time',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='result',
            name='top_time',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='result',
            name='interview_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='mainapp.interview'),
        ),
    ]
