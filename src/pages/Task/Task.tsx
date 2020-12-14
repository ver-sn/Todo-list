import React, { useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import { useParams, useHistory } from 'react-router';
import { ITask } from '../../interfaces';
import axios from 'axios';
import { API_URL } from '../../api/api';

interface ParamTypes {
  id: string
}

const Task: React.FC = () => {
  const [task, setTask] = useState<ITask>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let { id } = useParams<ParamTypes>();
  const history = useHistory();

  useEffect(() => { 
    axios
      .get(`${API_URL}/tasks/${id}`)
      .then(response => {
        const data = response.data;
        console.log(data);
        setIsLoading(true);
        setTask(data);
      })
      .catch(error => {
        setIsLoading(true);
        setError(error);
      });
  }, [id]);

  if (!isLoading) return <div className="wrap"><Spin /></div>;

  if (error) return <div className="wrap"><span>Something went wrong...</span></div>;

  return (
    <div className="container">
      <Button onClick={() => history.push('/')}>Back</Button>
      <div className="block">
        <h2 className="block__title">{task?.name}</h2>
        <div className="block__content">
          <p className="block__text">{task?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Task;