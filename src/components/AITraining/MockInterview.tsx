import React, { useState, useEffect } from 'react';
import { Video, Mic, MicOff } from 'lucide-react';

const MockInterview: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);

  const scenarios = [
    {
      title: "Handling Trust Issues",
      description: "Your partner expresses concern about your frequent late-night work meetings. How do you address their worries?",
      aiResponse: "I notice you're being defensive. Try acknowledging their feelings first before explaining your situation."
    },
    {
      title: "Communication During Conflict",
      description: "You and your partner disagree about spending habits. How do you approach this conversation?",
      aiResponse: "Good use of 'I' statements. Consider asking more questions to understand their perspective."
    },
    {
      title: "Setting Boundaries",
      description: "Your partner wants to share social media passwords. How do you discuss personal boundaries?",
      aiResponse: "You're clear about your boundaries while showing care for their feelings. Well balanced!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Video className="h-12 w-12 mx-auto text-blue-600" />
          <h2 className="mt-4 text-3xl font-bold text-blue-900">AI Mock Interview</h2>
          <p className="mt-2 text-gray-600">Practice handling relationship scenarios with AI feedback</p>
        </div>

        <div className="mt-8">
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-900">
              Scenario {currentScenario + 1}: {scenarios[currentScenario].title}
            </h3>
            <p className="mt-4 text-gray-700">{scenarios[currentScenario].description}</p>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`px-6 py-3 rounded-full flex items-center ${
                isRecording ? 'bg-red-600' : 'bg-blue-600'
              } text-white hover:opacity-90 transition-opacity`}
            >
              {isRecording ? (
                <>
                  <MicOff className="h-5 w-5 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5 mr-2" />
                  Start Recording
                </>
              )}
            </button>
          </div>

          {isRecording && (
            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-600 text-center">Listening to your response...</p>
              <div className="mt-2 flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-8 bg-blue-600 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <h4 className="font-semibold text-blue-900">AI Feedback</h4>
            <p className="mt-2 text-gray-600">{scenarios[currentScenario].aiResponse}</p>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentScenario(Math.max(0, currentScenario - 1))}
              disabled={currentScenario === 0}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous Scenario
            </button>
            <button
              onClick={() => setCurrentScenario(Math.min(scenarios.length - 1, currentScenario + 1))}
              disabled={currentScenario === scenarios.length - 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Scenario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;