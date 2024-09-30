export const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, setToggleModal: React.Dispatch<React.SetStateAction<boolean>>) => {
    e.preventDefault();
    setToggleModal(true)
};

export const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, setToggleModal: React.Dispatch<React.SetStateAction<boolean>>) => {
    e.preventDefault();
    setToggleModal(false)
};