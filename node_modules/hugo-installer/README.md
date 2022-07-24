<div align="center">

# hugo-installer

**Installs [Hugo](https://gohugo.io/) into your repository.**

</div>

<br><br>

## What it does

**[Hugo](https://gohugo.io/)** is one of the most popular static site generators. In the world of web development we usually choose
**[npm](https://www.npmjs.com/)** as our dependency management solution. **Hugo**, however, is written in [Go](https://golang.org/) - and
thus not integrated into the npm module ecosystem. Instead, users are asked to install Hugo globally on their systems. Suboptimal, really.

But don't you worry, **Hugo Installer** is here to help! It's a small Node.js script which you can use to fetch the correct Hugo binary for
your system, e.g. via a `postinstall` hook within a `package.json` file. Neat!

Features include:

- :computer: Compatible with all operating systems and system architectures (Windows, MacOS, Linux, ..., CI/CD)
- :star: Supports all Hugo versions, including extended version
- :heart: Verifies checksum & runs health check when installing
- :eyes: Recognizes already downloaded binaries

<br><br><br>

## How to install

You can get the **hugo-installer** via **npm** by adding it as a new _devDependency_ to your `package.json` file and running
`npm install`. Alternatively, run the following command:

```bash
npm install hugo-installer --save-dev
```

### Requirements

- **hugo-installer** requires **NodeJS 12** (or higher) to be installed

<br><br><br>

## How to use

We recommended to use **hugo-installer** as part of your `postinstall` hook within your project's `package.json` file.

<br>

### Configure hugo version (required)

The Hugo version can be set using the `--version` CLI parameter. For example:

```json
{
  "scripts": {
    "postinstall": "hugo-installer --version 0.82.0"
  }
}
```

> Important: Make sure to use the exact version number as used in the
> [official Hugo GitHub releases](https://github.com/gohugoio/hugo/releases) (e.g. trailing zeros that exist or do not exist)

You can also use the extended version of Hugo (for some operating systems!) by specifying the `--extended` CLI parameter. For example:

```json
{
  "scripts": {
    "postinstall": "hugo-installer --version 0.46 --extended"
  }
}
```

**Bonus tip:** The `--version` CLI parameter can also be an object path to some value defined in your `package.json` file. This allows for the
Hugo version to be configured someplace else, e.g. in a `otherDependencies` object. For example:

```json
{
  "otherDependencies": {
    "hugo": "0.46"
  },
  "scripts": {
    "postinstall": "hugo-installer --version otherDependencies.hugo"
  }
}
```

<br>

### CLI parameters

The following lists all available CLI parameters and their respective default values. Only the `--version` CLI parameter is required.

| CLI parameter          | Description                                                                                                                                                                                                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--arch [arch]`        | System architecture that the binary will run on. It is recommended to<br>use auto-detect by not using this option.<br><br>→ Default value: Auto-configured on runtime using `os.arch()`                                                                                                                   |
| `--destination [path]` | Path to the folder into which the binary will be put. Make sure to add<br>this path to your `.gitignore` file.<br><br>→ Default value: `bin/hugo`                                                                                                                                                         |
| `--downloadUrl [url]`  | Source base URL from where the Hugo binary will be fetched. By default,<br>GitHub will be used. When using a custom URL, make sure to replicate<br>GitHub release asset URLs and append a trailing slash to the custom URL.<br><br>→ Default value: `https://github.com/gohugoio/hugo/releases/download/` |
| `--extended`           | Download the extended version of Hugo.<br><br>→ Default value: `false`                                                                                                                                                                                                                                    |
| `--force`              | Force clean install of Hugo, ignoring already installed / cached binaries.<br><br>→ Default value: `false`                                                                                                                                                                                                |
| `--httpProxy [url]`    | HTTP Proxy URL, used when downloading Hugo binaries. Useful when working behind corporate proxies. Can also be configured using the `HTTP_PROXY` environment variable, the CLI argument (if used) will take precedence.                                                                                   |
| `--httpsProxy [url]`   | HTTPS Proxy URL, used when downloading Hugo binaries. Useful when working behind corporate proxies. Can also be configured using the `HTTPS_PROXY` environment variable, the CLI argument (if used) will take precedence.                                                                                 |
| `--os [os]`            | Operating system that the binary should run on. It is recommended to<br>use auto-detect by not using this option. <br><br>→ Default value: Auto-configured on runtime using `os.platform()`                                                                                                               |
| `--skipChecksumCheck`  | Skip checksum checks for downloaded binaries. It is recommended to<br>leave this option enabled. <br><br>→ Default value: `true`                                                                                                                                                                          |
| `--skipHealthCheck`    | Skip health checks for downloaded binaries. It is recommended to leave<br>this option enabled. <br><br>→ Default value: `true`                                                                                                                                                                            |
| `--version [version]`  | Hugo version to install, or path to package.json entry with the version.<br>Make sure to use the exact version number as defined in the<br>[official Hugo GitHub releases](https://github.com/gohugoio/hugo/releases).                                                                                    |

You can always take a look at all available CLI parameters using the `--help` CLI parameter. For example:

```bash
hugo-installer --help
```

<br>

### Environment variables

The following lists all environment variables that can be used, all of them being optional.

| Environment variable | Description                                                                                                                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HTTP_PROXY`         | HTTP Proxy URL, used when downloading Hugo binaries. Useful when working behind corporate proxies. Can also be configured using the `--httpProxy [url]` CLI argument which (if used) will also take precedence.   |
| `HTTPS_PROXY`        | HTTPS Proxy URL, used when downloading Hugo binaries. Useful when working behind corporate proxies. Can also be configured using the `--httpsProxy [url]` CLI argument which (if used) will also take precedence. |

<br><br><br>

## Using the Hugo binary

Once fetched, the hugo binary can be used directly from your favourite command line, as part of an npm script, from within an Node.js script
or in any way you desire.

<br>

### npm script

Using Hugo from within an npm script is not as simple as it seems if you care about OS compatibility (which you should). On Windows systems
in particular, it is not possible to execute binary files directly from within an npm script. I developed a tiny npm module named
[`exec-bin`](https://github.com/dominique-mueller/exec-bin) which allows you to do exactly that simply by prepending its command.

Add `exec-bin` to your `devDependencies`, hit `npm install` and run Hugo from within your npm script by prepending the `exec-bin` command.
For instance:

```bash
exec-bin bin/hugo/hugo --config=hugo.config.json
```

If you only case about Linux-based systems, you can run the executable as expected without any additional tooling. For instance:

```bash
bin/hugo/hugo --config=hugo.config.json
```

<br>

### Node.js

One might also want to integrate Hugo in a NodeJS build script, or a NodeJS-based build tool such as **[Gulp](https://gulpjs.com/)**. You
can execute the Hugo binary using the Node.JS `spawn` function. For example:

```js
const path = require('path');
const spawn = require('child_process').spawn;

// Use Hugo
spawn(path.resolve(process.cwd(), 'bin', 'hugo', 'hugo'), [`--config=hugo.config.json`], {
  stdio: 'inherit',
}).on('close', () => {
  // Callback
});
```
