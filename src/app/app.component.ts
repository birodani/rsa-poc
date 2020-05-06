import { Component, OnInit } from '@angular/core';
import { pki,util } from 'node-forge';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Hello encoded data!';

  ngOnInit(): void {
  this.test();
  }

  test(){
    //'RSAES-PKCS1-V1_5' | 'RSA-OAEP' | 'RAW' | 'NONE' | null;
    let rsa = pki.rsa;
    var keypair = rsa.generateKeyPair({bits: 1024, e: 0x10001});
    let cypher = keypair.publicKey.encrypt(this.title);
    console.log(cypher);
    console.log(util.encode64(cypher));
    console.log(keypair.privateKey.decrypt(cypher));
    //console.log(util.int32ToBytes(keypair.publicKey));
  }
}
