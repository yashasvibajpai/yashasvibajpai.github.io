// Import the axios HTTP library and the SDK methods you'll be calling
import {
 initialize,
 getInAppMessages,
 updateUser,
 track
} from '@iterable/web-sdk';
const { generateJWTToken } = require("./jwtfunc")

(() => {
 const yourAsyncJWTGeneratorMethod = (header, data, secret) => {
 // In this method, call your server to fetch a valid JWT token for the current
 // user. Pass along the relevant userId or email, so the server can include
 // use it to generate the token. This method should return the JWT token.
 return generateJWTToken(header, data, secret);
  
 };
 // If you use userId instead of email, import setUserId instead
 const header = {
  alg: "HS256",
  typ: "JWT"
};
 const data = {
  email : "yashasvi@rudderstack.com"
};
 const secret = d558ce56d2a96906faf9f2ef9562a03e59e2415a9f751317551100a44cab09421b6ae4645c6b9e07e7c12cb5b90883b3ea5ed724df8332d8be94bf92bf34b044;

 const { setEmail, logout } = initialize(
 process.env.API_KEY || 'b4a24ee2d98c4dd3ba400a812cd3b8b7'
,
 yourAsyncJWTGeneratorMethod(header, data, secret)
 );
 const { request, pauseMessageStream, resumeMessageStream } = getInAppMessages(
 {
 // Here, you can configure the SDK. For more information, check out the
 // web SDK's GitHub repository: https://github.com/iterable/iterable-web-sdk
 count: 20,
 displayInterval: 1000,
 onOpenScreenReaderMessage: '...',
 onOpenNodeToTakeFocus: 'input',
 packageName: '<Unique identifier for your website integration in Iterable>',
 rightOffset: '20px',
 topOffset: '20px',
 bottomOffset: '20px',
 handleLinks: 'external-new-tab'
 },
 true
 );
 // Set the email address, and make the request to get the in-app messages
 // that are available for that user.
 setEmail('yashasvi@rudderstack.com').then(() => {
 request();
 });
})();
