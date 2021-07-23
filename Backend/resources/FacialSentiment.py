from flask import jsonify, request
from flask_restful import Resource
import os,cv2
import numpy as np
from keras.models import model_from_json
from keras.preprocessing import image

# Model & Classifier
model = model_from_json(open("./resources/facial_emotion/fer.json", "r").read())    
model.load_weights('./resources/facial_emotion/fer.h5')                             

def FacialOutput(imagename):
    Image = cv2.imread('./static/'+imagename)
    auto_result, alpha, beta = automatic_brightness_and_contrast(Image)
    cv2.imwrite('./static/auto_result.jpeg', auto_result)
    
    path           = './static/auto_result.jpeg'
    test_img       = cv2.imread(path)
    gray_img       = cv2.cvtColor(test_img, cv2.COLOR_BGR2GRAY)
    faces_detected = face_haar_cascade.detectMultiScale(gray_img, 1.32, 5)
    for (x,y,w,h) in faces_detected:
        cv2.rectangle(test_img,(x,y),(x+w,y+h),(255,0,0),thickness=7)
        roi_gray     = gray_img[y:y+w,x:x+h]
        roi_gray     = cv2.resize(roi_gray,(48,48))
        img_pixels   = image.img_to_array(roi_gray)
        img_pixels   = np.expand_dims(img_pixels, axis = 0)
        img_pixels  /= 255
        predictions  = model.predict(img_pixels)
        # find max indexed array
        max_index = np.argmax(predictions[0])
        emotions = ('angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral')
        predicted_emotion = emotions[max_index]
        return predicted_emotion

# API ENDPOINT ACCESS HERE
class FacialSentiment(Resource):
    def post(self): 
        f = request.files['image']        
        if f.filename != '':
            f.save(os.path.join('static', f.filename))
            result = FacialOutput(f.filename)
            os.remove("./static/" + f.filename)
            os.remove("./static/auto_result.jpeg")
            return {'success': True, 'facial_sentiment': result}
        else:
            return {'success': False, 'facial_sentiment': "False, some error occured."}