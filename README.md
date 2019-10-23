# TypeScript Express Order API
## Questions
2. Pour permettre des changements futur, j'utilise le principe de **Ségrégation des interfaces** dans mon model `app/src/models/orders.ts`
3. Pour séparer la partie http et la partie logique, j'utilise des **services**. C'est le **principe de résponsabilité unique**
4. Pour pouvoir anonymiser la partie contact, je fait un wrapper de la classe `OrderService`. C'est le **design pattern Proxy**

## API
Routes disponibles : 
- POST /orders/
- GET /orders/
- GET /orders/:id
- PUT /orders/:id
- DEL /orders/:id
## Examples
### POST /orders/
- Create one order with what's in the body
- Returns 201
### GET /orders/
- Get every orders
- Returns 200
### GET /orders/:id
- Get an order with the id `:id`
- Returns 200 or 404 if the *id* doesn't exist
### PUT /orders/:id
- Update an order with the id `:id` with what's in the body. **If a field isn't in the body, the field in the database isn't changed**
- Returns 200 or 404 if the *id* doesn't exist
### DEL /orders/:id
- Delete an order with the id `:id`. 
- Returns 200
### Example body
```
{ 
   "packages":[ 
      { 
         "length":{ 
            "unit":"cm",
            "value":85
         },
         "width":{ 
            "unit":"m",
            "value":1.2
         },
         "height":{ 
            "unit":"cm",
            "value":12
         },
         "weight":{ 
            "unit":"kg",
            "value":2.75
         },
         "products":[ 
            { 
               "quantity":2,
               "label":"Chiffon magique",
               "ean":"5920123412345"
            }
         ]
      }
   ],
   "contact":{ 
      "firstname":"André",
      "lastname":"Martel",
      "phone":"0600000000",
      "mail":"andre.martel@niji.fr",
      "billingAddress":{ 
         "postalCode":"59000",
         "city":"Lille",
         "addressLine1":"42 rue paumée",
         "addressLine2":""
      },
      "deliveryAddress":{ 
         "postalCode":"59000",
         "city":"Lille",
         "addressLine1":"42 rue paumée",
         "addressLine2":""
      }
   },
   "carrier":{ 
      "name":"Chronopost",
      "contact":{ 
         "firstname":"Michel",
         "lastname":"Patulacci",
         "phone":"0600000000",
         "mail":"michelBGdu59@chronopost.fr",
         "headOfficeAddress":{ 
            "postalCode":"75000",
            "city":"Paris",
            "addressLine1":"1 avenue des Champs Elysées",
            "addressLine2":""
         }
      }
   }
}
```

---



# TypeScript Express server - Starter

## Get started

Ensure you have `make` installed on your system.

After cloning te repository run:
```bash
make init
```

Now you can start|stop|restart your server by running:
```bash
make start|stop|restart
```

Your server will listen by default on port `3000` of your `$DOCKER_HOST`

You can access the server logs by running:
```bash
make log
```

If you want to stop and destroy your docker containers:
```bash
make down
```

Launch dependencies install with:
```bash
make install
```

## Running a command in a running container

To run a command in your container, run the following:
```bash
docker exec <container_name> <command>
```
eg:

```bash
docker exec starter-back_server sudo rm -rf /
```

## Running a command in a stopped/failed container

You will have to run a command through `docker-compose`:
```bash
docker-compose run --rm <service_name> <command>
```
eg:

```bash
docker-compose run --rm node npm install --save-dev typescript
```

## Access your container

To connect to a container, run:
```bash
docker exec -ti <container_name> sh
```
