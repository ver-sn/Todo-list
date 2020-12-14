import React from 'react';
import { Button, Select} from 'antd';

const { Option } = Select;

interface IToolBarProps {
  onChange: (value: string) => void;
  onClick: () => void;
}

const ToolBar: React.FC<IToolBarProps> = ({ onChange, onClick }) => (
  <div className="toolbar">
    <Select placeholder="Sort by" onChange={onChange}>
      <Option value="completed">Show completed</Option>
      <Option value="not completed">Show not completed</Option>
    </Select>
    <Button onClick={() => onClick()} type="primary">Add</Button>
  </div>
);

export default ToolBar;