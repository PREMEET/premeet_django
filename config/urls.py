"""premeet URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings 
from django.conf.urls.static import static
import mainapp.views
import mainapp.question
import mainapp.voice

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',mainapp.views.home, name="home"),
    path('interview/<int:itv_id>',mainapp.views.interview, name="interview"),
    path('gaze/<int:itv_id>', mainapp.views.gaze, name="gaze"),
    path('result/<int:itv_id>', mainapp.views.result, name="result"),
    path('history', mainapp.views.history, name="history"),
    path('signin', mainapp.views.signin, name="signin"),
    path('signup', mainapp.views.signup, name="signup"),
    path('logout', mainapp.views.logout, name="logout"),
    path('question', mainapp.views.question, name="question"),
    path('temp', mainapp.views.temp, name="temp"),
    path('create_result', mainapp.views.create_result, name="create_result"),
    path('upload_video', mainapp.views.upload_video, name="upload_video"),
    path('add_all_data', mainapp.question.add_all_data, name="add_all_data"),
    # path('voice', mainapp.voice.main, name="voice"),
]

if settings.DEBUG: urlpatterns += static(settings.DATA_URL, document_root=settings.DATA_ROOT)