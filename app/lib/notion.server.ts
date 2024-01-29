import { Client } from '@notionhq/client'

import { capitalizeFirstChar } from '#app/utils/misc'

type NotionMessage = {
	name: string
	email: string
	phone: string
	body: string
}

const notionServer = new Client({ auth: process.env.NOTION_API_KEY })

export async function sendToContactFormNotion({
	name,
	email,
	phone,
	body,
}: NotionMessage) {
	return notionServer.pages.create({
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

type NotionApplication = {
	name: string
	email: string
	phone: string
	employment: string
	citizenship: string
	role: string
	linkedin: string
	motivation: string
}

export async function sendApplicationToNotion({
	name,
	email,
	phone,
	employment,
	citizenship,
	role,
	linkedin,
	motivation,
}: NotionApplication) {
	return notionServer.pages.create({
		icon: {
			type: 'emoji',
			emoji: '✉️',
		},
		parent: {
			type: 'database_id',
			database_id: '143d64954cca4d36bf1b16fd13cb8aeb',
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
			Employment: {
				select: {
					name: capitalizeFirstChar(employment),
				},
			},
			Citizenship: {
				select: {
					name: capitalizeFirstChar(citizenship),
				},
			},
			'Role name': {
				rich_text: [
					{
						text: {
							content: role,
						},
					},
				],
			},
			'LinkedIn URL': { url: linkedin },
			Motivation: {
				rich_text: [
					{
						text: {
							content: motivation,
						},
					},
				],
			},
			Stage: {
				select: {
					name: 'Potential candidates',
				},
			},
			'Hiring Manager': {
				people: [
					{
						id: 'f05630fc-55d4-4b99-abbb-2ba28507533d',
					},
				],
			},
		},
	})
}
