'use client'
import { TextField, Select, Button, Grid, Typography, Box } from "@mui/material"

export function AddEmergContact() {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5"> Name </Typography>
                <TextField id="Name" fullWidth />
                {/* No need for a variant="outlined" attribute since it is the TextField default */}
            </Grid >
            <Grid item xs={12}>
                <Typography variant="h5"> Phone </Typography>
            </Grid >
            <Grid item xs="auto">
                <h5> yo MOMMA </h5>
            </Grid>
            {/* Having no size be defined makes the grid item take up the rest of available space */}
            <Grid item xs> 
                <TextField id="Phone" fullWidth />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5"> Email </Typography>
                <TextField id="Email" fullWidth />
            </Grid>
            <Grid item xs={12}>
                {/* Google autopopulates this field if we just call it 'address' instead of 'physical address' */}
                <Typography variant="h5"> Address </Typography>
                <TextField id="Address" fullWidth />
            </Grid>

        </Grid>
    )
}