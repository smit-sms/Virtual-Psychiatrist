import sys
from resources.chatbot.user import User
from resources.chatbot.shrink import Shrink
from resources.chatbot.text import Text
import random

shrink= Shrink()
text = Text()
user = User()
ai = open('./resources/chatbot/ai.txt', 'r')
keywords = text.get_keywords(ai)
synonymes = open('./resources/chatbot/syno.txt', 'r')
syno = text.get_synonymes(synonymes)
ai.close()

if len(sys.argv) == 2:  
    test_file = open(sys.argv[1], 'a')
else:
    test_file = None
text.write_file(test_file, None, None)

# text_sentiment = str(input()) #text emotion
# face_sentiment = str(input()) #face emotion
def combinefunction(text_sentiment,face_sentiment):
    if text_sentiment == 'neutral' or text_sentiment == 'negative' and face_sentiment == 'disguist' or face_sentiment == 'anger' or face_sentiment ==  'sad' or face_sentiment == 'fear':
        return "I see you are sad"
    elif text_sentiment == 'neutral' or text_sentiment =='postive' and face_sentiment == 'happy' or face_sentiment=='neutral' or face_sentiment=='surprise':
        return "Seems you had fun"
    elif text_sentiment == 'neutral' or text_sentiment =='compound' and face_sentiment == 'neutral':
        return "Nothing great today day"
    elif text_sentiment == 'neutral' or text_sentiment == 'compound' and face_sentiment == 'happy' or face_sentiment=='surprise':
        return "You feel surprised"

def chatbot_final(message, text_sentiment, face_sentiment):
    while 1:
        if shrink.is_over(message) == True:
            input1 = user.read(message)
            shrink.response(input1, keywords, transformations, syno, user.get_input())
            text.write_file(test_file, None, shrink.get_response())
            break
        user.original_input(message)
        input1 = user.read(message)
        shrink.response(input1, keywords, transformations, syno, user.get_input())
        bot_response = shrink.get_response()
        extratext = combinefunction(text_sentiment,face_sentiment)
        # final_response = extratext + " | " + bot_response
        text.write_file(test_file, message, shrink.get_response())
        return bot_response