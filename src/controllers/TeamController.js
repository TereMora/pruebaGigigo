'use strict'

const db = require('../database')

const GetTeams = async () => {
  let query = await db.query('SELECT * FROM teams')
  return query
}

const GetTeamsId = async (req, res) => {
  let query = await db.query('SELECT * FROM teams WHERE id = ?', [req.params.id])
  let members = await db.query('SELECT * FROM members WHERE team_id = ?', [req.params.id])
  if (members.length > 0) {
    query[0].members = members
  }
  return query[0]
}

const DeleteTeams = async (req, res) => {
  let query = await db.query('DELETE FROM teams WHERE id = ?', [req.params.id])
  return query[0]
}

const PostTeams = async (req, res) => {
  await db.query('INSERT INTO teams (name) VALUES (?)', [req.body.name])
  return GetTeams(req, res)
}

const PutTeams = async (req, res) => {
  await db.query('UPDATE teams SET name = ? WHERE id = ?', [req.body.name, req.params.id])
  return GetTeamsId(req, res)
}

const PostMembers = async (req, res) => {
  await db.query('INSERT INTO members (name, email, image, team_id) VALUES (?, ?, ?, ?)', [req.body.name, req.body.email, req.body.image, req.body.team_id])
  let query = await db.query('SELECT * FROM teams INNER JOIN members ON teams.id = members.team_id WHERE teams.id = ?', [req.body.team_id])
  return query
}

module.exports = {
  GetTeams,
  GetTeamsId,
  DeleteTeams,
  PostTeams,
  PutTeams,
  PostMembers
}
