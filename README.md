# Basic Authentication Note

## Important Terms
    Hashing 
        encrpyting the password using a hash function
    Salting
        extra security by appending value into the password before hashing 
    Session
        a storage that can store user data on the server
    Session store
        in addition to DB, we need session store to store users' data
    Signed cookies
        untampered cookies. if a user tries to edit the cookie, it will not work
    Bcrypt
        A password hashing function available in many Programming languages
        
## Loggin 
    Store the user_id to their session
    Using Middleware to handle authentication 

## LoggOut
    Clear the user_id from their session

