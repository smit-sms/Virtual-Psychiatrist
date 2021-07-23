from flask import jsonify, request
from flask_restful import Resource
import os, librosa, soundfile, pickle
import noisereduce as nr
import numpy as np

# Load the data and extract features
def load_recording(filename):
    x = []
    feature = extract_feature(filename ,mfcc = True, chroma = True, mel = True)
    x.append(feature)
    return np.array(x)

# loading model from pickle
model = pickle.load(open('./resources/speech_emotion/model_speech.pickle','rb'))

# API ENDPOINT ACCESS HERE
class SpeechSentiment(Resource):
    def post(self):  
        f = request.files['speech']        
        if f.filename != '':
            f.save(os.path.join('static', f.filename))
            prediction = load_recording("static/" + f.filename)
            res = model.predict(prediction)
            os.remove("./static/" + f.filename)
            return {'success': True, 'speech_sentiment': res[0]}
        else:
            return {'success': False, 'speech_sentiment': "False, some error occured."}