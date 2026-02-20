// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useProjects } from '../hooks/useProjects';
// import EmbedCodeDisplay from '../components/embed/EmbedCodeDisplay';
// import LivePreview from '../components/embed/LivePreview';
// import Button from '../components/common/Button';
// import Spinner from '../components/common/Spinner';

// export default function Embed() {
//   const { projectId } = useParams();
//   const navigate = useNavigate();
//   const { projects, loading } = useProjects();

//   const project = projects.find(p => p.id === projectId);

//   if (loading) {
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

//   return (
//     <div className="flex flex-col gap-6 max-w-5xl">
//       {/* Breadcrumb */}
//       <div className="flex items-center gap-2 text-sm text-gray-500">
//         <button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors">Dashboard</button>
//         <span>/</span>
//         <button onClick={() => navigate(`/projects/${projectId}`)} className="hover:text-white transition-colors">
//           {project.name}
//         </button>
//         <span>/</span>
//         <span className="text-white">Embed</span>
//       </div>

//       <div>
//         <h2 className="text-xl font-bold text-white mb-1">Embed Widget</h2>
//         <p className="text-gray-500 text-sm">Copy the code below and paste it into your website.</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <EmbedCodeDisplay project={project} />
//         <div>
//           <h3 className="text-sm font-semibold text-white mb-4">Live Preview</h3>
//           <LivePreview project={project} />
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import EmbedCodeDisplay from '../components/embed/EmbedCodeDisplay';
import LivePreview from '../components/embed/LivePreview';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';

export default function Embed() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, loading } = useProjects();

  const project = projects.find(p => p.id === projectId);

  if (loading) {
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

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button onClick={() => navigate('/app/dashboard')} className="hover:text-white transition-colors">Dashboard</button>
        <span>/</span>
        <button onClick={() => navigate(`/app/projects/${projectId}`)} className="hover:text-white transition-colors">
          {project.name}
        </button>
        <span>/</span>
        <span className="text-white">Embed</span>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-1">Embed Widget</h2>
        <p className="text-gray-500 text-sm">Copy the code below and paste it into your website.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmbedCodeDisplay project={project} />
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Live Preview</h3>
          <LivePreview project={project} />
        </div>
      </div>
    </div>
  );
}