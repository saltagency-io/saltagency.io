import { Client } from '@notionhq/client';


type NotionMessage = {
  name: string
  email: string
  phone: string
  reason: string
  body: string
}

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function sendToNotion({
  name,
  email,
  phone,
  reason,
  body,
}: NotionMessage) {
  return notion.pages.create({
    icon: {
      type: 'emoji',
      emoji: '✉️',
    },
    parent: {
      type: 'database_id',
      database_id: 'ababce1dc63f4763a1263ba334e19670',
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      Phone: { phone_number: phone },
      Email: { email: email },
      'Reason for contact': {
        select: {
          name: reason,
        },
      },
      Question: {
        rich_text: [
          {
            text: {
              content: body,
            },
          },
        ],
      },
      Status: {
        select: {
          name: 'Open',
        },
      },
      Assignee: {
        people: [
          {
            id: 'f05630fc-55d4-4b99-abbb-2ba28507533d',
          },
        ],
      },
    },
  })
}
