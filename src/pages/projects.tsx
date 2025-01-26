import React, { useState } from 'react';
import { projects } from '../data/projects';

export const Projects: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string>('All');

  const filteredProjects = projects.filter((project) =>
    selectedTech === 'All' ? true : project.technologies.includes(selectedTech)
  );

  const uniqueTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  );

  return (
    <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '20px', scrollbarWidth:'none',msOverflowStyle:'none' }}>
      <h1>Мои проекты</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="tech-filter">фильтр по технологиям:</label>
        <select
          id="tech-filter"
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
        >
          <option value="All">все</option>
          {uniqueTechnologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredProjects.map((project) => (
          <li key={project.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>
              <strong>технологии:</strong> {project.technologies.join(', ')}
            </p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              подробнее
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};