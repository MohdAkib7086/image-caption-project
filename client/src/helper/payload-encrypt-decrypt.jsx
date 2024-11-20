// import * as eccryptoJS from 'eccrypto-js';
// import * as CryptoJS from 'crypto-js';
// import { Buffer } from 'buffer';


// // Encrypt Payload
// const encryptRequest = async (payload) => {
//     try {
//         console.log(import.meta.env.VITE_REQUEST_PUB_KEY,"jjjjjjjjjjjj")
//         const requestPublicKeyBuffer = Buffer.from(import.meta.env.VITE_REQUEST_PUB_KEY, 'hex');
//         console.log(requestPublicKeyBuffer,"iiiiiii----")
//         // Generate Key pair to enc and dec response
//         const responseKeyPair = eccryptoJS.generateKeyPair();
//         // Response Public key
//         const responsePublickey = responseKeyPair.publicKey;
//         // Payload with Response public key
//         const payloadJSON = JSON.stringify(
//             {
//                 "data": payload,
//                 "responsePublickey": Buffer.from(responsePublickey, 'hex')
//             }
//         );
//         console.log(payloadJSON)
//         // Enc payload
//         const payloadJSONBuffer = eccryptoJS.utf8ToBuffer(payloadJSON);
//         const encryptedMsg = await eccryptoJS.encrypt(requestPublicKeyBuffer, payloadJSONBuffer);
//         // Enc Payload with Cipher
//         const cipherEncPayload = CryptoJS.AES.encrypt(JSON.stringify(encryptedMsg).stringify(import.meta.env.VITE_CipherEnc)).toString();
//         return { payload: cipherEncPayload, responsePrivatekey: Buffer.from(responseKeyPair.privatekey).toString('hex'), error: false }
//     }
//     catch (e) {
//         // return { payload: null, responsePrivatekey: null, error: true, errDesc: e }
//     }
// }
// const decryptResponse = async (responseData, responsePrivateKey) => {
//     console.log("here", responseData, responsePrivateKey)
//     try {
//         console.log("inside")
//         // Response Private Key to decrypt Response
//         const privateKeyResponse = Buffer.from(responsePrivateKey, 'hex')
//         // Decrypt Cipher encrypted Response
//         let cipherDecryptedData = CryptoJS.AES.decrypt(responseData, String(import.meta.env.VITE_CipherEnc));
//         console.log("inside1", cipherDecryptedData)

//         cipherDecryptedData['ciphertext'] = new Uint8Array(cipherDecryptedData['ciphertext']['data']);
//         cipherDecryptedData['ephesPublickey'] = new Uint8Array(cipherDecryptedData['ephemPublicKey']['data']);
//         cipherDecryptedData['iv'] = new Uint8Array(cipherDecryptedData['iv']['data']);
//         cipherDecryptedData['mac'] = new Uint8Array(cipherDecryptedData['mac']['data']);
//         // Decrypt ecc response 
//         const decrypted = await eccryptoJS.decrypt(privateKeyResponse, cipherDecryptedData);
//         const decryptedResponse = JSON.parse(decrypted.toString())
//         return { responseData: decryptedResponse, error: false }
//     }
//     catch (e) {
//         return { responseData: e, error: true }
//     }
// }
// export { encryptRequest, decryptResponse }