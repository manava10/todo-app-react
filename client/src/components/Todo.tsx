import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import ProductivityTools from './ProductivityTools';

interface TodoItem {
  _id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  category: string;
  tags: string[];
}

interface NewTodo {
  text: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  category: string;
  tags: string;
}

const Container = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Poppins', sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const LogoutButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 1rem;

  &:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  padding: 0.875rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.875rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
`;

const AddButton = styled.button`
  padding: 1rem 2rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 1.1rem;
  align-self: flex-end;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const Filters = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TodoItem = styled.div<{ completed: boolean; priority: string }>`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#95a5a6' : '#2c3e50'};
  border-left: 4px solid ${props => {
    switch (props.priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f1c40f';
      case 'low': return '#2ecc71';
      default: return '#95a5a6';
    }
  }};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
  }
`;

const TodoContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TodoText = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;

const TodoMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const Tag = styled.span`
  background: #f0f2f5;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #34495e;
  font-weight: 500;
`;

const Checkbox = styled.input`
  margin-right: 1.5rem;
  width: 1.3rem;
  height: 1.3rem;
  cursor: pointer;
  accent-color: #3498db;
`;

const DeleteButton = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
  }
`;

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<NewTodo>({
    text: '',
    priority: 'medium',
    dueDate: '',
    category: 'general',
    tags: ''
  });
  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all',
    category: 'all'
  });
  const [dailyGoal] = useState(5);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5050/api/todos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.text.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5050/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newTodo,
          tags: newTodo.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        })
      });

      const todo = await response.json();
      setTodos(prev => [todo, ...prev]);
      setNewTodo({
        text: '',
        priority: 'medium',
        dueDate: '',
        category: 'general',
        tags: ''
      });
    } catch (err) {
      console.error('Error creating todo:', err);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5050/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed })
      });

      const updatedTodo = await response.json();
      setTodos(prev => prev.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5050/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const filteredTodos = todos.filter(todo => {
    if (filter.status !== 'all' && todo.completed !== (filter.status === 'completed')) {
      return false;
    }
    if (filter.priority !== 'all' && todo.priority !== filter.priority) {
      return false;
    }
    if (filter.category !== 'all' && todo.category !== filter.category) {
      return false;
    }
    return true;
  });

  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <Container>
      <Header>
        <Title>My Todo List</Title>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>

      <ProductivityTools
        totalTodos={todos.length}
        completedTodos={completedTodos}
        dailyGoal={dailyGoal}
      />

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            value={newTodo.text}
            onChange={(e) => setNewTodo(prev => ({ ...prev, text: e.target.value }))}
            placeholder="Add a new todo..."
          />
          <Select
            value={newTodo.priority}
            onChange={(e) => setNewTodo(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </Select>
        </InputGroup>
        <InputGroup>
          <Input
            type="date"
            value={newTodo.dueDate}
            onChange={(e) => setNewTodo(prev => ({ ...prev, dueDate: e.target.value }))}
          />
          <Input
            type="text"
            value={newTodo.category}
            onChange={(e) => setNewTodo(prev => ({ ...prev, category: e.target.value }))}
            placeholder="Category"
          />
          <Input
            type="text"
            value={newTodo.tags}
            onChange={(e) => setNewTodo(prev => ({ ...prev, tags: e.target.value }))}
            placeholder="Tags (comma-separated)"
          />
        </InputGroup>
        <AddButton type="submit">Add Todo</AddButton>
      </Form>

      <Filters>
        <FilterGroup>
          <FilterLabel>Status</FilterLabel>
          <Select
            value={filter.status}
            onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </Select>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>Priority</FilterLabel>
          <Select
            value={filter.priority}
            onChange={(e) => setFilter(prev => ({ ...prev, priority: e.target.value }))}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>Category</FilterLabel>
          <Select
            value={filter.category}
            onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="all">All Categories</option>
            {Array.from(new Set(todos.map(todo => todo.category))).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
        </FilterGroup>
      </Filters>

      <TodoList>
        {filteredTodos.map(todo => (
          <TodoItem key={todo._id} completed={todo.completed} priority={todo.priority}>
            <Checkbox
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id, !todo.completed)}
            />
            <TodoContent>
              <TodoText>{todo.text}</TodoText>
              <TodoMeta>
                {todo.dueDate && (
                  <span>Due: {format(new Date(todo.dueDate), 'MMM d, yyyy')}</span>
                )}
                <span>Priority: {todo.priority}</span>
                <span>Category: {todo.category}</span>
                {todo.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TodoMeta>
            </TodoContent>
            <DeleteButton onClick={() => deleteTodo(todo._id)}>Delete</DeleteButton>
          </TodoItem>
        ))}
      </TodoList>
    </Container>
  );
};

export default Todo; 