import { MongoClient, ObjectId, WithId } from "mongodb";
import { NoIdTodo, TodoProps } from "../../models/todo-models/Todo";
import { TodoList, TodoListProperties } from "../../models/todo-models/TodoList";
import { TodoListCollection, TodoCollection } from "./mongodb-constant";

export async function insertTodoList(client: MongoClient, list: TodoList) {
    const listNoId: { id?: string } = { ...list };
    delete listNoId["id"];
    const db = client.db();
    const res = await db.collection(TodoListCollection).insertOne(listNoId);
    return res;
}

export async function updateTodoListProps(
    client: MongoClient,
    listId: string,
    updatedListProps: TodoListProperties,
) {
    const db = client.db();
    const res = await db
        .collection(TodoListCollection)
        .updateOne({ _id: new ObjectId(listId) }, { $set: { ...updatedListProps } });
    return res;
}

export async function getTodoListAndItems(client: MongoClient, listId: string) {
    const db = client.db();
    const listPromise = db.collection(TodoListCollection).findOne({ _id: new ObjectId(listId) });
    const todosPromise = db.collection(TodoCollection).find({ listId }).toArray();

    return await Promise.all([listPromise, todosPromise]);
}

export async function getAllTodoLists(client: MongoClient, userId: string) {
    const db = client.db();
    const res = await db.collection(TodoListCollection).find({ userId }).toArray();
    return res;
}

// Todo object CRUD
export async function postTodo(client: MongoClient, newTodo: NoIdTodo) {
    const db = client.db();
    const res = await db.collection(TodoCollection).insertOne(newTodo);
    return res;
}

export async function updateTodo(client: MongoClient, todoId: string, updatedProps: TodoProps) {
    const db = client.db();
    const res = await db
        .collection(TodoCollection)
        .updateOne({ _id: new ObjectId(todoId) }, { $set: { ...updatedProps } });
    return res;
}

export async function deleteTodo(client: MongoClient, todoId: string) {
    const db = client.db();
    const res = await db.collection(TodoCollection).deleteOne({ _id: new ObjectId(todoId) });
    return res;
}
