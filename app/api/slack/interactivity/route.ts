import { type NextRequest } from 'next/server'
const { WebClient } = require('@slack/web-api');
const SLACK_TOKEN = process.env.SLACK_TOKEN;

export function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    return Response.json({ message: 'hello' })
}



export async function POST(request: Request) {

    try {
        const body = await request.formData(); // Read the form data

        const payload = body.get('payload'); // Extract the payload
        const param_dic = JSON.parse(payload as string); // Parse the payload as JSON
        console.log("param:", param_dic);
        // Send a direct message
        // OAuth トークン
        // #チャンネル名 of @ユーザー名
        const channel = '#kamei-test';
        // メッセージ
        const text = '*Hello World*';

        if (param_dic.actions[0].value === 'tags') {
            return Response.json({ message: 'tagだよ' })
        }


        const client = new WebClient(SLACK_TOKEN);
        const response = await client.chat.postMessage({ channel, text });
        return Response.json({ message: 'Message sent successfully' })
    } catch (error) {
        console.error('Error sending message:', error);
        return Response.json({ message: 'Error sending message' })
    }



}
