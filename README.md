#Discollect Developer Portal!
Get access to our data!

Submit a request for an api key on our website, then include the api in all your requests like so:

... /api/YOUR_API_KEY_HERE/desired_endpoint_here

We currently supply all responses in JSON

##End points

###/user
Send in your userId (you can request that key from our help center) and receive an array of your given items
####SAMPLE:
GET request:
/api/YOUR_API_KEY_HERE/user?userId=0

Response:
{
  "userListingData": [
    {
      "id": 33,
      "title": "Kitchen Sink",
      "createdAt": "2016-08-17T22:45:40.000Z",
      "category": "appliances",
      "zipcode": 19525
    },
    {
      "id": 32,
      "title": "Raccoon skin cap",
      "createdAt": "2016-08-17T22:29:59.000Z",
      "category": "fashion",
      "zipcode": 12345
    } ...


###/user/category
Send in your userId and receive back an object sorted by categories
####SAMPLE:
GET request:
/api/YOUR_API_KEY_HERE/user/category?userId=0

Response:
{
  "appliances": [
    {
      "id": 33,
      "title": "Kitchen Sink",
      "category": "appliances",
      "createdAt": "2016-08-17T22:45:40.000Z",
      "zipcode": 19525
    },
    {
      "id": 31,
      "title": "Older Grapes",
      "category": "appliances",
      "createdAt": "2016-08-17T18:33:04.000Z",
      "zipcode": 94102
    }
  ],
  "fashion": [] ...

###/listing
Send in a Listing ID and receive back an object with Listing data and click data
####SAMPLE:
GET request:
/api/YOUR_API_KEY_HERE/listing?listingId=0

Response:
{
  "listingData": [
    {
      "id": 0,
      "title": "TEST TEST TEST",
      "category": "electronics",
      "createdAt": "2016-08-16T22:09:58.000Z",
      "zipcode": 94102
    }
  ],
  "clickData": [
    {
      "userId": 8,
      "createdAt": "2016-08-18T23:05:31.000Z"
    },

###/all/clicks
Receive list of ALL click responses (it's long, watch out)
####SAMPLE:
GET request:
/api/YOUR_API_KEY_HERE/all/clicks

Response:
[
  {
    "userId": 8,
    "createdAt": "2016-08-18T23:04:35.000Z",
    "Listing": {
      "id": 32,
      "title": "Raccoon skin cap",
      "zipcode": 12345,
      "takerId": null,
      "giverId": 2,
      "status": 0,
      "picReference": null,
      "category": "fashion",
      "description": "Just like davy would have worn.",
      "condition": 2,
      "giverRating": 0,
      "takerRating": 0,
      "createdAt": "2016-08-17T22:29:59.000Z",
      "updatedAt": "2016-08-17T22:29:59.000Z"
    }
  } ...

###/state
Receive list of all Listings, ordered by state
####SAMPLE:
GET request:
/api/YOUR_API_KEY_HERE/all/state?state=CA

Response:
[
  {
    "id": 33,
    "title": "Kitchen Sink",
    "category": "appliances",
    "createdAt": "2016-08-17T22:45:40.000Z",
    "zipcode": 19525
  }, ...

###/user/category
Send in your userId and receive back an object sorted by categories
####SAMPLE:
GET request:
/api/YOUR_API_KEY_HERE/user/category?userId=0

Response:
{
  "appliances": [
    {
      "id": 33,
      "title": "Kitchen Sink",
      "category": "appliances",
      "createdAt": "2016-08-17T22:45:40.000Z",
      "zipcode": 19525
    },
    {
      "id": 31,
      "title": "Older Grapes",
      "category": "appliances",
      "createdAt": "2016-08-17T18:33:04.000Z",
      "zipcode": 94102
    }
  ],
  "fashion": [] ...

###/time/category
Receive list of all Listings from given categories over given timeframe

####SAMPLE:
GET request:
api/YOUR_API_KEY_HERE/time/category?cat=appliances&cat=furniture&past=day

Optional time frames:
hour

day

month

year

Response:
{
  "data": [
    139,
    227,
    66,
    244,
    71,
    32
  ],
  "labels": [
    "fashion",
    "appliances",
    "electronics",
    "furniture",
    "tools",
    "books"
  ],
  "label": "Clicks by Category per day"
}

###/category/time
Receive array of clicks on a category over a given period, separated by given time frames

####SAMPLE:
GET request:
api/YOUR_API_KEY_HERE/category/time?cat=appliances&past=day

Optional time frames:
hour

day

month

year

Response:
[
  0,
  2,
  225,
  1234,
  678,
  567,
  345,
  12,
  678,
  1456,
  90,
  2
]
