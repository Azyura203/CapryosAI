import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { ConsultationForm, ConsultationFormData } from './ConsultationForm';
import { appendToSheet } from '../services/sheets/api';
import { useTranslation } from 'react-i18next';

interface ConsultationButtonProps {
  universityName: string;
}

export function ConsultationButton({ universityName }: ConsultationButtonProps) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  // Flag to disable/enable the booking system
  const isBookingSystemEnabled = false; // Set to `false` to disable bookings

  const handleSubmit = async (formData: ConsultationFormData) => {
    if (!isBookingSystemEnabled) {
      alert(t('consultation.disabled')); // Notify the user that bookings are disabled
      return;
    }

    setIsSubmitting(true);
    try {
      await appendToSheet(formData);
      alert(t('consultation.success')); // Use translation for success message
      setShowForm(false);
    } catch (error) {
      console.error('Failed to submit consultation request:', error);
      alert(t('consultation.error')); // Use translation for error message
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          if (!isBookingSystemEnabled) {
            alert(t('consultation.disabled')); // Notify the user that bookings are disabled
            return;
          }
          setShowForm(true);
        }}
        className={`flex items-center gap-2 px-4 py-2 ${
          isBookingSystemEnabled
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        } text-white rounded-lg transition-colors`}
        aria-label="Book a Consultation"
        disabled={!isBookingSystemEnabled} // Disable the button when the booking system is off
      >
        <Calendar className="w-5 h-5" />
        {t('consultation.button')} {/* Use translation for button text */}
      </button>

      {showForm && isBookingSystemEnabled && ( // Only show the form if the booking system is enabled
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <ConsultationForm
            universityName={universityName}
            onSubmit={handleSubmit}
            onClose={() => setShowForm(false)}
            isSubmitting={isSubmitting}
          />
        </div>
      )}
    </>
  );
}