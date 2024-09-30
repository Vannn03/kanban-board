import { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import ModalTemplate from "./ModalTemplate";
import { BiEditAlt } from "react-icons/bi";
import { closeModal, openModal } from "../../utils/toggleModal";

interface EditTaskType {
    todo_id: number;
    item_id: number;
    taskName: string;
    progress: string;
}

const EditTask = ({ todo_id, item_id, taskName, progress }: EditTaskType) => {
    const [toggleModal, setToggleModal] = useState<boolean>(false);
    const [newTaskName, setNewTaskName] = useState<string>(taskName);
    const [newProgress, setNewProgress] = useState<string>(progress);
    const navigate = useNavigate();

    const editTask = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        try {
            await axios.put(
                `${
                    import.meta.env.VITE_RAKAMIN_BASE_URL
                }/todos/${todo_id}/items/${item_id}`,
                {
                    target_todo_id: todo_id,
                    name: newTaskName,
                    progress_percentage: parseInt(
                        newProgress.slice(0, newProgress.length - 1)
                    ),
                }
            );

            setToggleModal(false);
            navigate(0);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <button
                className="flex items-center px-4 py-[6px] gap-4 text-color-black-menu hover:text-color-primary transition-colors"
                onClick={(e) => openModal(e, setToggleModal)}
            >
                <BiEditAlt />
                <p className="text-sm font-semibold">Edit</p>
            </button>

            {/* Background */}
            <ModalTemplate
                toggleModal={toggleModal}
                modalTitle="Edit Task"
                closeModal={(e) => closeModal(e, setToggleModal)}
            >
                <form>
                    <div className="px-6 flex flex-col gap-5 text-xs">
                        <span className="flex flex-col gap-2 text-color-black-secondary">
                            <label htmlFor="taskName" className="font-bold">
                                taskName
                            </label>
                            <input
                                type="text"
                                id="taskName"
                                value={newTaskName}
                                className="px-4 py-2 border-2 border-color-white-tertiary rounded-lg focus:border-color-primary/20 active:border-color-primary font-normal"
                                onChange={(e) => setNewTaskName(e.target.value)}
                            />
                        </span>
                        <span className="flex flex-col gap-2 text-color-black-secondary">
                            <label htmlFor="progress" className="font-bold">
                                progress
                            </label>
                            <input
                                id="progress"
                                value={newProgress}
                                className="px-4 py-2 border-2 border-color-white-tertiary rounded-lg focus:border-color-primary/20 active:border-color-primary font-normal"
                                onChange={(e) => setNewProgress(e.target.value)}
                            />
                        </span>
                    </div>

                    <div className="flex justify-end items-center rounded-b-[10px] p-6 gap-[10px] font-bold text-sm">
                        <button
                            className="px-4 py-1 border text-color-black-primary border-color-white-tertiary shadow-cancel-button rounded-lg"
                            onClick={(e) => closeModal(e, setToggleModal)}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-1 text-white bg-color-primary rounded-lg"
                            type="submit"
                            onClick={editTask}
                        >
                            Save Task
                        </button>
                    </div>
                </form>
            </ModalTemplate>
        </>
    );
};

export default EditTask;
