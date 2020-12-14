import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Checkbox, Button, Tooltip,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ITask } from '../../interfaces';

interface IListItemProps {
  task: ITask;
  onDelete: (id: string) => void;
}

const ListItem: React.FC<IListItemProps> = ({ task, onDelete }) => {
  const [isChecked, setIsChecked] = useState(task.isDone);
  const tooltip = isChecked ? 'Mark not completed' : 'Mark completed';
  const titleStyle = isChecked ? 'text_crossedOut card__title' : 'card__title';

  return (
    <div className="card">
      <div className="card__content">
        <Tooltip title={tooltip}>
          <Checkbox
            checked={isChecked}
            defaultChecked={task.isDone}
            onChange={(event: CheckboxChangeEvent) => setIsChecked(event.target.checked)}
          />
        </Tooltip>

        <h4 className={titleStyle}>
          {task.name}
        </h4>
      </div>
      <div className="card__action">
        <Link className="card__link" to={`/task/${task.id}/`}>More details...</Link>
        <Button type="primary" danger onClick={() => onDelete(task.id)}>Delete</Button>
      </div>
    </div>
  );
}

export default ListItem;