<img src="https://i.imgur.com/R2zfSdF.png">

# My Developer Skills Lab

## Introduction

This lab provides an opportunity to practice working with jQuery.

This lab **is not a deliverable**.

## Exercise

### Setup

You'll be using a typical, real-world project setup for this lab...

1. Move to your `code` folder:  `cd ~/code`

2. Create a folder named `my-dev-skills-lab` and `cd` into it.

3. Create the following folders/files:
	- `index.html`
	- `js/main.js`
	- `css/main.css` 

4. Perform the usual front-end project setup:
	- Add the HTML boilerplate to `index.html`
	- Link in `js/main.js` - don't forget the `defer` attribute!
	- Link in `css/main.css`

5. Load jQuery from the CDN by adding the following **before** your `main.js`:
	
	```html
	<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
	```

#### Optional - Use Bootstrap CSS Framework

The solution code uses the popular [Bootstrap CSS Framework](https://getbootstrap.com/).

A CSS framework can make an app look better by simply including its pre-defined CSS in your project. 

Check it out and if you'd like to use it, include this `<Link>` to its CDN **before** the existing `<Link>` that loads `main.css`:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
```

#### Optional - Use a Google Font


The solution uses a Google Font named "Open Sans" by including the following `<Link>` elements in the `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet">
```

#### Optional - Make the Project a Git Repo and Connect to GitHub Remote Repo

1. `git init` and make your initial commit.

2. Create a new remote repo in your **personal** GitHub account, however, **do not** check the "Initialize this repository with a README" box (this avoids a conflict with your local repo). Next, follow the instructions for pushing an existing repository.

	For example:
	
	<img src="https://i.imgur.com/XUM58Dx.png">

### Requirements

1. Add HTML and CSS as necessary to implement an application that looks close to this wireframe:

	<img src="https://i.imgur.com/k06ZMEN.png">
	
2. Code the following [_user stories_](https://en.wikipedia.org/wiki/User_story), using jQuery where possible:

	- As a User (AAU), I don't want to see any developer skills when the page first loads so that I can start with a fresh slate.

	- AAU, I want to be able to type in a skill and have it added to my list of skills by clicking a button.

	- AAU, I want to be able to remove an individual skill one at a time in case I make a mistake.

## Bonus

##### Replace the first user story above with the following story:

- AAU, I want to see my previous list of developer skills so that I can start from where I last left off.

##### Hint:

- Research how to use [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) as a way to persist (remember) the skills each time they are updated.

[Possible Solution - Try Not to 👀](https://replit.com/@SEIStudent/jQuery-Dev-Skills-Lab-Solution#index.html)
