import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material/'
import { decideRequest } from "../Store/relationsReducer";

const Search = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const relations = useSelector(state => state.relations)
  const flatRelations = [...relations.accepted, ...relations.pending, ...relations.requested].map(user => user.uid)
  const users = useSelector(state => state.users)
  const filteredUsers = users.filter(user => !flatRelations.includes(user.posterId))
  const [filtered, setFiltered] = useState([[],[...relations.pending],[...relations.accepted], [...relations.requested]])

  useEffect(() => {
    if (search === '' || search === null || search === undefined) {
      setFiltered([[], [...relations.pending], [...relations.accepted], [...relations.requested]])
    } else {
      const all = users.filter(user => user.userName.includes(search) || user.firstName.includes(search) || user.lastName.includes(search))
      const p = relations.pending.filter(user => user.userName.includes(search) || user.firstName.includes(search) || user.lastName.includes(search))
      const a = relations.accepted.filter(user => user.userName.includes(search) || user.firstName.includes(search) || user.lastName.includes(search))
      const r = relations.requested.filter(user => user.userName.includes(search) || user.firstName.includes(search) || user.lastName.includes(search))
      setFiltered([all, p, a, r])
    }
  }, [search, relations, users])

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <TextField id="input-with-sx" label="Search for Friends..." variant="standard" value={search} onChange={e => setSearch(e.target.value)}/>
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
        {filtered[0].length ? (
          <li key='notFriends'>
            <ul>
              <ListSubheader>
                {`Add a Friend`}
              </ListSubheader>
              {filtered[0].map((add) => (
                <ListItem key={`add-${add.uid}`}>
                  <ListItemText primary={`Name: ${add.firstName} ${add.lastName} Username: ${add.userName}`} />
                  <button onClick={() => dispatch(decideRequest(add.uid, 'add'))}>Add Friend</button>
                </ListItem>
              ))}
            </ul>
          </li>
        ) : ''}

        {filtered[1].length ? (
          <li key='pending'>
            <ul>
              <ListSubheader>
                {`${filtered[1].length} Pending Request(s)`}
              </ListSubheader>
              {filtered[1].map((pending) => (
                <ListItem key={`pending-${pending.uid}`}>
                  <ListItemText primary={`Name: ${pending.firstName}`} />
                  <button onClick={() => dispatch(decideRequest(pending.uid, 'accept'))}>Accept</button>
                  <button onClick={() => dispatch(decideRequest(pending.uid, 'decline'))}>Decline</button>
                </ListItem>
              ))}
            </ul>
          </li>
        ) : ''}

        {filtered[2].length ? (
          <li key='accepted'>
            <ul>
              <ListSubheader>
                {`${filtered[2].length} Friend(s)`}
              </ListSubheader>
              {filtered[2].map((accepted) => (
                <ListItem key={`accepted-${accepted.uid}`}>
                  <ListItemText primary={`Name: ${accepted.firstName}`} />
                  <button>Message</button>
                </ListItem>
              ))}
            </ul>
          </li>
        ) : ''}

        {filtered[3].length ? (
          <li key='requested'>
            <ul>
              <ListSubheader>
                {`${filtered[3].length} Sent Request(s)`}
              </ListSubheader>
              {filtered[3].map((request) => (
                <ListItem key={`request-${request.uid}`}>
                  <ListItemText primary={`Name: ${request.firstName}`} />
                  <button>Send a Reminder</button>
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