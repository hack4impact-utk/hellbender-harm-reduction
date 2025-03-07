'use client'
import { TextField, Select, Button, Grid, Typography, Box, IconButton, MenuItem, InputLabel } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';

export function AddEmergContact() {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5"> Name </Typography>
                <TextField id="Name" fullWidth />
                {/* No need for a variant="outlined" attribute since it is the TextField default */}
            </Grid >
            {/* <Grid item xs={12}>
            </Grid > */}
            <Grid item xs={12}>
                <Typography variant="h5"> Email </Typography>
                <TextField id="Email" fullWidth />
            </Grid>
            <Grid item xs={12}>
                {/* Google autopopulates this field if we just call it 'address' instead of 'physical address' */}
                <Typography variant="h5"> Address </Typography>
                <TextField id="Address" fullWidth />
            </Grid>
            <Grid container item columnSpacing={2} xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h5"> Phone </Typography>
                </Grid>
                <Grid item xs="auto">
                    <TextField id="PhoneType" select defaultValue="Mobile"> {/*I chose to use a textfield since it already had an implementation of the select component*/}
                        <MenuItem key="Mobile" value="Mobile">Mobile</MenuItem>
                        <MenuItem key="Work" value="Work">Work</MenuItem>
                        <MenuItem key="Home" value="Home">Home</MenuItem>
                    </TextField>
                </Grid>
                {/* Having no size be defined makes the grid item take up the rest of available space */}
                <Grid item xs> 
                    <TextField id="Phone" fullWidth />
                </Grid>
                <Grid item xs="auto">
                    <IconButton aria-label="AddBoxIcon">
                        <AddBoxIcon />
                    </IconButton>
                </Grid>
            </Grid>

        </Grid>
    )
}