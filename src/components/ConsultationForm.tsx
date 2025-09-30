import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ConsultationFormProps {
  universityName: string;
  onSubmit: (formData: ConsultationFormData) => void;
  onClose: () => void;
  isSubmitting: boolean; // Add this prop
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  topic: string;
  message: string;
}

export function ConsultationForm({
  universityName,
  onSubmit,
  onClose,
  isSubmitting, // Destructure the prop
}: ConsultationFormProps) {
  useTranslation();
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    topic: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Send form data to the backend API
      const response = await fetch('http://localhost:3001/api/submit-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Notify the parent component
        onSubmit(formData);
  
        // Close the form
        onClose();
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  const topics = [
    'Program Information',
    'Admission Requirements',
    'Scholarships',
    'Campus Life',
    'Career Opportunities',
    'Other',
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out hover:scale-105">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
          <h2 className="text-2xl font-bold text-white">
            Book a Consultation with {universityName}
          </h2>
          <p className="mt-2 text-gray-200">
            Fill out the form below to schedule a personal consultation with our education advisor.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-all"
                  disabled={isSubmitting} // Disable input when submitting
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-all"
                  disabled={isSubmitting} // Disable input when submitting
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-all"
                  disabled={isSubmitting} // Disable input when submitting
                />
              </div>
            </div>

            {/* Preferred Date */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-all"
                  disabled={isSubmitting} // Disable input when submitting
                />
              </div>
            </div>

            {/* Preferred Time */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-all"
                  disabled={isSubmitting} // Disable input when submitting
                />
              </div>
            </div>

            {/* Consultation Topic */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consultation Topic
              </label>
              <select
                required
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-all"
                disabled={isSubmitting} // Disable input when submitting
              >
                <option value="">Select a topic</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="relative group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-all"
                placeholder="Please provide any specific questions or topics you'd like to discuss..."
                disabled={isSubmitting} // Disable input when submitting
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isSubmitting} // Disable button when submitting
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
              disabled={isSubmitting} // Disable button when submitting
            >
              {isSubmitting ? 'Submitting...' : 'Book Consultation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}