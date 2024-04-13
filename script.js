const quote = document.querySelector('.quote');
const song = document.querySelector('.song');
const songName = document.querySelector('.song-name');
const songSinger = document.querySelector('.song-singer');

async function getQuotes() {
  const response = await fetch('./quotes.json');
  const quotes = await response.json();

  function shuffleQuotes(array) {
    for(let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
    
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffled = shuffleQuotes(quotes);

  let currentIndex = 0;

  function updateQuote() {

    if(currentIndex < shuffled.length) {
      if(!localStorage.getItem('songInfo') || new Date() > new Date(localStorage.getItem('expiration'))) {
        quote.innerText = shuffled[currentIndex].quote;
  
        song.setAttribute('src', shuffled[currentIndex].song.url);
        songName.innerText = shuffled[currentIndex].song.name;
        songSinger.innerText = shuffled[currentIndex].song.singer;
        const expiration = new Date();
  
        expiration.setHours(expiration.getHours() + 24);
        localStorage.setItem('songInfo', JSON.stringify(shuffled[currentIndex]));
        localStorage.setItem('expiration', expiration);
      } else {
        const storedSongInfo = JSON.parse(localStorage.getItem('songInfo'));

      quote.innerText = storedSongInfo.quote;

      song.setAttribute('src', storedSongInfo.song.url);
      songName.innerText = storedSongInfo.song.name;
      songSinger.innerText = storedSongInfo.song.singer;
      }

      currentIndex++;
    } else {
      currentIndex = 0;
    } 
  }
  updateQuote();

  currentIndex++;
}

getQuotes();

