import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectList from '../components/dashboard/ProjectList';
import CreateProject from '../components/dashboard/CreateProject';
import StatsCard from '../components/dashboard/StatsCard';
import Button from '../components/common/Button';
import { ToastContainer, useToast } from '../components/common/Toast';

export default function Dashboard() {
  const { projects, loading, error, create, remove } = useProjects();
  const [showCreate, setShowCreate] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const totalChunks = projects.reduce((sum, p) => sum + (p.chunkCount || 0), 0);

  const handleCreate = async (payload) => {
    await create(payload);
    addToast('Project created successfully!', 'success');
  };

  const handleDelete = async (id) => {
    await remove(id);
    addToast('Project deleted', 'info');
  };

  return (
    <>
      <div className="flex flex-col gap-6 max-w-6xl">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard
            label="Total Projects"
            value={projects.length}
            color="brand"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          />
          <StatsCard
            label="Total Chunks"
            value={totalChunks}
            color="blue"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            }
          />
          <StatsCard
            label="Widgets Deployed"
            value={projects.length}
            color="purple"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            }
          />
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Your Projects</h2>
          <Button onClick={() => setShowCreate(true)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </Button>
        </div>

        {/* List */}
        <ProjectList projects={projects} loading={loading} error={error} onDelete={handleDelete} />
      </div>

      <CreateProject isOpen={showCreate} onClose={() => setShowCreate(false)} onCreate={handleCreate} />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}