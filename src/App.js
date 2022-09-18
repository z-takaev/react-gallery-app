import React from 'react';
import Collection from './components/Collection';
import './index.scss';

const categories = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const [currentCategory, setCurrentCategory] = React.useState(0);
  const [collections, setCollections] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);

    const category = currentCategory ? `category=${currentCategory}` : '';

    fetch(`https://632751cfba4a9c4753350650.mockapi.io/collections?${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при загрузке данных');
      })
      .finally(() => setIsLoading(false));
  }, [currentCategory]);

  const onClickCategory = (index) => {
    setCurrentCategory(index);
  };

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((c, idx) => (
            <li
              onClick={() => onClickCategory(idx)}
              className={currentCategory === idx ? 'active' : ''}
              key={c.name}>
              {c.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={onChangeSearchValue}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {!isLoading ? (
          collections
            .filter((collection) =>
              collection.name.toLowerCase().includes(searchValue.toLowerCase()),
            )
            .map((collection, idx) => (
              <Collection key={idx} name={collection.name} images={collection.photos} />
            ))
        ) : (
          <h2>Загрузка данных...</h2>
        )}
      </div>
    </div>
  );
}

export default App;
