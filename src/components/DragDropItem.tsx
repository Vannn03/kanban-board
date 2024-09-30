import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FaCircleCheck } from "react-icons/fa6";
import SurveyDialogMenu from "../components/SurveyDialogMenu";
import CreateTask from "../components/modals/CreateTask";
import { TodosType } from "../App";

interface DragDropItemType {
    todosLength: number;
    todo: TodosType;
    index: number;
}

const DragDropItem = ({ todosLength, todo, index }: DragDropItemType) => {
    // Function to get color class based on index
    const getColorClass = (index: number) => {
        const colors = [
            "bg-color-surface-primary text-color-primary border-color-primary",
            "bg-color-surface-secondary text-color-secondary border-color-border-secondary",
            "bg-color-surface-danger text-color-danger border-color-border-danger",
            "bg-color-surface-success text-color-success border-color-border-success",
        ];
        return colors[index % colors.length];
    };

    return (
        <Droppable droppableId={todo.id.toString()} key={todo.id}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`rounded p-4 border flex flex-col gap-2 h-fit ${getColorClass(
                        index
                    )}`}
                >
                    <h1
                        className={`border rounded px-2 text-xs py-[2px] w-fit ${getColorClass(
                            index
                        )} bg-opacity-0`}
                    >
                        {todo.title}
                    </h1>
                    <p className="text-xs font-bold text-color-black-secondary">
                        {todo.description}
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                        {/* DISPLAY ALL ITEMS IN EACH TODO */}
                        {todo.items?.length ? (
                            todo.items.map((item, itemIndex) => (
                                <Draggable
                                    draggableId={item.id.toString()}
                                    index={itemIndex}
                                    key={item.id}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="rounded border p-4 flex flex-col gap-2 bg-color-white-secondary border-color-white-primary"
                                        >
                                            <h3 className="font-bold text-sm text-color-black-primary">
                                                {item.name}
                                            </h3>
                                            <hr className="border border-dashed border-color-white-primary" />
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
                                                            <p className="text-xs text-color-black-tertiary">
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
                                                    todosLength={todosLength}
                                                    todo_id={item.todo_id}
                                                    item_id={item.id}
                                                    taskName={item.name}
                                                    progress={`${item.progress_percentage}%`}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        ) : (
                            <div className="rounded border px-4 py-2 bg-color-white-secondary border-color-white-primary">
                                <p className="text-sm text-color-black-tertiary">
                                    No tasks
                                </p>
                            </div>
                        )}
                        {provided.placeholder}
                    </div>
                    <CreateTask todo_id={todo.id} />
                </div>
            )}
        </Droppable>
    );
};

export default DragDropItem;
