export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL; //http://localhost:5001

//auth (login, register, verifyLogin, logout) - url
export const serverAuthUrl = `${serverUrl}/auth`; //http://localhost:5001/auth
export const serverAuthLoginUrl = `${serverAuthUrl}/login`; //http://localhost:5001/auth/login
export const serverAuthVerifyLoginUrl = `${serverAuthUrl}/verifyLogin`; //http://localhost:5001/auth/verifyLogin
export const serverAuthLogoutUrl = `${serverAuthUrl}/logout`; //http://localhost:5001/auth/logout
export const serverAuthRegisterUrl = `${serverAuthUrl}/register`; //http://localhost:5001/auth/register

//posts
export const serverPostUrl = `${serverUrl}/post`; //http://localhost:5001/post

//images
export const serverImageUrl = `${serverUrl}/image`; //http://localhost:5001/image
