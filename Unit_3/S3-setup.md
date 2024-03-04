## Set up Amazon S3

AWS (Amazon Web Services) is a cloud platform offering a slew of web services such as compute power, database storage, content delivery and more.

You can see all of the services available by clicking here [Amazon AWS](https://aws.amazon.com/).

The specific web service we are going to use to host our uploaded images is the _Simple Storage Service_, better known as **Amazon S3**.

### Set up an Amazon AWS Account

Before we can use S3, or any Amazon Web Service, we'll need an Amazon AWS account.

**Notice:** Even though AWS has a "free tier" and we will do nothing in SEI that will cost money, AWS requires a credit card to open an account.  If you don't wish to provide a credit card, you will not be able to complete this lesson and you won't be able to upload images using Amazon Web Services. Unfortunately, alternative services, such as Microsoft Azure, have the same credit card requirement.

Click the orange **Sign in to the Console** button, then click **Create a new AWS account** (or browse [here](https://portal.aws.amazon.com/billing/signup#/start)):

<img src="https://i.imgur.com/dOcYjJ5.png">

Unfortunately, the signup process is a bit lengthy...

### Sign in to the AWS Console

After you have signed up, log in to the Console:

<img src="https://i.imgur.com/KOraf1L.png">

then sign in:

<img src="https://i.imgur.com/c38jT6s.png">

### Create Access ID & Secret Keys

We need to do create an **Access Key ID** and a **Secret Access Key** to access S3 with.

Click the **>  All services** drop-down:

<img src="https://i.imgur.com/wczgsIY.png">

Locate the "Security, Identity & Compliance" section and click **IAM** (Identity and Access Management):

<img src="https://i.imgur.com/2pAZLVG.png">

Click **Users** in the sidebar:

<img src="https://i.imgur.com/oyZtir7.png">

Click the blue **Add user** button:

<img src="https://i.imgur.com/HEMERzW.png">

Enter a user name for the credentials being created (your web app's name if perfect), select **Programmatic access**, then click the **Next Permissions** button:

<img src="https://i.imgur.com/sUxiveh.png">

Now we need to create a group that will have S3 permissions that the user can be assigned to.

Click the **Create group** button:

<img src="https://i.imgur.com/OVcl9N9.png">

Enter a **Group name** - `django-s3-assets` is fine.

Then search or scroll way down, select the **AmazonS3FullAccess** checkbox and click the blue **Create group** button:

<img src="https://i.imgur.com/ZcGlCxo.png">

On the following screen, ensure that the `django-s3-assets` group is selected, then click the blue **Next: Tags** button:

<img src="https://i.imgur.com/ydvoiQ8.png">

Now click the blue **Next: Review** button:

<img src="https://i.imgur.com/EWzMiOp.png">

Then finally, click the blue **Create user** button:

<img src="https://i.imgur.com/aVxeKtQ.png">

Copy both access keys to a safe place - we'll need them later in the lesson:

<img src="https://i.imgur.com/offHztR.png">

Click the **Close** button (bottom-right), but don't close the browser - on to creating an S3 bucket...

### Create an S3 Bucket for the `catcollector` App

Click the **Services** drop-down (top-left):

<img src="https://i.imgur.com/fs8ZZOs.png">

Click the `S3` link under the "Storage" section.

Buckets are containers for stuff you store in S3.

Typically, you would want to create an S3 bucket for each web application you develop that needs to use S3.

Let's click the blue **+ Create bucket** button to get started:

<img src="https://i.imgur.com/ux61Yn0.png">

You'll have to enter a globally unique **Bucket name**, then select the nearest **Region**:

<img src="https://i.imgur.com/pgQHKMB.png">

For the best performance, always be sure to select the nearest location to where your application will be hosted, e.g., Heroku.  For this lesson, be sure to select the Region nearest you.

Click the **Next** button (bottom-right of popup) - **TWICE** to get to the following screen where you want to **UNCHECK** the **Block all public access** checkbox, then **CHECK** the **I acknowledge...** checkbox:

<img src="https://i.imgur.com/gsnp6Lu.png">

Click the blue **Next** button, then a new screen will appear where you will click the blue **Create Bucket** button!

The bucket has been created!

<img src="https://i.imgur.com/2fVW2Kg.png">

However, we need to make sure that web browsers will be able to download cat images when using catcollector.

To do so, we need to specify a "bucket policy" that enables read-only access to a bucket's objects.

Click on the bucket name:

<img src="https://i.imgur.com/YxTLDyq.png">

Click the **Permissions** tab at the top:

<img src="https://i.imgur.com/HAEVb6y.png">

Click on the square **Bucket Policy** button:

<img src="https://i.imgur.com/N5gKSw0.png">

Then near the bottom click the **Policy generator** link:

<img src="https://i.imgur.com/8ZOkFY2.png">

A new tab will open in your browser.

Start entering the data as follows. BTW, that's a `*` in the "Principle" input.

<img src="https://i.imgur.com/avkZNk0.png">

This next one's a bit challenging.  In the **Amazon Resources Name (ARN)** input enter this:

`arn:aws:s3:::sei-catcollector/*`

but substitute your bucket name for `sei-catcollector`.

Click the gold **Add Statement** button.

Once that is done, click the gold **Generate Policy** button that's in Step 3.

Copy the text inside the box, including the curly braces:

<img src="https://i.imgur.com/w90Jq1x.png">

Now go back to the main tab and paste in that text:

<img src="https://i.imgur.com/38eL1gh.png">

Click the blue **Save** button (top-right).

You should see something like this at the top of the page:

<img src="https://i.imgur.com/Mn1Dl5P.png">

Congrats!  You now have an S3 bucket that, using the access keys, an application can upload files of any type to; that also allows any browser to download by using a known URL.

Now let's get on with the app!

### Install & Configure - Boto 3

#### Install `boto3`

The official Amazon AWS SDK (Software Development Kit) for Python is a library called [Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html).

Let's install it:

```
$ pip3 install boto3
```

#### Configure Credentials

<p style="color:red">Don't ever put your Amazon AWS, or any other secret keys, in your source code!</p>

If you do, and push your code to GitHub, it will be discovered within minutes and could result in a major financial liability!

Have I scared you? Good...

During development (not in a deployed app), boto3 will automatically look in a special file for your AWS keys.

Let's create the folder Boto3 looks for credentials in:

```
$ mkdir ~/.aws
```

Now let's create the file where we store our credentials:

```
$ touch ~/.aws/credentials
```

Note that there is no file extension on the _credentials_ file.

Now let's open it and put our keys in there:

```
$ code ~/.aws/credentials
```

Then type the following in the file, substituting your real keys:

```
[default]
aws_access_key_id=YOUR_ACCESS_KEY
aws_secret_access_key=YOUR_SECRET_KEY
```

Note that it's possible to configure sets of credentials in addition to the `[default]` set by using _profiles_ as shown [here in the docs](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#shared-credentials-file).

> IMPORTANT:  If you use AWS S3 in your project 3 - when deploying your projects next week, you will need to set these same keys on Heroku using `heroku config:set`, however, **the key names will need to be CAPITALIZED when setting them on Heroku**.
