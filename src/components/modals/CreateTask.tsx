import { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import ModalTemplate from "./ModalTemplate";
import { FiPlusCircle } from "react-icons/fi";
import { closeModal, openModal } from "../../utils/toggleModal";

interface CreateTaskType {
    todo_id: number;
}

const CreateTask = ({ todo_id }: CreateTaskType) => {
    const [toggleModal, setToggleModal] = useState<boolean>(false);
    const [taskName, setTaskName] = useState<string>("");
    const [progress, setProgress] = useState<string>("");
    const navigate = useNavigate();

    const createTask = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        if (taskName == "" || progress == "") return;

        try {
            await axios.post(
                `${
                    import.meta.env.VITE_RAKAMIN_BASE_URL
                }/todos/${todo_id}/items`,
                {
                    name: taskName,
                    progress_percentage: parseInt(
                        progress.slice(0, progress.length - 1)
                    ),
                }
            );

            setTaskName("");
            setProgress("");
            setToggleModal(false);
            navigate(0);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <button
                className="w-fit flex items-center gap-[5px] text-xs text-color-black-primary"
                onClick={(e) => openModal(e, setToggleModal)}
            >
                <FiPlusCircle className="text-lg" />
                New Task
            </button>

            {/* Background */}
            <ModalTemplate
                toggleModal={toggleModal}
                modalTitle="Create Task"
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
                                placeholder="Type your Task"
                                className="px-4 py-2 border-2 border-color-white-tertiary rounded-lg focus:border-color-primary/20 active:border-color-primary font-normal"
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                        </span>
                        <span className="flex flex-col gap-2 text-color-black-secondary">
                            <label htmlFor="progress" className="font-bold">
                                progress
                            </label>
                            <input
                                id="progress"
                                placeholder="70%"
                                className="px-4 py-2 border-2 border-color-white-tertiary rounded-lg focus:border-color-primary/20 active:border-color-primary font-normal"
                                onChange={(e) => setProgress(e.target.value)}
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
                            onClick={createTask}
                        >
                            Save Task
                        </button>
                    </div>
                </form>
            </ModalTemplate>
        </>
    );
};

export default CreateTask;
