const fs = require('fs');
const CALENDLY_TOKEN = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzc0NjgxMTkzLCJqdGkiOiJiOTg4MTI5Ni1kZTU4LTQwNTMtOGJiMS0xNTQ0MGQwNzgwMzIiLCJ1c2VyX3V1aWQiOiI3NGFiZjc2MC0zMDM0LTRiZmItYWNlNC1kYWY4MmZhZjU3NzQiLCJzY29wZSI6ImF2YWlsYWJpbGl0eTpyZWFkIGF2YWlsYWJpbGl0eTp3cml0ZSBldmVudF90eXBlczpyZWFkIGV2ZW50X3R5cGVzOndyaXRlIGxvY2F0aW9uczpyZWFkIHJvdXRpbmdfZm9ybXM6cmVhZCBzaGFyZXM6d3JpdGUgc2NoZWR1bGVkX2V2ZW50czpyZWFkIHNjaGVkdWxlZF9ldmVudHM6d3JpdGUgc2NoZWR1bGluZ19saW5rczp3cml0ZSBncm91cHM6cmVhZCBvcmdhbml6YXRpb25zOnJlYWQgb3JnYW5pemF0aW9uczp3cml0ZSB1c2VyczpyZWFkIGFjdGl2aXR5X2xvZzpyZWFkIGRhdGFfY29tcGxpYW5jZTp3cml0ZSBvdXRnb2luZ19jb21tdW5pY2F0aW9uczpyZWFkIHdlYmhvb2tzOnJlYWQgd2ViaG9va3M6d3JpdGUifQ.Ov8eOML1N6bHYpRxYG9IhKjAv_XX01T9upLLW7XcBu0UzzVaFA-C1voxGq_ZiQhBuNjljDU6F4QMYXxeaPyeJQ';

async function testCalendly() {
    try {
        const userRes = await fetch('https://api.calendly.com/users/me', {
            headers: {
                'Authorization': `Bearer ${CALENDLY_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        const userData = await userRes.json();
        const userUri = userData.resource.uri;
        const orgUri = userData.resource.current_organization;

        const eventTypesRes = await fetch(`https://api.calendly.com/event_types?organization=${orgUri}`, {
            headers: {
                'Authorization': `Bearer ${CALENDLY_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        const eventTypesData = await eventTypesRes.json();
        
        const result = {
            user_uri: userUri,
            org_uri: orgUri,
            event_types: eventTypesData.collection.map(et => ({
                name: et.name,
                uri: et.uri,
                active: et.active,
                kind: et.kind
            }))
        };
        
        fs.writeFileSync('tmp/calendly-result.json', JSON.stringify(result, null, 2));
    } catch (error) {
        fs.writeFileSync('tmp/calendly-error.txt', error.message);
    }
}

testCalendly();
