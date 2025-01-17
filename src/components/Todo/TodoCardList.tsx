import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { SwipeableListAdapter } from "../Adapters/SwipeableListAdapter";

import { useTodoStore } from "../../store/useTodoStore";
import { TodoType } from "../../types/types";
import { useStoreUtils } from "../../store/useStoreUtils";
import { deleteTodoApi, updateTodoApi } from "../../api/toDo.api";
import { convertDate } from "../../utils/convertDate";
import { useStoreUser } from "../../store/useStoreUser";

interface TodoCardProps {
  todo: TodoType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoCardList = ({ todo, onToggle, onDelete }: TodoCardProps) => {
  const setToken = useStoreUser((state) => state.setToken);
  const setTodoSelected = useTodoStore((state) => state.setTodoSelected);
  const showModal = useStoreUtils((state) => state.showModal);
  const setToast = useStoreUtils((state) => state.setToast);

  const date = convertDate(todo.createdAt);

  const handledDelete = async () => {
    const res = await deleteTodoApi({ id: todo.id });
    if (!res.success) {
      setToast({
        message: res.message,
        type: "error",
        isVisible: true,
        duration: 3000,
      });
      if (res.notoken) {
        localStorage.removeItem("token");
        setToken("");
        return;
      }
    }
    onDelete(todo.id);
  };

  const handleToggle = async () => {
    const res = await updateTodoApi({
      id: todo.id,
      todo: { ...todo, completed: !todo.completed },
    });
    if (!res.success) {
      setToast({
        message: res.message,
        type: "error",
        isVisible: true,
        duration: 3000,
      });
      if (res.notoken) {
        localStorage.removeItem("token");
        setToken("");
      }
      return;
    }

    onToggle(todo.id);
  };

  const optionsLeading = [
    {
      label: "Editar",
      onClick: () => {
        setTodoSelected(todo);
        showModal(true);
      },
    },
  ];

  const optionsTrailing = [
    {
      label: "Eliminar",
      onClick: handledDelete,
      destructive: true,
    },
  ];
  return (
    <SwipeableListAdapter
      optionsLeading={optionsLeading}
      optionsTrailing={optionsTrailing}
    >
      <div className="bg-white ligth:bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg w-full  hover:cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-grow">
            <button
              onClick={handleToggle}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                todo.completed
                  ? "bg-green-500 border-green-500"
                  : "border-gray-400 ligth:border-gray-600"
              }`}
            >
              {todo.completed && (
                <CheckCircleIcon className="w-4 h-4 text-white" />
              )}
            </button>
            <label
              htmlFor={`todo-${todo.id}`}
              className={`text-sm sm:text-base flex-grow cursor-pointer ${
                todo.completed
                  ? "line-through text-gray-500 ligth:text-gray-400"
                  : "text-gray-800 ligth:text-gray-200"
              }`}
            >
              {todo.title}
            </label>
          </div>
          <button
            onClick={handledDelete}
            className="text-gray-500 hover:text-red-500 ligth:text-gray-400 ligth:hover:text-red-400 transition-colors duration-200"
          >
            <XCircleIcon className="h-6 w-6" />
            <span className="sr-only">Delete todo</span>
          </button>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs text-gray-500 ligth:text-gray-400">
            {todo.completed ? "Completada" : "Pendiente"}
          </span>{" "}
          <span className="text-xs text-gray-500 ligth:text-gray-400">
            {date}
          </span>
        </div>
      </div>
    </SwipeableListAdapter>
  );
};
