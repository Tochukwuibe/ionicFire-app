import { Post } from './../../src/models/posts.model';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()
const db = admin.firestore()



// updated the number of posts a user has made 
export const updatePostCount = functions.firestore.document('posts/{postId}')
.onCreate(async (data, context) => {

    const userId = (data.data() as Post).userId // the id of the user who created the post from the post doc 

    const userRef = db.doc(`users/${userId}`); // refrence to the users document

    // gets the users data
    const user = await userRef.get()

    // update the count and run update
    const postCount = (user.data().postCount || 0) + 1;

    return userRef.update({postCount})
})



// maintains the follow/unfollow relationship 
export const updateFollowerCounts = functions.firestore.document('relationships/{relaId}')
.onWrite((change, context ) => {

    // if both the previous and curent data exists then we want to leave it alone
    if(change.after.exists && change.before.exists) {
        return null;
    }   


    const countChange = change.after.exists ? 1 : -1; // if the data exists then incremant the follower count bu 1 other wise decremaint it by -1

    // getting the both the follower and followed id from the id of the relationshio doc 
    const ids: string[] = context.params.relaId.split('_'); //  splits the id into the two users that they represent

    const followerId = ids[0]; // the first is the followers id 
    const followedId = ids[1]; // the second is the id of the person they are following

    const followerRef = db.doc(`users/${followerId}`)
    const followedRef = db.doc(`users/${followedId}`)


    // running an atomicWrite/transaction
    return db.runTransaction(async (t) => {
        // fetching data from the db
        const follower = await t.get(followerRef)
        const followed = await t.get(followedRef)

        // the object to be updated
        const followerUpdate = {
            followingCount: (follower.data().followingCount || 0) + countChange
        }

        const followedUpdate = {
            followerCount: (followed.data().followerCount || 0) + countChange
        }

        //running the updates
        await t.set(followerRef, followerUpdate, {merge: true})
        await t.set(followedRef, followedUpdate , {merge: true})

        return t; // return the transaction when finished
    })

})