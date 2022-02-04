const GET_USERS_POSTS = "GET_USERS_POSTS";


const getUsersPosts = (postData) => {
    return({
        type: GET_USERS_POSTS,
        postData
    })
};


const _getUsersPosts = () => {
    return(async(dispatch) => {
        try {
            const postData = []
            const uid = auth.currentUser.uid;
            const q =  query(collection(db, "posts"), where("postersId", "==", uid));
            const docSnap = await getDocs(q);
        
            if (docSnap) {
              docSnap.forEach((doc) => {
              postData.push((doc.id, " => ", doc.data()));
              });
              dispatch(getUsersPosts(postData))
            //   const docRef = doc(db, "users", uid);
            //   const userSnap = await getDoc(docRef);
            //   userName = userSnap.data().userName
            //   postData.push(userName)
            //   console.log("Document data:", docData[0]);
            //   console.log('user data', userName)
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
        } catch (error) {
            console.log('thunk userPost' , error)
        }
    })
}

const userPostReducer = (state = [], action) => {
    switch(action.type){
        case GET_USERS_POSTS:
            return [...state, actio.postData]
        default:
            return state
    }
}