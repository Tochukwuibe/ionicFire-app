"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
// updated the number of posts a user has made 
exports.updatePostCount = functions.firestore.document('posts/{postId}')
    .onCreate((data, context) => __awaiter(this, void 0, void 0, function* () {
    const userId = data.data().userId; // the id of the user who created the post from the post doc 
    const userRef = db.doc(`users/${userId}`); // refrence to the users document
    // gets the users data
    const user = yield userRef.get();
    // update the count and run update
    const postCount = (user.data().postCount || 0) + 1;
    return userRef.update({ postCount });
}));
// maintains the follow/unfollow relationship 
exports.updateFollowerCounts = functions.firestore.document('relationships/{relaId}')
    .onWrite((change, context) => {
    // if both the previous and curent data exists then we want to leave it alone
    if (change.after.exists && change.before.exists) {
        return null;
    }
    const countChange = change.after.exists ? 1 : -1; // if the data exists then incremant the follower count bu 1 other wise decremaint it by -1
    // getting the both the follower and followed id from the id of the relationshio doc 
    const ids = context.params.relaId.split('_'); //  splits the id into the two users that they represent
    const followerId = ids[0]; // the first is the followers id 
    const followedId = ids[1]; // the second is the id of the person they are following
    const followerRef = db.doc(`users/${followerId}`);
    const followedRef = db.doc(`users/${followedId}`);
    // running an atomicWrite/transaction
    return db.runTransaction((t) => __awaiter(this, void 0, void 0, function* () {
        // fetching data from the db
        const follower = yield t.get(followerRef);
        const followed = yield t.get(followedRef);
        // the object to be updated
        const followerUpdate = {
            followingCount: (follower.data().followingCount || 0) + countChange
        };
        const followedUpdate = {
            followerCount: (followed.data().followerCount || 0) + countChange
        };
        //running the updates
        yield t.set(followerRef, followerUpdate, { merge: true });
        yield t.set(followedRef, followedUpdate, { merge: true });
        return t; // return the transaction when finished
    }));
});
//# sourceMappingURL=aggrigation.js.map