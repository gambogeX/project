import React from 'react';
import { learningResources } from '../../data/learningResources';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function LearningSection() {
  const [selectedResource, setSelectedResource] = React.useState(learningResources[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Resources</h3>
        <div className="space-y-2">
          {learningResources.map((resource) => (
            <button
              key={resource.id}
              onClick={() => setSelectedResource(resource)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                selectedResource.id === resource.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{resource.title}</h4>
                  <p className="text-sm text-gray-500">{resource.category}</p>
                </div>
                {selectedResource.id === resource.id && (
                  <ArrowRight className="h-4 w-4" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedResource.title}
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{selectedResource.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{selectedResource.estimatedTime}</span>
            </div>
          </div>
        </div>

        <div className="prose max-w-none">
          <ReactMarkdown>{selectedResource.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}