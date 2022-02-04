import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material/'
import { doc, getDoc } from 'firebase/firestore'

import { auth } from "../Services/firebase";
import { db } from "../Services/firebase";
import { getFriends } from "../Store/friendsReducer";

const Search = () => {
  
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
        {['Requested', 'Pending', 'Friends'].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
              {[0, 1, 2].map((item) => (
                <ListItem key={`item-${sectionId}-${item}`}>
                  <ListItemText primary={`Item ${item}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </div>
  )
}

export default Search