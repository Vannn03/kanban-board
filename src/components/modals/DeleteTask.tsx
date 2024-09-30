import { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import ModalTemplate from "./ModalTemplate";
import { FiTrash2 } from "react-icons/fi";
import { PiWarningBold } from "react-icons/pi";
import { closeModal, openModal } from "../../utils/toggleModal";

interface DeleteTaskType {
    todo_id: number;
    item_id: number;
}

const DeleteTask = ({ todo_id, item_id }: DeleteTaskType) => {
    const [toggleModal, setToggleModal] = useState<boolean>(false);
    const navigate = useNavigate();

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
                className="flex items-center px-4 py-[6px] gap-4 text-color-black-menu hover:text-color-danger transition-colors"
                onClick={(e) => openModal(e, setToggleModal)}
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
                closeModal={(e) => closeModal(e, setToggleModal)}
            >
                <p className="text-sm -mt-2 px-6 text-color-black-secondary">
                    Are you sure want to delete this task? your action can’t be
                    reverted.
                </p>
                <div className="flex justify-end items-center rounded-b-[10px] px-6 pb-6 pt-4 gap-[10px] font-bold text-sm">
                    <button
                        className="px-4 py-1 border text-color-black-primary border-color-white-tertiary shadow-cancel-button rounded-lg"
                        onClick={(e) => closeModal(e, setToggleModal)}
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
