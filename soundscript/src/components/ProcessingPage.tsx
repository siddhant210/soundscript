import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, List, Users, CheckCircle } from 'lucide-react';

const ProcessingPage: React.FC = () => {
  const [transcriptProgress, setTranscriptProgress] = useState(0);
  const [summaryProgress, setSummaryProgress] = useState(0);
  const [speakersProgress, setSpeakersProgress] = useState(0);
  const navigate = useNavigate();
  
  // Simulate processing with real-time updates - slower and more realistic
  useEffect(() => {
    // Transcript processing - takes about 30-35 seconds
    const transcriptInterval = setInterval(() => {
      setTranscriptProgress(prev => {
        if (prev >= 100) {
          clearInterval(transcriptInterval);
          startSummaryProcess();
          return 100;
        }
        // Slower increment for more realistic timing
        return prev + (prev < 70 ? 2 : 1);
      });
    }, 600); // Slower interval
    
    const startSummaryProcess = () => {
      // Summary processing - takes about 15-20 seconds
      const summaryInterval = setInterval(() => {
        setSummaryProgress(prev => {
          if (prev >= 100) {
            clearInterval(summaryInterval);
            startSpeakersProcess();
            return 100;
          }
          // Slower increment
          return prev + 3;
        });
      }, 500);
    };
    
    const startSpeakersProcess = () => {
      // Speaker identification - takes about 15-20 seconds
      const speakersInterval = setInterval(() => {
        setSpeakersProgress(prev => {
          if (prev >= 100) {
            clearInterval(speakersInterval);
            // Navigate to results page after all processing is complete
            // Add a small delay to show the completed state
            setTimeout(() => navigate('/results'), 1500);
            return 100;
          }
          // Slower increment
          return prev + 4;
        });
      }, 600);
    };
    
    return () => {
      clearInterval(transcriptInterval);
    };
  }, [navigate]);

  const isComplete = transcriptProgress === 100 && 
                     summaryProgress === 100 && 
                     speakersProgress === 100;
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-4 md:p-6">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
          Processing Your Audio
        </h1>
        <p className="text-gray-400">Please wait while we analyze your content</p>
      </header>

      {/* Processing Cards */}
      <div className="max-w-2xl mx-auto w-full space-y-6">
        {/* Transcript Processing */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
              transcriptProgress < 100 ? 'bg-blue-600' : 'bg-green-500'
            }`}>
              {transcriptProgress < 100 ? (
                <FileText size={20} className="text-white" />
              ) : (
                <CheckCircle size={20} className="text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-1">Generating Transcript</h3>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${transcriptProgress}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-4 text-lg font-bold">
              {transcriptProgress}%
            </div>
          </div>
          <p className="text-gray-400 text-sm ml-14">
            {transcriptProgress < 20 && "Analyzing audio..."}
            {transcriptProgress >= 20 && transcriptProgress < 40 && "Detecting speech patterns..."}
            {transcriptProgress >= 40 && transcriptProgress < 60 && "Processing language..."}
            {transcriptProgress >= 60 && transcriptProgress < 80 && "Converting speech to text..."}
            {transcriptProgress >= 80 && transcriptProgress < 100 && "Finalizing transcript..."}
            {transcriptProgress === 100 && "Transcript complete!"}
          </p>
        </div>

        {/* Summary Processing */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
              transcriptProgress < 100 ? 'bg-gray-600' : 
              (summaryProgress < 100 ? 'bg-purple-600' : 'bg-green-500')
            }`}>
              {summaryProgress < 100 && transcriptProgress === 100 ? (
                <List size={20} className="text-white" />
              ) : summaryProgress === 100 ? (
                <CheckCircle size={20} className="text-white" />
              ) : (
                <List size={20} className="text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-1">Creating Summary</h3>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className={`${
                    transcriptProgress < 100 ? 'bg-gray-600' : 'bg-purple-600'
                  } h-2.5 rounded-full transition-all duration-300`}
                  style={{ width: `${summaryProgress}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-4 text-lg font-bold">
              {transcriptProgress < 100 ? 'Waiting' : `${summaryProgress}%`}
            </div>
          </div>
          <p className="text-gray-400 text-sm ml-14">
            {transcriptProgress < 100 && "Waiting for transcript completion..."}
            {transcriptProgress === 100 && summaryProgress < 30 && "Analyzing transcript content..."}
            {summaryProgress >= 30 && summaryProgress < 60 && "Identifying key points..."}
            {summaryProgress >= 60 && summaryProgress < 90 && "Generating summary..."}
            {summaryProgress >= 90 && summaryProgress < 100 && "Refining summary..."}
            {summaryProgress === 100 && "Summary complete!"}
          </p>
        </div>

        {/* Speakers Identification */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
              summaryProgress < 100 ? 'bg-gray-600' : 
              (speakersProgress < 100 ? 'bg-indigo-600' : 'bg-green-500')
            }`}>
              {speakersProgress < 100 && summaryProgress === 100 ? (
                <Users size={20} className="text-white" />
              ) : speakersProgress === 100 ? (
                <CheckCircle size={20} className="text-white" />
              ) : (
                <Users size={20} className="text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-1">Identifying Speakers</h3>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className={`${
                    summaryProgress < 100 ? 'bg-gray-600' : 'bg-indigo-600'
                  } h-2.5 rounded-full transition-all duration-300`}
                  style={{ width: `${speakersProgress}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-4 text-lg font-bold">
              {summaryProgress < 100 ? 'Waiting' : `${speakersProgress}%`}
            </div>
          </div>
          <p className="text-gray-400 text-sm ml-14">
            {summaryProgress < 100 && "Waiting for summary completion..."}
            {summaryProgress === 100 && speakersProgress < 25 && "Analyzing voice patterns..."}
            {speakersProgress >= 25 && speakersProgress < 50 && "Distinguishing speakers..."}
            {speakersProgress >= 50 && speakersProgress < 75 && "Matching dialogue to speakers..."}
            {speakersProgress >= 75 && speakersProgress < 100 && "Finalizing speaker data..."}
            {speakersProgress === 100 && "Speaker identification complete!"}
          </p>
        </div>

        {/* Results Button */}
        {isComplete && (
          <div className="flex justify-center mt-8">
            <button 
              onClick={() => navigate('/results')}
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-medium text-white transition-colors flex items-center gap-2"
            >
              <CheckCircle size={20} />
              View Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingPage;