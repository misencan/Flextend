# Flextend: Engineering Addendum 

Senior Design Project: Electrical Device and Cross-Platform Mobile Application 
Boston University Department of Electrical and Computer Engineering
Authors: Sohaib Ansari, Jack Halberian, Carmen Hurtado, Thomas Scrivanich, Murat Sencan

## Project Description
The goals of this project were to:
- Design a self-administered electrical device to measure the range of motion of a user’s knee.
- Create a mobile cross-platform application that will automate user progress tracking and goal setting. 
- Develop a system that has an exceptional user experience for patients of any age or background.  

The electrical component includes an Arduino Nano IoT, 2 MPU6050 units, a buzzer, a 9V battery. Read more details in the [Hardware-Readme](https://github.com/carmenhg/SD_Flextend/blob/main/README_HARDWARE.md)

The software component is a cross-platform mobile application powered by React Native. 
Details are included in the [Software-Readme](https://github.com/carmenhg/SD_Flextend/blob/main/README_Software.md)

## Status of the project 
The device works as intended with minor errors. The mobile application successfully connects to the device and works as intended. 
### Hardware
Although the hardware works in most situations, there are improvements that would make the device a lot more user friendly and accuarte.
- The device currently consists of two pieces connected together through a micro usb cable. Separating these pieces and having a completely wireless device would make the device easier to put on and handle by a user. This could potentially be done by having two arduinos (one on each strap) and connected them via transmisor or Bluetooth. 
- In terms of computing the flexion and extension angles, the current mathematical operations works up until 180 degrees. This can be improved. 
- For angle calculation as well, Quaternion operations is being used. This method would allow for detecting user error and making the device "fix itself" and calculate with minimal error no matter if the user places it completely unaligned. 

### Software
The application exceeded the requirements of the initial project. However, this can be further imporved for a more enjoyable application and useful for a wider range of audinces that include not only patients but doctors as well. 
- A more interactive and intuitive UI can be implemented. This would better user experience and help guide users that are not very used to using phones. 
- Displaying the data collected is working okay and it shows the user their past 5 measurements. This can be modified to have the user select the timeframe of data to be displayed. 
- Live measurements screen could potentially show the numbers live as the user moves the leg. 
- The application can be made for Physical Therapists as users. In this case they could interact with patients and follow along theur rehabilitation process. 

