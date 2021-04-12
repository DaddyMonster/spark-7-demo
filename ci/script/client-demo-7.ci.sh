#!/bin/sh

yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest rxjs
nx run client-demo-7:build --prod
cd dist/apps/client/demo-7
npx add-dependencies graphql @emotion/react @emotion/styled scroll-into-view-if-needed
#ENVS
BRANCH=$1
echo DEPLOYING BRANCH: $1
CONTAINER_NAME=client-demo-7-$BRANCH
GCR_PATH=gcr.io/$GC_PROJECT_ID/$CONTAINER_NAME:latest
REGION=$GC_REGION
DOCKER_FILE_NAME=client-demo-7.Dockerfile

cp ../../../../ci/docker/$DOCKER_FILE_NAME .

docker build . -t $CONTAINER_NAME -f $DOCKER_FILE_NAME
docker tag $CONTAINER_NAME $GCR_PATH

docker push $GCR_PATH

echo "NEXT CLINT DOCKER IMAGE PUSHED TO REPO"
gcloud components install beta --quiet
gcloud beta run deploy "$CONTAINER_NAME\ 
--image=$GCR_PATH\ 
--project=$GC_PROJECT_ID\ 
--platform=managed\ 
--region=$REGION\ 
--allow-unauthenticated\ 
--update-env-vars=$CLIENT_DEMO_7_ENV"
