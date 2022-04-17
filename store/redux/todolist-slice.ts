import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomTheme } from "../../models/CustomTheme";
import { TodoList } from "../../models/todo-models/TodoList";

interface TodoListState {
    lists: TodoList[];
    updateCount: number;
    currentActiveList: TodoList | null;
    currentActiveTheme: CustomTheme | null;
}

const initialState: TodoListState = {
    lists: [],
    updateCount: 0,
    currentActiveList: null,
    currentActiveTheme: null,
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
        setActiveList(state, action: PayloadAction<TodoList | null>) {
            const activeList = action.payload;
            state.currentActiveList = activeList;
        },
        setActiveTheme(state, action: PayloadAction<CustomTheme | null>) {
            state.currentActiveTheme = action.payload;
        },
    },
});

export const todoListActions = todoListSlice.actions;

export default todoListSlice;
