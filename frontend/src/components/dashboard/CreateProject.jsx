import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { DEFAULT_THEME_COLOR } from '../../utils/constants';

export default function CreateProject({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [widgetTitle, setWidgetTitle] = useState('');
  const [themeColor, setThemeColor] = useState(DEFAULT_THEME_COLOR);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Project name is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await onCreate({ name: name.trim(), widgetTitle: widgetTitle.trim() || name.trim(), themeColor });
      setName('');
      setWidgetTitle('');
      setThemeColor(DEFAULT_THEME_COLOR);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Project"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button loading={loading} onClick={handleSubmit}>Create Project</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Project Name *"
          placeholder="My Documentation Bot"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          error={error}
        />
        <Input
          label="Widget Title"
          placeholder="Ask us anything!"
          value={widgetTitle}
          onChange={e => setWidgetTitle(e.target.value)}
          hint="Displayed at the top of the chat widget"
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-300">Theme Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={themeColor}
              onChange={e => setThemeColor(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-dark-500"
            />
            <span className="text-sm text-gray-400 font-mono">{themeColor}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}