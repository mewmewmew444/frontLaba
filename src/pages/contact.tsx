import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validate = (): boolean => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!name) newErrors.name = 'имя обязательно.';
    if (!email) {
      newErrors.email = 'Email обязателен.';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'введите корректный email.';
    }
    if (!message) newErrors.message = 'сообщение обязательно.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    }
  };

  return (
    <div>
      <h1>Contact Me</h1>
      {isSubmitted && <p>спасибо за сообщение!</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          имя:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <span style={{ color: '#65000B' }}>{errors.name}</span>}
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <span style={{ color: '#65000B' }}>{errors.email}</span>}
        </label>
        <label>
          сообщение:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
          {errors.message && <span style={{ color: '#65000B' }}>{errors.message}</span>}
        </label>
        <button type="submit">отправить</button>
      </form>
    </div>
  );
};