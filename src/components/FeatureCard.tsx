import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, color }) => {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className={`p-6 ${color}`}>
        <div className="flex items-center justify-center">{icon}</div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;