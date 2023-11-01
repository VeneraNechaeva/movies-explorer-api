// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://movies.nechaeva.nomoredomainsrocks.ru',
  'http://movies.nechaeva.nomoredomainsrocks.ru',
  'https://movies.nechaeva.nomoredomainsrocks.ru/',
  'http://movies.nechaeva.nomoredomainsrocks.ru/',
  'http://localhost:3000',
  'http://localhost:3000/',
];

const corsCheck = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, PATCH, OPTIONS, POST, PUT, DELETE');

    // завершаем обработку запроса и возвращаем результат клиенту
    res.end();
  }
  next();
};

module.exports = { corsCheck };
