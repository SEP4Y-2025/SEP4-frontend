export type UserProfileToken = {
    username: string;
    // email:string;
    token: string;
};
export type UserProfile = {
    userName: string;
    email: string;
    user_id: string;
};

export type RegisterResponse = {
    message: string;
    user_id: string;
};
