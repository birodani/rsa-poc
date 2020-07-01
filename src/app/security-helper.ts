import { pki,util, Bytes} from 'node-forge';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SecurityHelper {
   private keyPair;
   private rsa;

  constructor() {
    this.rsa = pki.rsa;
  }

    createKeyPair() : Promise<boolean>{
      console.log("start");
      return new Promise((resolve, reject) => {
        this.rsa.generateKeyPair({bits: 3072, workers: -1}, function(err, keypair) {
          if(err) {reject(err)};

          resolve(keypair)
        });
      }).then(keypair=> {this.keyPair = keypair; return true;},err => {return false;});
    }

    publicKeyToPemFormat(): string { 
      return pki.publicKeyToPem(this.keyPair.publicKey);
    }

    encrypt(message: Bytes, padding: PaddingScheme): Bytes {
      return this.keyPair.publicKey.encrypt(message,padding);
    }

    decrypt(message: Bytes, padding: PaddingScheme): Bytes {
      return this.keyPair.privateKey.decrypt(message,padding);
    }

}

export enum PaddingScheme {
  RSAES_PKCS1_V1_5 = "RSAES-PKCS1-V1_5",  
  RSA_OAEP = "RSA-OAEP",
  RAW = "RAW", 
  NONE = "NONE",
}
