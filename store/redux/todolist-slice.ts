import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoList } from "../../models/todo-models/TodoList";

interface TodoListState {
    lists: TodoList[];
    updateCount: number;
    currentActiveList: TodoList | null;
}

const initialState: TodoListState = {
    lists: [],
    updateCount: 0,
    currentActiveList: null,
};

const todoListSlice = createSlice({
    // name does not matter?
    name: "todo-list",
    initialState,
    reducers: {
        callUpdate(state) {
            state.updateCount++;
        },
        setTodoLists(state, action: PayloadAction<TodoList[]>) {
            state.lists = action.payload;
        },
        setActiveTemplate(state, action: PayloadAction<TodoList | null>) {
            const activeList = action.payload;
            state.currentActiveList = activeList;
        },
    },
});

export const todoListActions = todoListSlice.actions;

export default todoListSlice;
