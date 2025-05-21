import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

const CommunicationTraining: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [userResponse, setUserResponse] = useState('');

  const lessons = [
    {
      title: "Active Listening",
      description: "Learn to truly understand your partner's perspective",
      exercise: "Your partner says: 'I feel like you don't prioritize our relationship.' How would you respond?",
      tips: [
        "Use reflective listening",
        "Avoid defensive reactions",
        "Ask clarifying questions",
        "Show empathy"
      ]
    },
    {
      title: "Expressing Needs",
      description: "Communicate your needs clearly and respectfully",
      exercise: "You need more alone time but don't want to hurt your partner's feelings. How do you express this?",
      tips: [
        "Use 'I' statements",
        "Be specific about your needs",
        "Acknowledge partner's feelings",
        "Suggest solutions"
      ]
    },
    {
      title: "Conflict Resolution",
      description: "Handle disagreements constructively",
      exercise: "You and your partner disagree about how to spend holidays. How do you approach this conversation?",
      tips: [
        "Stay calm and focused",
        "Listen to understand",
        "Look for compromise",
        "Focus on solutions"
      ]
    }
  ];

  const analyzeResponse = (response: string) => {
    // Simplified analysis - in reality, this would use more sophisticated AI
    const positivePatterns = [
      'understand',
      'feel',
      'listen',
      'appreciate',
      'together'
    ];

    const negativePatterns = [
      'always',
      'never',
      'but',
      'however',
      'blame'
    ];

    const positiveCount = positivePatterns.filter(pattern => 
      response.toLowerCase().includes(pattern)
    ).length;

    const negativeCount = negativePatterns.filter(pattern => 
      response.toLowerCase().includes(pattern)
    ).length;

    return {
      score: positiveCount - negativeCount,
      feedback: positiveCount > negativeCount
        ? "Good use of empathetic language!"
        : "Try using more understanding and collaborative language."
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <MessageCircle className="h-12 w-12 mx-auto text-rose-600" />
          <h2 className="mt-4 text-3xl font-bold text-blue-900">Communication Training</h2>
          <p className="mt-2 text-gray-600">Enhance your relationship communication skills</p>
        </div>

        <div className="mt-8">
          <div className="bg-rose-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-900">
              Lesson {currentLesson + 1}: {lessons[currentLesson].title}
            </h3>
            <p className="mt-2 text-gray-700">{lessons[currentLesson].description}</p>
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-blue-900">Exercise</h4>
            <p className="mt-2 text-gray-700">{lessons[currentLesson].exercise}</p>

            <div className="mt-4">
              <textarea
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                placeholder="Type your response here..."
              ></textarea>
            </div>

            {userResponse && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-semibold text-blue-900">AI Analysis</h5>
                <div className="mt-2">
                  {analyzeResponse(userResponse).score >= 0 ? (
                    <div className="flex items-center text-green-600">
                      <ThumbsUp className="h-5 w-5 mr-2" />
                      {analyzeResponse(userResponse).feedback}
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <ThumbsDown className="h-5 w-5 mr-2" />
                      {analyzeResponse(userResponse).feedback}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-blue-900">Key Tips</h4>
            <ul className="mt-2 space-y-2">
              {lessons[currentLesson].tips.map((tip, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="h-2 w-2 bg-rose-500 rounded-full mr-2"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
              disabled={currentLesson === 0}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous Lesson
            </button>
            <button
              onClick={() => setCurrentLesson(Math.min(lessons.length - 1, currentLesson + 1))}
              disabled={currentLesson === lessons.length - 1}
              className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationTraining;