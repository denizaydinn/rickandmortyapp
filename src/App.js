import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterTable from './CharacterTable';
import Filters from './Filters';
import Pagination from './Pagination';
import CharacterDetails from './CharacterDetails';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(10);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character/');
      setCharacters(response.data.results);
      setFilteredCharacters(response.data.results);
      setError(null); // Başarılı istek durumunda hata mesajını temizle
    } catch (error) {
      setError('Veriler yüklenirken bir hata oluştu.');
    }
  };

  const handleFilter = (filters) => {
    try {
      let filtered = characters;
      if (filters.name) {
        filtered = filtered.filter(character => character.name.toLowerCase().includes(filters.name.toLowerCase()));
      }
      if (filters.status) {
        filtered = filtered.filter(character => character.status.toLowerCase() === filters.status.toLowerCase());
      }
      setFilteredCharacters(filtered);
      setError(null); // Başarılı filtreleme durumunda hata mesajını temizle
    } catch (error) {
      setError('Filtreleme işlemi sırasında bir hata oluştu.');
    }
  };

  const handleSort = (sortKey) => {
    try {
      let sorted = [...filteredCharacters];
      sorted.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return -1;
        if (a[sortKey] > b[sortKey]) return 1;
        return 0;
      });
      setFilteredCharacters(sorted);
      setError(null); // Başarılı sıralama durumunda hata mesajını temizle
    } catch (error) {
      setError('Sıralama işlemi sırasında bir hata oluştu.');
    }
  };

  const handleCharacterSelect = (character) => {
    try {
      setSelectedCharacter(character);
      setError(null); // Başarılı seçim durumunda hata mesajını temizle
    } catch (error) {
      setError('Karakter seçimi sırasında bir hata oluştu.');
    }
  };

  const handlePageChange = (page) => {
    try {
      setCurrentPage(page);
      setError(null); // Başarılı sayfa değişimi durumunda hata mesajını temizle
    } catch (error) {
      setError('Sayfa değişimi sırasında bir hata oluştu.');
    }
  };

  const handlePageSizeChange = (size) => {
    try {
      setCharactersPerPage(size);
      setError(null); // Başarılı sayfa boyutu değişimi durumunda hata mesajını temizle
    } catch (error) {
      setError('Sayfa boyutu değişimi sırasında bir hata oluştu.');
    }
  };

  const currentCharacters = filteredCharacters.slice(
    (currentPage - 1) * charactersPerPage,
    currentPage * charactersPerPage
  );

  return (
    <div className="App">
      {error && <div className="error">{error}</div>}
      <Filters onFilter={handleFilter} onSort={handleSort} />
      <CharacterTable characters={currentCharacters} onCharacterSelect={handleCharacterSelect} />
      <Pagination 
        totalCharacters={filteredCharacters.length} 
        charactersPerPage={charactersPerPage} 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      {selectedCharacter && <CharacterDetails character={selectedCharacter} />}
    </div>
  );
};

export default App;
