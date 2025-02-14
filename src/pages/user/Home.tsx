import { useState, useEffect } from "react";
import { CheckCircle, Circle, Trash2, Edit2, Save } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { validationSchema } from "../../utils/validation/TodoValidation";
import { toast } from "sonner";
import { postTodo, deleteTodoApi, markTodoCompletedApi, editTodoApi } from "../../services/api/user/apiMethods";
import { setUserTodos } from "../../utils/context/reducers/authSlice";

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

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
              dispatch(setUserTodos({ userTodos: response.data.todos })); // Fix: use 'todos' instead of 'todo'
              toast.success(response.data.message);
              setTitle("");
              setError("");
            } else {
              toast.error(response.data.message);
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."));
      })
      .catch((err) => setError(err.message));
  };

  const deleteTodo = (todoId: string) => {
    deleteTodoApi(todoId, accessToken)
      .then((response: any) => {
        if (response.status === 200) {
          dispatch(setUserTodos({ userTodos: response.data.todos }));
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong. Please try again."));
  };

  const markAsCompleted = (todoId: string) => {
    markTodoCompletedApi(todoId)
      .then((response: any) => {
        if (response.status === 200) {
          dispatch(setUserTodos({ userTodos: response.data.todos }));
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong. Please try again."));
  };

  const editTodo = (todoId: string, newTitle: string) => {
    if (!newTitle.trim()) {
      toast.error("Title cannot be empty!");
      return;
    }

    editTodoApi(todoId, newTitle)
    
      .then((response: any) => {
        console.log(response);
        
        if (response.status === 200) {
          dispatch(setUserTodos({ userTodos: response.data.todo }));

          toast.success(response.data.message);
          setEditingId(null);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong. Please try again."));
  };

  return (
    <div className="min-h-screen bg-[#282d49] text-white p-8 flex justify-center">
      <div className="w-full max-w-2xl bg-[#343b5d] rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-[#f4a261]">FemmeTask</h1>
        <p className="text-center text-gray-300 mb-6">Stay organized and productive!</p>

        <div className="flex mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new todo"
            className="w-full px-4 py-3 rounded-lg bg-[#3f4668] text-white placeholder-gray-400 border-none"
          />
          <Button onClick={addTodo} className="ml-2 bg-[#5c6ac4] hover:bg-[#4f5aa7]">Add</Button>
        </div>

        {todos.map((todo: Todo) => (
          <div key={todo._id} className="flex items-center justify-between bg-[#3f4668] p-3 rounded-md mb-2">
            <div className="flex items-center">
              <button className="mr-2 text-lg" onClick={() => markAsCompleted(todo._id)}>
                {todo.completed ? <CheckCircle className="text-green-400" /> : <Circle className="text-gray-400 hover:text-green-400" />}
              </button>
              {editingId === todo._id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="bg-transparent border-b border-gray-300 text-white focus:outline-none"
                />
              ) : (
                <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.title}</span>
              )}
            </div>
            <div>
              {editingId === todo._id ? (
                <button className="mr-2 text-green-400 hover:text-green-600" onClick={() => editTodo(todo._id, editedTitle)}>
                  <Save size={18} />
                </button>
              ) : (
                <button
                  className="mr-2 text-blue-400 hover:text-blue-600"
                  onClick={() => {
                    setEditingId(todo._id);
                    setEditedTitle(todo.title);
                  }}
                >
                  <Edit2 size={18} />
                </button>
              )}
              <button className="text-red-400 hover:text-red-600" onClick={() => deleteTodo(todo._id)}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
