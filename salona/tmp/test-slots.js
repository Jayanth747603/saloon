const fs = require('fs');
const CAL_API_KEY = 'cal_live_69bd43c49eb7b4a11ca03da9a8f1897d';

async function run() {
    try {
        const url = new URL("https://api.cal.com/v1/slots");
        url.searchParams.append('apiKey', CAL_API_KEY);
        // url.searchParams.append('eventTypeId', '4967549');
        url.searchParams.append('eventTypeSlug', '30min');
        url.searchParams.append('usernameList', 'ai-agency-mgzpbb');
        url.searchParams.append('startTime', '2026-03-30T00:00:00Z');
        url.searchParams.append('endTime', '2026-03-30T23:59:59Z');

        const res = await fetch(url.toString(), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
        fs.writeFileSync('tmp/test-v1-slots.json', JSON.stringify(json, null, 2));
    } catch(e) {
        fs.writeFileSync('tmp/test-v1-slots.json', e.toString());
    }
}
run();
