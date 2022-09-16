// Import the axios HTTP library and the SDK methods you'll be calling
import axios from 'axios';
import {
 initialize,
 getInAppMessages,
 updateUser,
 track
} from '@iterable/web-sdk';
const CryptoJS = require("crypto-js");

function base64url(source) {
  // Encode in classical base64
  let encodedSource = CryptoJS.enc.Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, "");

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");

  return encodedSource;
}
/**
 * Generating JWT token using the below function. JWT Token is used for generating access token with identifying
 * client using Oauth2 client_credentials.
 *
 * A JWT primarily consists of three parts:
 * 1. Header - Normalized structure specifying how the token is signed.
 * 2. A free set of claims.
 * 3. A signature to ensure data integrity.
 * */

(() => {
 const yourAsyncJWTGeneratorMethod = (header, data, secret) => {
 // In this method, call your server to fetch a valid JWT token for the current
 // user. Pass along the relevant userId or email, so the server can include
 // use it to generate the token. This method should return the JWT token.
  const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);
  const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  const encodedData = base64url(stringifiedData);
  const token = `${encodedHeader}.${encodedData}`;
  const signature = base64url(CryptoJS.HmacSHA256(token, secret));
  return `${token}.${signature}`;
 };
 // If you use userId instead of email, import setUserId instead
 const { setEmail, logout } = initialize(
 process.env.API_KEY || ''
,
 yourAsyncJWTGeneratorMethod
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
 setEmail('docs@iterable.com').then(() => {
 request();
 });
})();
