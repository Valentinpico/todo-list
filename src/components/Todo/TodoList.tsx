import { useEffect } from "react";
import { useStoreUtils } from "../../store/useStoreUtils";
import { useTodoStore } from "../../store/useTodoStore";
import { TodoCardList } from "./TodoCardList";
import { getUserWithToDosApi } from "../../api/users.api";
import { useStoreUser } from "../../store/useStoreUser";

export const TodoList = () => {
  const token = useStoreUser((state) => state.token);
  const SetUser = useStoreUser((state) => state.setUser);

  const todos = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);

  const showModal = useStoreUtils((state) => state.showModal);

  const todoLength = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;

  const getUserWithToDos = async () => {
    const res = await getUserWithToDosApi(token);
    if (!res.success) return;
    setTodos(res.data.todos);
    SetUser({
      email: res.data.email,
      username: res.data.username,
      id: res.data.id,
    });
  };

  useEffect(() => {
    getUserWithToDos();
  }, []);

  return (
    <>
      <div className="my-4 m-auto text-lg bg-slate-100 p-4 rounded-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-2/5 ">
        <button
          onClick={() => showModal(true)}
          className="text-center bg-pink-500 text-white uppercase rounded w-full my-2 p-1 text-2xl hover:bg-pink-700 transition-all font-bold"
        >
          Add To-Do
        </button>
        {todoLength > 0 ? (
          <>
            <h1>
              {`Tienes `}
              <span className="text-lime-500 font-bold">{todoLength}</span>
              {` tareas, `}
              <span className="text-blue-500 font-bold">{completedTodos}</span>
              {` completadas`}
            </h1>

            <ul className="mt-4">
              <span className="text-sm text-slate-500">
                Deslice a la izquierda para editar y a la derecha para eliminar
              </span>

              <div className="mt-4 space-y-2">
                {todos.map((todo) => (
                  <TodoCardList
                    token={token}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </div>
            </ul>
          </>
        ) : (
          <h1 className="text-center ">No hay tareas</h1>
        )}
      </div>
    </>
  );
};
