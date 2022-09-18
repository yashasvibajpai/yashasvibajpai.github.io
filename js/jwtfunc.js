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
 const header = {
    alg: "HS256",
    typ: "JWT"
  };
  const data = {
    email : "yashasvi@rudderstack.com"
  };
  const secret = d558ce56d2a96906faf9f2ef9562a03e59e2415a9f751317551100a44cab09421b6ae4645c6b9e07e7c12cb5b90883b3ea5ed724df8332d8be94bf92bf34b044;

function generateJWTToken(header, data, secret) {
  const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);
  const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  const encodedData = base64url(stringifiedData);
  const token = `${encodedHeader}.${encodedData}`;
  const signature = base64url(CryptoJS.HmacSHA256(token, secret));
  return `${token}.${signature}`;
}
exports.generateJWTToken = generateJWTToken;
