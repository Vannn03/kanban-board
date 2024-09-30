import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import MoveTask from "./MoveTask";
import EditTask from "./modals/EditTask";
import DeleteTask from "./modals/DeleteTask";

interface SurveyDialogMenuType {
    todo_index: number;
    todosLength: number;
    todo_id: number;
    item_id: number;
    taskName: string;
    progress: string;
}

const SurveyDialogMenu = ({
    todo_index,
    todosLength,
    todo_id,
    item_id,
    taskName,
    progress,
}: SurveyDialogMenuType) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null); // Reference to the menu container

    // Close the dialog when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setToggleMenu(false); // Close menu if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="relative" ref={menuRef}>
            <span onClick={() => setToggleMenu((prev) => !prev)} className="">
                <IoIosMore className="text-2xl text-color-black-tertiary cursor-pointer hover:bg-color-white-tertiary transition-colors rounded" />
            </span>

            <div
                className={`rounded-lg px-2 bg-white shadow-dialog-menu flex flex-col w-80 absolute top-8 py-2 ${
                    todo_index % 4 === 3 ? "right-0" : "left-0"
                } ${
                    toggleMenu
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                } transition-opacity z-50`}
            >
                {todo_index < todosLength - 1 && (
                    <MoveTask
                        todo_id={todo_id}
                        item_id={item_id}
                        newTodoId={todo_id + 1}
                        menuIcon={<FaArrowRight />}
                        menuName="Move Right"
                    />
                )}
                {todo_index > 0 && (
                    <MoveTask
                        todo_id={todo_id}
                        item_id={item_id}
                        newTodoId={todo_id - 1}
                        menuIcon={<FaArrowLeft />}
                        menuName="Move Left"
                    />
                )}
                <EditTask
                    todo_id={todo_id}
                    item_id={item_id}
                    taskName={taskName}
                    progress={progress}
                />
                <DeleteTask todo_id={todo_id} item_id={item_id} />
            </div>
        </div>
    );
};

export default SurveyDialogMenu;
