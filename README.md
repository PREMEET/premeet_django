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

### 5.음성 분석 모델 넣기

구글 공유드라이브에 있는 four.h5, res50_60_2.h5 내려받아서
data/model/ 폴더에 넣어두기

### 6.데이터베이스 생성 및 서버 실행

```shell
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver
```

### 7.질문 데이터 추가

url에 /add_all_data

