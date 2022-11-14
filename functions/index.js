const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { query } = require("firebase/firestore");
admin.initializeApp(functions.config().firebase);

exports.handleLogin = functions.https.onCall(async (data) => {
  const db = admin.firestore();
  const users = await db.collection("users");
  const getDbUser = async () => {
    return await db.collection("users").where("email", "==", data.email).get();
  };
  const dbUser = await getDbUser();
  if (!dbUser.empty) {
    return dbUser.docs[0].data();
  } else {
    const usersQtyRef = db.collection("data").doc("users");
    const usersQty = await usersQtyRef.get();
    const usersQtyData = usersQty.data();
    functions.logger.log(usersQtyData.userQuantity);

    await users.doc(usersQtyData.userQuantity.toString()).set({
      email: data.email,
      name: data.displayName,
      id: usersQtyData.userQuantity.toString(),
    });
    usersQtyRef.update({
      userQuantity: admin.firestore.FieldValue.increment(1),
    });

    return await (await getDbUser()).docs[0].data();
  }
});

// exports.handleLogin = functions.https.onCall(async () => {
//   return "ASDASD";
// });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
