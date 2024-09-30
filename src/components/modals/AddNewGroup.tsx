import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import ModalTemplate from "./ModalTemplate";
import { closeModal, openModal } from "../../utils/toggleModal";

const AddNewGroup = () => {
    const [toggleModal, setToggleModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const navigate = useNavigate();

    const addGroup = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        if (title == "" || description == "") return;

        try {
            await axios.post(`${import.meta.env.VITE_RAKAMIN_BASE_URL}/todos`, {
                title,
                description,
            });

            setTitle("");
            setDescription("");
            setToggleModal(false);
            navigate(0);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <button
                className="px-4 py-1 rounded-lg bg-color-primary text-white flex items-center gap-2 text-xs"
                onClick={(e) => openModal(e, setToggleModal)}
            >
                <FaPlus />
                Add New Group
            </button>

            {/* Background */}
            <ModalTemplate
                toggleModal={toggleModal}
                modalTitle="Add New Group"
                closeModal={(e) => closeModal(e, setToggleModal)}
            >
                <form>
                    <div className="px-6 flex flex-col gap-5">
                        <span className="flex flex-col gap-2">
                            <label
                                htmlFor="title"
                                className="text-xs font-bold"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Type your Group Title"
                                className="text-sm px-4 py-2 border-2 border-color-white-tertiary rounded-lg focus:border-color-primary/20 active:border-color-primary font-normal"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </span>
                        <span className="flex flex-col gap-2">
                            <label
                                htmlFor="description"
                                className="text-xs font-bold"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                placeholder="Type your Group Description"
                                className="text-sm px-4 py-2 border-2 border-color-white-tertiary rounded-lg focus:border-color-primary/20 active:border-color-primary font-normal"
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </span>
                    </div>

                    <div className="flex justify-end items-center rounded-b-[10px] px-6 pb-6 pt-8 gap-[10px] font-bold text-sm">
                        <button
                            className="px-4 py-1 border text-color-black-primary border-color-white-tertiary shadow-cancel-button rounded-lg"
                            onClick={(e) => closeModal(e, setToggleModal)}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-1 text-white bg-color-primary rounded-lg"
                            type="submit"
                            onClick={addGroup}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </ModalTemplate>
        </>
    );
};

export default AddNewGroup;
