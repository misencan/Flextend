/*
  Below is the source code for the Flextend device, which uses an Arduino Nano 33 IoT as the microcontroller

  There are four characteristics for the flextendService
  1. flexionCharacteristic (reports the flexion values measured)
  2. extensionCharacteristic (reports the extension values measured)
  3. measureCharacteristic (characteristic which is written to from app to indicate when to measure)
  4. calibrationCharacteristic (characteristic which is written to from app to indicate when to calibrate)

  In addition, this code also uses two MPU6050s to measure the angle of the knee by taking the difference between the two angles measured relative to ground.
  To extract flexion and extension values, we simply take the minimum and maximum of the measured degrees, respectively, and pass those to the app.
  This could be improved to be more accurate.
*/

#include <ArduinoBLE.h>
#include <Wire.h>

// initialize service and characteristics with unique UUIDs
BLEService flextendService("19B10000-E8F2-537E-4F6C-D104768A1214");

BLEStringCharacteristic flexionCharacteristic("19B10001-E8F2-537E-4F6C-D104768A1214", BLERead | BLENotify, 10);
BLEStringCharacteristic extensionCharacteristic("C5CA3B17-A86F-44DB-AD39-D248FB05D0BD", BLERead | BLENotify, 10);
BLEStringCharacteristic measureCharacteristic("ADFD6F66-2A72-42DD-B1D6-7B27832FA025", BLERead | BLEWriteWithoutResponse | BLEWrite, 20);
BLEStringCharacteristic calibrationCharacteristic("77B25143-5A38-4B8A-AAA0-BF28E09C4B18", BLERead | BLEWriteWithoutResponse | BLEWrite, 20);

const int MPU_addr1 = 0x68;
const int MPU_addr2 = 0x69;
int buzzer = 4;


int findMin(int data[] , int s) //function to extract flexion value from array of measured degrees
{
  int min_val = data[0]; // assume 1 element in array
  for (int i = 1; i < s; i++)
  {
    if (data[i] <= min_val)
    {
      min_val = data[i];
    }
  }
  return min_val;
}

int findMax(int data[] , int s) //function to extract extension value from array of measured degrees
{
  int max_val = data[0]; // assume 1 element in array
  for (int i = 1; i < s; i++)
  {
    if (data[i] >= max_val)
    {
      max_val = data[i];
    }
  }
  return max_val;
}

void setup() {
  // init for first MPU
  Wire.begin();
  Wire.beginTransmission(MPU_addr1);
  Wire.write(0x6B);
  Wire.write(0);
  Wire.endTransmission(true);

  // init for second MPU
  Wire.begin();
  Wire.beginTransmission(MPU_addr2);
  Wire.write(0x6B);  // PWR_MGMT_1 register
  Wire.write(0);     // set to zero (wakes up the MPU-6050)
  Wire.endTransmission(true);

  // begin BLE
  if (!BLE.begin()) {

    while (1);
  }

  
//  pinMode(Cbutton, INPUT);
//  digitalWrite(Cbutton, LOW);

  // init buzzer and play a tone to indicate device is on and functioning
  pinMode(buzzer, OUTPUT);

  tone(buzzer, 2500);
  delay(500);
  noTone(buzzer);

  // set advertised local name and service UUID:
  BLE.setDeviceName("Flextend");
  BLE.setLocalName("Flextend");
  BLE.setAdvertisedService(flextendService);

  // add the characteristics to the service
  flextendService.addCharacteristic(flexionCharacteristic);
  flextendService.addCharacteristic(extensionCharacteristic);
  flextendService.addCharacteristic(measureCharacteristic);
  flextendService.addCharacteristic(calibrationCharacteristic);

  // add service
  BLE.addService(flextendService);

  // set the initial value for the characeristics:
  String measuring("NOTMEASURING");
  String calibrating("NOTCALIBRATING");
  measureCharacteristic.writeValue(measuring);
  calibrationCharacteristic.writeValue(calibrating);

  // start advertising
  BLE.advertise();
}

void loop() {
  // listen for BLE peripherals to connect:
  BLEDevice central = BLE.central();

  // if a central is connected to peripheral:
  if (central) {

    // while the central is still connected to peripheral:
    while (central.connected()) {
      // reset state variables and init variables
      bool isMeasuring = false;
      bool isCalibrating = false;

      int16_t AcX1, AcY1, AcZ1, AcX2, AcY2, AcZ2;


      int count;
      int minVal = 265;
      int maxVal = 402;

      double raw1, raw2, x1, x2, Angle, OFF1, OFF2, sum1, sum2;

      // used to measure degrees
      int degrees_array[2000]; // assume no more than 2000 entries are measured
      for (int i = 0; i < 2000; i++)
      {
        degrees_array[i] = 0;
      }
      int i = 0;

      // sets state values to indicate when to calibrate
      if (calibrationCharacteristic.value() == "CALIBRATING")
      {
        isCalibrating = true;
      }
      else if (calibrationCharacteristic.value() == "NOTCALIBRATING")
      {
        isCalibrating = false;
      }

      if (isCalibrating) //begin calibration code
      {
        float v1[20], v2[20], t1, t2;
        //Calibration Code
        if (central.connected())
        {
//          Serial.println("CONNECTED");
        }
        
//        Serial.println("Calibrating");
        count = 0;

        while (count < 20) {

          // read values from first MPU
          Wire.beginTransmission(MPU_addr1);
          Wire.write(0x3B);
          Wire.endTransmission(false);
          Wire.requestFrom(MPU_addr1, 14, true);
          AcX1 = Wire.read() << 8 | Wire.read();
          AcY1 = Wire.read() << 8 | Wire.read();
          AcZ1 = Wire.read() << 8 | Wire.read();
          int xAng1 = map(AcX1, minVal, maxVal, -90, 90);
          int yAng1 = map(AcY1, minVal, maxVal, -90, 90);
          int zAng1 = map(AcZ1, minVal, maxVal, -90, 90);
          

          // convert to degrees and offset
          t1 = RAD_TO_DEG * (atan2(-yAng1, -zAng1) + PI);

          if (t1 < 180) {

            v1[count] = t1 + 360;
          }

          else {

            v1[count] = t1;
          }

          // read from second MPU
          Wire.beginTransmission(MPU_addr2);
          Wire.write(0x3B);
          Wire.endTransmission(false);
          Wire.requestFrom(MPU_addr2, 14, true);
          AcX2 = Wire.read() << 8 | Wire.read();
          AcY2 = Wire.read() << 8 | Wire.read();
          AcZ2 = Wire.read() << 8 | Wire.read();
          int xAng2 = map(AcX2, minVal, maxVal, -90, 90);
          int yAng2 = map(AcY2, minVal, maxVal, -90, 90);
          int zAng2 = map(AcZ2, minVal, maxVal, -90, 90);

          //convert to degrees and offset
          t2 = RAD_TO_DEG * (atan2(-yAng2, -zAng2) + PI);

          if (t2 < 180) {

            v2[count] = t2 + 360;
          }

          else {

            v2[count] = t2;
          }
          count++;
        }

        // find the offsets for both MPUs
        sum1 = 0;
        sum2 = 0;

        for (int i = 0; i < 20; i++) {
          sum1 += v1[i];
          sum2 += v2[i];
        }
  
        OFF1 = 360 - (sum1 / 20);
        OFF2 = 360 - (sum2 / 20);
        // reset calibration variables
        String calibrating("NOTCALIBRATING");
        calibrationCharacteristic.writeValue(calibrating);
        isCalibrating = false;
      }

      // set measuring state when we read measuring from app
      if (measureCharacteristic.value() == "MEASURING")
      {
        isMeasuring = true;
      }
      else if (measureCharacteristic.value() == "NOTMEASURING")
      {
        isMeasuring = false;
      }
      while (isMeasuring) // begin measuring degrees
      {

        int count;
        int minVal = 265;
        int maxVal = 402;

        double raw1, raw2, x1, x2, Angle, OFF1, OFF2, sum1, sum2;

        
        if (central.connected()) //check this to make sure connection is still working
        {
        }
        if (measureCharacteristic.written())
        {
        }
        if (measureCharacteristic.value() == "NOTMEASURING") // check if the characteristic changes while in measuring state
        {                                                    // if so, find flexion and extension and write to characteristics as well as reset degrees array
          int min_val = findMin(degrees_array, i);
          int max_val = findMax(degrees_array, i);
          String min_string(min_val);
          String max_string(max_val);
          //IF THE VALUES DON'T MAKE SENSE THEN SEND A ZERO 
          if(min_val > 90){
            //send nothing because the knee was not flexed
            flexionCharacteristic.writeValue("No value");
          }
          else if (min_val <=90){
            flexionCharacteristic.writeValue(min_string);
          }
          
          if(max_val <= 90){
            //send nothing because the knee was not flexed
            extensionCharacteristic.writeValue("No value");
          }
          else if (max_val >90){
            extensionCharacteristic.writeValue(max_string);
          }
          
          isMeasuring = false;
          i = 0;
          for (int i = 0; i < 2000; i++)
          {
            degrees_array[i] = 0;
          }
        }
        //THIS ELSE DIDN'T USE TO BE HERE: CARMEN EDIT
        else{
          //While it is measuring keep sending min and max values to the app
          //the app should display them if it receives them
          int min_val = findMin(degrees_array, i);
          int max_val = findMax(degrees_array, i);
          String min_string(min_val);
          String max_string(max_val);
          flexionCharacteristic.writeValue(min_string);
          extensionCharacteristic.writeValue(max_string);
          //need to check on the app side if the values that we are getting are flexion or extension
          //only display one value at a time live since two are a time are not possible
        }

        // same code as calibration, except now we use offset in recording the degrees and do not find an offset (as we already have it)
        Wire.beginTransmission(MPU_addr1);
        Wire.write(0x3B);
        Wire.endTransmission(false);
        Wire.requestFrom(MPU_addr1, 14, true);
        AcX1 = Wire.read() << 8 | Wire.read();
        AcY1 = Wire.read() << 8 | Wire.read();
        AcZ1 = Wire.read() << 8 | Wire.read();
        int xAng1 = map(AcX1, minVal, maxVal, -90, 90);
        int yAng1 = map(AcY1, minVal, maxVal, -90, 90);
        int zAng1 = map(AcZ1, minVal, maxVal, -90, 90);

        raw1 = RAD_TO_DEG * (atan2(-yAng1, -zAng1) + PI);

        if (raw1 > 180) {
          x1 = (raw1 - 360) + OFF1;
        }

        else {
          x1 = raw1 + OFF1;
        }


        Wire.beginTransmission(MPU_addr2);
        Wire.write(0x3B);
        Wire.endTransmission(false);
        Wire.requestFrom(MPU_addr2, 14, true);
        AcX2 = Wire.read() << 8 | Wire.read();
        AcY2 = Wire.read() << 8 | Wire.read();
        AcZ2 = Wire.read() << 8 | Wire.read();
        int xAng2 = map(AcX2, minVal, maxVal, -90, 90);
        int yAng2 = map(AcY2, minVal, maxVal, -90, 90);
        int zAng2 = map(AcZ2, minVal, maxVal, -90, 90);

        raw2 = RAD_TO_DEG * (atan2(-yAng2, -zAng2) + PI);

        if (raw2 > 180) {
          x2 = (raw2 - 360) + OFF2;
        }

        else {
          x2 = raw2 + OFF2;
        }

        if ((x1 > 0 && x2 > 0) || (x1 < 0 && x2 < 0)) {
          Angle = abs (180 - abs(abs(x1) - abs(x2)));
        }

        else {
          Angle = abs ( 180 - abs(abs(x1) + abs(x2)) );
        }
        // write value to degrees array
        degrees_array[i] = Angle;
        i++;
        //delay so that not too many degree values are measured
        delay(200);
      }
    }
  }
}
