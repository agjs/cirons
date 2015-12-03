#Supplier Invoices

##Requirements:
`token` appended with `?token=token_goes_here`

##CRUD

###GET

GET `/supplier_invoices`

Returns:
`JSON-Array` with all supplier invoices, example:
```JSON
[
  {
    "id": 14,
    "created_at": "2015-10-25 20:41:13",
    "updated_at": "2015-10-28 10:32:02",
    "date": "2015-10-25",
    "merchant": "Test2",
    "sum": 1511,
    "vat": 25,
    "employee_id": 0,
    "user_id": 0,
    "paid": "2015-10-25",
    "currency": "SEK",
    "deleted_at": null,
    "duedate": "2015-10-25",
    "multiple_vat": 0,
    "recurring_id": 0,
    "identifier": "test",
    "supplier_id": 2,
    "account_no": 4545,
    "category_name": "testing",
    "categories": [
        {
            "id": 28,
            "created_at": "2015-06-03 10:35:56",
            "updated_at": "2015-06-03 10:35:56",
            "name": "testing",
            "color": "#000000",
            "namespace": "supplier_invoices",
            "pivot": {
                "object_id": 14,
                "category_id": 28
            }
        }
    ]
  },

  ...
```

---

###UPDATE

PUT `/supplier_invoices/{id}`

Params:

* date (required)
* sum (required)
* vat (required)
* employee_id
* user_id
* paid 
* currency (required)
* deleted_at
* duedate
* multiple_vat
* recurring_id
* identifier
* supplier_id (required)
* account_no

Returns:
`JSON-Object` with the new updated supplier invoices

---

###CREATE

POST `/supplier_invoices/{id}`

Params:

* date (required)
* sum (required)
* vat (required)
* employee_id
* user_id
* paid 
* currency (required)
* deleted_at
* duedate
* multiple_vat
* recurring_id
* identifier
* supplier_id (required)
* account_no

Returns:
`JSON-Object` with the new supplier invoices