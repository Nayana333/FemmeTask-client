import { useState, useEffect } from "react";
import { CheckCircle, Circle, Trash2, Edit2, Save } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { validationSchema } from "../../utils/validation/TodoValidation";
import { toast } from "sonner";
import { postTodo, deleteTodoApi, markTodoCompletedApi, editTodoApi,getAllTodo } from "../../services/api/user/apiMethods";
import { setUserTodos,logout } from "../../utils/context/reducers/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {PowerOff} from "lucide-react"; 
import AnalogClock from "./AnalogClock";
import { useNavigate } from "react-router-dom";

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

  const [userId, setUserId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [error,setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    }
  }, [user]);


  useEffect(() => {
    const fetchTodos = async () => {
      if (user?.id) {
        const response = await getAllTodo(user.id);
        if (response.status === 200) {
          dispatch(setUserTodos({ userTodos: response.data }));
        }
      }
    };

    fetchTodos();
  }, [user, dispatch]);

//for clock settings
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);


  //adding todo
  const addTodo = () => {
    if (!userId) {
      setError("User ID is required. Please log in again.");
      return;
    }

    validationSchema
      .validate({ title, completed: false, user: userId })
      .then(() => {
        postTodo({ title, completed: false, user: userId })
          .then((response: any) => {
            if (response.status === 201) {
              dispatch(setUserTodos({ userTodos: response.data.todo})); 
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

  //delete todo
  const deleteTodo = (todoId: string) => {
    deleteTodoApi(todoId)
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

  //update completion of a todo
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


  //edit todo
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
const navigate=useNavigate()

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/");  
  };

  return (
    <div className="min-h-screen bg-[#282d49] text-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Clock Section */}
        <div className="col-span-3 h-full">
  <Card className="bg-[#343b5d] text-white h-full flex flex-col">
    <CardHeader>
      <CardTitle className="text-center text-2xl">Clock</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
      <div className="w-48 h-48 mb-6">
        <AnalogClock />
      </div>
      <p className="text-xl">{currentTime.toLocaleDateString()}</p>
    </CardContent>
  </Card>
</div>


        {/* Todo List Section */}
        <div className="col-span-6">
          <div className="bg-[#343b5d] rounded-lg shadow-lg p-6">
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
              <Button onClick={addTodo} className="ml-2 bg-[#5c6ac4] hover:bg-[#4f5aa7]">
                Add
              </Button>
            </div>

            <div className="space-y-3">
              {todos.map((todo: Todo) => (
                <div key={todo._id} className="flex items-center justify-between bg-[#3f4668] p-3 rounded-md">
                  <div className="flex items-center">
                    <button className="mr-2 text-lg" onClick={() => markAsCompleted(todo._id)}>
                      {todo.completed ? (
                        <CheckCircle className="text-green-400" />
                      ) : (
                        <Circle className="text-gray-400 hover:text-green-400" />
                      )}
                    </button>
                    {editingId === todo._id ? (
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="bg-transparent border-b border-gray-300 text-white focus:outline-none"
                      />
                    ) : (
                      <span className={todo.completed ? "line-through text-gray-400" : ""}>
                        {todo.title}
                      </span>
                    )}
                  </div>
                  <div>
                    {editingId === todo._id ? (
                      <button
                        className="mr-2 text-green-400 hover:text-green-600"
                        onClick={() => editTodo(todo._id, editedTitle)}
                      >
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
                    <button
                      className="text-red-400 hover:text-red-600"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Section */}

        <div className="col-span-3 h-full">
  <Card className="bg-[#343b5d] text-white h-full flex flex-col">
    <CardHeader>
      <CardTitle className="text-2xl text-center">User Profile</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center p-6 flex-grow">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-[#5c6ac4]">
        <Avatar className="w-full h-full">
          <AvatarImage
            src={user?.avatar || "/placeholder.svg?height=128&width=128"}
            alt={user?.name}
            className="w-full h-full object-cover"
          />
          <AvatarFallback className="w-full h-full flex items-center justify-center text-3xl bg-[#5c6ac4]">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
      <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
      <p className="text-gray-300 mb-6">{user?.email}</p>
      <div className="bg-[#3f4668] p-4 rounded-md w-full space-y-3">
        <h3 className="text-lg font-semibold mb-4">Additional Info</h3>
        <p className="flex justify-between">
          <span>Total todos:</span>
          <span>{todos.length}</span>
        </p>
        <p className="flex justify-between">
          <span>Completed todos:</span>
          <span>{todos.filter((todo: Todo) => todo.completed).length}</span>
        </p>
      </div>
      <button 
        onClick={handleLogout} 
        className="mt-4 text-white bg-[#aa2828da] hover:bg-[#872424] p-2 rounded-full transition flex items-center space-x-2"
      >
        <PowerOff className="w-5 h-5" />
        <span className="text-sm">Logout</span>
      </button>
    </CardContent>
  </Card>
</div>


      </div>
    </div>
  );
}