import {TABLE_NAME} from '../database/config';
import {IToDoItem} from '../models';

export const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
    value TEXT NOT NULL
);`;
export const SELECT_TODOS = `SELECT rowid as id,value FROM ${TABLE_NAME}`;

export const INSERT_OR_UPDATE_TODO = (todoItems: IToDoItem[]) =>
  `INSERT OR REPLACE INTO ${TABLE_NAME}(rowid, value) values` +
  todoItems.map(i => `(${i.id}, '${i.value}')`).join(',');

export const DELETE_TODO = (id: number) =>
  `DELETE from ${TABLE_NAME} where rowid = ${id}`;

export const DELETE_TABLE = (TABLE_NAME: string) => `drop table ${TABLE_NAME}`;
