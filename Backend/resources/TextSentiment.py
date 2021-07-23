from flask import jsonify
from flask_restful import Resource, reqparse
from resources.vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyser = SentimentIntensityAnalyzer()
# UPDATING THE VADER DICTIONARY WITH NEW WORDS ALONG WITH THEIR SCORES!
new_words = {
    'afraid': -1.0
}
analyser.lexicon.update(new_words)

sentiment_args = reqparse.RequestParser()
sentiment_args.add_argument("text",  type = str, help = "Text parameter missing.", required = True)

def sentiment_string(score):
    positive = float(score['pos'])
    negative = float(score['neg'])
    compound = float(score['compound'])
    neutral  = float(score['neu'])
    
    if positive > negative and positive > compound and positive > neutral:
        string = "positive"
        return string
    elif negative > positive and negative > compound and positive <= neutral:
        string = "negative"
        return string
    elif compound > positive and compound > negative and compound > neutral:
        string = "compound"
        return string
    elif neutral > positive and neutral > negative and neutral > compound:
        string = "neutral"
        return string
    else:
        string = "neutral"
        return string

def sentiment_analyzer_scores(sentence):
    score = analyser.polarity_scores(sentence)
    return score

# API ENDPOINT ACCESS HERE
class TextSentiment(Resource):    
    def post(self): 
        args  = sentiment_args.parse_args()
        score = sentiment_analyzer_scores(args['text'])
        finalOutput = sentiment_string(score)    # for printing out the analyzed o/p from scores
        return {'success': True, 'score': score, 'message': finalOutput}