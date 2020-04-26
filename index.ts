import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
 export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });

 export const newData2 = functions.database.ref("/NewLightDataIn").onUpdate((snapshot, context) => {
    console.log("new data");
    const db = admin.database();
    const data = snapshot.after.val();

    const dataString = String(data);

    // String parsing
    const substring = dataString.substring(7, dataString.length);

    let arr: string[] = substring.split('/');

    let IP = arr[0].substring(0, arr[0].length - 2);
    IP = IP.replace('.', '-')
    IP = IP.replace('.', '-')
    IP = IP.replace('.', '-')

    let chipID = arr[1];
    let timeStamp = arr[2];
    const seconds = arr[3];
    const number: number = +seconds;

    let ref = db.ref(`/Universe/${IP}/${chipID}/${timeStamp}/LightEvents`);

    var dict: {[key:string] : number } = {};
    dict[seconds] = number;
    

    return ref.update(dict);
 });

 export const newData3 = functions.database.ref("/NewShowerDataIn").onUpdate((snapshot, context) => {
    const db = admin.database();
    const data = snapshot.after.val();

    const dataString = String(data);

    // String parsing
    const substring = dataString.substring(7, dataString.length);

    let arr: string[] = substring.split('/');

    let IP = arr[0].substring(0, arr[0].length - 2);
    IP = IP.replace('.', '-')
    IP = IP.replace('.', '-')
    IP = IP.replace('.', '-')

    let chipID = arr[1];
    let timeStamp = arr[2];
    const seconds = arr[3];
    const number: number = +seconds;
    let heatIndex = arr[4];
    heatIndex = heatIndex.replace('-', '.');
    const number2: number = +heatIndex;

    const promises = [];

    let ref = db.ref(`/Universe/${IP}/${chipID}/${timeStamp}/ShowerEvents/ShowerLengths`);
    var dict: {[key:string] : number } = {};
    dict[seconds] = number;
    promises.push(ref.update(dict));

   let ref2 = db.ref(`/Universe/${IP}/${chipID}/${timeStamp}/ShowerEvents/ShowerHeatIndexes`);
   var dict2: {[key:string] : number } = {};
   dict2[heatIndex.replace('.', '-')] = number2;
   promises.push(ref2.update(dict2));
   return Promise.all(promises);

 });
