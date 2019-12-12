# PairsJS

A NodeJS library for easy implementation and/or manipulation of key-value pairs. Can be used, for example, for configuration files.‌

## ​🌶 Getting Started is super easy!

To install PairJS into your existing nodeJS app run this command:

```bash
$ npm install @kishannareshpal/pairsjs
```

Or by adding this line into the dependencies section of your `package.json` file

```javascript
dependencies {
    // add this line
    "@kishannareshpal/pairsjs": "^1.0.4"
}

// and then run this command.
$ npm install
```



## 🐌 Start using it right away!

```javascript
// import the module
import PairsJS from '@kishannareshpal/pairsjs'

/* 1st: Initialize it. */
// – this will create a new file called `pairs.json`
// in your root directory.
let pairs = new PairsJS();


/* 2nd: CRUD */
// a) Add a new pair:
pairs.add("username", "joebytes")
pairs.add("age", 12)
pairs.add("isVerified", true)

/*
    ./pairs.json contents:
    
    {
        "username": "joebytes",
        "age": 12,
        "isVerified": true
    }
*/



// b) Get a pair
```







