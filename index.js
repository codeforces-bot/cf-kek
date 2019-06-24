let MailBox = require('disposable-mail');
const Browser = require('zombie');
let fetch = require('node-fetch');    

let credentials = Buffer.from('cfkicker:cfkicker').toString('base64');
let mailBox = new MailBox(credentials);

update = () => mailBox.getMessages().then(async (msgs) => {
    if(!msgs.error){
        const confirmation_link = (msgs[0].textOnly.substr(msgs[0].textOnly.indexOf("href=\"") + 6, msgs[0].textOnly.indexOf("\"", msgs[0].textOnly.indexOf("href=\"") + 7) - msgs[0].textOnly.indexOf("href=\"") - 6));
        // fetch().then(result => console.log("SUCCESSFULLY REGISTERED"));
        console.log(confirmation_link);
        var browser = new Browser();
        await browser.visit(confirmation_link, async () => {
            console.log("AKSDJALSKDJKALSDJKLASJDLKAS");
            console.log(browser.url);
            setTimeout(browser.visit("https://codeforces.com/problemset/submit", async() => {
                // await browser.wait();
                console.log(browser.url);
                var code = `#include<bits/stdc++.h>\nusing namespace std;\n#define mp make_pair\n#define ff first\n#define ss second\n#define ll long long\n#define pb push_back\n#define ull unsigned long long\nconst int N = 2e6 + 11;int main(){ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);string s;cin>>s;int k;cin>>k;int g=s.size()-1;for (int d=1; d<=k; d++){if (s[g]=='0') g--; else s[g]--;}for (int p=0; p<=g; p++)cout<<s[p];}`;
                browser.fill("input[name=submittedProblemCode]", "977A");
                browser.select("select[name=programTypeId]", "GNU G++14 6.4.0");
                browser.fill("textarea[name=source]", code);
                browser.document.forms[1].submit();
                await browser.wait();
            }), 1000);
            
        });
    } else{
        setTimeout(update, 1000);
    }
});

(async () => {

    const address = await mailBox.getEmailAddress();
    var browser = new Browser();
    console.log(address.substr(0, address.indexOf('@')));
    console.log(address.substr(0, address.indexOf('@')) + "HAHAHAHAHAHAH");
    browser.visit("https://codeforces.com/register", () => {
        browser.fill("input[name=email]", address);
        browser.fill("input[name=handle]", address.substr(0, address.indexOf('@')));
        browser.fill("input[name=password]", address.substr(0, address.indexOf('@')) + "HAHAHAHAHAHAH");
        browser.fill("input[name=passwordConfirmation]", address.substr(0, address.indexOf('@')) + "HAHAHAHAHAHAH");
        browser.document.forms[1].submit();
        // wait for new page to be loaded then fire callback function
        browser.wait().then(function() {
            console.log('Form submitted ok!');
            // the resulting page will be displayed in your default browser
            console.log(browser.url);
        })
    })

    setTimeout(update, 1000);
})()