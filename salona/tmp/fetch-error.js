const fs = require('fs');

async function run() {
    try {
        const res = await fetch("http://localhost:3000/api/calendar/available?date=2026-03-30");
        const json = await res.json();
        fs.writeFileSync('tmp/error-output.txt', JSON.stringify(json, null, 2));
    } catch(e) {
        fs.writeFileSync('tmp/error-output.txt', e.toString());
    }
}
run();
