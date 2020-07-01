import { Component, OnInit } from '@angular/core';
import { pki,util} from 'node-forge';
import { Buffer } from 'buffer';
import { SecurityHelper, PaddingScheme } from './security-helper';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Hello encoded data!';
  number = 0;
  keypair;

  constructor(private _security: SecurityHelper){}


  ngOnInit(): void {
    let rsa = pki.rsa;
    new Promise((resolve, reject) => {
      rsa.generateKeyPair({bits: 3072, workers: -1}, function(err, keypair) {
        if(err) {reject(err)};
        const pubPem  = pki.publicKeyToPem(keypair.publicKey);
        console.log(pubPem);
        resolve(keypair)
      });
    }).then(keypair=> this.keypair = keypair,err => console.log(err));

  }

  test(){
    //'RSAES-PKCS1-V1_5' | 'RSA-OAEP' | 'RAW' | 'NONE' | null;
    let startFrom = new Date().getTime();
    let rsa = pki.rsa;
    var keypair = rsa.generateKeyPair({bits: 3072,workers: -1});
    let cypher = keypair.publicKey.encrypt(this.title,"RAW");
    console.log(pki.publicKeyToPem(keypair.publicKey));
    console.log(util.encode64(cypher));
    console.log(keypair.privateKey.decrypt(cypher));
    let buffer = new Buffer(cypher);
    console.log(new Date().getTime() - startFrom);
    //console.log(util.int32ToBytes(keypair.publicKey));
  }

  setKey(keypair){
    this.keypair = keypair;
  }

  public increment(){
    this.number = this.number + 1;
    let cypher = this.keypair.publicKey.encrypt(this.title);
    console.log(cypher);
    console.log(util.encode64(cypher));
    console.log(this.keypair.privateKey.decrypt(cypher));
  }


  async seviceTest(){
    await this._security.createKeyPair();
    const encoded = this._security.encrypt('hello',PaddingScheme.RSA_OAEP);
    console.log(this._security.publicKeyToPemFormat());
    console.log(encoded);
    const decoded = this._security.decrypt(encoded,PaddingScheme.RSA_OAEP);
    console.log(decoded);
    
  }
}