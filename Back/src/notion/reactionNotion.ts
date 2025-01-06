import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { UserServiceEntity } from 'src/entity/userService.entity';

@Injectable()
export class ReactionNotion {
    async createPage(userService: UserServiceEntity, arg: any) {

        const notion = new Client({
            auth: userService.token,
        });

        await notion.pages.create({
            parent: {
                page_id: arg.parent_id,
            },
            properties: {
                title: {
                    title: [
                        {
                            text: {
                                content: arg.title,
                            },
                        },
                    ],
                },
            },
        }).then((res) => {
            console.log('Page Notion Created')
            return res;
        }).catch((err) => {
            console.log(err.body);
        });
    }

    async commentPage(userService: UserServiceEntity, arg: any) {

        const notion = new Client({
            auth: userService.token,
        });

        await notion.comments.create({
            parent: {
                page_id: arg.parent_id,
            },
            rich_text: [
                {
                  text: {
                    content: arg.comment,
                  }
                }
            ]
        }).then((res) => {
            console.log('Comment Notion Created')
            return res;
        }).catch((err) => {
            console.log(err.body);
        });
    }

    async createDatabase(userService: UserServiceEntity, arg: any) {
            
            const notion = new Client({
                auth: userService.token,
            });
    
            await notion.databases.create({
                parent: {
                    page_id: arg.parent_id,
                },
                title: [
                    {
                        text: {
                            content: arg.title,
                        },
                    },
                ],
                properties: {
                    Name: {
                        title: {},
                    },
                    Description: {
                        rich_text: {},
                    },
                    Tags: {
                        multi_select: {},
                    },
                    Status: {
                        select: {
                            options: [
                                {
                                    name: 'To Do',
                                    color: 'red',
                                },
                                {
                                    name: 'In Progress',
                                    color: 'yellow',
                                },
                                {
                                    name: 'Done',
                                    color: 'green',
                                },
                            ],
                        },
                    },
                },
            }).then((res) => {
                console.log('Database Notion Created')
                return res;
            }).catch((err) => {
                console.log(err.body);
            });
    }

    async updatePage(userService: UserServiceEntity, arg: any) {
            
            const notion = new Client({
                auth: userService.token,
            });
    
            await notion.pages.update({
                page_id: arg.page_id,
                properties: {
                    title: {
                        title: [
                            {
                                text: {
                                    content: arg.title,
                                },
                            },
                        ],
                    },
                },
            }).then((res) => {
                console.log('Page Notion Updated')
                return res;
            }).catch((err) => {
                console.log(err.body);
            });
    }

    async updateDatabase(userService: UserServiceEntity, arg: any) {      
        const notion = new Client({
            auth: userService.token,
        });

        await notion.databases.update({
            database_id: arg.database_id,
            title: [
                {
                    text: {
                        content: arg.title,
                    },
                },
            ],
            properties: {
                Name: {
                    title: {},
                },
                Description: {
                    rich_text: {},
                },
                Tags: {
                    multi_select: {},
                },
                Status: {
                    select: {
                        options: [
                            {
                                name: 'To Do',
                                color: 'red',
                            },
                            {
                                name: 'In Progress',
                                color: 'yellow',
                            },
                            {
                                name: 'Done',
                                color: 'green',
                            },
                        ],
                    },
                },
            },
        }).then((res) => {
            console.log('Database Notion Updated')
            return res;
        }).catch((err) => {
            console.log(err.body);
        });
    }
}
