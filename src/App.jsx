import { useEffect, useState } from "react";
import supabase from "./helper/supabaseClient";
import AddTask from "./icons/AddTask";
import RemoveTask from "./icons/RemoveTask";
import EditTask from "./icons/EditTask";
import CompleteTask from "./icons/CompleteTask";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) console.error(error);
    else setTodos(data);
  }

  async function addTodos() {
    if (!title.trim()) return;
    const { error } = await supabase.from("todos").insert([{ title }]);
    if (error) console.error(error);
    else {
      setTitle("");
      fetchTodos();
    }
  }

  async function deleteTodo(id) {
    await supabase.from("todos").delete().eq("id", id);
    fetchTodos();
  }

  async function updateTodo(id, newTitle) {
    if (!newTitle || !newTitle.trim()) return;
    await supabase.from("todos").update({ title: newTitle }).eq("id", id);
    fetchTodos();
  }

  async function toggleComplete(id, current) {
    await supabase.from("todos").update({ completed: !current }).eq("id", id);
    fetchTodos();
  }

  return (
    <div className="flex flex-col items-center">
      <header className="flex items-center justify-center text-5xl pt-[50px] pb-[20px]">
        ТРЕКЕР ЗАДАЧ
      </header>

      <form
        className="relative max-w-[500px] w-full mx-auto m-4"
        onSubmit={(e) => {
          e.preventDefault();
          addTodos();
        }}
      >
        <label htmlFor="input-task"></label>
        <input
          id="input-task"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="ВВЕДИТЕ ЗАДАЧУ"
          className="block w-full p-4 ps-10 text-sm text-white border border-gray-600 placeholder-gray-400 rounded-lg"
        />
        <button
          className="absolute end-2.5 bottom-2.5 transition duration-500 hover:rotate-90 hover:text-blue-500"
          type="submit"
        >
          <AddTask />
        </button>
      </form>

      <div className="max-w-[500px] w-full m-4">
        {todos.map((todo) => (
          <div className=" flex items-center justify-between my-2" key={todo.id}>
            <span
              className={`${
                todo.completed ? "line-through text-gray-400" : "text-white"
              }`}
            >
              {todo.title}
            </span>
            <div className="flex items-center gap-2">
              <button className="hover:scale-110" onClick={() => toggleComplete(todo.id, todo.completed)}>
                <CompleteTask />
              </button>
              <button className="hover:scale-110"
                onClick={() =>
                  updateTodo(todo.id, prompt("New Title:", todo.title))
                }
              >
                <EditTask />
              </button>
              <button className="hover:scale-110" onClick={() => deleteTodo(todo.id)}>
                <RemoveTask />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
