FROM ruby:3 as build-stage

WORKDIR /usr/app

RUN gem install jekyll
RUN jekyll new .
RUN jekyll build

FROM nginx:1.19-alpine

EXPOSE 80

COPY --from=build-stage /usr/app/_site/ /usr/share/nginx/html