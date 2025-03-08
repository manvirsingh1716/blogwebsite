import React from 'react';
import Dropdown from './UPSCNotesDropdown';

const Navbar: React.FC = () => {
  const upscItems = {
    'General Studies 1': {
      'History': ['Ancient History', 'Medieval History', 'Modern History'],
      'Geography': ['Physical Geography', 'Human Geography', 'World Geography'],
    },
    'General Studies 2': {
      'Polity': ['Constitution', 'Governance', 'International Relations'],
      'Social Justice': ['Welfare Schemes', 'Health', 'Education'],
    },
    'General Studies 3': {
      'Economy': ['Economic Development', 'Inclusive Growth', 'Budgeting'],
      'Environment': ['Biodiversity', 'Climate Change', 'Disaster Management'],
    },
    'General Studies 4': {
      'Ethics': ['Ethics and Human Interface', 'Attitude', 'Emotional Intelligence'],
      'Integrity': ['Probity in Governance', 'Public/Civil Service Values', 'Ethical Concerns'],
    },
  };

  const currentAffairsItems = {
    'Current Affairs 1': {
      'Topic 1': ['Subtopic 1', 'Subtopic 2'],
      'Topic 2': ['Subtopic 3', 'Subtopic 4'],
    },
    'Current Affairs 2': {
      'Topic 3': ['Subtopic 5', 'Subtopic 6'],
      'Topic 4': ['Subtopic 7', 'Subtopic 8'],
    },
  };

  const freeResourceItems = {
    'Free Resource 1': {
      'Resource 1': ['Detail 1', 'Detail 2'],
      'Resource 2': ['Detail 3', 'Detail 4'],
    },
    'Free Resource 2': {
      'Resource 3': ['Detail 5', 'Detail 6'],
      'Resource 4': ['Detail 7', 'Detail 8'],
    },
  };

  const examForumItems = {
    'Exam Forum 1': {
      'Forum 1': ['Discussion 1', 'Discussion 2'],
      'Forum 2': ['Discussion 3', 'Discussion 4'],
    },
    'Exam Forum 2': {
      'Forum 3': ['Discussion 5', 'Discussion 6'],
      'Forum 4': ['Discussion 7', 'Discussion 8'],
    },
  };

  const getDescription = (item: string) => {
    switch (item) {
      case 'General Studies 1':
        return 'Covers Indian Heritage & Culture, History, Geography, Society, and their inter-linkages.';
      case 'General Studies 2':
        return 'Focuses on Governance, Constitution, Polity, Social Justice and International relations.';
      case 'General Studies 3':
        return 'Deals with Technology, Economic Development, Biodiversity, Security and Disaster Management.';
      case 'General Studies 4':
        return 'Encompasses Ethics, Integrity and Aptitude for Civil Service.';
      default:
        return '';
    }
  };

  const getCurrentAffairsDescription = (item: string) => {
    switch (item) {
      case 'Current Affairs 1':
        return 'Includes recent events and developments in various fields.';
      case 'Current Affairs 2':
        return 'Focuses on national and international current affairs.';
      default:
        return '';
    }
  };

  const getFreeResourceDescription = (item: string) => {
    switch (item) {
      case 'Free Resource 1':
        return 'Provides free study materials and resources.';
      case 'Free Resource 2':
        return 'Includes free access to various educational tools.';
      default:
        return '';
    }
  };

  const getExamForumDescription = (item: string) => {
    switch (item) {
      case 'Exam Forum 1':
        return 'Discussion forums for various exams.';
      case 'Exam Forum 2':
        return 'Includes Q&A sessions and exam tips.';
      default:
        return '';
    }
  };

  return (
    <nav>
      <div className="group relative">
        <button className="...">UPSC Notes</button>
        <Dropdown items={upscItems} title="General Studies" description={getDescription} />
      </div>
      <div className="group relative">
        <button className="...">Current Affairs UPSC</button>
        <Dropdown items={currentAffairsItems} title="Current Affairs UPSC" description={getCurrentAffairsDescription} />
      </div>
      <div className="group relative">
        <button className="...">Free Resource</button>
        <Dropdown items={freeResourceItems} title="Free Resource" description={getFreeResourceDescription} />
      </div>
      <div className="group relative">
        <button className="...">Exam Forum</button>
        <Dropdown items={examForumItems} title="Exam Forum" description={getExamForumDescription} />
      </div>
    </nav>
  );
};

export default Navbar;