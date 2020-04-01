# NextJs-Apollo Client Tutorial Project

Frontend ecommerce web app built in React and Graphql using NextJs, Apollo Client, and Styled Components. This frontend app connects to the backend which was built in NodeJs, Graphql, and Mongodb as a database. The backend part is under separated repository (https://github.com/autsada/nodejs-apolloserver-mongodb).

### Tutorial link on youtube (in Thai)

https://www.youtube.com/playlist?list=PLCT_w0Fqe_z7JbLEBkco62V1Q1ZkSQ-7V

### Prerequisites

NodeJs v8+ (https://nodejs.org/en/)

### Installing

1. Clone the project
```
git clone https://github.com/autsada/nextjs-apollo.git
```
2. Install dependencies
```
npm install
```

## Note:

In order to integrate Omise payment gateway, you need to have Omise account (https://www.omise.co/) and have your account public key set in .env file in the root of the project. You can create an Omise free account at given link above. Or you can use any other well-known payment gateways such as Stripe or Paypal. 

In .env file

```
OMISE_PUBLIC_KEY=<YOUR_PUBLIC_KEY>
```
