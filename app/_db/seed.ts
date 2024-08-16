// db/seed.ts
import { db, client } from './index';
import { users, accounts, posts, categories, userNotes, userNoteTags, tags } from './schema';
import { sql } from 'drizzle-orm';


const seed = async () => {
    // 全てのテーブルのデータを削除
    await db.delete(userNoteTags);
    await db.delete(userNotes);
    await db.delete(posts);
    await db.delete(categories);
    await db.delete(tags);
    // await db.delete(users);
    await db.delete(accounts);

    await db.insert(accounts).values({
        id: 'b0a6c309-a047-4d21-9b41-49d8b0eb5e23',
    })
    await db.insert(categories).values([
        {
            id: 'A2BF75E4-7E59-2A00-89C9-E77E1A2D34A5',
            accountId: 'b0a6c309-a047-4d21-9b41-49d8b0eb5e23', // 既存のユーザーIDを使用
            name: 'エンジニアリング',
            colorCode: '#FF5733',
            createdAt: sql`now()`,
            updatedAt: sql`now()`,
        },
        {
            id: 'c06327e6-e9f0-8df5-b7e1-cf7a615bc162',
            accountId: 'b0a6c309-a047-4d21-9b41-49d8b0eb5e23', // 既存のユーザーIDを使用
            name: 'デザイン',
            colorCode: '#33FF57',
            createdAt: sql`now()`,
            updatedAt: sql`now()`,
        }
    ]);

    await db.insert(posts).values([
        {
            id: '48b889b3-a0d9-56ed-fc45-a408aa074df5',
            categoryId: 'A2BF75E4-7E59-2A00-89C9-E77E1A2D34A5', // 既存のカテゴリーIDを使用
            accountId: 'b0a6c309-a047-4d21-9b41-49d8b0eb5e23', // 既存のユーザーIDを使用
            title: 'ダミー投稿1',
            description: 'ダミー投稿1の説明',
            ogp: 'https://example.com/ogp1.jpg',
            url: 'https://example.com/post1',
            createdAt: sql`now()`,
            updatedAt: sql`now()`,
        },
        {
            id: '1a8deef3-1201-f42e-540f-45fdffae1324',
            categoryId: 'c06327e6-e9f0-8df5-b7e1-cf7a615bc162', // 既存のカテゴリーIDを使用
            accountId: 'b0a6c309-a047-4d21-9b41-49d8b0eb5e23', // 既存のユーザーIDを使用
            title: 'ダミー投稿2',
            description: 'ダミー投稿2の説明',
            ogp: 'https://example.com/ogp2.jpg',
            url: 'https://example.com/post2',
            createdAt: sql`now()`,
            updatedAt: sql`now()`,
        }
    ]);


    await db.insert(userNotes).values([
        {
            id: '3a9d5301-33ba-d762-8002-f1751e5e6577',
            postId: '48b889b3-a0d9-56ed-fc45-a408aa074df5', // 既存の投稿IDを使用
            accountId: 'b0a6c309-a047-4d21-9b41-49d8b0eb5e23', // 既存のユーザーIDを使用
            content: 'これは最初のユーザーノートです。とても興味深い内容でした。',
            createdAt: sql`now()`,
            updatedAt: sql`now()`,
        },
        {
            id: '5f9f20fb-3dd6-7274-5e19-907027254928',
            postId: '1a8deef3-1201-f42e-540f-45fdffae1324', // 既存の投稿IDを使用
            accountId: 'b0a6c309-a047-4d21-9b41-49d8b0eb5e23', // 既存のユーザーIDを使用
            content: '二つ目のノートです。さらに詳しく調べる必要がありそうです。',
            createdAt: sql`now()`,
            updatedAt: sql`now()`,
        }
    ]);

    await db.insert(tags).values([
        {
            id: '1357f428-a510-8b9f-471f-f9ad027b4e77',
            accountId: 'b0a6c309-a047-4d21-9b41-49d8b0eb5e23', // 既存のユーザーIDを使用
            name: '重要',
            colorCode: '#000000',
            createdAt: sql`now()`,
            updatedAt: sql`now()`,
        },
        {
            id: '5bb49a90-54c0-7c8f-ceea-958438aa388b',
            accountId: 'b0a6c309-a047-4d21-9b41-49d8b0eb5e23', // 既存のユーザーIDを使用
            name: '後で読む',
            colorCode: '#00008B',
            createdAt: sql`now()`,
            updatedAt: sql`now()`,
        },
        {
            id: '15aacb18-faf8-dbe7-1eeb-019bfb75792c',
            accountId: 'b0a6c309-a047-4d21-9b41-49d8b0eb5e23', // 既存のユーザーIDを使用
            name: 'お気に入り',
            colorCode: '#006400',
            createdAt: sql`now()`,
            updatedAt: sql`now()`,
        }
    ]);


    await db.insert(userNoteTags).values([
        {
            userNoteId: '3a9d5301-33ba-d762-8002-f1751e5e6577', // 既存のユーザーノートIDを使用
            tagId: '1357f428-a510-8b9f-471f-f9ad027b4e77', // 既存のタグIDを使用
            createdAt: sql`now()`,
            updatedAt: sql`now()`,
        },
        {
            userNoteId: '5f9f20fb-3dd6-7274-5e19-907027254928', // 既存のユーザーノートIDを使用
            tagId: '5bb49a90-54c0-7c8f-ceea-958438aa388b', // 既存のタグIDを使用
            createdAt: sql`now()`,
            updatedAt: sql`now()`,
        }
    ]);

    await client.end();
}

seed();