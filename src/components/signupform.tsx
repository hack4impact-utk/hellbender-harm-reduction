'use client';
import { useState } from 'react';
import { SignUpBasicInfo } from './signupbasicinfo';
import { Button } from '@mui/material';
import { SignUpContactInfo } from './signupcontactinfo';
import { AddLang } from './addlang';
import { SetEventPref } from './seteventpref';
import { SetNewEventNotif } from './setneweventnotif';
// import { SetReminders } from './setreminders';
import { CertificationInfo } from './certificationinfo';
import { AddAccommodations } from './addaccommodation';
import { SignUpReferral } from './signupreferral';
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
    <div>
      {currentForm === FormEnum.BasicInfo && (
        <div>
          <SignUpBasicInfo></SignUpBasicInfo>
          <SignUpContactInfo></SignUpContactInfo>
        </div>
      )}
      {currentForm === FormEnum.Emergency && (
        <div>
          <p>Emergency Contact</p>
          <AddAccommodations></AddAccommodations>
        </div>
      )}
      {currentForm === FormEnum.LanguageInfo && (
        <AddLang Languages={['Spanish']} UserTags={[null]}></AddLang>
      )}
      {currentForm === FormEnum.EventPreferences && (
        <div>
          <SetEventPref></SetEventPref>
          <SetNewEventNotif></SetNewEventNotif>
          {/*<SetReminders></SetReminders>*/}
        </div>
      )}
      {currentForm === FormEnum.CertificationInfo && (
        <div>
          <CertificationInfo
            data={[{ certName: '', certDescription: '' }]}
          ></CertificationInfo>
          <SignUpReferral></SignUpReferral>
        </div>
      )}
      <Button
        onClick={() => setCurrentForm((currentForm + 1) % 5)}
        variant="contained"
      >
        Next
      </Button>
    </div>
  );
}
