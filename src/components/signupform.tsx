'use client';
import { useState } from 'react';
import { SignUpBasicInfo } from './signupbasicinfo';
import { Box, Button, Grid } from '@mui/material';
import { SignUpContactInfo } from './signupcontactinfo';
import { AddLang } from './addlang';
import { SetEventPref } from './seteventpref';
import { SetNewEventNotif } from './setneweventnotif';
// import { SetReminders } from './setreminders';
import { CertificationInfo } from './certificationinfo';
import { AddAccommodations } from './addaccommodation';
import { SignUpReferral } from './signupreferral';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
// import { SetReminders } from './setreminders';

export enum FormEnum {
  BasicInfo,
  Emergency,
  LanguageInfo,
  EventPreferences,
  CertificationInfo,
}

export function SignUpInfoForm() {
  const [currentForm, setCurrentForm] = useState<FormEnum>(FormEnum.BasicInfo);

  return (
    <Box display="flex" flexDirection="column" height="95%">
      <Box
        pb={3}
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          pr: 2,
        }}
      >
        {currentForm === FormEnum.BasicInfo && (
          <div>
            <SignUpBasicInfo></SignUpBasicInfo>
            <Box mt={2}></Box>
            <SignUpContactInfo></SignUpContactInfo>
          </div>
        )}
        {currentForm === FormEnum.Emergency && (
          <div>
            <p>Emergency Contact</p>
            <Box mt={2}></Box>
            <AddAccommodations></AddAccommodations>
          </div>
        )}
        {currentForm === FormEnum.LanguageInfo && (
          <AddLang Languages={['Spanish']} UserTags={[null]}></AddLang>
        )}
        {currentForm === FormEnum.EventPreferences && (
          <div>
            <SetEventPref></SetEventPref>
            <Box mt={2}></Box>
            <SetNewEventNotif></SetNewEventNotif>
            {/*<SetReminders></SetReminders>*/}
          </div>
        )}
        {currentForm === FormEnum.CertificationInfo && (
          <div>
            <CertificationInfo
              data={[{ certName: '', certDescription: '' }]}
            ></CertificationInfo>
            <Box mt={2}></Box>
            <SignUpReferral></SignUpReferral>
          </div>
        )}
      </Box>
      <Grid container spacing={2} width={'100%'} alignSelf="center">
        <Grid item xs={6} sm={6} display={'flex'} justifyContent={'flex-begin'}>
          <Button
            onClick={() => setCurrentForm((currentForm - 1) % 5)}
            variant="contained"
            color="primary"
            startIcon={<NavigateBefore />}
            sx={{
              mt: 2,
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} display={'flex'} justifyContent={'flex-end'}>
          <Button
            onClick={() => setCurrentForm((currentForm + 1) % 5)}
            variant="contained"
            color="primary"
            endIcon={<NavigateNext />}
            sx={{
              mt: 2,
            }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
