const fs = require('fs');
const CAL_API_KEY = 'cal_live_69bd43c49eb7b4a11ca03da9a8f1897d';

async function run() {
    try {
        // Test slots via usernames (no eventTypeId)
        const url = new URL("https://api.cal.com/v2/slots/available");
        url.searchParams.append('usernameList[]', 'ai-agency-mgzpbb');
        url.searchParams.append('startTime', '2026-04-01T00:00:00Z');
        url.searchParams.append('endTime', '2026-04-01T23:59:59Z');

        const res = await fetch(url.toString(), {
            headers: {
                'Authorization': `Bearer ${CAL_API_KEY}`,
                'cal-api-version': '2024-08-13',
            }
        });
        const json = await res.json();
        fs.writeFileSync('tmp/test-cal-slots.json', JSON.stringify(json, null, 2));
    } catch(e) {
        fs.writeFileSync('tmp/test-cal-slots.json', e.toString());
    }
}
run();
