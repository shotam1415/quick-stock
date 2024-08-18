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
        // Send a direct message
        // OAuth トークン
        // #チャンネル名 of @ユーザー名
        const channel = '#kamei-test';
        // メッセージ
        const text = '*Hello World*';

        const blocks = [
            {
                "type": "divider"
            },
            {
                "type": "divider"
            },
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "plain_text_input-action"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Url",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "element": {
                    "type": "checkboxes",
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*plain_text option 0*",
                                "emoji": true
                            },
                            "value": "value-0"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*plain_text option 1*",
                                "emoji": true
                            },
                            "value": "value-1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*plain_text option 2*",
                                "emoji": true
                            },
                            "value": "value-2"
                        }
                    ],
                    "action_id": "checkboxes-action"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Tags",
                    "emoji": true
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "save",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "actionId-0"
                    }
                ]
            }
        ]


        const client = new WebClient(SLACK_TOKEN);
        const response = await client.chat.postMessage({ channel, text, blocks });
        return Response.json({ message: 'Message sent successfully' })
    } catch (error) {
        console.error('Error sending message:', error);
        return Response.json({ message: 'Error sending message' })
    }



}
