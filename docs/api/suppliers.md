#Suppliers

##Requirements:
`token` appended with `?token=token_goes_here`

##CRUD

###GET ALL

GET `/suppliers`

Returns:
`JSON-Array` with all suppliers, example:
```JSON
[
  {
    "id": 1,
    "created_at": "2015-11-30 12:00:00",
    "updated_at": "2015-11-30 15:43:57",
    "company_name": "Share & Square LTD",
    "contact_id": 1,
    "address_id": 36,
    "company_number": "150020511",
    "vat_no": "51651513",
    "default_category": 0,
    "default_vat": 0,
    "delivery_days": 0,
    "receipts": [],
    "supplier_invoices": []
  },

  ...
```

---

###GET SINGLE

GET `/suppliers/{id}`

Return:
`JSON-Object` with the supplier, as example:
```JSON
{
    "id": 1,
    "created_at": "2015-11-30 12:00:00",
    "updated_at": "2015-11-30 15:43:57",
    "company_name": "Share & Square LTD",
    "contact_id": 1,
    "address_id": 36,
    "company_number": "150020511",
    "vat_no": "51651513",
    "default_category": 0,
    "default_vat": 0,
    "delivery_days": 0,
    "receipts": [],
    "supplier_invoices": []
}
```

---

###UPDATE

PUT `suppliers/{id}`

Params:

* id
* created_at
* updated_at
* company_name
* contact_id
* address_id
* company_number
* vat_no
* default_category
* default_vat
* delivery_days
* receipts
* supplier_invoices

Returns:
`JSON-object` of the updated supplier

---

###CREATE

POST `suppliers/`

Params:

* id
* created_at
* updated_at
* company_name (required)
* contact_id
* address_id
* company_number
* vat_no
* default_category
* default_vat
* delivery_days
* receipts
* supplier_invoices

Returns:
`JSON-object` of the updated supplier