import { remultNextApp } from "remult/remult-next";
import { createPostgresDataProvider } from "remult/postgres";
import { Task } from "../demo/todo/Task";
import { getUserFromRequest } from "./auth";
import { User } from "../demo/auth/User";
import { Item } from '@/shared/entities/Item';

export const api = remultNextApp({
  getUser: getUserFromRequest,
  initApi: async () => {
    await User.createDemoUsers();
  },
  dataProvider: createPostgresDataProvider({
    connectionString: process.env["DATABASE_URL"]
  }),
  admin: true,
  entities: [Task, User, Item],
});