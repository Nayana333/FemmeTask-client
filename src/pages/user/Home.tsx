// import { useState } from "react"
// import { CheckCircle, Circle, Trash2, Edit2, X } from "lucide-react"
// import { Input } from "../../components/ui/input"
// import { Button } from "../../components/ui/button"

// interface Todo {
//   id: number
//   text: string
//   completed: boolean
// }

// export default function HomePage() {
//   const [todos, setTodos] = useState<Todo[]>([])
//   const [newTodo, setNewTodo] = useState("")
//   const [editingId, setEditingId] = useState<number | null>(null)
//   const [editText, setEditText] = useState("")

//   const addTodo = () => {
//     if (newTodo.trim() !== "") {
//       setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
//       setNewTodo("")
//     }
//   }

//   const toggleTodo = (id: number) => {
//     setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
//   }

//   const deleteTodo = (id: number) => {
//     setTodos(todos.filter((todo) => todo.id !== id))
//   }

//   const startEditing = (id: number, text: string) => {
//     setEditingId(id)
//     setEditText(text)
//   }

//   const saveEdit = () => {
//     if (editingId !== null) {
//       setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, text: editText } : todo)))
//       setEditingId(null)
//     }
//   }

//   const cancelEdit = () => {
//     setEditingId(null)
//     setEditText("")
//   }

//   return (
//     <div className="min-h-screen bg-[#282d49] text-white p-8">
//       <div className="max-w-md mx-auto bg-[#343b5d] rounded-lg shadow-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105">
//         <h1 className="text-3xl font-bold mb-6">Todo List</h1>
//         <div className="flex mb-4">
//           <Input
//             type="text"
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//             placeholder="Add a new todo"
//             className="flex-grow mr-2 bg-[#3f4668] text-white placeholder-gray-400 border-none"
//           />
//           <Button onClick={addTodo} className="bg-[#5c6ac4] hover:bg-[#4f5aa7] transition-colors duration-200">
//             Add
//           </Button>
//         </div>
//         {todos.map((todo) => (
//           <div
//             key={todo.id}
//             className="flex items-center justify-between bg-[#3f4668] p-3 rounded-md mb-2 transition-all duration-300 ease-in-out hover:bg-[#4a5279]"
//           >
//             {editingId === todo.id ? (
//               <div className="flex items-center flex-grow mr-2">
//                 <Input
//                   type="text"
//                   value={editText}
//                   onChange={(e) => setEditText(e.target.value)}
//                   className="flex-grow mr-2 bg-[#3f4668] text-white border-none"
//                 />
//                 <Button
//                   onClick={saveEdit}
//                   className="mr-2 bg-green-500 hover:bg-green-600 transition-colors duration-200"
//                 >
//                   Save
//                 </Button>
//                 <Button onClick={cancelEdit} className="bg-red-500 hover:bg-red-600 transition-colors duration-200">
//                   <X size={18} />
//                 </Button>
//               </div>
//             ) : (
//               <>
//                 <div className="flex items-center">
//                   <button
//                     onClick={() => toggleTodo(todo.id)}
//                     className="mr-2 text-lg transition-transform duration-200 ease-in-out transform hover:scale-110"
//                   >
//                     {todo.completed ? <CheckCircle className="text-green-400" /> : <Circle className="text-gray-400" />}
//                   </button>
//                   <span className={${todo.completed ? "line-through text-gray-400" : ""}}>{todo.text}</span>
//                 </div>
//                 <div>
//                   <button
//                     onClick={() => startEditing(todo.id, todo.text)}
//                     className="mr-2 text-blue-400 hover:text-blue-600 transition-colors duration-200"
//                   >
//                     <Edit2 size={18} />
//                   </button>
//                   <button
//                     onClick={() => deleteTodo(todo.id)}
//                     className="text-red-400 hover:text-red-600 transition-colors duration-200"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
