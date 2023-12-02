import joblib
import requests
import json
from PIL import Image
import os
import time
#54줄 파일 위치 수정 필요!!!!
def perform_task():
    # 여기에 원하는 작업 코드를 넣으세요
    city = "Busan"
    apikey = "a925fba4ba02e326018e5bac4fcaef54"
    lang = "kr"

    # OpenWeatherMap API를 통해 날씨 정보 가져오기
    api = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={apikey}&lang={lang}&units=metric"
    result = requests.get(api)

    # API 응답을 JSON으로 파싱
    data = json.loads(result.text)

    # 날씨 데이터 추출
    temp = data["main"]["temp"]
    wind = data["wind"]["speed"]
    high = data["main"]["temp_max"]
    # 비 정보 확인
    rain = data.get("rain", {}).get("1h", 0)
    # 저장된 모델 불러오기
    loaded_model = joblib.load("random_forest_model.joblib")
    # 새로운 데이터 생성
    new_data = [[temp, rain, high, wind]]

    # 새로운 데이터로 예측
    new_pred_rf = loaded_model.predict_proba(new_data)

    # 클래스 이름 확인
    unique_classes = loaded_model.classes_

    # 확률 출력
    max_prob_index = new_pred_rf.argmax()
    max_prob_class = unique_classes[max_prob_index]
    max_prob_value = new_pred_rf[0][max_prob_index] * 100

    # 예측 결과 출력
    for i, class_name in enumerate(unique_classes):
        print("{} 예측한 확률: {:.2f}%".format(class_name, new_pred_rf[0][i] * 100))
    print("==================================================")
    print("가장 높은 확률을 가진 클래스: {}, 확률: {:.2f}%".format(max_prob_class, max_prob_value))
    print("=" * 50)

    # 이미지 저장 경로
    source_path = 'imoticon/' + max_prob_class + '.jpg'
    ###수정 필요 부분
    destination_folder = 'D:/cap/src/main/frontend/src/components/images'
    ###수정 필요 부분
    # 이미지를 Pillow를 사용하여 저장
    if not os.path.exists(destination_folder):
        os.makedirs(destination_folder)

    destination_file_pillow_with_extension = os.path.join(destination_folder, 'recommend_food.jpg')
    image = Image.open(source_path)
    image.save(destination_file_pillow_with_extension)

    print('추천 메뉴 <{}> 이미지 전송 및 저장 완료'.format(max_prob_class))

# 2시간마다 반복
while True:
    perform_task()
    time.sleep(10*60*60)  # 2시간 단위
    #time.sleep(10)  # 테스트 위해 10초 간격으로 실행되게