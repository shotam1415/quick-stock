import { pgSchema, pgTable, uuid, text, varchar, jsonb, timestamp, primaryKey } from 'drizzle-orm/pg-core';
const authSchema = pgSchema('auth');
export const users = authSchema.table('users', {
    id: uuid('id').primaryKey(),
});
import { relations } from 'drizzle-orm';
export const accounts = pgTable('accounts', {
    id: uuid("id").primaryKey().references(() => users.id).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp("deletedAt"),
});

export const usersRelations = relations(accounts, ({ many }) => ({
    posts: many(posts),
}));

// posts テーブル
export const posts = pgTable("posts", {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("categoryId").notNull().references(() => categories.id),
    accountId: uuid("accountId").notNull().references(() => accounts.id),
    title: text("title"),
    description: text("description"),
    ogp: text("ogp"),
    url: text("url"),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp("deletedAt"),
});

export const postsCategoryRelations = relations(posts, ({ one }) => ({
    category: one(categories, { fields: [posts.categoryId], references: [categories.id] }),
}));

export const postsCreatedUserRelations = relations(posts, ({ one }) => ({
    account: one(accounts, { fields: [posts.accountId], references: [accounts.id] }),
}));

export const postsNoteRelations = relations(posts, ({ one }) => ({
    userNote: one(userNotes, { fields: [posts.id], references: [userNotes.postId] }),
}));


// categories テーブル
export const categories = pgTable("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    accountId: uuid("accountId").notNull().references(() => accounts.id),
    name: text("name"),
    colorCode: text("colorCode"),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp("deletedAt"),
});

export const categoriesUserRelations = relations(categories, ({ one }) => ({
    account: one(accounts, { fields: [categories.accountId], references: [accounts.id] }),
}));


// userNotes テーブル
export const userNotes = pgTable("userNotes", {
    id: uuid("id").primaryKey().defaultRandom(),
    postId: uuid("postId").notNull().references(() => posts.id),
    accountId: uuid("accountId").notNull().references(() => accounts.id),
    content: varchar("content"),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
});

export const userNotesPostRelations = relations(userNotes, ({ one }) => ({
    post: one(posts, { fields: [userNotes.postId], references: [posts.id] }),
}));
export const userNotesUserRelations = relations(userNotes, ({ one }) => ({
    account: one(accounts, { fields: [userNotes.accountId], references: [accounts.id] }),
}));

// userNoteTags テーブル
export const userNoteTags = pgTable("userNoteTags", {
    userNoteId: uuid("userNoteId").notNull().references(() => userNotes.id),
    tagId: uuid("tagId").notNull().references(() => tags.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date())
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.tagId, table.userNoteId] }),
    };
});

export const userNoteTagsUserNoteRelations = relations(userNoteTags, ({ one }) => ({
    userNote: one(userNotes, { fields: [userNoteTags.userNoteId], references: [userNotes.id] }),
}));

export const userNoteTagsTagRelations = relations(userNoteTags, ({ one }) => ({
    tag: one(tags, { fields: [userNoteTags.tagId], references: [tags.id] }),
}));

// tags テーブル
export const tags = pgTable("tags", {
    id: uuid("id").primaryKey().defaultRandom(),
    accountId: uuid("accountId").references(() => accounts.id),
    name: text("name"),
    colorCode: text("colorCode"),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp("deletedAt"),
});

export const tagsUserRelations = relations(tags, ({ one }) => ({
    account: one(accounts, { fields: [tags.accountId], references: [accounts.id] }),
}));

export type InsertUser = typeof accounts.$inferInsert;
export type SelectUser = typeof accounts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;
export type InsertUserNote = typeof userNotes.$inferInsert;
export type SelectUserNote = typeof userNotes.$inferSelect;
export type InsertUserNoteTag = typeof userNoteTags.$inferInsert;
export type SelectUserNoteTag = typeof userNoteTags.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;
export type SelectTag = typeof tags.$inferSelect;
