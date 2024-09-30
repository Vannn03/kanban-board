import { HiMiniXMark } from "react-icons/hi2";

interface ModalTemplateType {
    toggleModal: boolean;
    modalIcon?: React.ReactElement; // Only for delete task
    modalTitle: string;
    closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: React.ReactNode;
}

const ModalTemplate: React.FC<ModalTemplateType> = ({
    toggleModal,
    modalIcon,
    modalTitle,
    closeModal,
    children,
}) => {
    return (
        <>
            <div
                className={`fixed top-0 left-0 h-full w-full z-40 bg-color-black-secondary/40 transition-opacity duration-300 ${
                    toggleModal
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                }`}
            />

            <div
                className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
                    toggleModal
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <div className="rounded-[10px] w-[420px] shadow-modal bg-white">
                    <span className="p-6 rounded-t-[10px] flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            {modalIcon}
                            <h1 className="font-bold text-lg text-color-black-primary">
                                {modalTitle}
                            </h1>
                        </span>
                        <button onClick={closeModal}>
                            <HiMiniXMark className="text-3xl text-color-black-secondary" />
                        </button>
                    </span>

                    {children}
                </div>
            </div>
        </>
    );
};

export default ModalTemplate;
