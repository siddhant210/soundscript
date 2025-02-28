import React, { useState } from 'react';
import { FileText, List, Users, Download, Bookmark, Copy, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample data for different content types
const sampleData = {
  // Song lyrics example
  song: {
    transcript: `[Verse 1]
Mujhe tum yaad aa rahe ho
Aise mein kya karoon
Raat bhar barish ho rahi hai
Tere bina kya karoon

[Chorus]
Baarish ho rahi hai
Baarish ho rahi hai
Baarish ho rahi hai
Tere bina kya karoon

[Verse 2]
Tere bina jee paana
Mujhe yeh lagta nahi
Jab se tum gaye ho
Sab kuch adhura sa lagta hai

[Chorus]
Baarish ho rahi hai
Baarish ho rahi hai
Baarish ho rahi hai
Tere bina kya karoon`,
    
    summary: `"Baarishein" is a soulful song by Anuv Jain that revolves around the themes of love, loss, and nostalgia. The lyrics depict the emotional turmoil experienced by the protagonist after the departure of a loved one. The rain is used as a metaphor throughout the song, symbolizing both cleansing and sadness. The protagonist is deeply affected by the absence of their loved one, struggling to cope with the overwhelming sense of longing and nostalgia. The chorus, with its repetition of "Baarish ho rahi hai" (It's raining), emphasizes the emotional weight of the situation. The song reflects on the complexity of moving forward while holding on to past memories.`,
    
    notes: `Themes:

Love and Loss: The song is centered around the feeling of missing a loved one and the deep emotional connection that remains even in their absence.
Nostalgia: The protagonist reflects on the beautiful moments shared and the pain of them being lost.
Rain as a Symbol: The rain represents both a cleansing force and an overwhelming sorrow, paralleling the protagonist's emotions.

Mood:
The song evokes a melancholic yet soothing feeling, using soft melodies to complement the sadness in the lyrics.

Impact:
The song's emotional depth, combined with the relatable theme of longing, resonates with listeners, particularly in moments of heartbreak or separation.

Vocal Performance:
Anuv Jain's soft and emotive voice adds an extra layer of vulnerability to the song, making it even more poignant.`,
    
    speakers: [
      { id: 1, name: "Singer", color: "#4F46E5", lines: [
        "Mujhe tum yaad aa rahe ho",
        "Aise mein kya karoon",
        "Raat bhar barish ho rahi hai",
        "Tere bina kya karoon",
        "Baarish ho rahi hai",
        "Baarish ho rahi hai",
        "Baarish ho rahi hai",
        "Tere bina kya karoon",
        "Tere bina jee paana",
        "Mujhe yeh lagta nahi",
        "Jab se tum gaye ho",
        "Sab kuch adhura sa lagta hai"
      ]}
    ]
  },
  
  // Programming tutorial example
  tutorial: {
    transcript: `Welcome to this quick C programming tutorial. In this video, we'll write and run your first C program.

First, let's open your IDE and write the basic program. Here's a simple 'Hello, World!' program:

#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}

We use #include <stdio.h> to include the standard library for input and output. int main() is where the program starts, and printf() is used to print text to the console.

Once written, click 'Build and Run.' You should see 'Hello, World!' printed on your screen.

That's your first C program! In future tutorials, we'll dive into variables and more complex concepts.`,
    
    summary: `This short tutorial covers the basics of writing and running a simple C program. It introduces:

The structure of a basic C program.
The use of #include <stdio.h> for input/output functions.
The main() function as the program's entry point.
The printf() function to display text in the console.
How to compile and run a C program in an IDE.`,
    
    notes: `Key Concepts:

Basic Program Structure: A simple C program includes the #include <stdio.h> directive, a main() function, and a statement like printf() for output.
Compiling and Running: After writing the code, it's important to build and run it to see the output.

Tips:
Always ensure you add a semicolon ; after each statement.
printf() is the basic function used to print to the console.`,
    
    speakers: [
      { id: 1, name: "Instructor", color: "#2563EB", lines: [
        "Welcome to this quick C programming tutorial. In this video, we'll write and run your first C program.",
        "First, let's open your IDE and write the basic program. Here's a simple 'Hello, World!' program:",
        "We use #include <stdio.h> to include the standard library for input and output. int main() is where the program starts, and printf() is used to print text to the console.",
        "Once written, click 'Build and Run.' You should see 'Hello, World!' printed on your screen.",
        "That's your first C program! In future tutorials, we'll dive into variables and more complex concepts."
      ]}
    ]
  },
  
  // Debate example
  debate: {
    transcript: `[User 1 (Aditi)]
"Good afternoon, everyone! Let's start today's debate. The issue we are discussing is climate change and its impact on our future. I believe we should take immediate action to tackle climate change. The science is clear, and we cannot ignore the warnings any longer."

[User 2 (Rohit)]
"I completely agree with Aditi. The rising temperatures, the melting ice caps, and the increasing frequency of natural disasters are proof that our environment is in danger. But what's more concerning is how fast these changes are happening. If we don't act now, it will be too late."

[User 3 (Neha)]
"While I understand both of your points, I think we also need to consider the economic impact of aggressive climate policies. Transitioning to renewable energy and reducing emissions will require significant investment, and this could slow down economic growth, especially in developing countries like India."

[User 4 (Vikram)]
"I understand your concerns, Neha, but we can't prioritize short-term economic growth over the long-term health of our planet. The costs of inaction will far outweigh any economic slowdown. Additionally, renewable energy sources, like solar and wind, are becoming more affordable and could provide new job opportunities."

[User 1 (Aditi)]
"Exactly, Vikram. And let's not forget, the younger generation will be the ones who face the brunt of these consequences. We need to think about the kind of world we are leaving behind for them. Moreover, India, being one of the largest carbon emitters, has a major role to play in global climate action."

[User 2 (Rohit)]
"I think another aspect we should address is the role of big corporations. They are often the largest contributors to carbon emissions. It's not enough for governments to enforce policies. Corporations must be held accountable for their environmental impact, and consumers must demand more sustainable practices."

[User 3 (Neha)]
"You're right, Rohit, but there is also the question of accessibility. Developing countries may not have the infrastructure or resources to transition to green energy as quickly as developed nations. For climate action to be effective, we need global cooperation and equal distribution of resources."

[User 4 (Vikram)]
"That's true. But global cooperation can only happen if there's a strong political will. Countries need to set aside their differences and come together for a common cause. Climate change doesn't respect borders; it affects all of us."

[User 1 (Aditi)]
"I think we can all agree on one thing: action is needed now. Whether it's through government policies, corporate responsibility, or individual efforts, we all need to contribute to solving this crisis. The time to debate is over; we need to act."

[User 2 (Rohit)]
"Absolutely. Let's not wait until it's too late. Our planet deserves better, and we owe it to future generations to ensure that they inherit a livable world."

[User 3 (Neha)]
"I agree. The solutions might be complex, but we can't afford to ignore the problem anymore."

[User 4 (Vikram)]
"Indeed. It's about our future, and there's no time to waste."`,
    
    summary: `This debate focuses on climate change and the urgent need for action. Key points discussed include:

Urgency of Climate Action: Aditi and Rohit emphasize the need to take immediate action against climate change, citing rising temperatures, natural disasters, and scientific consensus.
Economic Concerns: Neha raises concerns about the economic impact of transitioning to renewable energy, especially for developing countries. The importance of balancing economic growth with environmental protection is discussed.
Role of Corporations: Rohit stresses that corporations must be held accountable for their carbon emissions and that consumers should demand more sustainable practices.
Global Cooperation: Vikram highlights the importance of international cooperation to tackle climate change, as it is a global issue that affects everyone.
Political Will and Infrastructure: Neha discusses the challenges faced by developing countries in transitioning to green energy, and Vikram emphasizes the need for strong political will to address climate change on a global scale.
Call to Action: The participants agree that while the solutions may be complex, immediate action is needed to ensure a sustainable future for future generations.`,
    
    notes: `Key Themes:

Climate Change Urgency: The need for immediate action is emphasized by Aditi and Rohit, pointing to evidence from natural disasters and environmental changes.
Economic Impact: Neha brings up the economic challenges of transitioning to green energy, stressing that developing countries might struggle without adequate resources.
Corporate Responsibility: Rohit points out that corporations must be held accountable for their environmental impact, alongside government policies.
Global Cooperation: Vikram emphasizes that climate change is a global issue, and countries need to collaborate to find solutions.

Action Points:
Governments need to implement stronger climate policies.
Corporations should be held accountable for their environmental impact.
International cooperation is necessary for effective climate action, especially for developing countries.

Key Takeaways:
Immediate action is essential to mitigate the effects of climate change.
Climate change is a global issue, and no country can tackle it alone.
Solutions should be sustainable and take into account the diverse economic conditions of different countries.

Call to Action:
Everyone, from individuals to governments and corporations, needs to take responsibility for their role in combating climate change.`,
    
    speakers: [
      { id: 1, name: "Aditi", color: "#7C3AED", lines: [
        "Good afternoon, everyone! Let's start today's debate. The issue we are discussing is climate change and its impact on our future. I believe we should take immediate action to tackle climate change. The science is clear, and we cannot ignore the warnings any longer.",
        "Exactly, Vikram. And let's not forget, the younger generation will be the ones who face the brunt of these consequences. We need to think about the kind of world we are leaving behind for them. Moreover, India, being one of the largest carbon emitters, has a major role to play in global climate action.",
        "I think we can all agree on one thing: action is needed now. Whether it's through government policies, corporate responsibility, or individual efforts, we all need to contribute to solving this crisis. The time to debate is over; we need to act."
      ]},
      { id: 2, name: "Rohit", color: "#2563EB", lines: [
        "I completely agree with Aditi. The rising temperatures, the melting ice caps, and the increasing frequency of natural disasters are proof that our environment is in danger. But what's more concerning is how fast these changes are happening. If we don't act now, it will be too late.",
        "I think another aspect we should address is the role of big corporations. They are often the largest contributors to carbon emissions. It's not enough for governments to enforce policies. Corporations must be held accountable for their environmental impact, and consumers must demand more sustainable practices.",
        "Absolutely. Let's not wait until it's too late. Our planet deserves better, and we owe it to future generations to ensure that they inherit a livable world."
      ]},
      { id: 3, name: "Neha", color: "#DC2626", lines: [
        "While I understand both of your points, I think we also need to consider the economic impact of aggressive climate policies. Transitioning to renewable energy and reducing emissions will require significant investment, and this could slow down economic growth, especially in developing countries like India.",
        "You're right, Rohit, but there is also the question of accessibility. Developing countries may not have the infrastructure or resources to transition to green energy as quickly as developed nations. For climate action to be effective, we need global cooperation and equal distribution of resources.",
        "I agree. The solutions might be complex, but we can't afford to ignore the problem anymore."
      ]},
      { id: 4, name: "Vikram", color: "#059669", lines: [
        "I understand your concerns, Neha, but we can't prioritize short-term economic growth over the long-term health of our planet. The costs of inaction will far outweigh any economic slowdown. Additionally, renewable energy sources, like solar and wind, are becoming more affordable and could provide new job opportunities.",
        "That's true. But global cooperation can only happen if there's a strong political will. Countries need to set aside their differences and come together for a common cause. Climate change doesn't respect borders; it affects all of us.",
        "Indeed. It's about our future, and there's no time to waste."
      ]}
    ]
  },
  
  // Personal recording example
  personal: {
    transcript: "Hello everyone, my name is Siddhant. I'm recording this audio to test the transcription service. I hope it works well and accurately captures what I'm saying. This is just a simple test to see how the system handles my voice and accent.",
    summary: "Siddhant introduces himself and explains that he is recording this audio to test the transcription service. He expresses hope that the system will accurately capture his speech, including his voice and accent.",
    notes: "This is a brief test recording by Siddhant to evaluate the transcription accuracy of the system, particularly for his voice and accent.",
    speakers: [
      { id: 1, name: "Siddhant", color: "#4F46E5", lines: [
        "Hello everyone, my name is Siddhant.",
        "I'm recording this audio to test the transcription service.",
        "I hope it works well and accurately captures what I'm saying.",
        "This is just a simple test to see how the system handles my voice and accent."
      ]}
    ]
  }
};

// Main component
const ResultsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('transcript');
  const [contentType, setContentType] = useState('debate'); // Default to debate example
  const navigate = useNavigate();
  
  // Get the appropriate data based on content type
  const data = sampleData[contentType];
  
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };
  
  const handleDownload = (content: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="text-center py-6 md:py-8 px-4">
        <div className="flex items-center justify-center mb-4">
          <button 
            onClick={() => navigate('/')}
            className="absolute left-4 md:left-8 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            SoundScript Results
          </h1>
        </div>
        <p className="text-gray-400">Your audio has been successfully processed</p>
        
        {/* Content Type Selector */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button 
            onClick={() => setContentType('song')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              contentType === 'song' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Song Example
          </button>
          <button 
            onClick={() => setContentType('tutorial')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              contentType === 'tutorial' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Tutorial Example
          </button>
          <button 
            onClick={() => setContentType('debate')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              contentType === 'debate' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Debate Example
          </button>
          <button 
            onClick={() => setContentType('personal')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              contentType === 'personal' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Personal Recording
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-gray-800 mx-auto w-full max-w-6xl rounded-t-xl shadow-lg px-4">
        <div className="flex overflow-x-auto py-4 scrollbar-hide">
          <button
            onClick={() => setActiveTab('transcript')}
            className={`flex items-center py-3 px-5 rounded-lg mr-2 whitespace-nowrap transition-colors ${
              activeTab === 'transcript' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <FileText size={18} className="mr-2" />
            Transcript
          </button>
          
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center py-3 px-5 rounded-lg mr-2 whitespace-nowrap transition-colors ${
              activeTab === 'summary' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <List size={18} className="mr-2" />
            Summary
          </button>
          
          <button
            onClick={() => setActiveTab('speakers')}
            className={`flex items-center py-3 px-5 rounded-lg mr-2 whitespace-nowrap transition-colors ${
              activeTab === 'speakers' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Users size={18} className="mr-2" />
            Speakers
          </button>
          
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center py-3 px-5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'notes' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Bookmark size={18} className="mr-2" />
            Notes
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-gray-800 p-4 md:p-6 mx-auto w-full max-w-6xl rounded-b-xl shadow-lg mb-8">
        {/* Transcript Tab */}
        {activeTab === 'transcript' && (
          <div>
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h2 className="text-xl md:text-2xl font-bold">Full Transcript</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleCopyToClipboard(data.transcript)}
                  className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded-lg text-sm"
                >
                  <Copy size={16} />
                  Copy
                </button>
                <button 
                  onClick={() => handleDownload(data.transcript, 'transcript.txt')}
                  className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded-lg text-sm"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
            <div className="bg-gray-900 p-4 md:p-6 rounded-xl max-h-[60vh] overflow-y-auto">
              <p className="leading-relaxed whitespace-pre-line">
                {data.transcript}
              </p>
            </div>
          </div>
        )}

        {/* Summary Tab */}
        {activeTab === 'summary' && (
          <div>
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h2 className="text-xl md:text-2xl font-bold">Summary</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleCopyToClipboard(data.summary)}
                  className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded-lg text-sm"
                >
                  <Copy size={16} />
                  Copy
                </button>
                <button 
                  onClick={() => handleDownload(data.summary, 'summary.txt')}
                  className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded-lg text-sm"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
            <div className="bg-gray-900 p-4 md:p-6 rounded-xl max-h-[60vh] overflow-y-auto">
              <p className="leading-relaxed whitespace-pre-line">
                {data.summary}
              </p>
            </div>
          </div>
        )}

        {/* Speakers Tab */}
        {activeTab === 'speakers' && (
          <div>
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h2 className="text-xl md:text-2xl font-bold">Speaker Segregation</h2>
              <button 
                onClick={() => {
                  const speakerText = data.speakers
                    .map(s => `${s.name}:\n${s.lines.join('\n')}`)
                    .join('\n\n');
                  handleDownload(speakerText, 'speakers.txt');
                }}
                className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded-lg text-sm"
              >
                <Download size={16} />
                Download
              </button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {data.speakers.map(speaker => (
                <div key={speaker.id} className="bg-gray-900 p-4 rounded-xl">
                  <div 
                    className="font-medium mb-2 flex items-center" 
                    style={{ color: speaker.color }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: speaker.color }}
                    ></div>
                    {speaker.name}
                  </div>
                  <div className="pl-5 border-l-2" style={{ borderColor: speaker.color }}>
                    {speaker.lines.map((line, idx) => (
                      <p key={idx} className="mb-2 text-gray-300">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div>
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h2 className="text-xl md:text-2xl font-bold">Notes</h2>
              <button 
                onClick={() => handleDownload(data.notes, 'notes.txt')}
                className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded-lg text-sm"
              >
                <Download size={16} />
                Export
              </button>
            </div>
            <div className="bg-gray-900 p-4 md:p-6 rounded-xl mb-4 max-h-[60vh] overflow-y-auto">
              <p className="whitespace-pre-line">
                {data.notes}
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">My Additional Notes</h3>
              <textarea 
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
                rows={4}
                placeholder="Add your own notes here..."
              ></textarea>
              <div className="flex justify-end mt-2">
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm">
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;