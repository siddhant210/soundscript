import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Mic, Youtube, ArrowRight, Headphones, FileAudio } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // Handle recording
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording logic would go here
      setIsRecording(false);
      // In a real app, you would save the recording
    } else {
      // Start recording logic would go here
      setIsRecording(true);
      setRecordingTime(0);
      
      // Simulate recording timer
      const interval = setInterval(() => {
        setRecordingTime(prev => {
          if (!isRecording && prev >= 300) { // Max 5 minutes
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  // Format recording time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Process the input and navigate to processing page
  const handleProcess = () => {
    // In a real app, you would send the file/recording/URL to your backend
    // For now, we'll just navigate to the processing page
    navigate('/processing');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="pt-12 pb-8 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
          SoundScript
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Transform your audio into detailed transcripts, summaries, and speaker identification
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-16">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center px-5 py-3 rounded-lg transition-colors ${
              activeTab === 'upload' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Upload size={18} className="mr-2" />
            Upload Audio
          </button>
          
          <button
            onClick={() => setActiveTab('record')}
            className={`flex items-center px-5 py-3 rounded-lg transition-colors ${
              activeTab === 'record' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Mic size={18} className="mr-2" />
            Record Audio
          </button>
          
          <button
            onClick={() => setActiveTab('youtube')}
            className={`flex items-center px-5 py-3 rounded-lg transition-colors ${
              activeTab === 'youtube' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Youtube size={18} className="mr-2" />
            YouTube Link
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg">
          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Upload Audio File</h2>
              
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
                  dragActive ? 'border-purple-500 bg-purple-500/10' : 'border-gray-600 hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="audio/*"
                  className="hidden"
                />
                
                {file ? (
                  <div className="flex flex-col items-center">
                    <FileAudio size={48} className="text-purple-500 mb-3" />
                    <p className="text-lg font-medium mb-1">{file.name}</p>
                    <p className="text-gray-400 text-sm">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload size={48} className="text-gray-400 mb-3" />
                    <p className="text-lg font-medium mb-1">Drag & drop your audio file here</p>
                    <p className="text-gray-400">or click to browse</p>
                    <p className="text-gray-500 text-sm mt-2">Supports MP3, WAV, M4A, and more</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={handleProcess}
                  disabled={!file}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    file 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Process Audio
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Record Tab */}
          {activeTab === 'record' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Record Audio</h2>
              
              <div className="flex flex-col items-center justify-center p-8 mb-6">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ${
                  isRecording ? 'bg-red-500/20 animate-pulse' : 'bg-gray-700'
                }`}>
                  <button
                    onClick={toggleRecording}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors ${
                      isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    <Mic size={36} />
                  </button>
                </div>
                
                {isRecording ? (
                  <div className="text-center">
                    <p className="text-xl font-bold text-red-500 mb-1">Recording...</p>
                    <p className="text-2xl font-mono">{formatTime(recordingTime)}</p>
                  </div>
                ) : (
                  <p className="text-gray-400 text-center">
                    {recordingTime > 0 
                      ? "Recording saved. Click the button to re-record." 
                      : "Click the microphone button to start recording"}
                  </p>
                )}
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={handleProcess}
                  disabled={recordingTime === 0 || isRecording}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    recordingTime > 0 && !isRecording
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Process Recording
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* YouTube Tab */}
          {activeTab === 'youtube' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">YouTube Link</h2>
              
              <div className="mb-6">
                <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-400 mb-2">
                  Paste YouTube URL
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="youtube-url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button 
                    className="bg-gray-600 hover:bg-gray-500 px-4 rounded-r-lg flex items-center"
                    onClick={() => {
                      // In a real app, you would validate the URL here
                      if (youtubeUrl.trim()) {
                        // Preview logic would go here
                      }
                    }}
                  >
                    <Headphones size={18} />
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  We'll extract the audio from the video for processing
                </p>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={handleProcess}
                  disabled={!youtubeUrl.trim()}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    youtubeUrl.trim() 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Process YouTube Audio
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
              <FileAudio size={24} className="text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Accurate Transcription</h3>
            <p className="text-gray-400">
              Get precise transcripts of your audio with speaker identification and timestamps.
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
              <Upload size={24} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Input Options</h3>
            <p className="text-gray-400">
              Upload audio files, record directly, or extract audio from YouTube videos.
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
              <Mic size={24} className="text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Summaries</h3>
            <p className="text-gray-400">
              Get concise summaries of your audio content with key points highlighted.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;