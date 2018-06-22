export const APIURL = {
    URL1: 'http://example.com',
    URL2: 'http://example2.com'
}


export const KEY_STORAGE = {
    UserData: "userData",
    URL2: "http://example2.com",
    Relation: "Relation",
    Roles: "UserRoles",
}
export const KEY_NOTIFF = {
    LifeStoryUpdate: "LifeStoryUpdated",
    LifeStoryUpdateRender: "LifeStoryUpdatedRender",
    DismissSetting: "DismissSetting",
    TabSelect: "TabSelect"
    
}


//
export enum HTTP_METHOD {
    GET,
    POST,
    PUT,
    DELETE
}

export enum LifeStoryTab {
    Experience,
    Media,
    Profile,
    FriendsnFamily
}

export const APIService = {
    Login: 'auth/signin',
    SignUp: 'signupapi',
    LifeStory: 'story/lifeStory',
    updateLifeStory:"story/updateLifeStory",
    addInterestPassion: 'story/interestPassion',
    getExperienceDetails: 'story/experienceById',
    ChangePassword: 'profile/changePassword',
    getMediaData:'story/imageLink',
    sendEmail:'story/sendEmailVisiter',

    //change
    postInterest:'story/interestPassion',
    updateInterest:'story/updateInterestPassion',
    addCompetitionnTraining:'story/competitionTraining',
    updateCompetitionTraining:'story/updateCompetitionTraining',

    EditProfile:'profile/updateUserProfile',
    ConfirmPass:'profile/verifyPassword',
    ProfileImage: 'profile/saveUserProfile',
    UpdateProfilePic: 'profile/updateUserProfile',
    experienceStatus:'story/updateExperienceStatus',
    RoleDetails: 'profile/roleDetail',
    RelationDetails: 'profile/relationDetail',
    UploadLifeStoryPic: 'story/upLoadImagelifeStory',
    addLifeStory:'story/lifeStory',
    getPdfList:'story/pdfFile',
    deletePdfFile:'story/deletePdfFile',
    
    //change
    getCareerAcademic: 'story/careerAcademic',
    updateCareerAcademic:'story/updateCareerAcademic',
    getInterestPassion: 'story/interestPassion',
    getCompetitionTraining: 'story/competitionTraining',    
    getHealthJourney:'story/health',
    updateHealthJourney:'story/updateHealth',
    getCharity: 'story/charity',
    updateCharityUrl:'story/updateCharity',
    getMediaLink:'story/mediaLink',
    addMediaLink:'story/mediaLink',
    updateMediaLink:'story/updateMediaLink',

    //Beacon
     CheckBeaconExistance : 'profile/checkBeaconExistence',
     ConnectLifeStory: 'story/mapBeacon',
     ConnectLifeStoryAsViewer: 'profile/userAsViewer',


     //LifeStory
     GetLifeStoryById: 'story/lifestoryById',
     
    deleteCharity:'story/deleteCharity',
    loadMoreImageUrl:'story/mediaImage',
    likeExpUrl:'story/likeExperience',
    deletExpUrl:'story/deleteExperience',
    deleteHealthJourney:'story/deleteHealth',
    deleteFriendFamily:'story/deleteFriendFamily',
    deleteLifestory:'story/deleteLifeStory',
    deleteMediaLink:'story/deleteMediaLink',
    deleteMediaImage:'story/deleteMediaImage',
};

// export const websiteUrl : string = 'http://modurngroup.com/';
export const websiteUrl : string = 'https://www.modurngroup.com/';

/**
 * 
 * Define Constants for use all over the app
 * 
 */

///^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const EMAIL_REGES : RegExp = /^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*,{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,10})[\W]*$/;
export const TEXT_REGES : RegExp = /^[A-Za-z ']*$/;
// export const NUMBER_REGES : RegExp = /^[0-9]*$/;
export const NUMBER_REGES : RegExp = /^(0?[1-9]|[1-9][0-9]{0,2})$/;
export const NUMBER_FLOAT_REGES : RegExp = /^[+-]?\d+(\.\d+)?$/;
export const EMAIL_TEXT_REGES : RegExp = /^[A-Za-z_@.0-9]*$/;
export const PASSWORD_REGES : RegExp = /^[A-Za-z0-9\n.'?~`!@#$%^&*<>,-_]+$/;
export const WITHOUT_FIRST_REGES : RegExp = /^[^-\s][a-zA-Z0-9_\s-]+$/

// old
// export const WITHOUT_FIRST_REGES_SPECIAL : RegExp = /^[^-\s][A-Za-z0-9\n.'’?~`+}{!@#$%^")(&*<>,-_\s-]+$/;
// New
// export const WITHOUT_FIRST_REGES_SPECIAL : RegExp = /^[^-\s][A-Za-z0-9\n.'’?~`+}{!@#$%^")(&*<>,-_\s-]/;
// Latest
// export const WITHOUT_FIRST_REGES_SPECIAL : RegExp = /^[^-\s][a-zA-Z0-9'’?~`+}{!@#$%^")(\n.&*<>,-_\s-]+$/;


export const WITHOUT_FIRST_REGES_SPECIAL : RegExp = /^[^\s][a-zA-Z0-9'’?~`+}{!@#$%^"“”)(\n.&*<>,-_\s-]+$/;



export const NICKNAME_REGES : RegExp = /^[^\s:([){};]/;
// export const WITHOUT_FIRST_REGES_SPECIAL : RegExp = /^[^-\s][A-Za-z0-9'_@.>,!*#&+-]*$/
// export const WITHOUT_FIRST_REGES_SPECIAL : RegExp = /^[^-\s][A-Za-z0-9\n.'?~`!@#$%^&*<>,-_]*$/
// export const URL : RegExp = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/g;
// export const URL : RegExp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/;
// export const URL : RegExp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-zA-Z]{0,31}.[a-zA-Z]{0,3}/g;
export const URL : RegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
// export const URL : RegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;



export const ROMOVE_SPACE : RegExp = /\s+/g;





