import React, { useState } from 'react';
import { FormErrors } from '../types/formErr';

const VALIDATION_MESSAGES = {
  REQUIRED_NAME: 'имя обязательно.',
  REQUIRED_EMAIL: 'Email обязателен.',
  INVALID_EMAIL: 'введите корректный email.',
  REQUIRED_MESSAGE: 'сообщение обязательно.',
};

const SUBMISSION_ERRORS = {
  FAILED: 'произошла ошибка при отправке формы. Попробуйте снова.',
};

export const Contact: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);


  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!name) newErrors.name = VALIDATION_MESSAGES.REQUIRED_NAME;
    if (!email) {
      newErrors.email = VALIDATION_MESSAGES.REQUIRED_EMAIL;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = VALIDATION_MESSAGES.INVALID_EMAIL;
    }
    if (!message) newErrors.message = VALIDATION_MESSAGES.REQUIRED_MESSAGE;
    return newErrors;
  };


  const setFormErrors = (): boolean => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (setFormErrors()) {
      try {
        const response = await mockSubmitForm({ name, email, message });

        if (response.ok) {
          setIsSubmitted(true);
          setName('');
          setEmail('');
          setMessage('');
          setErrors({});
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        setSubmitError(SUBMISSION_ERRORS.FAILED);
      }
    }
  };

  return (
    <div>
      <h1>Contact Me</h1>
      {isSubmitted && <p>спасибо за сообщение!</p>}
      {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          имя:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </label>
        <label>
          сообщение:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
          {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>}
        </label>
        <button type="submit">отправить</button>
      </form>
    </div>
  );
};


const mockSubmitForm = async (data: { name: string; email: string; message: string }) => {
  return new Promise<{ ok: boolean }>((resolve) =>
    setTimeout(() => resolve({ ok: Math.random() > 0.5 }), 1000)
  );
};