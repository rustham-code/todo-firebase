const admin = require('firebase-admin')

const serviceAccount = require("../../todo-list-app-826e4-firebase-adminsdk-v34e2-836ec052a2.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://todo-list-app-826e4.firebaseio.com/'
});

const db = admin.database();

const { Router}= require('express');
const router = Router();

// va y trae las tareas 
router.get('/',(req, res) => {
    db.ref('task').on('value', async(snapshot) => {
       data = snapshot.val();
      await res.render('layouts/main', {task: data})
    });
})

// agrega una tarea 
router.post('/new-task', (req, res) => {
    const newTask = {
        name: req.body.name,
        isComplete: false,
    }
    db.ref('task').push(newTask);
    res.redirect('/');
});

// actualizar el nombre o el check 
router.put('/update-task/:id', (req, res) => {
    const updateTask = {
        name: req.body.firstname,
        isComplete: false // mirar como esta checkeada
    }
    db.ref('task' + req.params.id).update(updateTask);
    res.redirect('/');
});

// para cambiar el check automatico
router.put('/change-task/:id', (req, res) => {
    const updateTask = {
        name: req.body.firstname,
        isComplete: true
    }
    db.ref('task' + req.params.id).update(updateTask);
    res.redirect('/');
});

// eliminar una tarea 
router.get('/delete-task/:id', (req, res) => {
     db.ref('task/' + req.params.id).remove();
     res.redirect('/');
});

module.exports = router;