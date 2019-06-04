'use strict'

const express = require('express')

const router = express.Router()

const controller = require('./../controllers/TeamController')

router.get('/', (req, res) => {
  res.send('Hello World')
})
router.get('/teams', (req, res) => {
  return controller.GetTeams()
    .then(result => {
      if (result) {
        return res.status(200).json(result)
      }
      return res.status(404).json({ error: 'EntityNotFound' })
    })
    .catch(err => {
      return res.status(500).json({ error: err })
    })
})

router.get('/teams/:id', (req, res) => {
  return controller.GetTeamsId(req, res)
    .then(result => {
      if (result) {
        return res.status(200).json(result)
      }
      return res.status(404).json({ error: 'EntityNotFound' })
    })
    .catch(err => {
      return res.status(500).json({ error: err })
    })
})

router.delete('/teams/:id', (req, res) => {
  return controller.DeleteTeams(req, res)
    .then(result => {
      return res.status(204).json(result)
    })
    .catch(err => {
      return res.status(500).json({ error: err })
    })
})

router.post('/teams', (req, res) => {
  if (req && req.body && req.body.name) {
    return controller.PostTeams(req, res)
      .then(result => {
        return res.status(200).json(result)
      })
      .catch(err => {
        return res.status(500).json({ error: err })
      })
  }
  return res.status(400).json({ name: ['The name field is required.'] })
})

router.post('/members', (req, res) => {
  if (req && req.body && req.body.name && req.body.email && req.body.image && req.body.team_id) {
    return controller.PostMembers(req, res)
      .then(result => {
        return res.status(200).json(result)
      })
      .catch(err => {
        return res.status(500).json({ error: err })
      })
  }
  let errors = []
  if (!req.body.name) {
    errors.push('The name field is required.')
  }
  if (!req.body.email) {
    errors.push('The email field is required.')
  }
  if (!req.body.image) {
    errors.push('The image field is required.')
  }
  if (!req.body.team_id) {
    errors.push('The team_id field is required.')
  }
  return res.status(400).json({ errors: errors })
})

router.put('/teams/:id', (req, res) => {
  if (req && req.body && req.body.name) {
    return controller.PutTeams(req, res)
      .then(result => {
        if (result) {
          return res.status(200).json(result)
        }
        return res.status(404).json({ error: 'EntityNotFound' })
      })
      .catch(err => {
        return res.status(500).json({ error: err })
      })
  }
  return res.status(400).json({ name: ['The name field is required.'] })
})

module.exports = router
