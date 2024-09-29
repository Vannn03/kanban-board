import { useCallback, useEffect, useState } from "react";
import "./App.css";
import axios from "./utils/axiosInstance";
import { FaCircleCheck } from "react-icons/fa6";
import SurveyDialogMenu from "./components/SurveyDialogMenu";
import AddNewGroup from "./components/modals/AddNewGroup";
import CreateTask from "./components/modals/CreateTask";

type TodosType = {
    id: number;
    title: string;
    created_by: string;
    created_at: Date;
    updated_at: Date;
    description?: string;
};

type ItemsType = {
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
    const [items, setItems] = useState<Record<number, ItemsType[]>>({});

    // Fetch all Todos
    const fetchTodos = useCallback(async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_RAKAMIN_BASE_URL}/todos`
            );
            setTodos(res.data);

            // Fetch items for each todo
            res.data.forEach((todo: TodosType) => {
                fetchItems(todo.id);
            });
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const fetchItems = async (todo_id: number) => {
        try {
            const res = await axios.get(
                `${
                    import.meta.env.VITE_RAKAMIN_BASE_URL
                }/todos/${todo_id}/items`
            );
            setItems((prevItems) => ({
                ...prevItems,
                [todo_id]: res.data,
            }));
        } catch (error) {
            console.error(error);
        }
    };

    // Function to get color class based on index
    const getColorClass = (index: number) => {
        const colors = [
            "bg-color-primary/5 text-color-primary border-color-primary",
            "bg-color-secondary/5 text-color-secondary border-color-secondary",
            "bg-color-danger/5 text-color-danger border-color-danger",
            "bg-color-success/5 text-color-success border-color-success",
        ];
        return colors[index % colors.length];
    };

    return (
        <>
            <header className="px-5 py-[18px] flex items-center gap-2 border border-color-black/40 font-bold">
                <h1 className="text-lg">Product Roadmap</h1>
                <AddNewGroup />
            </header>
            <div className="grid grid-cols-4 gap-4 p-6">
                {/* DISPLAY ALL TODOS */}
                {todos?.map((todo, index) => (
                    <div
                        key={todo.id}
                        className={`rounded p-4 border flex flex-col gap-2 h-fit ${getColorClass(
                            index
                        )}`}
                    >
                        <h1
                            className={`border rounded px-2 py-[2px] w-fit ${getColorClass(
                                index
                            )} bg-opacity-0`}
                        >
                            {todo.title}
                        </h1>
                        <p className="text-xs font-bold text-color-black/90">
                            {todo.description}
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                            {/* DISPLAY ALL ITEMS IN EACH TODO */}
                            {items[todo.id]?.length ? (
                                items[todo.id].map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded border p-4 flex flex-col gap-2 bg-color-black/5 border-color-black/15"
                                    >
                                        <h3 className="font-bold text-sm text-color-black">
                                            {item.name}
                                        </h3>
                                        <hr className="border border-dashed border-color-black/15" />
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-[12px]">
                                                {item.progress_percentage ===
                                                100 ? (
                                                    <>
                                                        <progress
                                                            value={
                                                                item.progress_percentage
                                                            }
                                                            max="100"
                                                            className="completed"
                                                        ></progress>
                                                        <FaCircleCheck className="text-color-success" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <progress
                                                            value={
                                                                item.progress_percentage
                                                            }
                                                            max="100"
                                                            className="onprogress"
                                                        ></progress>
                                                        <p className="text-xs text-color-black">
                                                            {
                                                                item.progress_percentage
                                                            }
                                                            %
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            <SurveyDialogMenu
                                                todo_index={index}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded border px-4 py-2 bg-color-black/5 border-color-black/15">
                                    <p className="text-sm text-color-black">
                                        No tasks
                                    </p>
                                </div>
                            )}
                        </div>
                        <CreateTask todo_id={todo.id} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default App;
