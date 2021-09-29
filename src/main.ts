import requestPromise, { OptionsWithUri } from 'request-promise';
import cheerio from 'cheerio';

const options: OptionsWithUri = {
    uri: 'https://myanimelist.net/topanime.php',
    transform: body => cheerio.load(body)
};

requestPromise(options)
    .then(($: cheerio.Selector) => {
        const animeList = [];
        $('.ranking-list').each((index, item) => {
            let anime = $(item).find('h3').text();
            animeList.push({ anime });
        });

        console.table(animeList);
    })
    .catch(err => console.log(err.message));
