# React Router

<img src="https://i.imgur.com/UcmwbaK.png" width=300/>

## Learning Objectives

### React Bitcoin Currency

Here is what we are looking to build:  [Bitcoin Solution Code](https://9esbr.csb.app/)



## Currencies component 

If we look at this component we see a long list of links. Note that the links are using regular `<a>` tags.

What happens if we click on a link? It works, but the whole page reloads which is a poor choice of UI. 

Lets go ahead and replace the `a` tag with a `<Link>` component. Make the `to` prop value equal to the `href` value.

```jsx
// src/Components/Currencies/Currencies.js
import { Link } from 'react-router-dom'

//...

  let list = listOfCurrencies.map((item) => {
    return (
      <div className="currency" key={item.currency}>
        <p>
          <Link to={`${item.currency}`}>{item.currency}</Link>: {item.country}
        </p>
      </div>
    );
  });

  return <div>{list}</div>;
}

```

Great! Now go back to the page and click the link again, what happens?

It changes the route for us (notice the URL changing) but we don't have any
routes set up to match that url so it `Redirects` us back to the home page. 


### Currency Component 

If we take a moment to examine the `Currency` Component we will see that there is the following variable with the url to the `conidesk` api.

```js
const coindeskURL = "https://api.coindesk.com/v1/bpi/currentprice/";
```

If we copy/paste the url into the browser and append a bitcoin currency we should see that it returns the data. 

```js
https://api.coindesk.com/v1/bpi/currentprice/AFN
```

<img src="https://i.imgur.com/ADE1k6U.png" width=400/>

This is the data we will use to render the info dynamically for the currency each time the user clicks to see a currency. 

### Currency Route

In order to active this route we need  add another `<Route>` component in `App`. 

This time though we want to include a `parameter`.

Look at the URL that we're on after clicking on a currency and we should see the following:

```js
https://vthmi.csb.app/currencies/AFN
```

It seems as though the info we need to make the API call is already in the route. We can use that as part of our routing logic. 

Let's create a new route that includes a `url parameter`. This is done by appending a `:paramName` after the path.

```html
 <Route path="/currencies/:currencyName" element={<Price />}/>
```

Clicking on a currency should take us to the following:

<img src="https://i.imgur.com/orCqpXN.png" width=400/>

Now we can use the `useParams` hook from `react-router-dom` in order to grab the params in the url!

```js
import { useParams } from "react-router-dom";
```

```
const { currencyName } = useParams(); // currencyName comes from the name defined in the Route above
```

## Adding useState and useEffect to Currency Component

Knowing that we need to make the API call and then update state with the data means we need both `useState` and `useEffect` so let's import them into the `Price` Component

```js
import React, {useState, useEffect} from "react";
```

Let's setup our state. 

```js
const [currency, setCurrency] = useState({});
```

The Currency component will be responsible for making the API call to `coindesk` to retrieve the current price of the currency. 

We will make the call when the component first mounts, `componentDidMount`,  and will do so within `useEffect`. 


```js
  useEffect(() => {
    const url = `${coindeskURL}${currencyName}.json`
    const makeApiCall = async () => {
      const res  =  await fetch(url)
      const json = await res.json()
      let currencyPrice = json.bpi[currency].rate;
      setCurrency(currencyPrice)
    }
    makeApiCall()
  },[])
```

The last edits required are to update the JSX to include the required info.  

```html
<h1>Bitcoin price in {currencyName}</h1>
<div className="price">Price: {currency}</div>
```

## New Feature Request

The client has just asked that we now include a new feature.  They would like to display the currency name in the header.  The header will look like this when no currency is selected: 

<img src="https://i.imgur.com/guMrAJb.png" width=500/>

And then update to include the currency name when a currency is active.

<img src="https://i.imgur.com/ukBuPSI.png" width=500/>

First take a look at `App` to at least add the `>` to the existing JSX.

```html
<Link to="/currencies">Currencies ></Link>
```

<hr>

#### <g-emoji class="g-emoji" alias="alarm_clock" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/23f0.png">⏰</g-emoji> Activity - 5min

Based on your current knowledge of React, and limited knowledge of React Router,  think of 1 or possibly 2 different ways to implement this logic.  

- Take 2 minutes to think about ways to do this
- The instructor will ask you to post your answers in a slack thread


<hr>

## Lifting State
In order to show that value in `App` we need to pass, or better yet lift, the currency name from `Currency` to `App`.  In order to to this we need to pass down a function.  In order to keep our design simple we will pass `setCurrency` down from `App`. 

**App.js**
```js
 const [currencyAbbr, setCurrencyAbbr] = useState('');
```

Here is the thing though.  The way our route is configured we can't pass down props. 

```html
 <Route path="/currencies/:currencyName" element={<Price />}/>
```

This requires that we use the `render` method in the route and pass down the routerProps.

```html
   <Route path="/currencies/:currencyName" element={<Price setCurrencyAbbr={setCurrencyAbbr} />} />
```


Confirm in DevTools that those props are back and uncomment out the code. 


In the `Price` Component we need to call `props.setCurrencyAbbr(currencyName)` in the `makeApiCall` function. 

```js
props.setCurrencyAbbr(currencyName)
```

### Update Navigation

Add the following in `App`

```js
<Link to="/currencies">{
      currency ? `Currencies List > ${currencyAbbr}` : 
      `Currencies List > `
  }</Link>
```

### Clear Previous Value
If we click the links a few times we will see that our new feature doesn't yet clear the previous value when we are on `/currencies` or the `/` home route.  

For that we need to add an `onClick` event to both of those `Link`'s

```html
<Link onClick={() => setCurrencyAbbr('')}to="/">
  <img
    src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png"
    alt=""
  />
  <h1>Bitcoin prices</h1>
</Link>
<Link onClick={() => setCurrencyAbbr('')} to="/currencies">
  {currencyAbbr ? `Currencies List > ${currencyAbbr}` : `Currencies List`}
</Link>
```


## Bonus - Working With `useNavigate` 

We can make use of the the `navigate('/someroute')` method to push routes into the browsers url.

In the `Currency` Component let's create a button that when called will navigate the user back to the `currencies` route.

Let's add a button and assign it the `handleClick` function. 

We can use the `` hook in order to access this. 

- setup the hook
```js
const navigate = useNavigate();
```

```js
 <button onClick={navigate('/')}> Home</button>
```

