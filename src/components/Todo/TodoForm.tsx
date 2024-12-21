import { useEffect, useState } from "react";
import { Input } from "../Inputs/Input";
import { TodoDraft } from "../../types/types";
import { useTodoStore } from "../../store/useTodoStore";
import { useStoreUtils } from "../../store/useStoreUtils";

const initialTodoState: TodoDraft = {
  title: "",
  completed: false,
};

export const TodoForm = () => {
  //Estados globales de la aplicacion
  const showModal = useStoreUtils((state) => state.showModal);
  const setToast = useStoreUtils((state) => state.setToast);

  const addTodo = useTodoStore((state) => state.addTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const todoSelected = useTodoStore((state) => state.todoSelected);
  const setTodoSelected = useTodoStore((state) => state.setTodoSelected);
  //Stados de la aplicacion
  const [todo, setTodo] = useState<TodoDraft>(initialTodoState);
  const [error, setError] = useState(false);

  const handleClick = () => {
    const isValid = validateInputs();
    if (!isValid) {
      setToast({
        message: "El título no puede estar vacío.",
        type: "error",
        isVisible: true,
        duration: 3000,
      });
      setError(true);
      return;
    }

    todoSelected === null
      ? addTodo(todo)
      : updateTodo({ ...todo, id: todoSelected.id });

    setTodo(initialTodoState);
    setTodoSelected(null);

    showModal(false);
    setToast({
      message: todoSelected ? "To-Do actualizado" : "To-Do añadido",
      type: "success",
      isVisible: true,
      duration: 3000,
    });
  };

  const validateInputs = () => {
    const validTitle = todo.title.length > 0;
    return validTitle;
  };

  useEffect(() => {
    if (todoSelected) {
      setTodo({
        title: todoSelected.title,
        completed: todoSelected.completed,
      });
    }
  }, [todoSelected]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-fuchsia-900 uppercase text-center">
        Add Todo
      </h2>
      <div className="mb-4">
        <Input
          name="todo"
          label="Título:"
          value={todo.title}
          type="text"
          placeholder="Introduza un titulo "
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          validate={(value) => value.length > 0}
          errorMessage="El título no puede estar vacío."
          showError={error}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition w-full "
          type="button"
          onClick={() => showModal(false)}
        >
          Cancelar
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition w-full"
          type="button"
          onClick={handleClick}
        >
          Add
        </button>
      </div>
    </>
  );
};
