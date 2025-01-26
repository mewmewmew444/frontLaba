import React from "react";

export const Contact: React.FC = () => {
  return (
    <div>
      <h1>напишите мне</h1>
      <form>
        <label>
          имя:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          сообщение:
          <textarea name="message" />
        </label>
        <br />
        <button type="submit">ня</button>
      </form>
    </div>
  );
};