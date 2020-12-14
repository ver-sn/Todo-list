import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import ListItem from '../../components/ListItem';
import ToolBar from '../../components/ToolBar';
import AddForm from '../../components/AddForm';
import { ITask } from '../../interfaces';
import { IAddFormValues } from '../../components/AddForm/AddForm';
import axios from 'axios';
import { API_URL } from '../../api/api';

const Main: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (value: string) => {
    if (value === 'completed') {
      axios
      .get(`${API_URL}/tasks`)
      .then(response => {
        const data = response.data;
        setIsLoading(true);
        setTasks(data.filter((item: ITask) => item.isDone));
      })
      .catch(error => {
        setIsLoading(true);
        setError(error);
      });
    }
    if (value === 'not completed') {
      axios
      .get(`${API_URL}/tasks`)
      .then(response => {
        const data = response.data;
        setIsLoading(true);
        setTasks(data.filter((item: ITask) => !item.isDone));
      })
      .catch(error => {
        setIsLoading(true);
        setError(error);
      });
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(item => item.id !== taskId));
    axios.delete(`${API_URL}/tasks/${taskId}`);
  };

  const createTask = (values: IAddFormValues) => {
    axios.post(`${API_URL}/tasks`, {
      ...values,
      isDone: false
    })
    .then(response => {
      setTasks(prev => [...prev, response.data]);
    })
    .catch(error => {
      setError(error);
    });
    setIsModalOpen(false);
  };

  useEffect(() => { 
    axios
      .get(`${API_URL}/tasks`)
      .then(response => {
        const data = response.data;
        setIsLoading(true);
        setTasks(data);
      })
      .catch(error => {
        setIsLoading(true);
        setError(error);
      });
  }, []);

  if (!isLoading) return <div className="wrap"><Spin /></div>;

  return (
    <div className="container">
      <ToolBar onChange={handleChange} onClick={() => setIsModalOpen(true)} />
      <div>
        {error && <span>Something went wrong...</span>}
        {tasks.length > 0 && tasks.map(item => (
          <ListItem
            key={item.id}
            task={item}
            onDelete={deleteTask}
          />
        ))}
      </div>
      <AddForm
        isModalOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={createTask}
      />
    </div>
  );
}

export default Main;