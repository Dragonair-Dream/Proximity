import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material/'
import { doc, getDoc } from 'firebase/firestore'

import { auth } from "../Services/firebase";
import { db } from "../Services/firebase";
import { getRelations } from "../Store/relationsReducer";

const Search = () => {
  const dispatch = useDispatch()
  const initialRelations = useSelector(state => state.relations)
  const relations = Object.keys(initialRelations).length === 0 ? {pending: [], accepted: [], requested: []} : initialRelations
  console.log('All Relations: ', relations)

  useEffect(() => {
    console.log('Ran the useEffect')
    dispatch(getRelations())
  }, [dispatch])

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <TextField id="input-with-sx" label="Search for Friends..." variant="standard" />
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      </Box>
      
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >

        
        {relations.pending.length ? (
          <li key='pending'>
            <ul>
              <ListSubheader>
                {`${relations.pending.length} Pending Request(s)`}
              </ListSubheader>
              {relations.pending.map((pending) => (
                <ListItem key={`pending-${pending.uid}`}>
                  <ListItemText primary={`Name: ${pending.firstName}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ) : ''}

        {relations.accepted.length ? (
          <li key='accepted'>
            <ul>
              <ListSubheader>
                {`Friends`}
              </ListSubheader>
              {relations.accepted.map((accepted) => (
                <ListItem key={`accepted-${accepted.uid}`}>
                  <ListItemText primary={`Name: ${accepted.firstName}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ) : ''}
        
      </List>
    </div>
  )
}

export default Search