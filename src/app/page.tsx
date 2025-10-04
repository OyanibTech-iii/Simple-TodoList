"use client";

import { useState, useEffect } from "react";
import { 
  MoonOutline as Moon, 
  SunnyOutline as Sun, 
  AnalyticsOutline as Analytics, 
  AddOutline as Add, 
  SearchOutline as Search, 
  CheckmarkCircleOutline as CheckmarkCircle, 
  TrashOutline as Trash, 
  CalendarOutline as Calendar, 
  ChatbubbleOutline as Chatbubble, 
  DocumentTextOutline as DocumentText,
  CloseOutline as Close,
  PlayOutline as Play,
  PauseOutline as Pause,
  CheckmarkOutline as Checkmark,
  AlertCircleOutline as AlertCircle
} from "react-ionicons";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  notes?: string;
  createdAt: string;
  completedAt?: string;
}

type FilterType = 'all' | 'pending' | 'completed' | 'high' | 'medium' | 'low';
type CategoryType = 'all' | 'work' | 'personal' | 'shopping' | 'health' | 'other';

const categories = [
  { id: 'work', name: 'Work', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 'personal', name: 'Personal', color: 'bg-green-100 text-green-800 border-green-200' },
  { id: 'shopping', name: 'Shopping', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { id: 'health', name: 'Health', color: 'bg-red-100 text-red-800 border-red-200' },
  { id: 'other', name: 'Other', color: 'bg-gray-100 text-gray-800 border-gray-200' }
];

const priorities = [
  { id: 'high', name: 'High', color: 'text-red-600', icon: '🔴' },
  { id: 'medium', name: 'Medium', color: 'text-yellow-600', icon: '🟡' },
  { id: 'low', name: 'Low', color: 'text-green-600', icon: '🟢' }
];

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('pacifico-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    setIsHydrated(true);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('pacifico-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        category: selectedCategory === 'all' ? 'other' : selectedCategory,
        priority: selectedPriority,
        dueDate: dueDate || undefined,
        notes: notes.trim() || undefined,
        createdAt: new Date().toISOString(),
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
      setNotes("");
      setDueDate("");
      setSelectedCategory('all');
      setSelectedPriority('medium');
      setShowAddForm(false);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id 
          ? { 
              ...todo, 
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date().toISOString() : undefined
            } 
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const archiveTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, archived: true } : todo
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addTodo();
    }
  };

  // Filter and search todos
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'pending' ? !todo.completed :
      filter === 'completed' ? todo.completed :
      filter === todo.priority;

    const matchesCategory = selectedCategory === 'all' || todo.category === selectedCategory;

    return matchesSearch && matchesFilter && matchesCategory;
  });

  // Analytics calculations
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
  const overdueTodos = todos.filter(todo => 
    !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
  ).length;
  const highPriorityTodos = todos.filter(todo => !todo.completed && todo.priority === 'high').length;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            setShowAddForm(true);
            break;
          case 'k':
            e.preventDefault();
            setShowAnalytics(!showAnalytics);
            break;
          case 'd':
            e.preventDefault();
            setDarkMode(!darkMode);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAnalytics, darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isHydrated && darkMode ? 'bg-gray-900' : 'bg-vermilion-50'} p-4`} suppressHydrationWarning>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
                title="Toggle Dark Mode (Ctrl+D)"
                suppressHydrationWarning
              >
                {isHydrated && darkMode ? 
                  <Sun width="20px" height="20px" color="#f97316" /> : 
                  <Moon width="20px" height="20px" color="#6b7280" />
                }
              </button>
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
                title="Analytics (Ctrl+K)"
              >
                <Analytics width="20px" height="20px" color="#f97316" />
              </button>
            </div>
            <div className="text-right">
              <div className="text-xs text-vermilion-800 font-medium mb-1">Keyboard Shortcuts</div>
              <div className="text-xs text-vermilion-700 font-medium">Ctrl+N: New | Ctrl+K: Analytics | Ctrl+D: Theme</div>
            </div>
          </div>
          <h1 className={`text-4xl font-bold mb-2 ${isHydrated && darkMode ? 'text-gray-100' : 'text-vermilion-900'}`} suppressHydrationWarning>
            TODO - LIST
          </h1>
          <p className={`text-sm ${isHydrated && darkMode ? 'text-gray-300' : 'text-vermilion-700'}`} suppressHydrationWarning>
            Your advanced personal productivity hub
          </p>
        </div>

        {/* Analytics Dashboard */}
        {showAnalytics && (
          <div className={`mb-6 p-6 rounded-lg shadow-lg ${isHydrated && darkMode ? 'bg-gray-800' : 'bg-white'}`} suppressHydrationWarning>
            <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isHydrated && darkMode ? 'text-gray-100' : 'text-vermilion-900'}`}>
              <Analytics width="20px" height="20px" color="#f97316" />
              Productivity Analytics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${isHydrated && darkMode ? 'text-gray-100' : 'text-vermilion-900'}`}>
                  {totalTodos}
                </div>
                <div className={`text-xs ${isHydrated && darkMode ? 'text-gray-400' : 'text-vermilion-600'}`}>Total Tasks</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold text-green-600`}>{completionRate}%</div>
                <div className={`text-xs ${isHydrated && darkMode ? 'text-gray-400' : 'text-vermilion-600'}`}>Completion Rate</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${overdueTodos > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {overdueTodos}
                </div>
                <div className={`text-xs ${isHydrated && darkMode ? 'text-gray-400' : 'text-vermilion-600'}`}>Overdue</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold text-orange-600`}>{highPriorityTodos}</div>
                <div className={`text-xs ${isHydrated && darkMode ? 'text-gray-400' : 'text-vermilion-600'}`}>High Priority</div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className={`mb-6 p-4 rounded-lg shadow-md ${isHydrated && darkMode ? 'bg-gray-800' : 'bg-white'}`} suppressHydrationWarning>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-1 min-w-48 relative">
              <Search 
                width="16px" 
                height="16px" 
                color="#9ca3af" 
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm ${
                  isHydrated && darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-vermilion-200 focus:ring-2 focus:ring-vermilion-500'
                }`}
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className={`px-3 py-2 border rounded-lg text-sm ${
                isHydrated && darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-vermilion-200'
              }`}
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as CategoryType)}
              className={`px-3 py-2 border rounded-lg text-sm ${
                isHydrated && darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-vermilion-200'
              }`}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className={`mb-6 rounded-lg shadow-lg ${isHydrated && darkMode ? 'bg-gray-800' : 'bg-white'}`} suppressHydrationWarning>
          {!showAddForm ? (
            <div className="p-6 text-center">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-vermilion-500 hover:bg-vermilion-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-sm flex items-center gap-2 shadow-lg"
              >
                <Add width="18px" height="18px" color="#cf2dd4" />
                Add New Task (Ctrl+N)
              </button>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${isHydrated && darkMode ? 'text-gray-100' : 'text-vermilion-900'}`}>
                  Create New Task
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-vermilion-500 hover:text-vermilion-700 p-1"
                >
                  <Close width="20px" height="20px" color="#f97316" />
                </button>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="What needs to be done?"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vermilion-500 focus:border-transparent text-sm ${
                    isHydrated && darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border-vermilion-200'
                  }`}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isHydrated && darkMode ? 'text-gray-300' : 'text-vermilion-700'}`}>
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as CategoryType)}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${
                        isHydrated && darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'border-vermilion-200'
                      }`}
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isHydrated && darkMode ? 'text-gray-300' : 'text-vermilion-700'}`}>
                      Priority
                    </label>
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value as 'low' | 'medium' | 'high')}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${
                        isHydrated && darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'border-vermilion-200'
                      }`}
                    >
                      {priorities.map(priority => (
                        <option key={priority.id} value={priority.id}>
                          {priority.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isHydrated && darkMode ? 'text-gray-300' : 'text-vermilion-700'}`}>
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${
                        isHydrated && darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'border-vermilion-200'
                      }`}
                    />
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-vermilion-700'}`}>
                    Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add additional details..."
                    rows={2}
                    className={`w-full px-3 py-2 border rounded-lg text-sm resize-none ${
                      isHydrated && darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-vermilion-200'
                    }`}
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={addTodo}
                    className="bg-vermilion-500 hover:bg-vermilion-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-sm"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-3 border border-vermilion-300 text-vermilion-700 rounded-lg font-medium hover:bg-vermilion-50 transition-colors duration-200 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <DocumentText width="64px" height="64px" color="#fbbf24" />
              </div>
              <p className={`text-sm ${isHydrated && darkMode ? 'text-gray-400' : 'text-vermilion-600'}`}>
                {searchTerm || filter !== 'all' || selectedCategory !== 'all' 
                  ? "No tasks match your current filters." 
                  : "No tasks yet. Add one above to get started!"
                }
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => {
              const category = categories.find(cat => cat.id === todo.category);
              const priority = priorities.find(p => p.id === todo.priority);
              const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
              
              return (
                <div
                  key={todo.id}
                  className={`${isHydrated && darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 transition-all duration-200 ${
                    todo.completed ? "opacity-75" : ""
                  } ${isOverdue ? 'ring-2 ring-red-300' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 mt-0.5 ${
                        todo.completed
                          ? "bg-vermilion-500 border-vermilion-500 text-white"
                          : "border-vermilion-300 hover:border-vermilion-500"
                      }`}
                    >
                      {todo.completed && (
                        <CheckmarkCircle width="12px" height="12px" color="white" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-sm font-medium ${
                            todo.completed
                              ? "line-through text-vermilion-500"
                              : isHydrated && darkMode ? "text-gray-100" : "text-vermilion-950"
                          }`}
                        >
                          {todo.text}
                        </span>
                        {isOverdue && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            Overdue
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className={`px-2 py-1 rounded-full border ${category?.color || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                          {category?.name || 'Other'}
                        </span>
                        <span className={`flex items-center gap-1 ${priority?.color}`}>
                          {priority?.icon === 'AlertCircle' && <AlertCircle width="12px" height="12px" color="#dc2626" />}
                          {priority?.icon === 'Play' && <Play width="12px" height="12px" color="#d97706" />}
                          {priority?.icon === 'Checkmark' && <Checkmark width="12px" height="12px" color="#16a34a" />}
                          <span>{priority?.name}</span>
                        </span>
                        {todo.dueDate && (
                          <span className={`px-2 py-1 rounded-full flex items-center gap-1 ${
                            isOverdue 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            <Calendar width="12px" height="12px" color={isOverdue ? "#dc2626" : "#2563eb"} />
                            {new Date(todo.dueDate).toLocaleDateString()}
                          </span>
                        )}
                        <span className="text-vermilion-600">
                          Created {new Date(todo.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {todo.notes && (
                        <div className={`mt-2 text-xs ${isHydrated && darkMode ? 'text-gray-400' : 'text-vermilion-700'} bg-vermilion-50 p-2 rounded flex items-start gap-2`}>
                          <Chatbubble width="14px" height="14px" color="#f97316" className="mt-0.5 flex-shrink-0" />
                          <span>{todo.notes}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-vermilion-400 hover:text-vermilion-600 transition-colors duration-200 p-1"
                        title="Delete task"
                      >
                        <Trash width="16px" height="16px" color="#f97316" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Enhanced Stats */}
        {todos.length > 0 && (
          <div className={`mt-8 p-4 rounded-lg ${isHydrated && darkMode ? 'bg-gray-800' : 'bg-vermilion-100'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className={`text-lg font-bold ${isHydrated && darkMode ? 'text-gray-100' : 'text-vermilion-900'}`}>
                  {completedTodos}
                </div>
                <div className={`text-xs ${isHydrated && darkMode ? 'text-gray-400' : 'text-vermilion-600'}`}>Completed</div>
              </div>
              <div>
                <div className={`text-lg font-bold ${isHydrated && darkMode ? 'text-gray-100' : 'text-vermilion-900'}`}>
                  {totalTodos - completedTodos}
                </div>
                <div className={`text-xs ${isHydrated && darkMode ? 'text-gray-400' : 'text-vermilion-600'}`}>Pending</div>
              </div>
              <div>
                <div className={`text-lg font-bold ${completionRate >= 80 ? 'text-green-600' : completionRate >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {completionRate}%
                </div>
                <div className={`text-xs ${isHydrated && darkMode ? 'text-gray-400' : 'text-vermilion-600'}`}>Progress</div>
              </div>
              <div>
                <div className={`text-lg font-bold ${overdueTodos > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {overdueTodos}
                </div>
                <div className={`text-xs ${isHydrated && darkMode ? 'text-gray-400' : 'text-vermilion-600'}`}>Overdue</div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setTodos(todos.filter(todo => !todo.completed))}
            className="px-3 py-1 text-xs bg-vermilion-100 text-vermilion-700 rounded-full hover:bg-vermilion-200 transition-colors"
          >
            Clear Completed
          </button>
          <button
            onClick={() => setTodos(todos.map(todo => ({ ...todo, completed: true })))}
            className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
          >
            Mark All Done
          </button>
          <button
            onClick={() => {
              const dataStr = JSON.stringify(todos, null, 2);
              const dataBlob = new Blob([dataStr], {type: 'application/json'});
              const url = URL.createObjectURL(dataBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'pacifico-todos.json';
              link.click();
            }}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
          >
            Export Data
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-xs ${isHydrated && darkMode ? 'text-gray-500' : 'text-vermilion-500'}`}>
            Made with Pacifico Oyanib using Next.js, Tailwind CSS, and the beautiful Vermilion color palette
          </p>
        </div>
      </div>
    </div>
  );
}
