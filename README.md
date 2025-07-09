# todo-app
## Running
Run both servers
In one terminal, run backend:
cd server
node index.js

In another terminal, run frontend:
cd client
npm run dev

todo-app/
├── client/             ← React frontend
│   └── ...
├── server/             ← Express backend
│   ├── models/         ← ✅ Mongoose models live here
│   │   └── Task.js
│   ├── index.js        ← Main backend entry point
│   ├── .env            ← MongoDB URI and other secrets
│   └── package.json
├── README.md

Check tasks in MongoDB:
mongosh
use todoapp
db.tasks.find().pretty()

Testing CRUD REST API:
curl http://localhost:3001/api/tasks
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test task", "priority": "low"}'
curl -X PUT http://localhost:3001/api/tasks/<TASK_ID> \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
curl -X DELETE http://localhost:3001/api/tasks/<TASK_ID>
