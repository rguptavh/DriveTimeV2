import firebase from 'react-native-firebase';
import uuid4 from 'uuid/v4';

export function signout(onSignedOut) {
    firebase.auth().signOut()
      .then(() => {
        onSignedOut();
      })
  }
  
  export function updateRecord(record, updateComplete,user) {
    record.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    console.log("Updating record in firebase");
  
    firebase.firestore()
      .collection('Records')
      .collection(user)
      .doc(record.id).set(record)
      .then(() => updateComplete(record))
      .catch((error) => console.log(error));
  }

  export async function getRecords(recordsRetreived, user) {

    var recordList = [];
  
    var snapshot = await firebase.firestore()
      .collection('Records').collection(user)
      .orderBy('createdAt')
      .get()
  
    snapshot.forEach((doc) => {
      const recordItem = doc.data();
      recordItem.id = doc.id;
      recordList.push(recordItem);
    });
  
    recordsRetreived(recordList);
  }
  