import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import ExamSchedule from './components/ExamSchedule';
import SearchSection from './components/SearchSection';
import AllResultsSection from './components/AllResultsSection';
import StatsSection from './components/StatsSection';
import { rankedStudents } from './data/students';
import { calculateStats } from './utils/contestStats';
import type { Student } from './types';

type ViewType = 'main' | 'results' | 'schedule';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [searchResults, setSearchResults] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = calculateStats(rankedStudents);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = rankedStudents.filter(student =>
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    if (view !== 'results') {
      setSearchResults([]);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header currentView={currentView} onViewChange={handleViewChange} />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'main' && (
          <>
            <MainPage />
            <StatsSection stats={stats} />
          </>
        )}
        
        {currentView === 'results' && (
          <>
            <SearchSection 
              onSearch={handleSearch}
              searchQuery={searchQuery}
            />
            <AllResultsSection 
              students={searchResults.length > 0 ? searchResults : rankedStudents}
              isFiltered={searchResults.length > 0}
            />
          </>
        )}
        
        {currentView === 'schedule' && <ExamSchedule />}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;