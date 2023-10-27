#### **BASE URL** - [https://store.abuchikings.dev/api/v1](https://store.abuchikings.dev/api/v1) 
#### **Healthcheck** - [https://store.abuchikings.dev](https://store.abuchikings.dev) 

#### **POSTMAN DOCS** - [https://documenter.getpostman.com/view/6026635/2s9YRFWAtz](https://documenter.getpostman.com/view/6026635/2s9YRFWAtz) 

### API Endpoints

* POST Create Business                              (/business)
* POST Create Department Head                       (/user)
* POST Login with Department Lead Account           (/user/login)
* POST Create Order                                 (/order)
* GET Get Business Order Details                    (/order/details)
* GET Get Business Credit Score                     (/order/score)

NB: `itemId` field on place order endpoint can be any random alphanumeric character between 5 and 36 characters in length

### How To Test
- Login with Sample user credentials on Postman.
- API uses a Bearer Token for authorization.
- Place Orders using the create order endpoint
- Get total number of orders, (total amount of orders, total number of orders today, total amount of orders today) by using the get business
order details endpoint
- Use the Get Business Credit Score endpoint to get the credit score for  a business


### Test With New Business
- If you wish to test with a new Business you will have to create a new business, then create a new user account under that business.
- Create new business with the Create Business endpoint.
- Create new user under newly created business with the Create Department Head endpoint .
- Then follow the intructions on [How To Test](#how-to-test).

### To Run On Local Machine
- Git clone `git@github.com:AbuchiKings/duplo_test.git`
- Ensure docker is installed on Local Machine
- Set up env as shown in .env.example
- Run `npm install` to install dependencies
- Run `make up-f` OR (`make up-d` to run docker in detached mode. )
- Run `make down` to take down running containers.
 