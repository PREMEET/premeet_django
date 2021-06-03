# 실행 방법

### 1.python 설치

<br><br>

### 2.프로젝트 클론

```shell
$ git clone https://github.com/PREMEET/premeet_django.git premeet

$ cd premeet
```

### 3.가상환경 생성 및 실행

```shell
$ python -m venv myvenv

$ source myvenv/Scripts/activate
```

### 4.프로젝트에 필요한 패키지 설치

```shell
$ pip install -r requirements.txt
```

### 5.데이터베이스 생성 및 서버 실행

```shell
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver
```
