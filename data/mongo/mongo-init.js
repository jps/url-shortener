db.createUser(
    {
        user: "url-shortener-api",
        pwd: "password",
        roles:[
            {
                role: "readWrite",
                db:   "url-shortener"
            }
        ]
    }
);