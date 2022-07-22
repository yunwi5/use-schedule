import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useMutation } from 'react-query';

import { SortingDirection, SubItemSort } from '../../../models/sorting-models';
import { NoIdSubTodo, SubTodo } from '../../../models/todo-models/SubTodo';
import { SubItem, SubItemProps } from '../../../models/utility-models';
import { sortSubItems } from '../../../utilities/sort-utils/sub-item-sort';
import { SubItemCard, SubItemForm, SubItemSorter } from '../../sub-items';
import useArray from '../../../hooks/useArray';

interface Props {
    todoId: string;
    isEditing: boolean;
}

const API_TODO_DOMAIN = '/api/todos/todo';
const API_SUBTODO_DOMAIN = '/api/todos/sub-todo';

async function fetchSubTodos(context: any) {
    const [name, todoId] = context.queryKey;
    return (await axios.get<{ subTodos: SubTodo[] }>(`${API_TODO_DOMAIN}/${todoId}`)).data;
}

const SubTodoList: React.FC<Props> = (props) => {
    const { isEditing, todoId } = props;

    const { data, refetch } = useQuery(['sub-todos', todoId], fetchSubTodos, {
        enabled: false,
    });

    const subTodos: SubTodo[] = useMemo(() => (data ? data.subTodos : []), [data]);

    // For better performance. Update sub todo list before hitting the backend.
    // User sees immediate update.
    const {
        array: localSubTodos,
        setArray: setLocalSubTodos,
        addItem,
        editItem,
        deleteItem,
    } = useArray(subTodos);

    const [sortingStandard, setSortingStandard] = useState<SubItemSort | null>(null);
    const [sortingDirection, setSortingDirection] = useState<SortingDirection | undefined>(
        undefined,
    );

    const invalidateSubTodos = useCallback(() => refetch(), [refetch]);

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

    const deleteSubTodoHandler = useCallback(
        (id: string) => {
            deleteMutation.mutate(id);
            deleteItem(id);
        },
        [deleteMutation, deleteItem],
    );

    const patchSubTodoHandler = useCallback(
        async (subTodoId: string, subTodoProps: SubItemProps) => {
            patchMutation.mutate({ subTodoId, subTodoProps });
            // local state update
            editItem(subTodoId, subTodoProps);
        },
        [patchMutation, editItem],
    );

    const addSubTodoHandler = (text: string) => {
        const newTodo: SubTodo = {
            id: uuidv4(),
            name: text,
            order: subTodos.length + 1,
            isImportant: false,
            isCompleted: false,
            parentId: todoId,
        };
        postMutation.mutate(newTodo);
        addItem(newTodo);
    };

    const sortingHandler = (standard: SubItemSort, direction?: SortingDirection) => {
        setSortingStandard(standard);
        setSortingDirection(direction ?? SortingDirection.Descending);
    };

    const sortedSubTodos = useMemo(() => {
        if (!sortingStandard) return localSubTodos;
        return sortSubItems(
            [...localSubTodos],
            sortingStandard,
            sortingDirection,
        ) as SubItem[];
    }, [localSubTodos, sortingStandard, sortingDirection]);

    useEffect(() => {
        if (subTodos.length === localSubTodos.length) {
            setLocalSubTodos(subTodos);
        }
    }, [subTodos, localSubTodos, setLocalSubTodos]);

    return (
        <section className="pl-[1rem] flex flex-col gap-2">
            <div className="flex justify-between items-center lg:max-w-[95%]">
                <h3 className="text-slate-600 font-semibold text-xl">Steps</h3>
                <SubItemSorter onSort={sortingHandler} />
            </div>
            {sortedSubTodos.length > 0 && (
                <div className="flex flex-col gap-[2px] mb-3">
                    {sortedSubTodos.map((subTodo) => (
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
