https://github.com/jaimeiniesta/metainspector

Postgresql Start:
sudo service postgresql start
psql -c "create database development owner=ubuntu"


Rake
rake db:drop:all
rake db:create:all
rake db:migrate

push to heroku:
heroku run rake db:migrate