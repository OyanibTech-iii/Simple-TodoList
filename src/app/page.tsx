"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-vermilion-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-vermilion-900 mb-2">
            Pacifico - Todo List App
          </h1>
          <p className="text-vermilion-700 text-sm">
            Your personal todo list organizer
          </p>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 border border-vermilion-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-vermilion-500 focus:border-transparent text-sm"
            />
            <button
              onClick={addTodo}
              className="bg-vermilion-500 hover:bg-vermilion-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-sm"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-vermilion-400 text-6xl mb-4">📝</div>
              <p className="text-vermilion-600 text-sm">
                No tasks yet. Add one above to get started!
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`bg-white rounded-lg shadow-md p-4 flex items-center gap-3 transition-all duration-200 ${
                  todo.completed ? "opacity-75" : ""
                }`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                    todo.completed
                      ? "bg-vermilion-500 border-vermilion-500 text-white"
                      : "border-vermilion-300 hover:border-vermilion-500"
                  }`}
                >
                  {todo.completed && (
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
                <span
                  className={`flex-1 text-sm ${
                    todo.completed
                      ? "line-through text-vermilion-500"
                      : "text-vermilion-900"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-vermilion-400 hover:text-vermilion-600 transition-colors duration-200 p-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-vermilion-600 text-sm">
              {todos.filter((todo) => todo.completed).length} of {todos.length}{" "}
              tasks completed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
