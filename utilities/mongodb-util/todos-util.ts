import { MongoClient, ObjectId, WithId } from "mongodb";
import { NoIdSubTodo } from "../../models/todo-models/SubTodo";
import { NoIdTodo, TodoProps } from "../../models/todo-models/Todo";
import { TodoList, TodoListProperties } from "../../models/todo-models/TodoList";
import { SubItemProps } from "../../models/utility-models";
import { TodoListCollection, TodoCollection, SubTodoCollection } from "./mongodb-constant";

// General
export async function deleteItem(client: MongoClient, id: string, collection: string) {
    const db = client.db();
    const res = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    return res;
}

export async function updateItem(
    client: MongoClient,
    id: string,
    updatedProps: object,
    collection: string,
) {
    const db = client.db();
    const res = await db
        .collection(collection)
        .updateOne({ _id: new ObjectId(id) }, { $set: { ...updatedProps } });
    return res;
}

export async function insertItem(client: MongoClient, newItem: object, collection: string) {
    const db = client.db();
    const res = await db.collection(collection).insertOne(newItem);
    return res;
}
////////////////////////////////////////////
///////////////////////////////////////////

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
export async function insertTodo(client: MongoClient, newTodo: NoIdTodo) {
    return await insertItem(client, newTodo, TodoCollection);
}

export async function updateTodo(client: MongoClient, todoId: string, updatedProps: TodoProps) {
    const db = client.db();
    const res = await db
        .collection(TodoCollection)
        .updateOne({ _id: new ObjectId(todoId) }, { $set: { ...updatedProps } });
    return res;
}

// Make sure to delete its sub todos
export async function deleteTodo(client: MongoClient, todoId: string) {
    const promise1 = deleteItem(client, todoId, TodoCollection);
    const db = client.db();
    const promise2 = db.collection(SubTodoCollection).deleteMany({ parentId: todoId });
    return await Promise.all([promise1, promise2]);
}

// SubTodos
export async function getSubTodos(client: MongoClient, todoId: string) {
    const db = client.db();
    return await db.collection(SubTodoCollection).find({ parentId: todoId }).toArray();
}

export async function insertSubTodo(client: MongoClient, subTodo: NoIdSubTodo) {
    return await insertItem(client, subTodo, SubTodoCollection);
}

export async function updateSubTodo(
    client: MongoClient,
    subTodoId: string,
    updatedProps: SubItemProps,
) {
    return await updateItem(client, subTodoId, updatedProps, SubTodoCollection);
}

export async function deleteSubTodo(client: MongoClient, subTodoId: string) {
    return await deleteItem(client, subTodoId, SubTodoCollection);
}
