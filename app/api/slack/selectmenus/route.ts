import { type NextRequest } from 'next/server'
const { WebClient } = require('@slack/web-api');
const SLACK_TOKEN = process.env.SLACK_TOKEN;

export function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    return Response.json({ message: 'hello' })
}



export async function POST(request: Request) {


    return Response.json({
        "options": [
            {
                "text": {
                    "type": "plain_text",
                    "text": "*this is plain_text text*"
                },
                "value": "value-0"
            },
            {
                "text": {
                    "type": "plain_text",
                    "text": "*this is plain_text text*"
                },
                "value": "value-1"
            },
            {
                "text": {
                    "type": "plain_text",
                    "text": "*this is plain_text text*"
                },
                "value": "value-2"
            }
        ]
    }
    )
}
