# Contributing

## Requirements

- [Node](https://nodejs.org/)
- [Docker](https://www.docker.com/) (optional, recommended, required for Docker Compose)
- [Docker Compose](https://docs.docker.com/compose/) (optional, recommended)

## Dependencies

*Install the Node.js dependencies locally.*

### NPM

```console
$ npm install
```

### Docker Compose

```console
$ docker-compose run --rm npm install
```

## Lint

*Check for code-style inconsistency errors.*

### NPM

```console
$ npm run lint
```

### Docker Compose

```console
$ docker-compose run --rm npm run lint
```

## Test

*Check that the specification are met.*

### NPM

```console
$ npm test
```

### Docker Compose

```console
$ docker-compose run --rm npm test
```

## Build

*Build the optimized files for the NPM package.*

### NPM

```console
$ npm run build
```

### Docker Compose

```console
$ docker-compose run --rm npm run build
```
