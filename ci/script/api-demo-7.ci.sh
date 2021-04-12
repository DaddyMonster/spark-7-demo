#!/bin/sh

nx run api-demo-7-srv:build --prod

cd dist/apps/api/demo-7-srv
npx add-dependencies reflect-metadata @nestjs/core @nestjs/platform-express rxjs

#ENVS
BRANCH=$1
CONTAINER_NAME=api-demo-7-srv-$BRANCH
GCR_PATH=gcr.io/$GC_PROJECT_ID/$CONTAINER_NAME:latest
REGION=$GC_REGION
DOCKER_FILE_NAME=api-demo-7.Dockerfile

cp ../../../../ci/docker/$DOCKER_FILE_NAME .
docker build . -t $CONTAINER_NAME -f ./$DOCKER_FILE_NAME
docker tag $CONTAINER_NAME $GCR_PATH

docker push $GCR_PATH
gcloud components install beta --quiet
gcloud run deploy $CONTAINER_NAME\ 
--image $GCR_PATH\ 
--project $GC_PROJECT_ID\ 
--platform managed\ 
--region $REGION\ 
--allow-unauthenticated\ 
--update-env-vars $API_DEMO_7_ENV
