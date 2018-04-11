import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Post } from '../../src/models/posts.model';

export const newUnicornPost = functions.firestore.document('posts/{postId}')
.onCreate((data, context) => {
    const post = data.data() as Post // retrieving data from the doc 

    const isUnicorn = post.content.toLowerCase().indexOf('unicorn') >= 0 // searching for the word unicorn

    if (!isUnicorn) { // if there is no unicorn then return null 
        return null
    }

    // notification content 
    const payload = {
        notification: {
            title: 'New Post about Unicorns',
            body: 'Read the latest Unicorn Post',
            icon: 'https://goo.gl/Fz9nrQ'
        }
    }


    return admin.messaging().sendToTopic('Unicorns', payload)
})