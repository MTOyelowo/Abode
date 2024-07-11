import { Dimensions, Platform, StatusBar } from "react-native";

export const WIDTH = Dimensions.get("screen").width - 10;
export const LISTMARGIN = 10;

const baseHeight = 120;
const iosNotch = 40;
const iosHeight = baseHeight + iosNotch;
let androidHeight = baseHeight;
let androidNotch = 0;
if (StatusBar.currentHeight) androidNotch = StatusBar.currentHeight;
androidHeight += androidNotch;

export const HEADERHEIGHT = Platform.OS === "ios" ? iosHeight : androidHeight;

const serverUrl = "http://192.168.0.143:4000/api";
const location = "/location";
const user = "/user";
const manager = "/manager";
const locationEndpoint = serverUrl + location;
const userEndpoint = serverUrl + user;
const managerEndpoint = serverUrl + manager;

export const endpoints = {
    autoComplete: locationEndpoint + "/autocomplete",
    search: locationEndpoint + "/search",
    register: userEndpoint + "/register",
    login: userEndpoint + "/login",
    facebook: userEndpoint + "/facebook",
    google: userEndpoint + "/google",
    apple: userEndpoint + "/apple",
    forgotPassword: userEndpoint + "/forgotpassword",
    resetPassword: userEndpoint + "/resetpassword",
    createManager: managerEndpoint + "/create",
    getManagersByUserID: managerEndpoint + "/userid/"
}
