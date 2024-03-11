<img src="https://images.unsplash.com/photo-1600981806713-d141a32a4f7b" width="900">

# Finch Collector Lab - Part 5

## Intro

Today in the **Django - Many:Many Relationships** lesson, you learned how to add another model that demonstrates working with many-to-many relationships in Django. 

In this lab, you'll do the same, except for a data resource of your choosing.

We have chosen to collect Finches in this example!

FYI, future lessons will expand upon the `catcollector` project, and the labs will expand upon the `finchcollector` project!

#### The final version of `finchcollector` (parts 1 thru 5 combined) will be a deliverable, so do each part and don't fall behind.


## Exercises

Following the steps we took in the **Django - Many:Many Relationships lesson**, complete the following exercises:

1. Create another model that will have a Many:Many relationship with your main data entity.
	- Don't forget to add a ManyToManyField on one of the Models.

2. Add at least the ability to Create the new model.  Refer to how Cat Collector used CBV's to implement full-CRUD with very little code in **views.py**. Don't forget to add the additional routes in **urls.py** and the necessary templates. 

3. Implement similar functionality to the Toy model in catcollector, including the following User Stories:
	- AAU, I want to see a list displaying all of the toys in the database. (Step 2 above)

	- AAU, I want to be able to add a Toy to list of Toys. (Step 2 above)

	- AAU, when I visit the `detail` page for a finch, I want to see a list of toys belonging to the finch, and also any available toys that I can add to the finch.


## Deliverable?

#### This is the final version of `finchcollector` (parts 1 thru 5 combined) - please submit the link to your repo as directed.