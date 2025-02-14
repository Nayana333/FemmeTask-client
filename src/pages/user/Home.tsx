import { useState, useEffect } from "react";
import { CheckCircle, Circle, Trash2, Edit2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { validationSchema } from "../../utils/validation/TodoValidation";
import { toast } from "sonner";
import { postTodo, deleteTodoApi } from "../../services/api/user/apiMethods";
import { setUserTodos } from "../../utils/context/reducers/authSlice";
import { log } from "node:console";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  user: string;
}

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user?.user);
  const todos = useSelector((state: any) => state.auth.userTodos) || []; 
  const accessToken = useSelector((state: any) => state.auth.user?.accessToken);

  const [userId, setUserId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (user?.todos) {
      dispatch(setUserTodos({ userTodos: user.todos }));
    }
  }, [user, dispatch]);

  const addTodo = () => {
    if (!userId) {
      setError("User ID is required. Please log in again.");
      return;
    }

    validationSchema
      .validate({ title, completed: false, user: userId })
      .then(() => {
        postTodo({ title, completed: false, user: userId }, accessToken)
          .then((response: any) => {
            if (response.status === 201) {
              const updatedTodos = response.data.todo;
              dispatch(setUserTodos({ userTodos: updatedTodos }));
              toast.success(response.data.message);
              setTitle("");
              setError("");
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error: Error) => {
            console.log(error?.message);
            toast.error("Something went wrong. Please try again.");
          });
      })
      .catch((err) => setError(err.message));
  };

  const deleteTodo = (todoId: string) => {
    if (!userId) {
      setError("User ID is required. Please log in again.");
      return;
    }

    deleteTodoApi(todoId, accessToken)
      .then((response: any) => {
        console.log(response);
        
        if (response.status === 200) {
          const updatedTodos = response.data.todos;          
          dispatch(setUserTodos({ userTodos: updatedTodos }));
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error: Error) => {
        console.log(error?.message);
        toast.error("Something went wrong. Please try again.");
      });
  };

 

  return (
    <div className="min-h-screen bg-[#282d49] text-white p-8 flex justify-center">
      <div className="w-full max-w-2xl bg-[#343b5d] rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-[#f4a261]">
          FemmeTask
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Stay organized and productive!
        </p>

        <div className="flex mb-4">
          <div className="flex-grow">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new todo"
              className="w-full px-4 py-3 rounded-lg bg-[#3f4668] text-white placeholder-gray-400 border-none"
            />
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          </div>
          <Button
            onClick={addTodo}
            className="ml-2 bg-[#5c6ac4] hover:bg-[#4f5aa7]"
          >
            Add
          </Button>
        </div>

        {todos.length > 0 ? (
          todos.map((todo: Todo) => (
            <div
              key={todo._id}
              className="flex items-center justify-between bg-[#3f4668] p-3 rounded-md mb-2"
            >
              <div className="flex items-center">
                <button className="mr-2 text-lg">
                  {todo.completed ? (
                    <CheckCircle className="text-green-400" />
                  ) : (
                    <Circle className="text-gray-400" />
                  )}
                </button>
                <span
                  className={todo.completed ? "line-through text-gray-400" : ""}
                >
                  {todo.title}
                </span>
              </div>
              <div>
                <button className="mr-2 text-blue-400 hover:text-blue-600">
                  <Edit2 size={18} />
                </button>
                <button
                  className="text-red-400 hover:text-red-600"
                  onClick={() => deleteTodo(todo._id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            No todos yet. Add one to get started!
          </p>
        )}
      </div>
    </div>
  );
}
