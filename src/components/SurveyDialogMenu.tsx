import { useEffect, useRef, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";

type MenusType = {
    icon: React.ReactElement;
    name: string;
};

interface SurveyDialogMenuType {
    todo_index: number;
}

const SurveyDialogMenu = ({ todo_index }: SurveyDialogMenuType) => {
    const menus: MenusType[] = [
        {
            icon: <FaArrowRight />,
            name: "Move Right",
        },
        {
            icon: <FaArrowLeft />,
            name: "Move Left",
        },
        {
            icon: <BiEditAlt />,
            name: "Edit",
        },
        {
            icon: <FiTrash2 />,
            name: "Delete",
        },
    ];

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
            <span onClick={() => setToggleMenu((prev) => !prev)}>
                <IoIosMore className="text-2xl text-color-black/70 cursor-pointer" />
            </span>

            <div
                className={`rounded-lg px-2 bg-white shadow-dialog-menu flex flex-col w-80 absolute top-8 ${
                    todo_index % 4 === 3 ? "right-0" : "left-0"
                } ${
                    toggleMenu
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                } transition-opacity z-50`}
            >
                {menus.map((menu, index) => (
                    <button
                        key={index}
                        className={`flex items-center p-4 gap-4 text-color-black ${
                            index != 3
                                ? "hover:text-color-primary"
                                : "hover:text-color-danger"
                        } transition-colors`}
                    >
                        {menu.icon}
                        <p className="text-sm font-semibold">{menu.name}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SurveyDialogMenu;
