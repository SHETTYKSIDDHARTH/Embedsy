import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useDocuments } from '../hooks/useDocuments';
import DocumentUpload from '../components/documents/DocumentUpload';
import Button from '../components/common/Button';
import { ToastContainer, useToast } from '../components/common/Toast';

export default function Upload() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { upload } = useDocuments(projectId);
  const { toasts, addToast, removeToast } = useToast();

  const project = projects.find(p => p.id === projectId);

  const handleUpload = async (file, onProgress) => {
    try {
      await upload(file, onProgress);
      addToast(`"${file.name}" uploaded successfully!`, 'success');
    } catch (err) {
      addToast(err.message || 'Upload failed', 'error');
      throw err;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 max-w-2xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors">Dashboard</button>
          <span>/</span>
          <button onClick={() => navigate(`/projects/${projectId}`)} className="hover:text-white transition-colors">
            {project?.name || 'Project'}
          </button>
          <span>/</span>
          <span className="text-white">Upload</span>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-1">Upload Documents</h2>
          <p className="text-gray-500 text-sm">
            Upload PDFs, text files, or markdown files to train your AI assistant.
          </p>
        </div>

        <DocumentUpload onUpload={handleUpload} />

        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => navigate(`/projects/${projectId}`)}>
            ← Back to Project
          </Button>
          <Button onClick={() => navigate(`/projects/${projectId}/embed`)}>
            Get Embed Code →
          </Button>
        </div>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}