import { SessionsClient } from '@google-cloud/dialogflow';
import { googleCred } from '@/utils/dialogFlow';
import { NextResponse } from "next/server";


const projectId = googleCred.googleProjectId
const sessionId = googleCred.dialogFlowSessionId


const credentials = {
    client_email: googleCred.googleClientEmail,
    private_key: googleCred.googlePrivateKey

}

export async function POST(request) {
    let payload = await request.json();
    console.log("payload", payload)
    const { text, userId } = payload;
    // const client = new SessionsClient({ projectId, cred });
    const client = new SessionsClient({
        credentials: credentials,
        projectId: projectId,
    });
    const sessionPath = client.projectAgentSessionPath(projectId, sessionId+userId);

    console.log("sessionPath", sessionPath)

    const googleRequest = {
        session: sessionPath,
        queryInput: {
            text: {
                text: text,
                languageCode: 'en-US',
            },
        },
    };
    try {
        const responses = await client.detectIntent(googleRequest);
        const result = responses[0].queryResult;
        return NextResponse.json(result)
    } catch (error) {
        console.error('ERROR:', error);
        return NextResponse.json({ error: 'Internal Server Error' })
    }
    // return NextResponse.json({name:"Akshey",city:"Mandi"})
}