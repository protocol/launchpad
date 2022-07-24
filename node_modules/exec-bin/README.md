<div align="center">

# exec-bin

**Run any binary files / executables within your npm scripts.**

</div>

<br><br>

## What it does

Running binary files / executables within npm scripts works if it's either part of an installed package (`node_modules/.bin`) or globally
installed. A binary that exists someplace else, e.g. in the project root, cannot easily be executed.

**exec-bin** is here to help! It's a (very!) small Node.js script that you can use to run binary files / executables, with all parameters
being forwarded automatically. Fantastic!

<br><br><br>

## How to install

You can get the **exec-bin** via **npm** by adding it as a new _devDependency_ to your `package.json` file and running
`npm install`. Alternatively, run the following command:

```bash
npm install exec-bin --save-dev
```

### Requirements

- **exec-bin** requires **NodeJS 12** (or higher) to be installed

<br><br><br>

## How to use

Use **exec-bin** within your `package.json` scripts. For example:

```json
{
  "scripts": {
    "build": "exec-bin path/to/my/binary --first-parameter=foobar --second-boolean-parameter"
  }
}
```
