# Project Overview

A web application to bookmmark your favourite websites

## Stack Tech
* Rails 4
* Reactjs
* Postgresql

Design Idea:
http://deweyapp.io/

Postgresql Start:
sudo service postgresql start
psql -c "create database development owner=ubuntu"

Rake
rake db:drop:all
rake db:create:all
rake db:migrate

push to heroku:
heroku run rake db:migrate


Todo:
* Add React Router https://github.com/reactjs/react-rails/wiki/Using-react-router