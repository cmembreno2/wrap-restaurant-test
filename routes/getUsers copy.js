const express = require('express');
const admin = require('firebase-admin');
require('dotenv').config();

const router = express.Router();

router.get('/users', async (req,res)=> {

    console.log('Executing Get All Users route...')

    const serviceAccount = require(json.parse(process.env.FIRESTORE_SERVICE_ACCOUNT_KEY));

    if ( !admin.apps.length ) admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore();
    const results = [];
    try{
        const snapshot = await db.collection(process.env.USERS_COLLECTION).get();
        snapshot.forEach(doc=>{
            console.log(`Succesfully executed Get All Users route...`)
            results.push(doc.data());
        });
        return res.status(200).json({users: results});
    }catch(err){
        console.log(`Error getting All Users ${err}`)
        return res.status(err.code).send(err.message);
    }
});

module.exports = router;