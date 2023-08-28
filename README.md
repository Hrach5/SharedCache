After that instal all dependencies
npm instal

Create .env file with
PORT=
REDIS_HOST=
REDIS_PORT=
REDIS_CACHE_TTL=

And you can run project
npm run start

get endpoint /v1/structure , require as query parametr projectId, optional locationType
get endpoint /v2/checklists , require as query parametr projectId
get endpoint /v1/project , require as query parametr projectId, optional fields
get endpoint /v1/configurations , require as query parametr projectId
