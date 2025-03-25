import React, { useState } from 'react';
import { ProjectData } from '../components/ProjectCard';
import StatusBadge from '../components/StatusBadge';

const Dashboard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [freeTranscriptionsLeft, _setFreeTranscriptionsLeft] = useState<number>(3);
  
  // Mock data for projects
  const projects: ProjectData[] = [
    {
      id: '1',
      title: 'Marketing Podcast Episode 42',
      description: 'Weekly discussion on digital marketing trends',
      status: 'completed',
      progress: 100,
      duration: '45:22',
      date: 'Mar 22, 2025',
      sourceLanguage: 'English',
      targetLanguages: ['Spanish', 'French', 'German'],
    },
    {
      id: '2',
      title: 'Tech Talk: AI Revolution',
      description: 'Interview with AI experts on latest developments',
      status: 'processing',
      progress: 68,
      duration: '1:12:05',
      date: 'Mar 24, 2025',
      sourceLanguage: 'English',
      targetLanguages: ['Japanese', 'Korean'],
    },
  ];

  // Steps in the workflow
  const steps = [
    { id: 'upload', label: 'Upload' },
    { id: 'transcribe', label: 'Transcribe' },
    { id: 'review-transcription', label: 'Review' },
    { id: 'translate', label: 'Translate' },
    { id: 'review-translation', label: 'Review' },
    { id: 'download', label: 'Download' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Welcome Section - Simple and clean */}
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-light text-gray-800">Dicta</h1>
        <p className="text-gray-500 mt-2">Transform your podcasts with AI-powered transcription and translation</p>
      </div>

      {/* Free Version Reminder */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-blue-800">
            You're using the <span className="font-medium">Free Plan</span> with {freeTranscriptionsLeft} transcriptions remaining
          </span>
        </div>
        <button className="text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition-colors duration-200">
          Upgrade
        </button>
      </div>

      {/* Workflow Steps - Visual guide for the process */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8">
        <div className="flex flex-wrap justify-between items-center relative">
          {/* Progress line connecting steps */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10 hidden md:block"></div>
          
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center mb-2 relative z-10">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  index < currentStep 
                    ? 'bg-green-100 text-green-600 border border-green-200' 
                    : index === currentStep
                      ? 'bg-blue-100 text-blue-600 border border-blue-200 ring-4 ring-blue-50' 
                      : 'bg-gray-100 text-gray-400 border border-gray-200'
                }`}
              >
                {index < currentStep ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={`text-xs ${
                index === currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Action Card - Focused on current step */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8 transition-all duration-300">
        {currentStep === 0 && (
          <div className="text-center py-8">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <h2 className="mt-4 text-xl font-medium text-gray-900">Upload your podcast</h2>
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop your audio file here, or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Supports MP3, WAV, FLAC (max 500MB)
              </p>
            </div>
            <button 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              onClick={() => setCurrentStep(1)}
            >
              Select File
            </button>
          </div>
        )}

        {currentStep > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                {currentStep === 1 ? 'Transcribing...' : 
                 currentStep === 2 ? 'Review Transcription' :
                 currentStep === 3 ? 'Translating...' :
                 currentStep === 4 ? 'Review Translation' : 'Download Files'}
              </h2>
              <StatusBadge status={
                currentStep === 1 || currentStep === 3 ? 'processing' :
                currentStep === 5 ? 'completed' : 'pending'
              } />
            </div>
            
            {/* Content based on current step */}
            {currentStep === 1 && (
              <div className="py-6 text-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="rounded-full bg-blue-100 h-16 w-16 flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Analyzing audio and generating transcription...</p>
                  <div className="w-full max-w-md bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">This may take a few minutes</p>
                </div>
                <button 
                  className="mt-6 inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  onClick={() => setCurrentStep(2)}
                >
                  Skip to Review
                </button>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="py-4">
                <div className="border border-gray-200 rounded-md p-4 mb-4 hover:border-gray-300 transition-colors duration-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500">00:00 - 00:15</span>
                    <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-800">Welcome to Tech Talk. Today we're discussing the latest developments in AI technology with our special guest, Dr. Jane Smith.</p>
                </div>
                <div className="border border-gray-200 rounded-md p-4 mb-4 hover:border-gray-300 transition-colors duration-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-500">00:15 - 00:30</span>
                    <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-800">Dr. Smith is a leading researcher in machine learning and has recently published a groundbreaking paper on neural networks.</p>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button 
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Edit Transcript
                  </button>
                  <button 
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    onClick={() => setCurrentStep(3)}
                  >
                    Continue to Translation
                  </button>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="py-6 text-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="rounded-full bg-purple-100 h-16 w-16 flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Translating content to Spanish, French, German...</p>
                  <div className="w-full max-w-md bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">This may take a few minutes</p>
                </div>
                <button 
                  className="mt-6 inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  onClick={() => setCurrentStep(4)}
                >
                  Skip to Review
                </button>
              </div>
            )}
            
            {currentStep === 4 && (
              <div className="py-4">
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <button className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 transition-colors duration-200 hover:bg-blue-200">English</button>
                    <button className="px-2 py-1 text-xs font-medium rounded-full bg-blue-600 text-white transition-colors duration-200 hover:bg-blue-700">Spanish</button>
                    <button className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 transition-colors duration-200 hover:bg-gray-200">French</button>
                    <button className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 transition-colors duration-200 hover:bg-gray-200">German</button>
                  </div>
                  <div className="border border-gray-200 rounded-md p-4 mb-3 hover:border-gray-300 transition-colors duration-200">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-gray-500">00:00 - 00:15</span>
                    </div>
                    <p className="text-sm text-gray-800">Bienvenidos a Tech Talk. Hoy estamos discutiendo los últimos avances en tecnología de IA con nuestra invitada especial, la Dra. Jane Smith.</p>
                  </div>
                  <div className="border border-gray-200 rounded-md p-4 hover:border-gray-300 transition-colors duration-200">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-gray-500">00:15 - 00:30</span>
                    </div>
                    <p className="text-sm text-gray-800">La Dra. Smith es una investigadora líder en aprendizaje automático y recientemente ha publicado un artículo innovador sobre redes neuronales.</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button 
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Edit Translation
                  </button>
                  <button 
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    onClick={() => setCurrentStep(5)}
                  >
                    Continue to Download
                  </button>
                </div>
              </div>
            )}
            
            {currentStep === 5 && (
              <div className="py-6">
                <div className="text-center mb-6">
                  <div className="rounded-full bg-green-100 h-16 w-16 flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Processing Complete!</h3>
                  <p className="text-sm text-gray-500 mt-1">Your podcast has been transcribed and translated successfully</p>
                </div>
                
                <div className="bg-gray-50 rounded-md p-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Available Files</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md transition-colors duration-200">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm text-gray-700">English Transcript</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">TXT</button>
                        <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">SRT</button>
                        <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">DOCX</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md transition-colors duration-200">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <span className="text-sm text-gray-700">Spanish Translation</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">TXT</button>
                        <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">SRT</button>
                        <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">DOCX</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md transition-colors duration-200">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <span className="text-sm text-gray-700">French Translation</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">TXT</button>
                        <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">SRT</button>
                        <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">DOCX</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md transition-colors duration-200">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <span className="text-sm text-gray-700">German Translation</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">TXT</button>
                        <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">SRT</button>
                        <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">DOCX</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-4">
                  <button 
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    onClick={() => setCurrentStep(0)}
                  >
                    Start New Project
                  </button>
                  <button 
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Download All Files
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Recent Projects - Simplified */}
      {projects.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Projects</h2>
          <div className="space-y-3">
            {projects.map(project => (
              <div key={project.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-all duration-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{project.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{project.duration} • {project.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <StatusBadge status={project.status} />
                  <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
