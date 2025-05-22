import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MessageCircle, Video } from 'lucide-react';
import { supabase, saveLoyaltyTest } from '../lib/supabase';

interface Question {
  id: number;
  text: string;
  options: string[];
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "How do you typically handle conflicts in relationships?",
    category: "Conflict Resolution",
    options: [
      "I address issues directly and communicate openly",
      "I prefer to avoid confrontation and let things blow over",
      "I discuss with friends first before addressing the issue",
      "I tend to blame my partner for problems"
    ]
  },
  {
    id: 2,
    text: "When you're attracted to someone outside your relationship, you usually:",
    category: "Fidelity",
    options: [
      "Maintain clear boundaries and distance yourself",
      "Share these feelings with your partner",
      "Flirt harmlessly but never act on it",
      "Pursue the connection secretly"
    ]
  },
  {
    id: 3,
    text: "How do you handle your partner's privacy?",
    category: "Trust",
    options: [
      "Respect their personal space and trust them completely",
      "Occasionally check their phone if I'm suspicious",
      "Share all passwords and accounts for transparency",
      "Regularly monitor their activities for peace of mind"
    ]
  },
  {
    id: 4,
    text: "When facing relationship difficulties, your first instinct is to:",
    category: "Problem Solving",
    options: [
      "Work through issues together with your partner",
      "Seek advice from friends or family",
      "Consider other relationship options",
      "Take time alone to process feelings"
    ]
  },
  {
    id: 5,
    text: "How do you view commitment in relationships?",
    category: "Commitment",
    options: [
      "As a sacred bond that requires constant nurturing",
      "As important but flexible depending on circumstances",
      "As something that evolves naturally over time",
      "As restrictive to personal growth"
    ]
  },
  {
    id: 6,
    text: "How do you handle financial decisions in a relationship?",
    category: "Trust",
    options: [
      "Open discussion and mutual agreement on major expenses",
      "Maintain separate finances but share common expenses",
      "One person handles all financial decisions",
      "Keep finances completely separate and private"
    ]
  },
  {
    id: 7,
    text: "When your partner achieves something significant, you:",
    category: "Support",
    options: [
      "Celebrate their success wholeheartedly",
      "Feel happy but also slightly competitive",
      "Compare it to your own achievements",
      "Feel threatened by their success"
    ]
  },
  {
    id: 8,
    text: "How do you handle disagreements about future plans?",
    category: "Future Planning",
    options: [
      "Find compromises that work for both partners",
      "Try to convince partner to follow your plans",
      "Make separate plans occasionally",
      "Pursue your own goals regardless"
    ]
  },
  {
    id: 9,
    text: "When spending time apart, you typically:",
    category: "Independence",
    options: [
      "Maintain healthy communication while enjoying independence",
      "Check in frequently throughout the day",
      "Feel anxious about what they're doing",
      "Use it as an opportunity to do things they wouldn't approve of"
    ]
  },
  {
    id: 10,
    text: "How do you handle your partner's friendships with others?",
    category: "Trust",
    options: [
      "Support healthy friendships and trust their judgment",
      "Feel uncomfortable but try not to show it",
      "Set strict boundaries about opposite-gender friendships",
      "Try to limit their social interactions"
    ]
  },
  {
    id: 11,
    text: "When making important life decisions, you:",
    category: "Partnership",
    options: [
      "Consider how it affects both you and your partner",
      "Make the decision and inform your partner",
      "Avoid making decisions to prevent conflict",
      "Make decisions independently"
    ]
  },
  {
    id: 12,
    text: "How do you handle personal growth in a relationship?",
    category: "Growth",
    options: [
      "Grow together while supporting individual development",
      "Focus on personal growth first",
      "Expect partner to grow at the same pace",
      "See relationship as limiting personal growth"
    ]
  },
  {
    id: 13,
    text: "When your partner is going through a difficult time, you:",
    category: "Support",
    options: [
      "Offer consistent support and understanding",
      "Try to fix their problems",
      "Give them space until they feel better",
      "Feel burdened by their struggles"
    ]
  },
  {
    id: 14,
    text: "How do you handle differences in values or beliefs?",
    category: "Respect",
    options: [
      "Respect differences and find common ground",
      "Try to convince them to adopt your views",
      "Avoid discussing controversial topics",
      "See differences as incompatibilities"
    ]
  },
  {
    id: 15,
    text: "When it comes to maintaining long-term commitment, you:",
    category: "Commitment",
    options: [
      "Actively work on strengthening the relationship",
      "Stay as long as things are going well",
      "Keep options open while committed",
      "Find it difficult to maintain long-term interest"
    ]
  }
];

const LoyaltyTest: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showMockInterview, setShowMockInterview] = useState(false);
  const [showCommunicationTraining, setShowCommunicationTraining] = useState(false);

  useEffect(() => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    questions.splice(0, questions.length, ...shuffledQuestions);
  }, []);

  const handleAnswer = async (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = calculateScore();
      
      const user = await supabase.auth.getUser();
      if (user.data.user) {
        await saveLoyaltyTest({
          user_id: user.data.user.id,
          score: score,
          answers: newAnswers,
          completed_at: new Date().toISOString()
        });

        await supabase
          .from('profiles')
          .update({ loyalty_score: score })
          .eq('user_id', user.data.user.id);
      }

      setShowResults(true);
    }
  };

  const calculateScore = () => {
    const weightedAnswers = answers.map((answer) => {
      return 100 - (answer * 25);
    });

    return Math.round(weightedAnswers.reduce((a, b) => a + b, 0) / weightedAnswers.length);
  };

  const getScoreCategory = (score: number) => {
    if (score >= 80) return { category: "Loyal", color: "text-green-600", description: "You show exceptional loyalty and commitment in relationships." };
    if (score >= 50) return { category: "Caution", color: "text-yellow-600", description: "There are areas where you could improve your approach to relationships." };
    return { category: "Risky", color: "text-red-600", description: "Consider working on building trust and commitment in relationships." };
  };

  const MockInterview: React.FC = () => (
    <div className="mt-8 p-6 bg-blue-50 rounded-xl">
      <h3 className="text-xl font-semibold text-blue-900 flex items-center">
        <Video className="h-6 w-6 mr-2" />
        AI Mock Interview
      </h3>
      <p className="mt-2 text-gray-600">
        Practice relationship scenarios with our AI interviewer. Get feedback on your communication style and emotional intelligence.
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Start Mock Interview
      </button>
    </div>
  );

  const CommunicationTraining: React.FC = () => (
    <div className="mt-8 p-6 bg-rose-50 rounded-xl">
      <h3 className="text-xl font-semibold text-blue-900 flex items-center">
        <MessageCircle className="h-6 w-6 mr-2" />
        AI Communication Coach
      </h3>
      <p className="mt-2 text-gray-600">
        Improve your relationship communication skills with personalized AI coaching sessions.
      </p>
      <button className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">
        Start Training
      </button>
    </div>
  );

  if (showResults) {
    const score = calculateScore();
    const { category, color, description } = getScoreCategory(score);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <CheckCircle className={`h-16 w-16 mx-auto ${color}`} />
            <h2 className="mt-4 text-3xl font-bold text-blue-900">Your Loyalty Score</h2>
            <div className={`mt-4 text-5xl font-bold ${color}`}>{score}</div>
            <p className={`mt-2 text-xl font-semibold ${color}`}>{category}</p>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-blue-900">Analysis</h3>
              <p className="mt-2 text-gray-600">{description}</p>
            </div>

            <MockInterview />
            <CommunicationTraining />

            <button
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers([]);
                setShowResults(false);
              }}
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Take Test Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900">Loyalty Check Test</h2>
          <p className="mt-2 text-gray-600">
            Question {currentQuestion + 1} of {questions.length} • 
            Category: {questions[currentQuestion].category}
          </p>
        </div>

        <div className="space-y-8">
          <h3 className="text-xl font-semibold text-blue-900">{questions[currentQuestion].text}</h3>
          
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Answer honestly for the most accurate results
        </div>
      </div>
    </div>
  );
};

export default LoyaltyTest;