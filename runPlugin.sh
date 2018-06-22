#!/bin/sh

ionic cordova plugin remove com-sarriaroman-photoviewer 1.1.10 "PhotoViewer"
ionic cordova plugin remove com.unarin.cordova.beacon 3.5.1 "Proximity Beacon Plugin"
ionic cordova plugin remove cordova-plugin-advanced-http 1.5.9 "Advanced HTTP plugin"
ionic cordova plugin remove cordova-plugin-android-permissions 1.0.0 "Permissions"
ionic cordova plugin remove cordova-plugin-bluetooth-serial 0.4.7 "Bluetooth Serial"
ionic cordova plugin remove cordova-plugin-camera 2.4.1 "Camera"
ionic cordova plugin remove cordova-plugin-device 1.1.6 "Device"
ionic cordova plugin remove cordova-plugin-file 4.3.3 "File"
ionic cordova plugin remove cordova-plugin-file-transfer 1.6.3 "File Transfer"
ionic cordova plugin remove cordova-plugin-geolocation 2.4.3 "Geolocation"
ionic cordova plugin remove cordova-plugin-inappbrowser 1.7.1 "InAppBrowser"
ionic cordova plugin remove cordova-plugin-network-information 1.3.3 "Network Information"
ionic cordova plugin remove cordova-plugin-statusbar 2.2.3 "StatusBar"
ionic cordova plugin remove cordova-plugin-x-socialsharing 5.1.8 "SocialSharing"
ionic cordova plugin remove cordova-plugin-x-toast 2.6.0 "Toast"
ionic cordova plugin remove de.appplant.cordova.plugin.local-notification 0.8.5 "LocalNotification"
ionic cordova plugin remove ionic-plugin-keyboard 2.2.1 "Keyboard"
ionic cordova plugin remove phonegap-plugin-push

ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic-native/sqlite

ionic cordova plugin add cordova-plugin-network-information
npm install --save @ionic-native/network

ionic cordova plugin add cordova-plugin-camera
npm install --save @ionic-native/camera

ionic cordova plugin add cordova-plugin-x-toast
npm install --save @ionic-native/toast

ionic cordova plugin add cordova-plugin-geolocation
npm install --save @ionic-native/geolocation

ionic cordova plugin add cordova-plugin-x-socialsharing
npm install --save @ionic-native/social-sharing

ionic cordova plugin add cordova-plugin-advanced-http
npm install --save @ionic-native/http

ionic cordova plugin add cordova-plugin-bluetooth-serial
npm install --save @ionic-native/bluetooth-serial

ionic cordova plugin add cordova-plugin-device
npm install --save @ionic-native/device

ionic cordova plugin add cordova-plugin-statusbar
npm install --save @ionic-native/status-bar

ionic cordova plugin add ionic-plugin-keyboard
npm install --save @ionic-native/keyboard

ionic cordova plugin add cordova-plugin-file-transfer
npm install --save @ionic-native/file-transfer

ionic cordova plugin add cordova-plugin-file
npm install --save @ionic-native/file

ionic cordova plugin add cordova-plugin-ibeacon
npm install --save @ionic-native/ibeacon

ionic cordova plugin add de.appplant.cordova.plugin.local-notification
npm install --save @ionic-native/local-notifications

ionic cordova plugin add cordova-plugin-android-permissions
npm install --save @ionic-native/android-permissions

ionic cordova plugin add cordova-plugin-inappbrowser
npm install --save @ionic-native/in-app-browser

ionic cordova plugin add com-sarriaroman-photoviewer
npm install --save @ionic-native/photo-viewer

ionic cordova plugin add phonegap-plugin-push --variable SENDER_ID=529111944854
npm install --save @ionic-native/push

ionic cordova plugin add ionic-plugin-deeplinks --variable URL_SCHEME=modurn --variable DEEPLINK_SCHEME=https --variable DEEPLINK_HOST=modurn.com --variable ANDROID_PATH_PREFIX=/
npm install --save @ionic-native/deeplinks


npm install
