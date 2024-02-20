import React from 'react';
import FeedbackLayout from '@/layouts/feedback';
import FormFeedbackForStudent from '@/components/ManagerFeedback/FormFeedbackForStudent';

const Feedback = () => {
    return (
        <FormFeedbackForStudent />
    )
}

export default Feedback;
Feedback.Layout = FeedbackLayout;
Feedback.isPublic = true;