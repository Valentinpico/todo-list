import { TodoForm } from "./components/Todo/TodoForm";
import { ModalDefault } from "./components/Modal/Modal";
import { TodoList } from "./components/Todo/TodoList";
import { Navbar } from "./components/navbar/Navbar";
import { Toast } from "./components/toast/toast";
import { useStoreUtils } from "./store/useStoreUtils";
import { FormUser } from "./components/User/FormUser";

function App() {
  const toast = useStoreUtils((state) => state.toast);
  const setToast = useStoreUtils((state) => state.setToast);
  return (
    <>
      <Navbar />

      <div className="flex justify-center h-screen items-center ">
        <FormUser />
      </div>
      {
        <div className="flex mt-20 justify-center items-center ">
          <TodoList />
        </div>
      }

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        duration={3000}
        onClose={() =>
          setToast({ message: "", type: "success", isVisible: false })
        }
      />
      <ModalDefault>
        <TodoForm />
      </ModalDefault>
    </>
  );
}

export default App;
