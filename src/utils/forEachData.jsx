export const profilePic = (profile, post) => {
const profileData = {};

    post.forEach((postItem) => {
        profile.forEach((profileItem) => {
        if (profileItem.user?.username === postItem.user?.username) {
            profileData[postItem.uuid] = profileItem.url_pic;
        }
        });
    });
    return profileData;
}

export const mappingProfile = (pro, user) => {
    const dataUsersPic = {}

    pro.forEach((profile) => {
        if(profile.user?.uuid === user?.uuid){
          dataUsersPic[user.uuid] = profile.url_pic;
        }
    });
    return dataUsersPic;
}


export const postsUser = (posts, users) => {
    const dataUsersPic = {}

    posts.forEach((post) => {
        if(post.user.uuid === users?.uuid){
            if(dataUsersPic[post.user.uuid]){
                dataUsersPic[post.user.uuid].push(post);
            } else {
                dataUsersPic[post.user.uuid] = [post];
            }
        }
    })
    return dataUsersPic;
}
