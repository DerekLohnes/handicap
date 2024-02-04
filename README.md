git add [FILES]

git commit -m ["MESSAGE"]

git push -u origin main  



docker build -t handicap-frontned .

docker build -t handicap-backend .


Run frontend and backend on the same virtual network so they can communicate

docker network create handicap-network

docker run -d --network --name handicap-frontend-app handicap-network -p 3000:3000 handicap-frontend

docker run -d --network handicap-network --name handicap-backend-app -p 8000:8000  handicap-backend

127.0.0.1:3000

