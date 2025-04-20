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
import { SetEmergencyContact } from './setemergencycontact';
import { SignUpFormData } from '@/types/form/signUp';
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
  const [signUpData, setSignUpFormData] = useState<SignUpFormData>({
    name: '',
    image: '',
    email: '',
    phone: '',
    pronouns: '',

    emergencyContact: {
      ecName: '',
      ecPhone: '',
    },

    languages: [],
    eventPreferences: [],
    wantsNewEventNotifications: false,

    certifications: [{ certName: '', certDescription: '' }],
    referralSource: '',
    accommodations: [],
  });

  const handleChange = (updated: SignUpFormData) => {
    setSignUpFormData(updated);
  };

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
            <SignUpBasicInfo
              data={{
                name: signUpData.name,
                image: signUpData.image,
                pronouns: signUpData.pronouns,
              }}
              onChange={(updated) =>
                handleChange({
                  ...signUpData,
                  ...updated,
                })
              }
            ></SignUpBasicInfo>
            <Box mt={3}></Box>
            <SignUpContactInfo
              data={{
                phone: signUpData.phone,
                email: signUpData.email,
              }}
              onChange={(updated) =>
                handleChange({
                  ...signUpData,
                  ...updated,
                })
              }
            ></SignUpContactInfo>
          </div>
        )}
        {currentForm === FormEnum.Emergency && (
          <div>
            <SetEmergencyContact
              data={{
                ecName: signUpData.emergencyContact.ecName,
                ecPhone: signUpData.emergencyContact.ecPhone,
              }}
              onChange={(updated) =>
                handleChange({
                  ...signUpData,
                  emergencyContact: {
                    ...signUpData.emergencyContact,
                    ...updated,
                  },
                })
              }
            ></SetEmergencyContact>
            <Box mt={3}></Box>
            <AddAccommodations></AddAccommodations>
          </div>
        )}
        {currentForm === FormEnum.LanguageInfo && (
          <AddLang Languages={['Spanish']} UserTags={[null]}></AddLang>
        )}
        {currentForm === FormEnum.EventPreferences && (
          <div>
            <SetEventPref></SetEventPref>
            <Box mt={3}></Box>
            <SetNewEventNotif></SetNewEventNotif>
          </div>
        )}
        {currentForm === FormEnum.CertificationInfo && (
          <div>
            <CertificationInfo
              data={[{ certName: '', certDescription: '' }]}
            ></CertificationInfo>
            <Box mt={3}></Box>
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
