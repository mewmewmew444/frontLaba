import React, { useState, useMemo } from 'react';
import { projects } from '../data/projects';

const ALL_TECH = 'все';

export const Projects: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string>(ALL_TECH);


  const filteredProjects = useMemo(() => {
    return selectedTech === ALL_TECH
      ? projects
      : projects.filter((project) => project.technologies.includes(selectedTech));
  }, [selectedTech]);


  const uniqueTechnologies = useMemo(() => {
    const techSet = new Set(projects.flatMap((project) => project.technologies));
    return [ALL_TECH, ...Array.from(techSet)];
  }, []);

  return (
    <div
      style={{
        maxHeight: '60vh',
        overflowY: 'auto',
        padding: '20px',
        scrollbarWidth: 'none', // Убираем полосу для Firefox
        msOverflowStyle: 'none', // Убираем полосу для IE
      }}
      className="projects-container"
    >
      <h1>мои проекты</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="tech-filter">фильтр по технологиям:</label>
        <select
          id="tech-filter"
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
        >
          {uniqueTechnologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredProjects.map((project) => (
          <li
            key={project.id}
            style={{
              marginBottom: '20px',
              borderBottom: '1px solid #ccc',
              paddingBottom: '10px',
            }}
          >
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