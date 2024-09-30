import { useEffect, useState } from "react";
import "./App.css";
import axios from "./utils/axiosInstance";
import AddNewGroup from "./components/modals/AddNewGroup";
import { DragDropContext, DropResult } from "@hello-pangea/dnd"; // Import drag-and-drop components
import DragDropItem from "./components/DragDropItem";

export type TodosType = {
    id: number;
    title: string;
    created_by: string;
    created_at: Date;
    updated_at: Date;
    description?: string;
    items: ItemsType[]; // Include items in TodosType
};

export type ItemsType = {
    id: number;
    name: string;
    done?: boolean;
    todo_id: number;
    created_at: Date;
    updated_at: Date;
    progress_percentage: number;
};

const App = () => {
    const [todos, setTodos] = useState<TodosType[]>([]);

    const fetchTodosAndItems = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_RAKAMIN_BASE_URL}/todos`
            );
            const todosData = res.data;

            const itemsRequests = todosData.map((todo: TodosType) =>
                axios.get(
                    `${import.meta.env.VITE_RAKAMIN_BASE_URL}/todos/${
                        todo.id
                    }/items`
                )
            );
            const itemsResponses = await Promise.all(itemsRequests);

            const todosWithItems = todosData.map(
                (todo: TodosType, index: number) => ({
                    ...todo,
                    items: itemsResponses[index].data,
                })
            );

            setTodos(todosWithItems);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTodosAndItems();
    }, []);

    const onDragEnd = async (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return; // If no destination, do nothing

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return; // If dropped in the same place, do nothing
        }

        const sourceTodoIndex = todos.findIndex(
            (todo) => todo.id.toString() === source.droppableId
        );
        const destinationTodoIndex = todos.findIndex(
            (todo) => todo.id.toString() === destination.droppableId
        );

        // Clone the source and destination Todos
        const sourceTodo = { ...todos[sourceTodoIndex] };
        const destinationTodo = { ...todos[destinationTodoIndex] };

        // Remove item from source Todo
        const [movedItem] = sourceTodo.items.splice(source.index, 1);
        // Update the todo_id of the item
        movedItem.todo_id = parseInt(destination.droppableId);

        // Add item to the destination Todo
        destinationTodo.items.splice(destination.index, 0, movedItem);

        // Update the state with new Todos
        const updatedTodos = [...todos];
        updatedTodos[sourceTodoIndex] = sourceTodo;
        updatedTodos[destinationTodoIndex] = destinationTodo;
        setTodos(updatedTodos);

        try {
            await axios.put(
                `${import.meta.env.VITE_RAKAMIN_BASE_URL}/todos/${
                    source.droppableId
                }/items/${movedItem.id}`,
                { target_todo_id: destination.droppableId }
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <header className="px-5 py-[18px] flex items-center gap-[10px] font-bold w-[1400px] mx-auto">
                <h1 className="text-lg text-color-black-primary">
                    Product Roadmap
                </h1>
                <AddNewGroup />
            </header>
            <hr className="border-color-black/40" />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-4 gap-4 p-6  w-[1400px] mx-auto">
                    {/* DISPLAY ALL TODOS */}
                    {todos?.map((todo, index) => (
                        <DragDropItem
                            todosLength={todos.length}
                            todo={todo}
                            index={index}
                        />
                    ))}
                </div>
            </DragDropContext>
        </>
    );
};

export default App;
