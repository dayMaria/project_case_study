import { Injectable } from '@nestjs/common';
//import fetch from 'node-fetch';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    /*
    const res = await fetch("https://google.com")
    const json = await res.json()
    const txt = await res.text()
    const blob = await res.blob()
    const names = json.map(item => item.name)
    */
    //  fetch("localhost/context", {
    //   body: JSON.stringify({name: "Name"}),
    //   method: "POST"
    //  })
    return 'Hello World!';
  }
}
