#include <ESP8266WiFi.h>          //ESP8266 Core WiFi Library (you most likely already have this in your sketch)
#include <DNSServer.h>            //Local DNS Server used for redirecting all requests to the configuration portal
#include <ESP8266WebServer.h>     //Local WebServer used to serve the configuration portal
#include <WiFiManager.h>          //https://github.com/tzapu/WiFiManager WiFi Configuration Magic
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <FirebaseArduino.h>
#include "DHT.h"

#include <ArduinoJson.h>
#include <WiFiClientSecure.h>

#define FIREBASE_HOST PRIVATE
#define FIREBASE_AUTH PRIVATE

#define DHTPIN 14     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11   // DHT 11

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

DHT dht(DHTPIN, DHTTYPE);


boolean played = false;
boolean wifiConnectedFlag = false;

const int buzzer = 15; //Buzzer connected to pin 8 of Arduino uno / mega
const int photocellPin = A0;
float averageHeatIndex;
int averageLight = 0;

int count = 0;
String ssid = "notFoundJustYet";
String publicIP;
int chipID = ESP.getChipId();
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  
  pinMode(buzzer, OUTPUT);
  
  connectToWifi();
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  delay(10);

  // Initialize a NTPClient to get time
  timeClient.begin();
  timeClient.setTimeOffset(0);
  publicIP = GetExternalIP();
  dht.begin();
  delay(30);
  calibrate();
}

int lightOnLength = 0;
int showerOnLength = 0;
int showerCount = 0;
int showerIndex = 0;
float showerTempValues[30] = {-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1};
void loop() {
  int lightValue = analogRead(photocellPin);
  float f = dht.readTemperature(true);
  float h = dht.readHumidity();
  float hif = dht.computeHeatIndex(f, h);
  
  if ((averageLight - lightValue) > 60) {
    lightOnLength++;
  } else {
    if (lightOnLength > 10) {
      sendLightData(lightOnLength);
    }
    lightOnLength = 0;  
  }

  if (abs(averageHeatIndex - hif) > 3.5) {
    showerOnLength++;
    showerCount++;
    if (showerOnLength == 10) {
      playSuccess();  
    }
    if (showerIndex != 30 && showerCount > 30) {
      showerCount = 0;
      showerTempValues[showerIndex] = hif;
      showerIndex++;
    }
  } else {
    if (showerOnLength > 31) {
      sendShowerData(showerOnLength, showerTempValues);
      for (int i = 0; i < 30; i++) {
          showerTempValues[i] = -1;
      }
    }
    showerOnLength = 0;
    showerIndex = 0;
  }
  delay(1000);
  Serial.println("showerOnLength: ");
  Serial.println(showerOnLength);
}

void calibrate() {
  // CALIBRATE HEAT INDEX and CALIBRATE LIGHT
  float heatIndexValues[10];
  int lightValues[10];
  for (int i = 0; i < 10; i++) {
      float f = dht.readTemperature(true);
      float h = dht.readHumidity();
      heatIndexValues[i] = dht.computeHeatIndex(f, h);
      lightValues[i] = analogRead(photocellPin);
      delay(500);
  }
  int sum = 0; 
  int sum2 = 0;
  for (int i=0; i<10; i++) {
    sum += heatIndexValues[i];
    sum2 += lightValues[i];
  }
  averageHeatIndex = sum/10;
  averageLight = sum2/10;
}

void sendLightData(int timeOn) {  
  timeClient.update();
  unsigned long epochTime = timeClient.getEpochTime();
  String formattedTime = timeClient.getFormattedTime();
  //Get a time structure
  struct tm *ptm = gmtime ((time_t *)&epochTime); 
  int monthDay = ptm->tm_mday;
  int currentMonth = ptm->tm_mon+1;
  int currentYear = ptm->tm_year+1900;
  //Print complete date:
  String currentDate = String(currentYear) + "-" + String(currentMonth) + "-" + String(monthDay -1);

  String data = publicIP + "/" + String(chipID) + "/" + currentDate + "/" + timeOn;
  Firebase.setString("NewLightDataIn/",data);
}

void sendShowerData(int timeOn, float showerTempValues[]) {
  timeClient.update();
  unsigned long epochTime = timeClient.getEpochTime();
  String formattedTime = timeClient.getFormattedTime();
  //Get a time structure
  struct tm *ptm = gmtime ((time_t *)&epochTime); 
  int monthDay = ptm->tm_mday;
  int currentMonth = ptm->tm_mon+1;
  int currentYear = ptm->tm_year+1900;
  
  int i = 0;
  float averageShowerHeat = 0;
  while (showerTempValues[i] != -1) {
      averageShowerHeat += showerTempValues[i];
      i++;
  }
  averageShowerHeat = (averageShowerHeat / (i+1));
  
  String currentDate = String(currentYear) + "-" + String(currentMonth) + "-" + String(monthDay -1);
  String data = publicIP + "/" + String(chipID) + "/" + currentDate + "/" + timeOn + "/" + averageShowerHeat;
  Firebase.setString("NewShowertDataIn/",data);
}

void connectToWifi() {
  while (!wifiConnectedFlag) {
    WiFiManager wifiManager;
    WiFiManagerParameter custom_text("<p>Protect you and others without thinking about it.</p>");
    wifiManager.addParameter(&custom_text);
    wifiManager.startConfigPortal("BathroomBuddy");
    Serial.println("connected...yeey :)");
    ssid = WiFi.SSID();
    wifiConnectedFlag = true;
  }
}


void playTooEarly() {
  for (int i = 0; i < 3; i++) {
      tone(buzzer,600);
      delay(160);
      noTone(buzzer);
      delay(130);
    }
}

void playSuccess() {
 for (int i = 0; i < 2; i++) {
  playSuccessHelper();
  delay(300);
 }
 played = true;
}

void playSuccessHelper() {
 tone(buzzer,2500);
 delay(115);
 noTone(buzzer);
 delay(75);
 tone(buzzer,2500);
 delay(50);
 noTone(buzzer);
 delay(100);
 tone(buzzer,2660);
 delay(300);
 noTone(buzzer);
}

String GetExternalIP() {
  WiFiClient client;
  if (!client.connect("api.ipify.org", 80)) {
    Serial.println("Failed to connect with 'api.ipify.org' !");
  }
  else {
    int timeout = millis() + 5000;
    client.print("GET /?format=json HTTP/1.1\r\nHost: api.ipify.org\r\n\r\n");

    
    while (client.available() == 0) {
      if (timeout - millis() < 0) {
        Serial.println(">>> Client Timeout !");
        client.stop();
        return "IP_NOT_FOUND";
      }
    }
    bool finishedHeaders = false;
    bool currentLineIsBlank = true;
    bool gotResponse = false;
    String title = "";
    String headers = "";
    String body = "";
    long now;
    now = millis();
    // checking the timeout
    while (millis() - now < 1500) {
      while (client.available()) {
        char c = client.read();
        //Serial.print(c);

        if (finishedHeaders) {
          body=body+c;
        } else {
          if (currentLineIsBlank && c == '\n') {
            finishedHeaders = true;
          }
          else {
            headers = headers + c;
          }
        }

        if (c == '\n') {
          currentLineIsBlank = true;
        }else if (c != '\r') {
          currentLineIsBlank = false;
        }

        //marking we got a response
        gotResponse = true;

      }
      if (gotResponse) {

        DynamicJsonBuffer jsonBuffer;
        JsonObject& root = jsonBuffer.parseObject(body);
        if (root.success()) {
          if (root.containsKey("data")) {
            JsonObject& post = root["data"]["children"][0];
            if (post.containsKey("data")) { 
              title = post["data"]["title"].as<String>();
            }
          } 
        } else {
          Serial.println("failed to parse JSON");
        }

        break;
      }
    }
    return body;
  }
}
