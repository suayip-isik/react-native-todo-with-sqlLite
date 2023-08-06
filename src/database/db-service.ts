import {
  SQLiteDatabase,
  enablePromise,
  openDatabase,
} from 'react-native-sqlite-storage';
import {
  CREATE_TABLE,
  DELETE_TODO,
  DELETE_TABLE,
  INSERT_OR_UPDATE_TODO,
  SELECT_TODOS,
} from '../constants';
import {DATABASE_NAME, LOCATION} from './config';
import {IToDoItem} from '../models';

enablePromise(true);

export const getDbConnection = async () =>
  openDatabase({name: DATABASE_NAME, location: LOCATION});

export const createTable = async (db: SQLiteDatabase) => {
  await db.executeSql(CREATE_TABLE);
};

export const getToDoItems = async (
  db: SQLiteDatabase,
): Promise<IToDoItem[]> => {
  try {
    const todoItems: IToDoItem[] = [];
    const results = await db.executeSql(SELECT_TODOS);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index));
      }
    });
    return todoItems;
  } catch (error) {
    console.log(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveToDoItems = async (
  db: SQLiteDatabase,
  todoItems: IToDoItem[],
) => db.executeSql(INSERT_OR_UPDATE_TODO(todoItems));

export const deleteToDoItem = async (db: SQLiteDatabase, id: number) =>
  db.executeSql(DELETE_TODO(id));

export const deleteTable = async (db: SQLiteDatabase, tableName: string) =>
  db.executeSql(DELETE_TABLE(tableName));
