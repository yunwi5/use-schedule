import axios from "axios";
import React, { useCallback, useState } from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { SortingDirection, SubItemSort } from "../../../models/sorting-models";
import { NoIdSubTodo, SubTodo } from "../../../models/todo-models/SubTodo";
import { SubItemProps } from "../../../models/utility-models";
import { sortSubItems } from "../../../utilities/sort-utils/sub-item-sort";
import { SubItemCard, SubItemForm, SubItemSorter } from "../../sub-items";

interface Props {
    todoId: string;
    isEditing: boolean;
}

const API_TODO_DOMAIN = "/api/todos/todo";
const API_SUBTODO_DOMAIN = "/api/todos/sub-todo";

async function fetchSubTodos(context: any) {
    const [name, todoId] = context.queryKey;
    return (await axios.get<{ subTodos: SubTodo[] }>(`${API_TODO_DOMAIN}/${todoId}`)).data;
}

const SubTodoList: React.FC<Props> = (props) => {
    const { isEditing, todoId } = props;

    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery(["sub-todos", todoId], fetchSubTodos, {
        enabled: !!todoId,
    });
    const subTodos: SubTodo[] = data ? data.subTodos : [];
    const [sortedSubTodos, setSortedSubTodos] = useState(subTodos);

    const invalidateSubTodos = useCallback(
        () => queryClient.invalidateQueries("sub-todos"),
        [queryClient],
    );

    const postMutation = useMutation(
        (newTodo: NoIdSubTodo) => {
            return axios.post(`${API_SUBTODO_DOMAIN}`, newTodo);
        },
        {
            onSuccess: invalidateSubTodos,
        },
    );

    const patchMutation = useMutation(
        ({ subTodoId, subTodoProps }: { subTodoId: string; subTodoProps: SubItemProps }) => {
            return axios.patch(`${API_SUBTODO_DOMAIN}/${subTodoId}`, subTodoProps);
        },
        {
            onSuccess: invalidateSubTodos,
        },
    );

    const deleteMutation = useMutation(
        (subTodoId: string) => {
            return axios.delete(`${API_SUBTODO_DOMAIN}/${subTodoId}`);
        },
        {
            onSuccess: invalidateSubTodos,
        },
    );

    const deleteSubTodoHandler = (id: string) => {
        console.log("Delete todo");
        deleteMutation.mutate(id);
    };

    const patchSubTodoHandler = useCallback(
        async (subTodoId: string, subTodoProps: SubItemProps) => {
            console.log("patch: ", subTodoProps);
            patchMutation.mutate({ subTodoId, subTodoProps });
        },
        [patchMutation],
    );

    const addSubTodoHandler = (text: string) => {
        const newTodo: NoIdSubTodo = {
            name: text,
            order: subTodos.length + 1,
            isImportant: false,
            isCompleted: false,
            parentId: todoId,
        };
        console.log("new todo:", newTodo);
        postMutation.mutate(newTodo);
    };

    const sortingHandler = (standard: SubItemSort, direction?: SortingDirection) => {
        const [...sortedList] = sortSubItems(subTodos, standard, direction);
        setSortedSubTodos(sortedList as SubTodo[]);
    };

    return (
        <section className='pl-[1rem] flex flex-col gap-2'>
            <div className='flex justify-between items-center lg:max-w-[95%]'>
                <h3 className='text-slate-600 font-semibold text-xl'>Steps</h3>
                <SubItemSorter onSort={sortingHandler} />
            </div>
            {subTodos.length > 0 && (
                <div className='flex flex-col gap-[2px] mb-3'>
                    {subTodos.map((subTodo) => (
                        <SubItemCard
                            key={subTodo.id}
                            subItem={subTodo}
                            onDelete={deleteSubTodoHandler}
                            onPatchNewProps={patchSubTodoHandler}
                            isEditMode={isEditing}
                        />
                    ))}
                </div>
            )}
            <SubItemForm onAdd={addSubTodoHandler} />
        </section>
    );
};

export default SubTodoList;
