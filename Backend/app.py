import re, os
from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from collections import Counter
from resources import TextSentiment, FacialSentiment, SpeechSentiment
from resources.chatbot.chatbot import chatbot_final
import matplotlib.pyplot as plt

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///therapist.db'
app.secret_key = "therapistsecretkey"
db = SQLAlchemy(app)
api = Api(app, prefix='/api')

# USER MODEL
class User(db.Model): 
    id       = db.Column(db.Integer, primary_key=True)
    name     = db.Column(db.String(50))
    email    = db.Column(db.String(50))
    password = db.Column(db.String(255))

    def __repr__(self): 
        return '%d - %s - %s' % (self.id, self.name, self.email)

# ANALYSIS MODEL
class Analysis(db.Model):
    id            = db.Column(db.Integer, primary_key=True)
    email         = db.Column(db.String(50))
    s1            = db.Column(db.Text ,nullable=True)
    s2            = db.Column(db.Text, nullable=True)
    s3            = db.Column(db.Text, nullable=True)
    s4            = db.Column(db.Text, nullable=True)
    s5            = db.Column(db.Text, nullable=True)
    count_session = db.Column(db.Integer)
    
# CHAT MODEL
class Chat(db.Model):
    id        = db.Column(db.Integer, primary_key = True)
    user_id   = db.Column(db.Integer)
    is_user   = db.Column(db.Integer)
    message   = db.Column(db.Text)
    timestamp = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    
# REGISTERING USERS HERE
class RegisterResource(Resource): 
    def get(self): 
        users   = User.query.all()
        userobj = {}
        for u in users: 
            userobj[u.id] = {'name': u.name, 'email': u.email, 'password': u.password}
        return jsonify({"success":'true', "users": userobj})

    def post(self): 
        user = User(
            name     = request.json['name'],
            email    = request.json['email'],
            password = request.json['password']
        )
        analysis = Analysis(
            email = request.json['email'],
            count_session = 0
        )
        userobj = User.query.filter_by(email = user.email).first()
        if userobj:
            return jsonify({"success": "False", "message": "An account with this email already exists!"})
        else:
            db.session.add(user)
            db.session.add(analysis)
            db.session.commit()
            session['user'] = user.email
            return jsonify({"success": "True", "message": "Successfully registered & logged in!"})
    
# LOGIN
class LoginResource(Resource):    
    def post(self): 
        email    = request.json['email']
        password = request.json['password']
        userobj  = User.query.filter_by(email = email, password = password).first()
        if userobj:
            session['user'] = userobj.email
            return jsonify({"success": "True", "message": "Logged In"})
        else: 
            return jsonify({"success": "False", "message": "Email or Password incorrect"})
    
# LOGOUT HERE
class LogoutResource(Resource):
    def post(self):
        email = request.json['email']
        if "user" in session:
            if email == session['user']:                
                session.pop('user', None)
                return jsonify({"success": "True", "message": "Logged out"}) 
            return jsonify({"success": "False", "message": "Not logged in!"}) 
        return jsonify({"success": "False", "message": "Not logged in!"}) 

# USER PROFILE
class ProfileResource(Resource):
    def get(self):
        if "user" in session:
            userobj  = User.query.filter_by(email = session['user']).first()
            if userobj:
                user = {'name': userobj.name, 'email': userobj.email}
                return jsonify({"success": "True", "user": user})
            else:
                return jsonify({"success": "False", "message": "User Not Found!"})        
        return jsonify({"success": "False", "message": "Not logged in!"})
    
# EXTARCT DIFFERENT EMOTIONS AND CLUB THEM TOGETHER
def extract_emotions(emotions):  
    if emotions is not None:  
        items = re.split(r'[,;]', emotions)
        items = list(filter(None, items))
        items = dict(Counter(items))
        return items
    else:
        return ""

# RADAR CHART
def radarchart(items, userid, name):
    if items != "":
        path = "static/" + str(userid) + name +".png"
        categories, values = [], []
        for item in items:
            categories.append(item.capitalize())
            values.append(items[item])
        pi = 3.14
        fig = plt.figure(figsize=(6,6))
        ax = plt.subplot(polar="True")

        N = len(categories)
        values += values[:1]
        angles = [n/float(N) * 2 * pi for n in range(N)]
        angles += angles[:1]

        #ploting
        plt.polar(angles,values, marker = '.', color ='#5CA08E')
        plt.fill(angles, values, alpha = 0.4,  facecolor = "#5CA08E", linewidth = 2, linestyle = 'solid')

        plt.xticks(angles[:-1], categories, color = '#5CA08E', rotation = 45)
        ax.set_rlabel_position(0)
        ax.xaxis.grid(True, color = '#BFBEBE')
        ax.spines['polar'].set_color('#BFBEBE')
        plt.yticks([20,40,60,80],color = '#5CA08E', size = 10)
        plt.ylim(0, 80)
        plt.savefig("./" + path , format = "png", transparent = "True")
        # plt.show()
        return request.host_url + path
    else:
        return request.host_url + 'static/static.png'

# ANALYSIS
class AnalysisResource(Resource):
    def get(self):
        if "user" in session:
            analyzed = Analysis.query.filter_by(email = session['user']).first()
            user     = User.query.filter_by(email = session['user']).first()   
            
            items1 = extract_emotions(analyzed.s1)
            items2 = extract_emotions(analyzed.s2)
            items3 = extract_emotions(analyzed.s3)
            items4 = extract_emotions(analyzed.s4)
            items5 = extract_emotions(analyzed.s5)
            
            analysis = [
                {
                    "id": 1,
                    "session": radarchart(items1, user.id, "s1")
                },
                {
                    "id": 2,
                    "session": radarchart(items2, user.id, "s2")
                },
                {
                    "id": 3,
                    "session": radarchart(items3, user.id, "s3")
                },
                {
                    "id": 4,
                    "session": radarchart(items4, user.id, "s4")
                },
                {
                    "id": 5,
                    "session": radarchart(items5, user.id, "s5")
                },
            ]
            
            return jsonify({"success": "True", "analysis": analysis})
        return jsonify({"success": "False", "message": "Not logged in!"})
    
# NO. OF SESSIONS COMPLETED
class SessionResource(Resource):
    def post(self):
        if "user" in session:
            user_obj = Analysis.query.filter_by(email = session['user']).first()
            if user_obj.count_session == 5:
                pass    
            else:
                setattr(user_obj, 'count_session', user_obj.count_session+1)
                db.session.commit()
            return jsonify({"success": "True", "message": "Successfully updated session count"})
        return jsonify({"success": "False", "message": "Not logged in!"})        
        
    def get(self):
        if "user" in session:
            count_sessions = Analysis.query.filter_by(email = session['user']).first().count_session
            return jsonify({"success": "True", "sessions_attended": count_sessions})
        return jsonify({"success": "False", "message": "Not logged in!"})             

# SAVE ANALYSIS OF A PARTICULAR MESSAGE IN A SESSION
def save_analysis(text_sentiment, facial_sentiment):
    user_analysis = Analysis.query.filter_by(email = session['user']).first()
    
    session_count = user_analysis.count_session
    if session_count == 1:
        pre_emotion = user_analysis.s1
    elif session_count == 2:
        pre_emotion = user_analysis.s2
    elif session_count == 3:
        pre_emotion = user_analysis.s3
    elif session_count == 4:
        pre_emotion = user_analysis.s4
    else:
        pre_emotion = user_analysis.s5                                
    
    if pre_emotion is None:
        pre_emotion = ''
    
    emotion = pre_emotion + facial_sentiment + ',' + text_sentiment + ';'            
    setattr(user_analysis, 's'+str(session_count), emotion)        
    db.session.commit()

# CHATBOT
class Chatbot(Resource):
    def get(self):
        if "user" in session:
            user_id = User.query.filter_by(email = session['user']).first().id
            user_messages = Chat.query.filter_by(user_id = user_id).all()
            chat = []
            for msg in user_messages:
                chat.append({
                    "id": msg.id,
                    "is_user": msg.is_user,
                    "message": msg.message,
                    "timestamp": msg.timestamp                     
                })
            
            return jsonify({"success": "True", "chat": chat})
        return jsonify({"success": "False", "message": "Not logged in!"})    
        
    def post(self):
        if "user" in session:
            user_obj = User.query.filter_by(email = session['user']).first()
            
            is_user    = request.form['is_user']
            message    = request.form['message']
            image_file = request.files['image']
            
            if image_file.filename != '':
                image_file.save(os.path.join('static', image_file.filename))
                # FACIAL EMOTION HERE
                facial_sentiment = FacialSentiment.FacialOutput(image_file.filename)
                os.remove("./static/" + image_file.filename)
                os.remove("./static/auto_result.jpeg")
                if facial_sentiment is None:
                    facial_sentiment = "neutral"
            else:
                facial_sentiment = "neutral"
            
            # VADER SENTIMENT HERE
            score = TextSentiment.sentiment_analyzer_scores(message)
            text_sentiment = TextSentiment.sentiment_string(score)
                        
            # SAVING ANALYSIS
            save_analysis(text_sentiment, facial_sentiment)
            
            # GET MAIN Q/A Model Response Here.
            response = chatbot_final(message, text_sentiment, facial_sentiment)
            
            main_chat = Chat(
                user_id = user_obj.id,
                is_user = 0,
                message = response
            )
            
            user_chat = Chat(
                user_id = user_obj.id,
                is_user = is_user,
                message = message
            )
            db.session.add_all([user_chat, main_chat])
            db.session.commit()
            
            return jsonify({"success": "True", "message": response})
        return jsonify({"success": "False", "message": "Not logged in!"})        

# CLEARING THE USER CHAT AFTER A SESSION
class ClearChat(Resource):
    def post(self):
        if "user" in session:
            user_id = User.query.filter_by(email = session['user']).first().id
            Chat.query.filter_by(user_id = user_id).delete()
            # print(user_messages)
            db.session.commit()
            return jsonify({"success": "True", "message": "Successfully deleted the session chats"})
        return jsonify({"success": "False", "message": "Not logged in!"})    
    
    
api.add_resource(LoginResource, '/user/login')
api.add_resource(RegisterResource, '/user/register')
api.add_resource(LogoutResource,'/user/logout')

api.add_resource(ProfileResource, '/user/profile')
api.add_resource(AnalysisResource, '/user/analysis')
api.add_resource(SessionResource, '/user/session')

api.add_resource(ClearChat, '/user/clearchat')

api.add_resource(Chatbot, '/chatbot')

# MODEL ENDPOINTS 
api.add_resource(TextSentiment.TextSentiment, "/text")
api.add_resource(FacialSentiment.FacialSentiment, "/facial")
api.add_resource(SpeechSentiment.SpeechSentiment, "/speech")

@app.route('/')
def home():
 	return "Server is Live!"

if __name__ == '__main__':
    app.run(debug = True)