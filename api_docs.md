#API Documentation

##Endpoint
`http://janalex.beta.cirons.com/api/v1/`

##Token
When you have a token it should be appended to every request as `?token=token_goes_here`

###Authentication
POST `/auth`

Params:
`username` = username of user
`password` = password of user

Return:
JSON object with `token`

###Get logged in user
GET `/me`

Params: None

Returns:
`JSON-object` with user, example:
```JSON
{
  "id": 1,
  "username": "admin",
  "email": "phandersson@icloud.com",
  "created_at": "2014-12-10 12:36:23",
  "updated_at": "2015-11-11 23:33:47",
  "first_name": "Philip",
  "last_name": "Andersson",
  "nick_name": "Puffy",
  "job_title": "Lead Developer",
  "image": "/uploads/images/1425824780_profil.jpg",
  "salary_data": "{\"type\":\"hour\",\"fixed\":\"\",\"overtime\":null,\"hour\":\"200\",\"extra\":null}",
  "calendar_color": "#FF3232"
}
```

###### Philip 
.
.
.
.
.
