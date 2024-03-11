<img src="https://i.imgur.com/RS07hCP.jpg">

# Django Class-based Views

## Learning Objectives

| Students Will Be Able To: |
|---|
| Use Class-based Views (CBVs) instead of View Functions |
| Use a CBV to Create data |
| Use a CBV to Delete data |
| Use a CBV to Update data |
| Use a ModelForm object to Render a Form's Inputs |

## Road Map

1. Setup
2. Refactor Links Exercise
3. What are Class-Based Views (CBVs)?
4. Why use Class-Based Views?
5. Creating Data Using a CBV
6. Updating & Deleting Data Using a CBV
7. Essential Questions
8. Further Study

## 1. Setup

This lesson continues to build-out Cat Collector right where the _Intro to Django Models_ lesson left off.

If your Cat Collector is up and running from the last lesson, there's no reason to sync, otherwise...

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-10-class-views-starter`**

<hr>
</details>

## 2. 👉 You Do - Update Links to Use the `url` Template Tag (3 minutes)

There are three `<a>` tags within the nav in **base.html** that have their `href`'s hardcoded:

```html
<ul>
  <li><a href="/" class="left brand-logo">&nbsp;&nbsp;Cat Collector</a></li>
</ul>
<ul class="right">
  <li><a href="/about">About</a></li>
  <li><a href="/cats">View All My Cats</a></li>
</ul>
```

Update the `href`'s to use the `url` template tag instead of hard-coding the URL in the links.

## 3. What are Class-Based Views?

<details>
<summary>
❓ What's a Django View?
</summary>
<hr>

**Django views are functions defined in views.py that run when its mapped route matches the HTTP request.**

<hr>
</details>

Class-based Views are classes defined in the Django framework that we can extend and use instead of _view functions_.

For example, let's say we wanted to implement the _index_ (view all) functionality for a Books data resource:

```python
# views.py
from django.views.generic import ListView

class BookList(ListView):
    model = Book
```

`ListView` is a built-in generic CBV designed to implement the "index" (list) functionality for a particular Model.

`BookList` is inheriting all of the goodness from `ListView` and...

```python
    model = Book
```

...informs `BookList` to retrieve the database objects using the `Book` Model.

Then, in **urls.py**, we invoke the `as_view()` class method of the `BookList` CBV which returns the view function for the route:

```python
# urls.py
from django.urls import path
from books.views import BookList

urlpatterns = [
    path('books/', BookList.as_view(), name='books_index'),
]
```

The CBV will automatically render a template named **templates/\<name of app\>/book_list.html**. This convention can of course be overridden.

In addition to the `ListView` used to display the index page for a Model's objects, there are also:

- `DetailView` - used to implement the "detail" page for an object
- `CreateView` - used to create an object
- `DeleteView` - used to delete an object
- `UpdateView` - used to update an object

In this lesson, we will be extending the `CreateView`, `UpdateView` and `DeleteView` CBVs to CUD cats!  

> 👀 We also could easily replace the existing `cats_index` and `cats_detail` view functions with CBVs, however, we won't as a reminder of how they are structured.

## 4. Why use Class-Based Views?

Much of the code we write in CRUD applications repeats certain patterns again and again.

As you saw in the above example, we can leverage CBVs to avoid having to write the same repeating code over and over.

CBVs can save time thus making us more productive developers.

CBVs are highly configurable by adding class attributes, overriding methods and using decorators (see the Further Study section).

For example, we can set the `template_name` attribute to render a template other than the default:

```python
class BookList(ListView):
  model = Book
  template_name = 'books/index.html'
``` 

## 5. Creating Data Using a CBV

We need a way to create cats in Cat Collector!

### Step 1 - Identify the Route

If this was an Express app, we likely would need to code two separate routes and controller actions like:

- `router.get('/cats/new', catsCtrl.new);` to view the form, and
- `router.post('/cats', catsCtrl.create);` to add the cat to the database and then redirect

However, using Django, we only need a single URL-based route because a `CreateView` CBV will automatically:

- Create a Django [ModelForm]() used to automatically create the form's inputs for the Model. 
- If the request is a `GET`, render a template (where we'll include a `<form>`)  and
- In the case of a `POST`, use the posted form's contents to automatically and transparently create data and perform a redirect.

Okay, so let's determine the single path that we need to create cats...

We can't use a RESTful path such as `/cats` this time because it's taken by the index functionality.

So, let's go with a creative 😀 path of:

```
'cats/create/'
```

### Step 2 - Update the UI

Now that we know the path that's used to **BOTH**:

- View a form for entering cat info; and
- Create the cat when the form is submitted

We can update **base.html** to add a link to the nav:

```html
<li><a href="{% url 'about' %}">About</a></li>
<!-- new link below -->
<li><a href="{% url 'cats_create' %}">Add a Cat</a></li>
<li><a href="{% url 'index' %}">View All My Cats</a></li>
```

Obviously, we've made the decision that the route will be named `cats_create`.

Clicking the **Add a Cat** link will result in the CBV receiving a `GET` request.

### Step 3 - Add the Route

Let's add the new URL pattern to **main_app/urls.py**

```python
urlpatterns = [
  path('', views.home, name='home'),
  path('about/', views.about, name='about'),
  path('cats/', views.cats_index, name='index'),
  path('cats/<int:cat_id>/', views.cats_detail, name='detail'),
  # new route used to show a form and create a cat
  path('cats/create/', views.CatCreate.as_view(), name='cats_create'),
]
```

The `path()` function still needs a view **function** as its second argument, not a class, and that's what a CBV's `as_view()` method returns.

> 👀 We didn't have to put that route above the `'cats/<int:cat_id>/'` because, unlike with Express, Django won't match that route unless there's something that looks like an integer in the second segment, thus it ignores `cats/create/`

On to the view!

### Step 4 - Extending the Generic `CreateView`

As always, anything from the Django framework that we need to access needs to be imported:

```python
# views.py

from django.shortcuts import render
# Add the following import
from django.views.generic.edit import CreateView
from .models import Cat
```

Now we can inherit from `CreateView` to create our own CBV used to create cats:

```python
class CatCreate(CreateView):
  model = Cat
  fields = '__all__'
```

The `fields` attribute is required for a `CreateView` and can be used to limit or change the ordering of the attributes from the `Cat` model are generated in the `ModelForm` passed to the template.

However, we've taken advantage of the special `'__all__'` value used to specify that the form should contain all of the `Cat` Model's attributes. Alternatively, we could have listed the fields in a list like this:

```python
class CatCreate(CreateView):
  model = Cat
  fields = ['name', 'breed', 'description', 'age']
```

Amazingly, that's all of the code we need to write to:
- Render a template in the case of a `GET` request, and
- Create a Cat object when the template's form is submitted as a `POST` request.

> 👀 It won't always be quite this easy as we'll see in the future when we need to add some additional class attributes or override methods in the CBV.

On to the template!

#### Create the Template for Creating Cats

By convention, the `CatCreate` CBV will look to render a template named `templates/main_app/cat_form.html`.

By default, all CBVs expect to find templates in a folder named following a pattern of:

```
app_name/templates/app_name
```

This weird pattern avoids potential name collisions.

Let's give `CatCreate` the template it wants by first creating the `templates/main_app` folder:

```
mkdir main_app/templates/main_app
```

Now we can create the template file:

```
touch main_app/templates/main_app/cat_form.html
```

The `CreateView` will automatically render a default template named as follows:<br>
`<name of model>_form.html` (lowercased, of course)

There's not too much so we'll review as we type it in:

```html
{% extends 'base.html' %}

{% block content %}
  <h1>Add Cat</h1>
  <!-- Leaving the action empty makes the form post to the same url used to display it -->
  <form action="" method="POST">
    <!-- Django requires the following for security purposes -->
    {% csrf_token %}
    <table>
      <!-- Render the inputs inside of <tr>s & <td>s -->
      {{ form.as_table }}
    </table>
    <input type="submit" value="Submit!" class="btn">
  </form>
{% endblock %}
```

The `{% csrf_token %}` template tag is a security measure that makes it difficult for hackers to perform a [cross-site-request-forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery) by writing a CSRF (pronounced "see-surf") token that is validated on the server.

The `form` variable is an instance of the `ModelForm` class instantiated automatically by the `CreateView` and passed to the template (via the context dictionary).  We'll learn more about `ModelForm`s in a later lesson.

Let's refresh and click the **Add a Cat** link.

Not too bad:

<img src="https://i.imgur.com/DPxY8um.png">

Using Devtools we can explore how Django's ModelForm object wrote the inputs in table rows and columns because we used `{{ form.as_table }}`.

Other options include:

- `{{ form }}` - No wrapper around the `<label>` & `<input>` tags
- `{{ form.as_p }}` - Wraps a `<p>` tag around the `<label>` & `<input>` tags
- `{{ form.as_ul }}` - Wraps an `<li>` tag around the `<label>` & `<input>` tags

> 👀 To ease custom styling, add an `id` or `class` to your `<table>` and/or `<form>` tags.  Also note how Django automatically assigns an id to each input.

#### Redirecting

If we submit the form to create a cat, the cat will be created, however, we'll receive an error because Django doesn't know where we want our app to redirect to.

One way to fix this is by adding a `success_url` class attribute to the CBV like this:

```python
class CatCreate(CreateView):
  model = Cat
  fields = '__all__'
  # Special string pattern Django will use
  success_url = '/cats/{cat_id}'
  # Or if you wanted to redirect to the index page
  # success_url = '/cats'
```

However, Django recommends adding a `get_absolute_url` method to the **Model** instead.  This way the `update` functionality can take advantage of it as well.

Let's take Django's advice by updating the `Cat` model:

```python
class Cat(models.Model):
  name = models.CharField(max_length=100)
  breed = models.CharField(max_length=100)
  description = models.TextField(max_length=250)
  age = models.IntegerField()

  def __str__(self):
    return self.name
    
  # Add this method
  def get_absolute_url(self):
    return reverse('detail', kwargs={'cat_id': self.id})
```

Think of the [reverse()](https://docs.djangoproject.com/en/4.1/ref/urlresolvers/#reverse) function as the code equivalent to the `url` template tag.  It returns the correct path for the `detail` named route and since that route requires a `cat_id` route parameter, its value must provided as a shown above.

Let's not forget to import `reverse` in **models.py**:

```python
from django.db import models
# Import the reverse function
from django.urls import reverse
```

Before moving on to Update & Delete operations, a few review questions...

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-11-class-views-create`**

<hr>
</details>

### ❓ Review Questions - Creating Data with a CBV (1 min)

<details>
<summary>
(1) To use a CBV to create data, our class must inherit from what class?
</summary>
<hr>

`CreateView`

<hr>
</details>

<details>
<summary>
(2) True or False:  A <code>CreateView</code> performs different behavior depending upon the HTTP request being a <code>GET</code> or a <code>POST</code>?
</summary>
<hr>

**True**

<hr>
</details>

<details>
<summary>
(3) True or False:  In the case of a GET request, a <code>CreateView</code> automatically renders a template matching this format<br><code>templates/name_of_app/name_of_model_form.html</code>
</summary>
<hr>

**True**

<hr>
</details>

## 6. Updating & Deleting Data Using a CBV

Here are the user stories we want to implement:

> AAU, when viewing a cat's detail page, I want to click EDIT to update that cat's information.

and 

> AAU, when viewing a cat's detail page, I want to click DELETE to remove that cat from the database.

We've covered all of the fundamentals of class-based views above so we'll be a little more brief while adding the functionality to delete and update cats by combining their steps together!

### Add the Routes

In Django, you may find it a bit easier to add the new routes prior to the new UI.

Let's add the two new routes in **urls.py**:

```python
path('cats/create/', views.CatCreate.as_view(), name='cats_create'),
# Add the new routes below
path('cats/<int:pk>/update/', views.CatUpdate.as_view(), name='cats_update'),
path('cats/<int:pk>/delete/', views.CatDelete.as_view(), name='cats_delete'),
```

> 👀 By convention, CBVs that work with individual model instances will expect to find a named parameter of `pk`. This is why we didn't use `cat_id` as we did in the _detail_ entry.

### Update the UI

We need to see EDIT and DELETE links on a cat's detail page.

Let's update **templates/cats/detail.html** by adding to a cat's "card" a `<div>` with a Materialize class of `card-action`:

```html
      <p>Age: Kitten</p>
    {% endif %}
  </div>
  <!-- Add the following markup -->
  <div class="card-action">
    <a href="{% url 'cats_update' cat.id %}">Edit</a>
    <a href="{% url 'cats_delete' cat.id %}">Delete</a>
  </div>
  <!-- New markup above -->
</div>
```

Now for the views...

### Subclass the `UpdateView` & `DeleteView`

We've referenced the new `CatUpdate` and `CatDelete` views in the routes so we need to add them to **views.py**.

But first we'll need to import the two additional generic CBVs to extend from:

```python
# Add UpdateView & DeleteView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
```

Now for the amazingly minimal new code:

```python
class CatUpdate(UpdateView):
  model = Cat
  # Let's disallow the renaming of a cat by excluding the name field!
  fields = ['breed', 'description', 'age']

class CatDelete(DeleteView):
  model = Cat
  success_url = '/cats'
```

Note that if we delete a cat, we'll need to redirect to the cats _index_ page since that cat doesn't exist anymore.

Now the server should be back up and clicking on a cat should result in a page that looks something like this:

<img src="https://i.imgur.com/yTyYWva.png">

Updating a cat is working just fine!

However, we'll need to add an extra template to implement delete functionality, which we'll do in a moment.

First though, to enhance the UX, it would be nice to see the name of the cat we're editing...

### Customize the `cat_form.html` Template

Since we didn't include `'name'` in the fields list in `CatUpdate`, the `name` attribute isn't listed in the form.

We're going to customize **cat_form.html** to show the cat's name that is being edited, and learn a little more about Django in the process.

The CBVs that work with a single model instance automatically pass as part of the context two attributes that are assigned the model instance.  The attributes are named `object` and, in this case, `cat` (the lowercase name of the Model).

`object`/`cat` will be set to `None` in a `CreateView`, which makes sense.

> 👀 In a `ListView`, the _queryset_ of model instances will be available via attributes named `object_list` and `cat_list` (again, the lowercase name of the Model with `_list` appended to it).

Let's leverage this new knowledge and modify **templates/main_app/cat_form.html** to show the cat's name only when we are editing, but not creating, a cat:

```html
{% block content %}
  <!-- New if/else block -->
  {% if object %}
    <h1>Edit <span class="teal-text">{{object.name}}</span></h1>
  {% else %}
    <h1>Add Cat</h1>
  {% endif %}
```

Looking good:

<img src="https://i.imgur.com/LEEiTN9.png">

Okay, let's get delete functionality working then we're done!

### Adding a `cat_confirm_delete.html` Template

It's usually wise to perform some type of confirmation when deleting data and Django makes it easy when we subclass a `DeleteView` by automatically rendering a confirmation template.

All we have to do is create it following, once again, Django's naming convention:

```
touch main_app/templates/main_app/cat_confirm_delete.html
```

Now for its content:

```html
{% extends 'base.html' %}

{% block content %}
  <h1>Delete Cat</h1>

  <h4>Are you sure you want to delete <span class="teal-text">{{ object.name }}</span>?</h4>

  <form action="" method="POST">
    {% csrf_token %}
    <input type="submit" value="Yes - Delete!" class="btn">
    <a href="{% url 'detail' cat.id %}">Cancel</a>
  </form>
{% endblock %}
```

Note how we are allowing the user to cancel the delete by providing a link back to the _detail_ page.

Let's check it out by refreshing:

<img src="https://i.imgur.com/zbw2HTU.png">

Congrats on implementing full CRUD for cats!

In the next lesson we'll see how to work with One-Many data relationships.

As usual, your lab is to implement the same class-based views in your Finch Collector project.

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-12-class-views-finish`**

<hr>
</details>

## 7. ❓ Essential Questions (1 min)

<details>
<summary>
(1) To be more productive, Class-Based Views can be used in lieu of ______ __________.
</summary>
<hr>

**View Functions**

<hr>
</details>

<details>
<summary>
(2) What generic class do we extend with our own CBV for deleting model instances?
</summary>
<hr>

The **`DeleteView`** class

<hr>
</details>

<details>
<summary>
(3) What class attribute must we provide to every CBV to inform it what Model it's supposed to CRUD?
</summary>
<hr>

**`model = ???`**

<hr>
</details>

## 8. Further Study - Customizing Class-based Views

So, we now know that Django provides us with a set of very useful classes that make development in Django easier and more productive.

You should consider class-based views as the go to vs. function-based views.

There might come a time though, when you might believe that class-based views can't be used in situations that require more flexibility.  However, Django's class-based views are designed to be easily customizable by overriding their methods and assigning values to attributes.

Your app's requirements may, or may not, need to depend upon customization of the built-in CBVs, however, you should take time to investigate how and learn more about OOP along the way...

[Start with the docs here](https://docs.djangoproject.com/en/4.1/topics/class-based-views/intro/#the-relationship-and-history-of-generic-views-class-based-views-and-class-based-generic-views)

#### Great Examples in the Docs

[This section of the docs](https://docs.djangoproject.com/en/4.1/topics/class-based-views/generic-display/#adding-extra-context) shows how to override a CBV's `get_context_data()` method to provide additional data/context to templates.

[This section of the docs](https://docs.djangoproject.com/en/4.1/topics/class-based-views/generic-display/#dynamic-filtering) shows how to override a CBV's `get_queryset()` method to provide a custom/dynamic queryset to a `ListView`. For example, in that method, you can access the logged in user via `self.request.user` to use to filter data, etc.

Similar to the above [this section of the docs](https://docs.djangoproject.com/en/4.1/topics/class-based-views/generic-display/#performing-extra-work) shows how to override a CBV's `get_object()` method to provide a custom/dynamic object to a `DetailView` and/or perform "extra work". 

## References

[Built-in Class-based Views](https://docs.djangoproject.com/en/4.1/topics/class-based-views/generic-display/)

[Working with Forms in Django](https://docs.djangoproject.com/en/4.1/topics/forms/)

[How Python's import system works - Modules & Packages](https://realpython.com/python-modules-packages/)