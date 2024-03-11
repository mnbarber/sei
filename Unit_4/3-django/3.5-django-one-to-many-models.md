<img src="https://i.imgur.com/GJZbJyx.jpg">

# Django One-to-Many Models & ModelForms

## Learning Objectives

| Students will be able to: |
|---|
| Implement a one-to-many relationship in Django Models |
| Traverse a Model's related data |
| Use a custom `ModelForm` to generate form inputs for a Model |
| Assign the foreign key when creating a new "child" object |
| Add a custom method to a Model |

## Road Map

1. Setup
2. A Cat's Got to Eat!
3. Add the New `Feeding` Model
4. Add a Field for the Foreign Key
5. Make and Run the Migration
6. Test the Models in the Shell
7. Add `Feeding` to the Admin Portal
8. Displaying a Cat's Feedings
9. Adding New Feeding Functionality
10. Essential Questions
11. Lab Assignment
12. Bonus Challenge: Adding a Custom Method to Check the Feeding Status

## 1. Setup

This lesson continues to build-out Cat Collector right where the _Intro to Django Models_ lesson left off.

If your Cat Collector is up and running from the last lesson, there's no reason to sync, otherwise...

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-13-one-many-starter`**

<hr>
</details>

Then you can start the web server with `python3 manage.py runserver`

## 2. A Cat's Got to Eat!

In this lesson we're going to look at how to add another model that demonstrates working with **one-to-many** relationships in Django.

Since a cat's got to eat, let's go with this relationship:

<img src="https://i.imgur.com/37yYc42.png">

<details>
<summary>
❓ How does the above relationship "read"?
</summary>
<hr>

**A Cat has many Feedings" -and- "A Feeding belongs to a Cat**

<hr>
</details>

## 3. Add the New `Feeding` Model

<details>
<summary>
❓ What module/file are we going to add the new Feeding Model in?
</summary>
<hr>

**main_app/models.py**

<hr>
</details>

### Add the `Feeding` Model

Using the ERD above as a guide, let's add the new `Feeding` Model (below the current `Cat` Model):

```python
# Add new Feeding model below Cat model
class Feeding(models.Model):
  date = models.DateField()
  meal = models.CharField(max_length=1)
```

Note that using a single-character to represent what meal the feeding is for:

- `B`reakfast
- `L`unch
- `D`inner...

### Field.choices

Django has a [Field.choices](https://docs.djangoproject.com/en/4.1/ref/models/fields/#choices) feature that will make the single-characters more user-friendly by automatically generating a select dropdown in the form using descriptions that we define.

The first step is to define a tuple of 2-tuples.  Because we might need to access this tuple within the `Cat` class also, let's define it above both of the Model classes:

```python
# A tuple of 2-tuples
MEALS = (
    ('B', 'Breakfast'),
    ('L', 'Lunch'),
    ('D', 'Dinner')
)
# new code above

class Cat(models.Model):
``` 

As you can see, the first item in each 2-tuple represents the value that will be stored in the database, e.g. `B`.

The second item represents the human-friendly "display" value, e.g., `Breakfast`.

Now let's enhance the `meal` field as follows:

```python
class Feeding(models.Model):
  date = models.DateField()
  meal = models.CharField(
    max_length=1,
    # add the 'choices' field option
    choices=MEALS,
    # set the default value for meal to be 'B'
    default=MEALS[0][0]
  )
```

### Add the `__str__` Method

As recommended, we should override the `__str__` method on Models so that they provide more meaningful output when they are printed:


```python
class Feeding(models.Model):
  ...

  def __str__(self):
    # Nice method for obtaining the friendly value of a Field.choice
    return f"{self.get_meal_display()} on {self.date}"
```

Check out the convenient `get_meal_display()` method Django automagically creates to access the human-friendly value of a Field.choice like we have on `meal`.

### Add the Foreign Key

Since a `Feeding` **belongs to** a `Cat`, it must hold the `id` of the cat object it belongs to - yep, it needs a **foreign key**!

Here's how it's done - Django style:

```python
class Feeding(models.Model):
  date = models.DateField()
  meal = models.CharField(
    max_length=1,
	 choices=MEALS,
	 default=MEALS[0][0]
  )
  # Create a cat_id FK
  cat = models.ForeignKey(Cat, on_delete=models.CASCADE)

  def __str__(self):
    return f"{self.get_meal_display()} on {self.date}"
```

As you can see, the `ForeignKey` field-type is used to create a one-to-many relationship.

> 👀 In the database, the column in the `feedings` table for the FK will actually be called `cat_id` because Django by default appends `_id` to the name of the attribute we use in the Model.

The first argument provides the parent Model.

In a one-to-many relationship, the `on_delete=models.CASCADE` is required.  It ensures that if a Cat record is deleted, all of the child Feedings will be deleted automatically as well - thus avoiding _orphan_ records (seriously, that's what they're called).

## 5. Make and Run the Migration

We added/updated a new Model, so it's that time again...

```
python3 manage.py makemigrations
```

<details>
<summary>
❓ Now what command do we need to run?
</summary>
<hr>

```
python3 manage.py migrate
```

<hr>
</details>

After creating a Model, especially one that relates to another, it's always a good idea to test drive the Model and relationships in the shell.

## 6. Test the Models in the Shell

Besides testing Models and their relationships, the following will demonstrate how to work with the ORM in views.

First, open the shell:

```
python3 manage.py shell
```

Now let's import everything **models.py** has to offer:

```python
>>> from main_app.models import *
>>> Feeding
<class 'main_app.models.Feeding'>
>>> MEALS
(('B', 'Breakfast'), ('L', 'Lunch'), ('D', 'Dinner'))
```

So far, so good!

### May the Test Drive Commence...

```python
# get first cat object in db
>>> c = Cat.objects.first()   # or Cat.objects.all()[0]
>>> c
<Cat: Maki>
# obtain all feeding objects for a cat using the "related manager" object
>>> c.feeding_set.all()
<QuerySet []>
# create a feeding for a given cat
>>> c.feeding_set.create(date='2022-10-06')
<Feeding: Breakfast on 2022-10-06>
# yup, it's there and the default of 'B' for the meal worked
>>> Feeding.objects.all()
<QuerySet [<Feeding: Breakfast on 2022-10-06>]>
# and it belongs to a cat
>>> c.feeding_set.all()
<QuerySet [<Feeding: Breakfast on 2022-10-06>]>
# get the first feeding object in the db
>>> f = Feeding.objects.first()
>>> f
<Feeding: Breakfast on 2022-10-06>
# cat is the name of the field we defined in the Feeding model
>>> f.cat
<Cat: Maki>
>>> f.cat.description
'Lazy but ornery & cute'
# another way to create a feeding for a cat
>>> f = Feeding(date='2022-10-06', meal='L', cat=c)
>>> f.save()
>>> f
<Feeding: Lunch on 2022-10-06>
>>> c.feeding_set.all()
<QuerySet [<Feeding: Breakfast on 2022-10-06>, <Feeding: Lunch on 2022-10-06>]>
# finish the day's feeding, this time using the create method
>>> Feeding.objects.create(date='2022-10-06', meal='D', cat=c)
>>> c.feeding_set.count()
3
# feed another cat
# (ensure a cat with id of 3 exists)
>>> c = Cat.objects.get(id=3)
>>> c
<Cat: Whiskers>
>>> c.feeding_set.create(date='2022-10-07', meal='B')
<Feeding: Breakfast on 2022-10-07>
>>> Feeding.objects.filter(meal='B')
<QuerySet [<Feeding: Breakfast on 2022-10-06>, <Feeding: Breakfast on 2022-10-07>]>
# the foreign key (cat_id) can be used as well
>>> Feeding.objects.filter(cat_id=2)
<QuerySet [<Feeding: Breakfast on 2022-10-06>, <Feeding: Lunch on 2022-10-06>, <Feeding: Dinner on 2022-10-06>]>
>>> Feeding.objects.create(date='2022-10-07', meal='L', cat_id=3)
>>> Cat.objects.get(id=3).feeding_set.all()
<QuerySet [<Feeding: Breakfast on 2022-10-07>, <Feeding: Lunch on 2022-10-07>]>
exit()
```

Behind the scenes, an enormous amount of SQL was being generated and sent to the database thanks to Django's ORM.

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-14-feeding-model`**

<hr>
</details>

### 👉 You Do - Practice CRUDing Feedings (5 minutes)

Practice creating and accessing feedings for a cat...

1. Retrieve the last cat using the `Cat` model and its object manager's `last()` method and assign to a variable named `last_cat`.<br>Hint: Refer to how the `first()` method is being used to retrieve the first cat above.

2. Use the `create()` method on `last_cat`'s related manager to add a **L**unch and a **D**inner feeding for today.<br>Hint: We used this approach to create the very first feeding above.

3. Verify both feeding objects were created by calling the `all()` method on `last_cat`'s related manager.

## 7. Add `Feeding` to the Admin Portal

Remember, before a Model can be CRUD'd using the built-in Django admin portal, the Model must be registered.

Update `main_app/admin.py` so that it looks as follows:

```python
from django.contrib import admin
# add Feeding to the import
from .models import Cat, Feeding

admin.site.register(Cat)
# register the new Feeding Model 
admin.site.register(Feeding)
```

Now browse to `localhost:8000/admin` and click on the `Feeding` link.

<img src="https://i.imgur.com/S1w9o0N.png">

Check out those select drop-downs for assigning both the Meal and the Cat!

### Custom Field Labels

By default, the admin portal uses the attribute names as labels with the first character capitalized.  For example:  **Date**.

Perhaps you would like to override a label?

Because Django subscribes to the philosophy that **a Model is the single, definitive source of truth about your data**, you can bet that's where we will add customization.

In `main_app/models.py`, add the desired user-friendly label to the field-type like so:

```python
class Feeding(models.Model):
  # the first optional positional argument overrides the label
  date = models.DateField('feeding date')
  ...
```

Refresh and...

<img src="https://i.imgur.com/KMKlEgA.png">

What's cool is that the custom labels will be used in all of Django's ModelForms too!

## 8. Displaying a Cat's Feedings

Just like it would make sense in an app to show _comments_ for a _post_ when that post is displayed, a cat's _detail_ page is where it would make sense to display a cat's feedings.

No additional views or templates necessary.  All we have to do is update the **detail.html**.

The final version of Cat Collector has a cat's feedings displayed to the right of the cat's details.  We can do this using Materialize's grid system to define layout columns.

Copy/paste the new markup in **detail.html**, then we'll review:

```html
{% extends 'base.html' %}
{% block content %}

<h1>Cat Details</h1>

<div class="row">
  <div class="col s6">
    <div class="card">
      <div class="card-content">
        <span class="card-title">{{ cat.name }}</span>
        <p>Breed: {{ cat.breed }}</p>
        <p>Description: {{ cat.description|linebreaks }}</p>
        {% if cat.age > 0 %}
          <p>Age: {{ cat.age }}</p>
        {% else %}
          <p>Age: Kitten</p>
        {% endif %}
      </div>
      <div class="card-action">
        <a href="{% url 'cats_update' cat.id %}">Edit</a>
        <a href="{% url 'cats_delete' cat.id %}">Delete</a>
      </div>
    </div>
  </div>
  <!-- New Markup Below -->
  <div class="col s6">
    <table class="striped">
      <thead>
        <tr><th>Date</th><th>Meal</th></tr>
      </thead>
      <tbody>
        {% for feeding in cat.feeding_set.all %}
          <tr>
            <td>{{feeding.date}}</td>
            <td>{{feeding.get_meal_display}}</td>
          </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
  <!-- New Markup Above -->
</div>
{% endblock %}
```

A refresh results in this:

<img src="https://i.imgur.com/J7H9yiE.png">

## 9. Adding New Feeding Functionality

Now we want to add the capability to add a new feeding when viewing a cat's details.

Previously we used class-based views to productively perform create and update data operations for a Model.

The CBV we used automatically created a `ModelForm` for the Model that was specified like this:  `model = Cat`.

The CBV then used the `ModelForm` behind the scenes to generate the inputs and provide the posted data to the server.

Because we want to be able to show a form for adding a **feeding** on the _detail_ page of a **cat**, we're going to see in this lesson how to create a custom `ModelForm` from scratch that will:

1. Generate a feeding's inputs inside of the `<form>` tag we provide.
2. Be used to validate the posted data by calling `is_valid()`.
3. Persist the model instance to the database by calling `save()` on the instance of the ModelForm.

There's several steps we're going to need to complete, so let's get started...

### Create the ModelForm for the `Feeding` Model

We could define the ModelForm inside of the **models.py** module, but we're going to follow a best practice of defining it inside of a **forms.py** module instead:

```
touch main_app/forms.py
```

Now let's define the ModelForm:

```python
# forms.py

from django.forms import ModelForm
from .models import Feeding

class FeedingForm(ModelForm):
  class Meta:
    model = Feeding
    fields = ['date', 'meal']
```

Note that our custom form inherits from `ModelForm` and has a nested `class Meta:` to declare the Model being used and the fields we want inputs generated for. Confusing? Absolutely, but it's just the way it is, so accept it and sleep well.

Many of the attributes in the `Meta` class are in common with CBVs because the CBV was using them behind the scenes to create a ModelForm as previously mentioned.

For more options, check out the [Django ModelForms documentation](https://docs.djangoproject.com/en/4.1/topics/forms/modelforms/#modelform).

### Passing an Instance of `FeedingForm`

`FeedingForm` is a class that needs to be instantiated in the `cats_detail` view function so that it can be "rendered" inside of _detail.html_.

Here's the updated `cats_detail` view function in _views.py_:

```python
from .models import Cat
# Import the FeedingForm
from .forms import FeedingForm

...

# update this view function
def cats_detail(request, cat_id):
  cat = Cat.objects.get(id=cat_id)
  # instantiate FeedingForm to be rendered in the template
  feeding_form = FeedingForm()
  return render(request, 'cats/detail.html', {
    # include the cat and feeding_form in the context
    'cat': cat, 'feeding_form': feeding_form
  })
```

`feeding_form` is set to an instance of `FeedingForm` and then it's passed to **detail.html** in the context along with `cat`.

### Displaying `FeedingForm` Inside of **detail.html**

We want to display a `<form>` at the top of the feedings column in **templates/cats/detail.html** above the feeding `<table>`.

```html
<div class="col s6">
  <!-- New Markup Below -->
  <form method="POST">
    {% csrf_token %}
    <!-- Render the inputs -->
    {{ feeding_form.as_p }}
    <input type="submit" class="btn" value="Add Feeding">
  </form>
  <!-- New Markup Above -->
  <table class="striped">
  ...
```
As always, we need to include the `{% csrf_token %}` for security purposes.

A form's `action` attribute determines the URL that a form is submitted to. For now, we'll leave it out and come back to it in a bit.

The `{{ feeding_form.as_p }}` will generate the `<input>` tags wrapped in `<p>` tags for each field we specified in `FeedingForm`.

Let's see what it looks like - not perfect but it's a start:

<img src="https://i.imgur.com/KGb0FcW.png">

Unfortunately, the _Feeding Date_ field is just a basic text input. This is what Django uses by default for `DateField`s.

Also, we don't see a drop-down for the _Meal_ field as expected.  However, it's in the HTML, but it's not rendering correctly due to the use of Materialize.

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-15-feeding-form`**

<hr>
</details>

### Add Materialize's JavaScript Library

Luckily we can use Materialize to solve both problems. However, solving the problems will require that we include Materialize's JavaScript library and add a bit of our own JavaScript to "initialize" the inputs.

First, update **base.html** to include the Materialize JS library:

```html
<head>
  ...
  <link rel="stylesheet" type="text/css" href="{% static 'style.css' %}">
  <!-- Add the following below --->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  ...
```
 
#### Using a Date-picker for _Feeding Date_

Remember that sweet Materialize date-picker? 

Materialize requires us to "initialize" certain inputs using a bit of JavaScript.

We want this JS to run after the elements are in the DOM, so we'll put the JS at the bottom of the template.

Let's add the `<script>` tags just above the `{% endblock %}` of **templates/cats/detail.html**:

```html
</div>

<!-- below all HTML -->
<script>

</script>
{% endblock %}
```

Using Materialize, it takes two steps to get the inputs the way we want them:

- Select the element(s)
- "Initialize" the element(s) using Materialize's library

Here's the JS to add inside of the `<script>` tags to initialize the date-picker:

```js
</div>

<script>
  const dateEl = document.getElementById('id_date');
  // M is Materialize's global variable
  M.Datepicker.init(dateEl, {
    format: 'yyyy-mm-dd',
    defaultDate: new Date(),
    setDefaultDate: true,
    autoClose: true
  });
</script>
{% endblock %}
```

As you can see, the `ModelForm` automatically generated an `id` attribute for each `<input>`.  Always be sure to use Devtools to figure out how to select elements for styling, etc.

There are plenty of additional options for date-pickers than the four used above.  [Materialize's date-picker documentation](https://materializecss.com/pickers.html) has the details.

Refresh and test it out by clicking inside of _Feeding Date_ - you should see a sweet date-picker pop up like this:

<img src="https://i.imgur.com/eEIRrA1.png">

Now let's fix the dropdown...

#### Fix the _Meal_ `<select>`

Thanks to `choices=MEALS` in the `Feeding` model, the `FeedingForm` generated a nice `<select>` instead of the typical `<input type="text">` for a `CharField`.

But, `<select>` dropdowns also need to be initialized when using Materialize.

It doesn't require any options, just select it and init it:

```html
</div>

<script>
  const dateEl = document.getElementById('id_date');
  M.Datepicker.init(dateEl, {
    format: 'yyyy-mm-dd',
    defaultDate: new Date(),
    setDefaultDate: true,
    autoClose: true
  });

  // add additional JS to initialize select below
  const selectEl = document.getElementById('id_meal');
  M.FormSelect.init(selectEl);
</script>
{% endblock %}
```

Refresh and the _Meal_ `<select>` is looking good:

<img src="https://i.imgur.com/7GKa6DB.png">

Now with the UI done, let's think about the URL to `POST` the form to...

### Add Another `path(...)` to `urls.py`

Every `Feeding` object needs a value for its `cat_id` foreign key that holds the primary key of the cat object that it belongs to.

Therefore, we need to ensure that the route includes a URL parameter for capturing the cat's `id` like we've done in other routes:

```python
# main_app/urls.py

urlpatterns = [
	...
    path('cats/<int:cat_id>/add_feeding/', views.add_feeding, name='add_feeding'),
]
```

To match the new route, the `<form>`'s `action` attribute will need to look something like `/cats/2/add_feeding`. 

Let's go there now...

### Add the `action` Attribute to the `<form>`

As always, we'll use the `url` template tag to generate the proper path for the `action` attribute:

```html
<!-- templates/cats/detail.html -->

<div class="col s6">
  <!-- add the action attribute as follows -->
  <form action="{% url 'add_feeding' cat.id %}" method="POST">
    {% csrf_token %}
    {{ feeding_form.as_p }}
    <input type="submit" class="btn" value="Add Feeding">
  </form>
```

As you know, if the URL requires values for URL parameters such as `<int:cat_id>`, the `url` template tag accepts them after the name of the route.

We won't be able to refresh and check it out until we add the `views.add_feeding` function...

### Add the `views.add_feeding` View Function to `views.py`

Let's start by stubbing up an `add_feeding` view function in **views.py** so that the server will start back up and we can inspect our `<form>`:

```python
...

# add this new function below cats_detail
def add_feeding(request, cat_id):
  # Baby step
  pass 
```

Now we can refresh and inspectthe elements using DevTools shows that our `<form>` is looking good:

<img src="https://i.imgur.com/ENEb2d0.png">

Now let's code the `add_feeding` view function:

```python
def add_feeding(request, cat_id):
  # create a ModelForm instance using the data in request.POST
  form = FeedingForm(request.POST)
  # validate the form
  if form.is_valid():
    # don't save the form to the db until it
    # has the cat_id assigned
    new_feeding = form.save(commit=False)
    new_feeding.cat_id = cat_id
    new_feeding.save()
  return redirect('detail', cat_id=cat_id)
```

<details>
<summary>
❓ What does <code>request.POST</code> remind you of in Express?
</summary>
<hr>

**`req.body`**

<hr>
</details>

After ensuring that the form contains valid data, we save the form with the `commit=False` option, which returns an in-memory model object so that we can assign the `cat_id` before actually saving to the database.

Always be sure to `redirect` instead of `render` if data has been changed in the database.

We also need to import `redirect` by adding after `render`:

```python
# main_app/views.py
from django.shortcuts import render, redirect
```

Add a feeding and rejoice!

<img src="https://i.imgur.com/QP1Kfv1.png">

Well, almost...

### Ordering Feedings

It would be nice to have the most recent dates displayed at the top.

Yup, _a Model is the single, definitive source of truth..._

The answer lies in adding a `class Meta` with an `ordering` class attribute within the `Feeding` Model:

```python
class Feeding(models.Model):
  ...
  def __str__(self):
    # Nice method for obtaining the friendly value of a Field.choice
    return f"{self.get_meal_display()} on {self.date}"

  # change the default sort
  class Meta:
    ordering = ['-date']
```

Feed the cats!

Be sure to check out the BONUS section on your own.

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-16-finish-without-bonus`**

<hr>
</details>

## 10. ❓ Essential Questions (2 mins)

<details>
<summary>
(1) When two Models have a one-many relationship, which Model must include a field of type <code>models.ForeignKey</code>, the one side, or the many side?
</summary>
<hr>

**The many ("belongs to") side.**

<hr>
</details>

<details>
<summary>
(2) True or False: <code>ModelForm</code>s are used to generate the form inputs for a model, validate the submitted form and save the data in the database.
</summary>
<hr>

**True**

<hr>
</details>

Assuming a `Author --< Book` relationship, answer the following three questions...

<details>
<summary>
(3) Which Model gets the <code>ForeignKey</code> field and what's a good name for that attribute?
</summary>
<hr>

The `Book` Model with an attribute of `author`, i.e.:

```python
author = models.ForeignKey(Author, on_delete=models.CASCADE)
```

<hr>
</details>

<details>
<summary>
(4) True or False:  Assuming an <code>author</code> object, we access <code>author</code>'s books via the <code>author.book_set</code> related manager.
</summary>
<hr>

**True**

<hr>
</details>

<details>
<summary>
(5) How would we access a <code>book</code> object's author object?
</summary>
<hr>

```python
book.author
```

<hr>
</details>

## 11. Lab Assignment

As usual, the lab calls for implementing the same features in your Finch Collector project.

## 12. Bonus Challenge: Adding a Custom Method to Check the Feeding Status

When adding _business logic_ to an application, always consider adding that logic to the Models first.

This approach is referred to as "fat models / skinny views" and results in keeping code DRY.

We're going to add a custom method to the `Cat` Model that help's enable the following messaging based upon whether or not the cat has had at least the number of feedings for the current day as there are MEALS.

When a cat does not have at least the number of MEALS: 

<img src="https://i.imgur.com/3TEZ8nl.png">

And when the cat has been completely fed for the day:

<img src="https://i.imgur.com/E1yCDHr.png">

### The `fed_for_today` Custom Model Method

Let's add a one line method to the `Cat` Model class:

```python
from django.db import models
from django.urls import reverse
# add this import
from datetime import date

class Cat(models.Model):
  ...
  # add this new method
  def fed_for_today(self):
    return self.feeding_set.filter(date=date.today()).count() >= len(MEALS)
```

Be sure to add the import at the top of _models.py_.

The `fed_for_today` method demonstrates the use of `filter()` to obtain a `<QuerySet>` for today's feedings, then `count()` is chained on to the query to return the actual number of objects returned.

The above approach in more efficient than this similar code:

```python
len( self.feeding_set.filter(date=date.today()) )
```
because this code would return all objects from the database when all we need is the number of objects returned by `count()`. In other words, don't return data from the database if you don't need it.

### Update the **detail.html** Template

All that's left is to sprinkle in a little template code like this:

```html
...
  <div class="col s6">
    <form action="{% url 'add_feeding' cat.id %}" method="POST">
      {% csrf_token %}
      {{ feeding_form.as_p }}
      <input type="submit" class="btn" value="Add Feeding">
    </form>
    <!-- new markup below -->
    <br>
    {% if cat.fed_for_today %}
      <div class="card-panel teal-text center-align">{{cat.name}} has been fed all meals for today</div>
    {% else %}
      <div class="card-panel red-text center-align">{{cat.name}} might be hungry</div>
    {% endif %}
    <!-- new markup above-->
    <table class="striped">

```

Congrats on using a custom Model method to implement business logic!

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

**`git reset --hard origin/sync-17-finish-with-bonus`**

<hr>
</details>

## Resources

[Django Model API](https://docs.djangoproject.com/en/4.1/ref/models/)

[Django ModelForms](https://docs.djangoproject.com/en/4.1/topics/forms/modelforms/#modelform)