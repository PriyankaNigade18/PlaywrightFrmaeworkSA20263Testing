

/*
OAuth (Open Authorization) is a protocol used for access delegation,
 where resource owners grant third-party applications to access
  their resources without sharing their user credentials.

  https://medium.com/identity-beyond-borders/oauth-1-0-vs-oauth-2-0-e36f8924a835

  Oauth2.0
GET https://api.github.com/user/repos

1.Create Application in Git hub
2.Get Client_ID=   &  Client_Secret=
3.Click on update application button

4.Set the id to url https://github.com/login/oauth/authorize?client_id= 
and send this through browser
5.Click on Authorize button. you will get auth code

6.In response , user redirected to redirects URL and get the code within URL

7.Get the access token https://github.com/login/oauth/access_token?client_id= &client_secret=&code=
8.Use API to get git hub access  GET https:// api.github.com/user/repos
*/



import {test,expect} from "@playwright/test";
import { json } from "node:stream/consumers";

test("Open auth 2.0 test",async({request})=>{
/*
    //get the access token: https://github.com/login/oauth/access_token?client_id= &client_secret=&code=
    let baseUrl="https://github.com/login/oauth/access_token";
    let queryParam={
        client_id:"",
        client_secret:"",
        code:"a61464e9007bcaf68fe3"

    }

    //send the request and get the access token
    let tokenRes=await request.get(`${baseUrl}`,{headers:{
        Accept:"application/json"
    },params:queryParam})

    let jsonRes=await tokenRes.json();
    console.log(jsonRes);
    
    //get the token
    let token=jsonRes.access_token;


    let authToken={Autorization:`Bearer ${token}`}

    //send the request to access githup repo
    let response=await request.get("https://api.github.com/user/repos",{headers:authToken});

    console.log(await response.json());
    

*/

})