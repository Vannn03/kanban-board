import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddNewGroup = () => {
    const [toggleModal, setToggleModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const navigate = useNavigate();

    const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setToggleModal(false);
    };

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
                onClick={() => setToggleModal(true)}
            >
                <FaPlus />
                Add New Group
            </button>

            {/* Background */}
            <div
                className={`fixed top-0 left-0 h-full w-full z-40 bg-color-black/40 transition-opacity duration-300 ${
                    toggleModal
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                }`}
            />

            <div
                className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
                    toggleModal
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <div className="rounded-[10px] w-[420px] shadow-modal bg-white">
                    <span className="p-6 rounded-t-[10px]">
                        <h1 className="font-bold text-lg px-6">
                            Add new Group
                        </h1>
                    </span>

                    <form>
                        <div className="px-6 flex flex-col gap-5">
                            <span className="flex flex-col gap-2">
                                <label htmlFor="title" className="text-xs">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="Type your Group Title"
                                    className="text-sm px-4 py-2 border-2 border-color-black/15 rounded-lg focus:border-color-primary/15 active:border-color-primary font-normal"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </span>
                            <span className="flex flex-col gap-2">
                                <label
                                    htmlFor="description"
                                    className="text-xs"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    placeholder="Type your Group Description"
                                    className="text-sm px-4 py-2 border-2 border-color-black/15 rounded-lg focus:border-color-primary/15 active:border-color-primary font-normal"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                ></textarea>
                            </span>
                        </div>

                        <div className="flex justify-end items-center rounded-b-[10px] p-6 gap-[10px] font-bold text-sm">
                            <button
                                className="px-4 py-1 border text-color-black border-color-black/15 rounded-lg"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-1 text-white bg-color-primary rounded-lg"
                                type="submit"
                                onClick={(e) => addGroup(e)}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddNewGroup;
