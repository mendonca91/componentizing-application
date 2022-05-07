import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Button } from './Button';

import { GenreResponseProps } from '../App';
interface SideBarProps {
  onChangeSelectedGenre: (id: number) => void;
  selectedGenre: number;
}

export function SideBar({
  onChangeSelectedGenre,
  selectedGenre,
}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    onChangeSelectedGenre(id);
  }

  return (
    <nav className='sidebar'>
      <span>
        Watch<p>Me</p>
      </span>

      <div className='buttons-container'>
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenre === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
