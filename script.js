const movies = [
  {
    id: 1,
    title: 'Night Signal',
    year: 2026,
    release: 'May 14',
    genres: ['Action', 'Sci‑Fi'],
    rating: 8.7,
    runtime: '2h 08m',
    status: 'New',
    image:
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80',
    description: 'A mysterious signal leads a team into a hidden world beneath the city.',
  },
  {
    id: 2,
    title: 'Silver Harbor',
    year: 2026,
    release: 'May 21',
    genres: ['Drama'],
    rating: 7.9,
    runtime: '1h 52m',
    status: 'New',
    image:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
    description: 'A family-run dockside business faces the consequences of a changing coast.',
  },
  {
    id: 3,
    title: 'Metro Echo',
    year: 2026,
    release: 'May 30',
    genres: ['Thriller'],
    rating: 8.4,
    runtime: '1h 58m',
    status: 'Trending',
    image:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80',
    description: 'An undercover commuter uncovers a conspiracy hidden within a transit system.',
  },
  {
    id: 4,
    title: 'Sunset Arcade',
    year: 2026,
    release: 'Jun 04',
    genres: ['Comedy'],
    rating: 7.6,
    runtime: '1h 41m',
    status: 'New',
    image:
      'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=900&q=80',
    description: 'A washed-up arcade owner has one final summer to save the neighborhood.',
  },
  {
    id: 5,
    title: 'Glass Horizon',
    year: 2026,
    release: 'Jun 10',
    genres: ['Sci‑Fi', 'Drama'],
    rating: 8.1,
    runtime: '2h 13m',
    status: 'Trending',
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
    description: 'A pilot and a scientist face a future determined by one impossible decision.',
  },
  {
    id: 6,
    title: 'Afterglow City',
    year: 2026,
    release: 'Jun 18',
    genres: ['Action', 'Drama'],
    rating: 8.5,
    runtime: '2h 03m',
    status: 'New',
    image:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80',
    description: 'A former firefighter returns to the city only to find it is falling apart.',
  },
  {
    id: 7,
    title: 'Velvet Run',
    year: 2026,
    release: 'Jun 25',
    genres: ['Thriller', 'Action'],
    rating: 8.0,
    runtime: '1h 49m',
    status: 'Trending',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
    description: 'An elite courier learns the route itself is the real target.',
  },
  {
    id: 8,
    title: 'Second Summer',
    year: 2026,
    release: 'Jul 02',
    genres: ['Comedy', 'Drama'],
    rating: 7.7,
    runtime: '1h 36m',
    status: 'New',
    image:
      'https://images.unsplash.com/photo-1524989946466-c1b6d9bc4c3d?auto=format&fit=crop&w=900&q=80',
    description: 'Three friends revisit an old beach town and rediscover what they lost.',
  },
  {
    id: 9,
    title: 'The Quiet Hours',
    year: 2026,
    release: 'Jul 08',
    genres: ['Drama', 'Thriller'],
    rating: 8.2,
    runtime: '1h 55m',
    status: 'Featured',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
    description: 'A grieving editor starts hearing a citywide broadcast no one else notices.',
  },
  {
    id: 10,
    title: 'Skyline Shifts',
    year: 2026,
    release: 'Jul 15',
    genres: ['Action', 'Sci‑Fi'],
    rating: 8.8,
    runtime: '2h 19m',
    status: 'Trending',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
    description: 'A pilot must stop a technology from rewriting the shape of tomorrow.',
  },
  {
    id: 11,
    title: 'Paper Moon Cafe',
    year: 2026,
    release: 'Jul 22',
    genres: ['Comedy'],
    rating: 7.5,
    runtime: '1h 31m',
    status: 'New',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    description: 'A struggling cafe owner turns a local love story into a citywide sensation.',
  },
  {
    id: 12,
    title: 'Dead Circuit',
    year: 2026,
    release: 'Jul 29',
    genres: ['Action', 'Thriller'],
    rating: 8.6,
    runtime: '2h 06m',
    status: 'Hot',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    description: 'An engineer races to stop an AI from controlling a city-sized power grid.',
  },
];

const movieGrid = document.getElementById('movieGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.chip[data-filter]');
const resultsCount = document.getElementById('resultsCount');
const totalMovies = document.getElementById('totalMovies');
const newThisWeek = document.getElementById('newThisWeek');
const favoritesCount = document.getElementById('favoritesCount');
const jumpToWatchlist = document.getElementById('jumpToWatchlist');

const STORAGE_KEY = 'movie-tracker-watchlist';
let activeFilter = 'all';
let watchlist = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function getFilteredMovies() {
  const query = searchInput.value.trim().toLowerCase();

  return movies.filter((movie) => {
    const matchesGenre = activeFilter === 'all' || movie.genres.includes(activeFilter);
    const matchesSearch =
      !query ||
      movie.title.toLowerCase().includes(query) ||
      movie.genres.some((genre) => genre.toLowerCase().includes(query));

    return matchesGenre && matchesSearch;
  });
}

function renderStats() {
  totalMovies.textContent = movies.length;
  newThisWeek.textContent = movies.filter((movie) => movie.status === 'New').length;
  favoritesCount.textContent = watchlist.length;
}

function buildCard(movie) {
  const isSaved = watchlist.includes(movie.id);

  return `
    <article class="movie-card" data-id="${movie.id}">
      <div class="card-image">
        <img src="${movie.image}" alt="${movie.title} poster" />
        <span class="card-badge">${movie.status}</span>
      </div>
      <div class="card-content">
        <div class="card-header">
          <h3>${movie.title}</h3>
          <span class="card-rating">${movie.rating.toFixed(1)} ★</span>
        </div>

        <div class="card-meta">
          <span>${movie.year}</span>
          <span>${movie.runtime}</span>
          <span>${movie.release}</span>
        </div>

        <div class="genre-row">
          ${movie.genres
            .slice(0, 3)
            .map((genre) => `<span class="genre-pill">${genre}</span>`)
            .join('')}
        </div>

        <div class="card-footer">
          <span class="muted-desc">${movie.description}</span>
          <button class="watch-btn ${isSaved ? 'saved' : ''}" data-save-id="${movie.id}">
            ${isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderMovies() {
  const filteredMovies = getFilteredMovies();
  resultsCount.textContent = `${filteredMovies.length} result${filteredMovies.length === 1 ? '' : 's'}`;

  if (!filteredMovies.length) {
    movieGrid.innerHTML = `
      <div class="empty-state">
        <h3>No movies matched your filters.</h3>
        <p>Try another search or change the genre filter.</p>
      </div>
    `;
    return;
  }

  movieGrid.innerHTML = filteredMovies.map(buildCard).join('');
}

function saveWatchlist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  renderStats();
  renderMovies();
}

searchInput.addEventListener('input', renderMovies);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((chip) => {
      chip.classList.toggle('active', chip === button);
    });

    renderMovies();
  });
});

movieGrid.addEventListener('click', (event) => {
  const saveButton = event.target.closest('[data-save-id]');

  if (!saveButton) return;

  const movieId = Number(saveButton.dataset.saveId);
  const savedIndex = watchlist.indexOf(movieId);

  if (savedIndex >= 0) {
    watchlist.splice(savedIndex, 1);
  } else {
    watchlist.push(movieId);
  }

  saveWatchlist();
});

jumpToWatchlist.addEventListener('click', () => {
  document.getElementById('watchlist').scrollIntoView({ behavior: 'smooth' });
});

renderStats();
renderMovies();

console.log('MovieTracker loaded successfully');







































































































































































