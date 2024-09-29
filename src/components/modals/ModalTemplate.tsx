import { HiMiniXMark } from "react-icons/hi2";

interface ModalTemplateType {
    toggleModal: boolean;
    modalTitle: string;
    closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: React.ReactNode;
}

const ModalTemplate: React.FC<ModalTemplateType> = ({
    toggleModal,
    modalTitle,
    closeModal,
    children,
}) => {
    return (
        <>
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
                    <span className="p-6 rounded-t-[10px] flex items-center justify-between text-color-black">
                        <h1 className="font-bold text-lg">{modalTitle}</h1>
                        <button onClick={closeModal}>
                            <HiMiniXMark className="text-3xl" />
                        </button>
                    </span>

                    {children}
                </div>
            </div>
        </>
    );
};

export default ModalTemplate;
