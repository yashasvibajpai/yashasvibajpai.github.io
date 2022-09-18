// import from "";
import { Base64, Utf8, HmacSHA256 } from "crypto-js";

function base64url(source) {
  // Encode in classical base64
  let encodedSource = Base64.stringify(source);

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
 
function generateJWTToken(header, data, secret) {
  const stringifiedHeader = Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);
  const stringifiedData = Utf8.parse(JSON.stringify(data));
  const encodedData = base64url(stringifiedData);
  const token = `${encodedHeader}.${encodedData}`;
  const signature = base64url(HmacSHA256(token, secret));
  return `${token}.${signature}`;
}
export { generateJWTToken };
