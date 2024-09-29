import { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import ModalTemplate from "./ModalTemplate";
import { FiTrash2 } from "react-icons/fi";
import { PiWarningBold } from "react-icons/pi";

interface DeleteTaskType {
    todo_id: number;
    item_id: number;
}

const DeleteTask = ({ todo_id, item_id }: DeleteTaskType) => {
    const [toggleModal, setToggleModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setToggleModal(false);
    };

    const deleteTask = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        try {
            await axios.delete(
                `${
                    import.meta.env.VITE_RAKAMIN_BASE_URL
                }/todos/${todo_id}/items/${item_id}`
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
                className="flex items-center p-4 gap-4 text-color-black hover:text-color-danger transition-colors"
                onClick={() => setToggleModal(true)}
            >
                <FiTrash2 />
                <p className="text-sm font-semibold">Delete</p>
            </button>

            {/* Background */}
            <ModalTemplate
                toggleModal={toggleModal}
                modalIcon={
                    <PiWarningBold className="text-color-danger text-2xl" />
                }
                modalTitle="Delete Task"
                closeModal={closeModal}
            >
                <p className="text-sm -mt-2 px-6 text-color-black">
                    Are you sure want to delete this task? your action can’t be
                    reverted.
                </p>
                <div className="flex justify-end items-center rounded-b-[10px] px-6 pb-6 pt-4 gap-[10px] font-bold text-sm">
                    <button
                        className="px-4 py-1 border text-color-black border-color-black/15 rounded-lg"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-1 text-white bg-color-danger rounded-lg"
                        onClick={deleteTask}
                    >
                        Delete
                    </button>
                </div>
            </ModalTemplate>
        </>
    );
};

export default DeleteTask;
