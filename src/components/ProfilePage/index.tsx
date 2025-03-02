import { Avatar, TextField, Stack } from "@mui/material";

interface basicInfoProps {
    profilePicture: string,
    name: string,
    pronouns: string
}

// Uses a stack for natural vertical formatting
export function BasicInfo(props: basicInfoProps) {
    return (
        <Stack spacing={2} alignItems="center">
            <Avatar alt={props.name} src={props.profilePicture} sx={{ width: 200, height: 200, }} />
            <TextField disabled id="outlined-basic" defaultValue={props.name} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
            <TextField disabled id="outlined-basic" defaultValue={props.pronouns} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
        </Stack>
    );
}