# Flextend: Software Report

Senior Design Project: Cross-Platform Mobile Application 
Boston University Department of Electrical and Computer Engineering
Authors: Jack Halberian, Carmen Hurtado, Thomas Scrivanich

## Project Description
The goals of this project were to:
- Design a self-administered electrical device to measure the range of motion of a user’s knee.
- Create a mobile cross-platform application that will automate user progress tracking and goal setting. 
- Develop a system that has an exceptional user experience for patients of any age or background.  

The electrical component includes an Arduino Nano IoT, 2 MPU6050 units, a buzzer, a 9V battery. Read more [Here](LINK TO HW README).

On the software side, we built a cross-platform mobile application powered by React Native. The backend database service is [Google Firebase](https://console.firebase.google.com/u/0/project/flextend-c4648/overview) (Keep in mind permissions are needed to collaborate). The appication communicates with the elctrical device via Bluetooth BLE on the Arduino nano IoT. 
The application allows the user to see measurement results instantly and save the data for progress vieweing later. It also allows for reminder and goal setting.  

## Set Up and Deployment 
The application is built using React Native. Follow the steps below to set up a developing environmet. Next, clone the repository with the application, install required modules, and run the application using Xcode or Android Studio. 

### iOS Specific
1. Install Node version >= 14 and Watchman `brew install node` `brew install watchman`
2. Install Xcode version >= 10 via the App Store.
3. Install Command Line Tools. Follow instructions [here](https://reactnative.dev/docs/environment-setup) under *Command Line Tools* 
4. Install CocoaPods `sudo gem install cocoapods`
5. Download iPhone simulators or run the app on your own device. 

### Android Specific
1. Install Node, Python2, and JDK onto Windows machine (Reccomendation: Use Chocolatey package manager, open terminal, and type: `choco install -y nodejs.install python2 openjdk8`)
2. Download and install Android Studio onto Windows machine
3. On Android Studio installation wizard, check Android SDK, Android SDK Platform, Android Virtual Device
4. On the Welcome Screen, download Android 10 (Q) for React Native applications by clicking "Configure" then "SDK Manager"
5. Configure Android Studio PATH on Windows. Referenced [Here](https://reactnative.dev/docs/0.60/enviroment-setup?msclkid=5f11a429c7cd11eca16de427e70756ea)
6. Download application from SD_Flextend repository onto local machine (Git Clone or Download zip file)
7. Navigate inside project folder using Windows Command Prompt
8. Run Metro JavaScript bundler by typing: npx react-native start
9. Run Flextend application by typing: npx react-native run-android

Note: For a virtual machine, additional steps are required. Referenced [Here](https://developer.android.com/studio/run/managing-avds)

<br />

Note: For a phyical device, ensure USB Debugging is enabled. Referenced [Here](https://developer.android.com/studio/debug/dev-options)

### React Native Dependencies 
All dependencies that need to be installed for this project are listed in the *requirements.txt* file and can be installed using `npm install --save -r requirements`

### System diagram and flow chart 
Below is an image of the flow of the application. Dashed arrows indicate the data flow direction. Solid arrows indicate screen navigation. Screens are labeled. The main points to notice are that the Bluetooth conection to the arduino is only active when the user is inside the Measuring Screen, and that the connection to Firebase is through WiFi. 

![Flow Diagram](/images/flow-diagram.png)

## Database  
To store user information and data, our team is utilizing Google Firebase as our backend service. There are currently two collections in Google Firebase Firestore: knee health and users. 

* knee health: The knee health collection holds all knee ROM measurments along with the timestamp of when they were completed. This database is a document-based database. Within the knee health collection, each document is labeled by a user phone number. All data related to the user phone number is stored within the document, simplifying data reads and writes. Each measurment is labeled by a timestamp. An timestamp format for April 29th, 2022 at 10:45 am would be displayed in Firestore as 2022-04-29T10:45:00Z. The timestamp has two sub-parameters: flexion (string) and extension (string). Here is an image of the knee health collection in Firestore:

![#1](https://user-images.githubusercontent.com/73702777/165967903-480ebeb2-0854-458c-add0-01da69602cb0.JPG)

* users: The users collection holds all user information generated during the registration process or from the profile screen. This database is a document-based database, similar to the knee health collection. Within the users collection, each document is labeled by a user phone number. All data related to the user phone number is stored within the document. For any user in the Flexted application, the data fields include:
1. First Name (string)
2. Last Name (string)
3. Phone (string)
4. Age (string)
5. Goals (array of strings)
6. Recent Knee Surgery? (boolean)

Here is an image of the users collection in Firestore:

![#2](https://user-images.githubusercontent.com/73702777/165970506-187a32fd-6dae-45dc-970a-11234eebb900.JPG)

## Overview of Modules 
The project main components are separated under the *Components* folder.

### app.js
This module is the index component of the mobile application. Navigation stack containers are set up and handled here. There are two main screen stacks: one that is visible only when a user has logged in, and the other that is visible when the user is logged out.

### LoginScreen
This is the first component that the user will see when initializing the Flextend application. The purpose of this component is to authenticate the user using a valid US mobile phone number. The user is asked to imput their number into a text box. Regular expressions are used to determine if the user input is a 10-digit value. Any invalid inputs will trigger an alert for the user to try again. After entering a valid 10-digit number, Google Firebase will run an reCAPTCHA analysis to ensure that the user is not a robot. Firebase will also check if the phone number is already registered into the system. Any errors will generate an alert for the user to try again or navigate to the Registration Screen if the user is new to Flextend. A successful reCAPTCHA analysis will display a new text box for the user to enter a 6-digit verification code sent via SMS. After entering the code, the user is logged into the app.

### RegistrationScreen
This component is required for new Flextend users. The user must create an account in Google Firebase to access the application. After navigating to the Registration Screen, the user will see three text boxes: first name, last name, and phone number. The user will need to enter this information as part of the registration process. The first and last name text boxes will accept any entry, as these parameters are only used for display in the application. The phone number text box has the same functionality as the Login Screen. Regular expressions are used to determine if the user input is a 10-digit value. If sucessfull, Google Firebase will run an reCAPTCHA analysis to determine that the user is not a robot. A successfull reCAPTCHA analysis will display a new text box for the user to enter a 6-digit verification code sent via SMS. After entering the code, the user is navigated back to the Login Screen. At this point, the user has an account in Google Firebase and can use the Login Screen for all future authentication attempts.

### IntroSliderScreen
This component includes four slides that appear when a new user registers to the mobile application. These slides show the user the main features of our application. 

### HomeScreen 
This component is the primary view when the user logs into the application. Fro here the user can navigate to all the rest of the functionalities. This screen is also connected to Firebase to pull "Goals" for the user and display on screen. 

<img src="/images/home-screen.png" height = "800" width="400"/>

### LiveMeasureScreen
This component is the main screen where users will interact with the Flextend device. The intended use for this screen is the following sequence:
1. User powers on the Flextend device
2. From the home screen, user presses "Live Measure" button. Upon pressing this, this component will attempt to pair to the Flextend device and navigate to the LiveMeasureScreen.
3. If the pairing was successful, the user will see an alert saying that they connected successfully.

From there, the user has a few options to use the device, namely "Begin Measuring", "Stop Measuring", and "Calibrate". When the user powers on the device and pairs to the application, they have the option to calibrate the device with "Calibrate", which ensures that the readings taken on the knee are accurate. This calibration should be done when the device is on a flat surface such that the device is reading 0 degrees. Next, the user can put on the device and press the "Begin Measuring" button. An alert will notify the user that the device is in measuring mode, and the user can move their knee back and forth to measure their full range of motion. Once done measuring, the user can press "Stop Measuring". When this is pressed, the Flextend device stops measuring degree values and sends the proper Flexion and Extension values back to the app. These results are displayed in the Flexion and Extension text boxes. If the user is unhappy with their result and would like to do another, the user can simply begin the "Begin Measuring" and "Stop Measuring" process again. Finally, upon navigating back to the Home page, the application will unpair from the Flextend device and push the Flexion and Extension results to Firebase, where the user can then see these results in the other pages of the app.

<img src="/images/measure-screen.png" height = "800" width="400"/>

### PreviousResultsScreen
This component displays the most recent measurment results for the user. These results are displayed via progress rings. The user values for flexion and extension are compared to the perfect flexion and extension values (0 degrees extension and 120 degrees flexion). Using simple addition, subtraction, and division, percentages are calculated to show how close the user values are to the perfect values. The progress rings are filled based on the percentage. The numerical value is also displayed to the right. The progress rings updates in real-time. If the user completes a new measurment, the progress rings will automatically use the newest values. Here is an image showing the functionality of the progress rings:

![Screenshot_20220405-003542](https://user-images.githubusercontent.com/73702777/165961349-0d9b4187-a549-4b7c-b4f3-eeff20d74b17.png)

### ProfileScreen
This component includes a variety of functions for the user. The screen itself is comprised of a profile picture (or placeholder when is not set) and four buttons. The user can:
- Pick and set a profile picture from their phone. This is then stored in Firestore under an identifier for the user. If the user changes the image, this stored file is updated and older pictures are not saved. 
- Set their body metrics. Here the user can add their age and if they have had knee surgery. This values are used in relation with the knee flexion and extension data to create a report. 
- Set goals. The user can write what goals they want to achieve when using the app for progress tracking. The goals are stored in Firebase and displaye on the home screen as a checklist component. 
- Set and edit reminders. The user can set up calendar events reminders to use the application. This utilizes a 3rd party module that connects to the mobile phone's calendar (apple calendar or google calendar) and the user can customize the frequency, times, and notifications.
- See progress charts. The user can see their past measurements of knee flexion and extension in a bar graph format and see how it has changed through time. 

<img src="/images/profile-screen.png" height = "800" width="400"/>

### ReportScreen
This component will extract all user measurments from the Google Firebase "knee health" collection. Using additional metrics given by the user, age and recent knee surgery status, a detailed progress report will be generated for the user. Using data from the CDC, the user will see how their results compare to other users of a similar age range. There are two possibilities for both flexion and extension: the user is above the national average or below the national average for their age range. Using data provided by our client, users with a recent knee surgery will have their own results and reccomendations, separate from users who have not had a recent knee surgery.  

<img src="/images/report-screen.png" height = "800" width="400"/>

### ProgressScreen
This component will show the past five measurments to the user in two bar graphs: a flexion bar graph and an extension bar graph. The x-axis is measured in increasing time. Each bar will have a unique timestamp for the month and day of the measurment. It is represented in the format mm dd. The first bar graph will have a y-axis that measures flexion in degrees. The second bar graph will have a y-axis that measures extension in degrees. The graphs update in real-time. If the user completes a new measurment, the bar closest to the origin will be deleted and the other four bars will shift to the left. The newest measurment will be added in to the right of the other bars. Here is an image showing the functionality of the bar graphs:

![Screenshot_20220405-003534](https://user-images.githubusercontent.com/73702777/165965752-4b1048e9-d563-4694-aefa-e28426fa5ec5.png)

