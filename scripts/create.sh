curl -X POST \ 
	-H "Content-Type: application/json" \ 
	-H "Accept: application/json" \
	-d '{ "name": "Fight Club", "authors": [ "Chuck Palahniuk" ] }' \ 
	localhost:8080/books
