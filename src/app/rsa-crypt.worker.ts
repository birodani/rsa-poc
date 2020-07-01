import { pki,util } from 'node-forge';
import {Buffer} from 'buffer';
/// <reference lib="webworker" />

  addEventListener('message', ({ data }) => {
    let startFrom = new Date().getTime();
    let rsa = pki.rsa;
    var keypair = rsa.generateKeyPair({bits: 3070,workers: 2, e: 0x10001});
    let cypher = keypair.publicKey.encrypt(this.title);
    console.log(cypher);
    console.log(util.encode64(cypher));
    console.log(keypair.privateKey.decrypt(cypher));
    let buffer = new Buffer(cypher);
    console.log(new Date().getTime() - startFrom);

  });