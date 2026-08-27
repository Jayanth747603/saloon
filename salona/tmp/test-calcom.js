const CAL_API_KEY = 'cal_live_69bd43c49eb7b4a11ca03da9a8f1897d';
const fs = require('fs');

async function testCalCom() {
    try {
        const eventTypesRes = await fetch(`https://api.cal.com/v1/event-types?apiKey=${CAL_API_KEY}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!eventTypesRes.ok) {
            const errorText = await eventTypesRes.text();
            throw new Error(`Failed to fetch event types v1: ${eventTypesRes.status} ${errorText}`);
        }

        const eventTypesData = await eventTypesRes.json();
        fs.writeFileSync('tmp/calcom-result.json', JSON.stringify(eventTypesData, null, 2));

    } catch (error) {
        fs.writeFileSync('tmp/calcom-error.txt', error.toString());
    }
}

testCalCom();
