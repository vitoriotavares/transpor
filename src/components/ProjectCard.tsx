import React from 'react';
import StatusBadge from './StatusBadge';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'queued';
  progress: number;
  duration: string;
  date: string;
  sourceLanguage: string;
  targetLanguages: string[];
  thumbnail?: string;
}

interface ProjectCardProps {
  project: ProjectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{project.description}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                project.status === 'failed' 
                  ? 'bg-red-500' 
                  : project.status === 'completed'
                    ? 'bg-green-500'
                    : project.status === 'queued'
                      ? 'bg-yellow-500'
                      : 'bg-blue-500'
              }`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Duration</p>
            <p className="font-medium">{project.duration}</p>
          </div>
          <div>
            <p className="text-gray-500">Created</p>
            <p className="font-medium">{project.date}</p>
          </div>
          <div>
            <p className="text-gray-500">Source</p>
            <p className="font-medium">{project.sourceLanguage}</p>
          </div>
          <div>
            <p className="text-gray-500">Target</p>
            <p className="font-medium">
              {project.targetLanguages.length > 1 
                ? `${project.targetLanguages[0]} +${project.targetLanguages.length - 1}` 
                : project.targetLanguages[0]}
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end space-x-2">
          <button className="btn btn-secondary text-xs">View Details</button>
          {project.status === 'completed' && (
            <button className="btn btn-primary text-xs">Download</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
