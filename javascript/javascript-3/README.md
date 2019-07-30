Реализовать скрипт request для тестирования веб сервера
Создать локальный веб сервер `server`, отвечающий на запросы каждые 100ms

Создать скрипт `request`, принимающий на вход
- количество запросов `N`
- тип запросов - параллельный или последовательный

Скрипт `request` должен отправлять `N` последовательных или параллельных `HTTP` запросов к локальному серверу `server`

=====

How to run request.js:

`node request N REQUEST_MODE`,
where:

    N -- number of requests to be sent
    REQUEST_MODE -- sync or async

Example: `node request 10 sync`
