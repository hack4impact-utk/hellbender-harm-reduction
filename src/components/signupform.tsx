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

export enum FormEnum {
  BasicInfo,
  ContactInfo,
  EmergencyContactInfo,
  LanguageInfo,
  EventPreferences,
  NotificationPreferences,
  CertificationInfo,
  AccommodationsPreferences,
  Referrals,
}

export function SignUpInfoForm() {
  const [currentForm, setCurrentForm] = useState<FormEnum>(FormEnum.BasicInfo);

  return (
    <div>
      {currentForm === FormEnum.BasicInfo && (
        <SignUpBasicInfo></SignUpBasicInfo>
      )}
      {currentForm === FormEnum.ContactInfo && (
        <SignUpContactInfo></SignUpContactInfo>
      )}
      {currentForm === FormEnum.EmergencyContactInfo && (
        <p>Emergency Contact</p>
      )}
      {currentForm === FormEnum.LanguageInfo && (
        <AddLang Languages={['Spanish']} UserTags={[null]}></AddLang>
      )}
      {currentForm === FormEnum.EventPreferences && (
        <SetEventPref></SetEventPref>
      )}
      {currentForm === FormEnum.NotificationPreferences && (
        <div>
          <SetNewEventNotif></SetNewEventNotif>
          {/* <SetReminders></SetReminders> */}
        </div>
      )}
      {currentForm === FormEnum.CertificationInfo && (
        <CertificationInfo
          data={[{ certName: '', certDescription: '' }]}
        ></CertificationInfo>
      )}
      {currentForm === FormEnum.AccommodationsPreferences && (
        <AddAccommodations></AddAccommodations>
      )}
      {currentForm === FormEnum.Referrals && <SignUpReferral></SignUpReferral>}
      <Button
        onClick={() => setCurrentForm((currentForm + 1) % 9)}
        variant="contained"
      >
        Next
      </Button>
    </div>
  );
}
