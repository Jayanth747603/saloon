const fs = require('fs');

async function run() {
    try {
        const res = await fetch("https://cal.com/ai-agency-mgzpbb/30min");
        fs.writeFileSync('tmp/test-public.txt', `Status: ${res.status}\nURL: ${res.url}`);
    } catch(e) {
        fs.writeFileSync('tmp/test-public.txt', e.toString());
    }
}
run();
