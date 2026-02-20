// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { formatRelativeTime } from '../../utils/formatters';
// import Button from '../common/Button';
// import Modal from '../common/Modal';

// export default function ProjectCard({ project, onDelete }) {
//   const navigate = useNavigate();
//   const [showDelete, setShowDelete] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   const handleDelete = async () => {
//     setDeleting(true);
//     try {
//       await onDelete(project.id);
//     } finally {
//       setDeleting(false);
//       setShowDelete(false);
//     }
//   };

//   return (
//     <>
//       <div className="bg-dark-200 border border-dark-400 rounded-xl p-5 hover:border-dark-500 transition-colors group">
//         {/* Header */}
//         <div className="flex items-start justify-between gap-3 mb-4">
//           <div
//             className="w-10 h-10 rounded-lg flex items-center justify-center text-black font-bold text-lg shrink-0"
//             style={{ background: project.theme_color || '#00FF87' }}
//           >
//             {project.name?.[0]?.toUpperCase()}
//           </div>
//           <button
//             onClick={() => setShowDelete(true)}
//             className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                 d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//             </svg>
//           </button>
//         </div>

//         {/* Info */}
//         <h3 className="font-semibold text-white mb-1 truncate">{project.name}</h3>
//         <p className="text-xs text-gray-500 mb-4">
//           {project.chunkCount || 0} chunks · {formatRelativeTime(project.created_at)}
//         </p>

//         {/* Actions */}
//         <div className="flex gap-2">
//           <Button
//             size="sm"
//             variant="secondary"
//             className="flex-1"
//             onClick={() => navigate(`/projects/${project.id}`)}
//           >
//             Manage
//           </Button>
//           <Button
//             size="sm"
//             variant="ghost"
//             onClick={() => navigate(`/projects/${project.id}/embed`)}
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                 d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//             </svg>
//           </Button>
//         </div>
//       </div>

//       {/* Delete confirm modal */}
//       <Modal
//         isOpen={showDelete}
//         onClose={() => setShowDelete(false)}
//         title="Delete Project"
//         footer={
//           <>
//             <Button variant="ghost" onClick={() => setShowDelete(false)}>Cancel</Button>
//             <Button variant="danger" loading={deleting} onClick={handleDelete}>Delete</Button>
//           </>
//         }
//       >
//         <p className="text-gray-400">
//           Are you sure you want to delete <span className="text-white font-medium">{project.name}</span>?
//           This will permanently remove all uploaded documents and embeddings.
//         </p>
//       </Modal>
//     </>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatRelativeTime } from '../../utils/formatters';
import Button from '../common/Button';
import Modal from '../common/Modal';

export default function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(project.id);
    } finally {
      setDeleting(false);
      setShowDelete(false);
    }
  };

  return (
    <>
      <div className="bg-dark-200 border border-dark-400 rounded-xl p-5 hover:border-dark-500 transition-colors group">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-black font-bold text-lg shrink-0"
            style={{ background: project.theme_color || '#00FF87' }}
          >
            {project.name?.[0]?.toUpperCase()}
          </div>
          <button
            onClick={() => setShowDelete(true)}
            className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* Info */}
        <h3 className="font-semibold text-white mb-1 truncate">{project.name}</h3>
        <p className="text-xs text-gray-500 mb-4">
          {project.chunkCount || 0} chunks · {formatRelativeTime(project.created_at)}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="flex-1"
            onClick={() => navigate(`/app/projects/${project.id}`)}
          >
            Manage
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate(`/app/projects/${project.id}/embed`)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Delete confirm modal */}
      <Modal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        title="Delete Project"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowDelete(false)}>Cancel</Button>
            <Button variant="danger" loading={deleting} onClick={handleDelete}>Delete</Button>
          </>
        }
      >
        <p className="text-gray-400">
          Are you sure you want to delete <span className="text-white font-medium">{project.name}</span>?
          This will permanently remove all uploaded documents and embeddings.
        </p>
      </Modal>
    </>
  );
}