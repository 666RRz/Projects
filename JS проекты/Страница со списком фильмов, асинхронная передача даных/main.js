export default function () {
  const ul = document.querySelector('.app__ul');
  const h1 = document.querySelector('h1');

  function getStarWarsFilms() {
    h1.classList.remove('none');
    return fetch('https://swapi.dev/api/films')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error getting star Wars Films.');
        }
        return res.json();
      })
      .then((data) => data);
  }

  function rerenderPage(urlEpisode) {
    h1.classList.remove('none');
    return fetch(urlEpisode)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error getting film.');
        }
        return res.json();
      })
      .then((data) => data);
  }

  function getData(planetsUrl, racesUrl) {
    const planetsPromises = planetsUrl.map((item) => fetch(item)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error getting films.');
        }
        return res.json();
      }));
    const racesPromises = racesUrl.map((item) => fetch(item)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error getting films.');
        }
        return res.json();
      }));
    return Promise.all([...planetsPromises, ...racesPromises]).then((results) => {
      const planets = results.slice(0, planetsPromises.length);
      const races = results.slice(planetsPromises.length);
      return { planets, races };
    });
  }

  function create(list, info) {
    if (list.length > 1) {
      for (let i = 0; i < list.length; i++) {
        const film = list[i];
        const li = document.createElement('li');
        const link = document.createElement('a');
        const title = document.createElement('h1');
        const number = document.createElement('p');

        li.classList.add('flex', 'app__li');
        link.classList.add('flex', 'app__li-link');

        link.setAttribute('href', './detail.html');
        link.id = film.url;

        title.innerHTML = film.title;
        number.innerHTML = `Номер эпизода: ${film.episode_id}`;

        link.append(title, number);
        li.append(link);
        ul.prepend(li);
        h1.classList.add('none');

        const linkID = link.id;
        link.addEventListener('click', (e) => {
          e.preventDefault();
          window.history.pushState(null, null, `${film.episode_id}`);
          ul.innerHTML = '';

          rerenderPage(linkID).then((data) => {
            getData(data.planets, data.species).then((result) => {
              create([data], result);
            });
          });
        });

        window.addEventListener('popstate', (e) => {
          const location = e.target.window.location.pathname.endsWith('detail');
          if (location) {
            ul.innerHTML = '';
            h1.classList.add('none');
            rerenderPage(linkID).then((data) => {
              create(data);
            });
          } else {
            ul.innerHTML = '';
            getStarWarsFilms().then((data) => {
              ul.innerHTML = '';
              const listSorted = data.results.sort((a, b) => b.episode_id - a.episode_id);
              h1.classList.add('none');
              create(listSorted);
            });
          }
        });
      }
    } else {
      const film = list[0];
      const li = document.createElement('li');
      // const link = document.createElement('a');
      const title = document.createElement('h1');
      const description = document.createElement('p');
      const producer = document.createElement('p');
      const director = document.createElement('h3');
      const back = document.createElement('a');
      const planetsTitle = document.createElement('h2');
      const racesTitle = document.createElement('h2');

      li.classList.add('detail');
      li.classList.add('flex', 'app__li');
      li.style.flexDirection = 'column';
      // link.classList.add('flex', 'app__li-link');
      description.classList.add('app__li-description');
      back.classList.add('app__li-back');

      // link.setAttribute('href', 'detail.html');
      // link.id = list.url;

      title.innerHTML = `${film.title} - эпизод N${film.episode_id}`;
      description.innerHTML = film.opening_crawl;
      planetsTitle.innerHTML = 'Список планет:';
      racesTitle.innerHTML = 'Расы:';
      director.innerHTML = `Режиссер: ${film.director}`;
      producer.innerHTML = `Продюссер: ${film.producer}`;
      back.innerHTML = 'Back to episodes';

      const planetsDiv = document.createElement('div');
      const racesDiv = document.createElement('div');

      planetsDiv.classList.add('flex');
      racesDiv.classList.add('flex');
      planetsDiv.classList.add('planets-div');
      racesDiv.classList.add('races-div');

      const planetsMassive = info.planets;
      const racesMassive = info.races;

      console.log(planetsMassive, racesMassive);

      planetsMassive.forEach((element) => {
        const p = document.createElement('p');
        p.innerHTML = element.name;
        planetsDiv.append(p);
        planetsDiv.append(p);
      });
      racesMassive.forEach((element) => {
        const p = document.createElement('p');
        p.innerHTML = element.name;
        racesDiv.append(p);
      });

      back.href = 'main.html';

      li.append(title, description, planetsTitle, planetsDiv,
        racesTitle, racesDiv, director, producer, back);

      ul.prepend(li);
      h1.classList.add('none');
    }
  }

  function createHTMLFromList() {
    getStarWarsFilms().then((data) => {
      const listSorted = data.results.sort((a, b) => b.episode_id - a.episode_id);
      create(listSorted, []);
    });
  }
  createHTMLFromList();
}
