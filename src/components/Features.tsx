import React from 'react';
import { ShieldCheck, BadgeCheck, Brain, Users, Video, MessageCircle, MapPin } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features: React.FC = () => {
  const features = [
    {
      title: "Verified Identity System",
      description: "Government ID verification and facial recognition ensure you're talking to real people with confirmed identities.",
      icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      title: "Loyalty Check Engine",
      description: "Our proprietary algorithm analyzes behavioral patterns to determine trustworthiness and loyalty potential.",
      icon: <BadgeCheck className="h-10 w-10 text-green-600" />,
      color: "bg-green-50"
    },
    {
      title: "Personality Mirror Test",
      description: "AI-powered psychometric tests reveal authentic personality traits for better compatibility matching.",
      icon: <Brain className="h-10 w-10 text-purple-600" />,
      color: "bg-purple-50"
    },
    {
      title: "TruthSync",
      description: "Get social validation from trusted contacts who can anonymously vouch for your potential match.",
      icon: <Users className="h-10 w-10 text-yellow-600" />,
      color: "bg-yellow-50"
    },
    {
      title: "Authenticity Feed",
      description: "Browse unfiltered 'Day in My Life' video diaries that show the real person behind the profile.",
      icon: <Video className="h-10 w-10 text-rose-600" />,
      color: "bg-rose-50"
    },
    {
      title: "SafeSpace Conversations",
      description: "Our AI monitors conversations for red flags and manipulation, keeping interactions healthy.",
      icon: <MessageCircle className="h-10 w-10 text-teal-600" />,
      color: "bg-teal-50"
    },
    {
      title: "Offline Date Verifier",
      description: "Ensure your in-person dates are safe with verification codes and emergency contact alerts.",
      icon: <MapPin className="h-10 w-10 text-orange-600" />,
      color: "bg-orange-50"
    }
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
            Features That Ensure Authentic Connections
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            TruMate's innovative technology helps you find genuine matches who share your values and intentions.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;