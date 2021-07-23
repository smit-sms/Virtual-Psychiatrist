# Virtual Psychiatrist

This is an app which helps a user to deal with depression at a basic level by providing them
Cognitive - Behavioral Therapy i.e. CBT Therapy in order to overcome various psychological problems and guide them to
go take assistance by visiting an actual Psychologist. User can interact to a chatbot and can also track his
progress through the analysis provided inside the application.

### Project Structure is divided into 2 main Modules:

- #### Backend 
    Flask is used inorder to wrap all the ML Models. Follow the steps below to run the Backend Server.

    <details><summary><b>Show Steps</b></summary>
    
    1. Change the directory from root to `Backend` folder:

        ``` 
        $ cd Backend 
        ```

    2. Install all the required libraries from `requirements.txt` file:

        ```
        $ pip3 install -r requirements.txt 
        ```

    3. Once done with installation, run the below command to serve the flask server:

        ```
        $ python app.py
        ```
        It will take some time to serve since the tensorflow is loaded first time the server is started.
    4. Now, you can visit different urls specified in the `app.py` to view the backend.

</details>

- #### Frontend 
    React Native Framework is used to make mobile application frontend for both Android as well as iOS devices. Follow the steps below to run the Frontend.
    
    <details><summary><b>Show Steps</b></summary>
    
    1. Change the directory from root to `Frontend/Therapist` folder:

        ``` 
        $ cd Frontend/Therapist 
        ```

    2. Make sure Android-Studio and React-Native are properly set up before running the following command (for Android):

        ```
        $ react-native run-android 
        ```

    3. Now, the app will be visible in either emulator or the device connected as specified earlier in your own config.

</details>

## License
[MIT](https://github.com/smit-sms/Virtual-Psychiatrist/blob/master/LICENSE)