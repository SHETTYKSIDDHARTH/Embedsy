// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useProjects } from '../hooks/useProjects';
// import { useDocuments } from '../hooks/useDocuments';
// import DocumentList from '../components/documents/DocumentList';
// import Button from '../components/common/Button';
// import Spinner from '../components/common/Spinner';
// import { ToastContainer, useToast } from '../components/common/Toast';
// import { formatDate } from '../utils/formatters';

// export default function ProjectDetail() {
//   const { projectId } = useParams();
//   const navigate = useNavigate();
//   const { projects, loading: projLoading } = useProjects();
//   const { documents, totalChunks, loading: docLoading, error, remove } = useDocuments(projectId);
//   const { toasts, addToast, removeToast } = useToast();

//   const project = projects.find(p => p.id === projectId);

//   if (projLoading) {
//     return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
//   }

//   if (!project) {
//     return (
//       <div className="text-center py-20">
//         <p className="text-gray-400">Project not found.</p>
//         <Button className="mt-4" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
//       </div>
//     );
//   }

//   const handleDelete = async (filename) => {
//     await remove(filename);
//     addToast('Document deleted', 'info');
//   };

//   return (
//     <>
//       <div className="flex flex-col gap-6 max-w-3xl">
//         {/* Breadcrumb */}
//         <div className="flex items-center gap-2 text-sm text-gray-500">
//           <button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors">
//             Dashboard
//           </button>
//           <span>/</span>
//           <span className="text-white">{project.name}</span>
//         </div>

//         {/* Project header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div
//               className="w-12 h-12 rounded-xl flex items-center justify-center text-black font-bold text-xl"
//               style={{ background: project.theme_color || '#00FF87' }}
//             >
//               {project.name?.[0]?.toUpperCase()}
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-white">{project.name}</h2>
//               <p className="text-sm text-gray-500">Created {formatDate(project.created_at)}</p>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <Button variant="secondary" onClick={() => navigate(`/projects/${projectId}/upload`)}>
//               Upload Docs
//             </Button>
//             <Button onClick={() => navigate(`/projects/${projectId}/embed`)}>
//               Get Embed Code
//             </Button>
//           </div>
//         </div>

//         {/* Stats row */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//           {[
//             { label: 'Documents', value: documents.length },
//             { label: 'Total Chunks', value: totalChunks },
//             { label: 'API Key', value: project.api_key?.slice(0, 16) + '...', mono: true },
//           ].map(stat => (
//             <div key={stat.label} className="bg-dark-200 border border-dark-400 rounded-xl p-4">
//               <p className={`text-lg font-bold text-white ${stat.mono ? 'font-mono text-sm' : ''}`}>{stat.value}</p>
//               <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Documents */}
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-semibold text-white">Documents</h3>
//             <Button size="sm" variant="secondary" onClick={() => navigate(`/projects/${projectId}/upload`)}>
//               + Upload
//             </Button>
//           </div>
//           <DocumentList documents={documents} loading={docLoading} error={error} onDelete={handleDelete} />
//         </div>
//       </div>

//       <ToastContainer toasts={toasts} removeToast={removeToast} />
//     </>
//   );
// }


import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useDocuments } from '../hooks/useDocuments';
import DocumentList from '../components/documents/DocumentList';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import { ToastContainer, useToast } from '../components/common/Toast';
import { formatDate } from '../utils/formatters';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, loading: projLoading } = useProjects();
  const { documents, totalChunks, loading: docLoading, error, remove } = useDocuments(projectId);
  const { toasts, addToast, removeToast } = useToast();

  const project = projects.find(p => p.id === projectId);

  if (projLoading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Project not found.</p>
        <Button className="mt-4" onClick={() => navigate('/app/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  const handleDelete = async (filename) => {
    await remove(filename);
    addToast('Document deleted', 'info');
  };

  return (
    <>
      <div className="flex flex-col gap-6 max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('/app/dashboard')} className="hover:text-white transition-colors">
            Dashboard
          </button>
          <span>/</span>
          <span className="text-white">{project.name}</span>
        </div>

        {/* Project header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-black font-bold text-xl"
              style={{ background: project.theme_color || '#00FF87' }}
            >
              {project.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{project.name}</h2>
              <p className="text-sm text-gray-500">Created {formatDate(project.created_at)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => navigate(`/app/projects/${projectId}/upload`)}>
              Upload Docs
            </Button>
            <Button onClick={() => navigate(`/app/projects/${projectId}/embed`)}>
              Get Embed Code
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Documents', value: documents.length },
            { label: 'Total Chunks', value: totalChunks },
            { label: 'API Key', value: project.api_key?.slice(0, 16) + '...', mono: true },
          ].map(stat => (
            <div key={stat.label} className="bg-dark-200 border border-dark-400 rounded-xl p-4">
              <p className={`text-lg font-bold text-white ${stat.mono ? 'font-mono text-sm' : ''}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Documents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Documents</h3>
            <Button size="sm" variant="secondary" onClick={() => navigate(`/app/projects/${projectId}/upload`)}>
              + Upload
            </Button>
          </div>
          <DocumentList documents={documents} loading={docLoading} error={error} onDelete={handleDelete} />
        </div>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}