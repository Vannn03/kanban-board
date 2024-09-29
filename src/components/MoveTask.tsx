import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

interface MoveRightType {
    todo_id: number;
    item_id: number;
    newTodoId: number;
    menuIcon: React.ReactElement;
    menuName: string;
}

const MoveRight = ({
    todo_id,
    item_id,
    newTodoId,
    menuIcon,
    menuName,
}: MoveRightType) => {
    const navigate = useNavigate();

    const handleMoveRight = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        try {
            await axios.put(
                `${
                    import.meta.env.VITE_RAKAMIN_BASE_URL
                }/todos/${todo_id}/items/${item_id}`,
                {
                    target_todo_id: newTodoId,
                }
            );
            navigate(0);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            className="flex items-center p-4 gap-4 text-color-black hover:text-color-primary transition-colors"
            onClick={handleMoveRight}
        >
            {menuIcon}
            <p className="text-sm font-semibold">{menuName}</p>
        </button>
    );
};

export default MoveRight;
