'use client';
import { useMemo, useState } from 'react';
import { SignUpBasicInfo } from './signupbasicinfo';
import { Box, Button } from '@mui/material';
import { SignUpContactInfo } from './signupcontactinfo';
import { AddLang } from './addlang';
import { SetEventPref } from './seteventpref';
import { SetNewEventNotif } from './setneweventnotif';
// import { SetReminders } from './setreminders';
import { CertificationInfo } from './certificationinfo';
import { AddAccommodations } from './addaccommodation';
import { SignUpReferral } from './signupreferral';
import { SetEmergencyContact } from './setemergencycontact';
import { SignUpFormData } from '@/types/form/signUp';
// import { SetReminders } from './setreminders';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@mui/material/Pagination';

export enum FormEnum {
  BasicInfo = 1,
  Emergency = 2,
  LanguageInfo = 3,
  EventPreferences = 4,
  CertificationInfo = 5,
}

export function SignUpInfoForm({
  user,
  id,
}: {
  user?: Partial<SignUpFormData>;
  id?: string | undefined;
}) {
  const [signUpData, setSignUpFormData] = useState<SignUpFormData>({
    name: user?.name || '',
    image: user?.image || '',
    email: user?.email || '',
    phone: user?.phone || '',
    pronouns: user?.pronouns || '',

    emergencyContact: {
      ecName: user?.emergencyContact?.ecName || '',
      ecPhone: user?.emergencyContact?.ecPhone || '',
    },

    userTags: user?.userTags || [],
    eventPreferences: user?.eventPreferences || [],
    eventNotif: user?.eventNotif || 'No Events',

    certifications: user?.certifications || [
      { certName: '', certDescription: '' },
    ],
    referralSource: user?.referralSource || [],
    accomm: user?.accomm || [],
    otherAccomm: user?.otherAccomm || '',
  });

  const handleChange = (updated: SignUpFormData) => {
    setSignUpFormData(updated);
  };
  const searchParams = useSearchParams();
  const router = useRouter();

  const totalPages = 5;

  // Only read `step` param on first render
  const initialStep = useMemo(() => {
    const param = parseInt(searchParams.get('step') || '1');
    return Math.min(Math.max(isNaN(param) ? 1 : param, 1), totalPages);
  }, [searchParams]); // empty dependency array ensures it's read only once

  const [currentForm, setCurrentForm] = useState<FormEnum>(
    initialStep as FormEnum
  );

  const handleFormChange = (formNum: number) => {
    const params = new URLSearchParams(window.location.search);
    const currentStepParam = params.get('step');

    if (currentStepParam !== formNum.toString()) {
      // Avoid recursive updates
      params.set('step', formNum.toString());
      router.replace(`?${params.toString()}`, { scroll: false }); // avoids pushing multiple history entries
    }
    setCurrentForm(formNum);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateRequest = {
      name: signUpData.name,
      email: signUpData.email,
      image: signUpData.image,
      phone: signUpData.phone,
      userType: 'Volunteer', // Default or determined elsewhere
      pronouns: signUpData.pronouns,
      emergencyContacts: {
        ecName: signUpData.emergencyContact.ecName,
        ecPhone: signUpData.emergencyContact.ecPhone,
      },
      userTags: signUpData.userTags ?? [],
      eventPreferences: signUpData.eventPreferences ?? [],
      reminders: [], // TODO: Add if you implement reminders
      custReminders: [], // TODO: Add if implemented
      newEvents: signUpData.eventNotif,
      referrals: signUpData.referralSource ?? [],
      accomm: signUpData.accomm ?? [],
      otherAccomm: signUpData.otherAccomm ?? '',
      events: [], // Could also be left undefined if your zod schema marks it as optional
    };

    try {
      // const parsed = zUpdateUserRequest.parse(signUpData);
      const parsed = updateRequest;
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsed), // Ensure it matches zod schema
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Update failed:', errorData.message);
        return;
      }

      console.log('User updated successfully');
      // Optionally redirect or show success state
      // router.push('/calendar');
    } catch (error) {
      console.error('Unexpected error:', error);
    }
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
            <AddAccommodations
              data={{
                accomm: signUpData.accomm || [],
                otherAccomm: signUpData.otherAccomm || '',
              }}
              onChange={(updated) =>
                handleChange({
                  ...signUpData,
                  accomm: updated.accomm,
                  otherAccomm: updated.otherAccomm,
                })
              }
            />
          </div>
        )}
        {currentForm === FormEnum.LanguageInfo && (
          <AddLang
            data={{
              languages: ['Spanish', 'French', 'ASL', 'Arabic'], // or fetch from API
              userTags: signUpData.userTags,
            }}
            onChange={(updated) =>
              handleChange({
                ...signUpData,
                userTags: updated.userTags,
              })
            }
          />
        )}
        {currentForm === FormEnum.EventPreferences && (
          <div>
            <SetEventPref
              data={signUpData.eventPreferences}
              onChange={(updated) =>
                handleChange({
                  ...signUpData,
                  eventPreferences: updated,
                })
              }
            />
            <Box mt={3}></Box>
            <SetNewEventNotif
              data={signUpData.eventNotif}
              onChange={(value) =>
                handleChange({
                  ...signUpData,
                  eventNotif: value,
                })
              }
            />
          </div>
        )}
        {currentForm === FormEnum.CertificationInfo && (
          <div>
            <CertificationInfo
              data={[{ certName: '', certDescription: '' }]}
            ></CertificationInfo>
            <Box mt={3}></Box>
            <SignUpReferral
              data={signUpData.referralSource || []}
              onChange={(updated) =>
                handleChange({
                  ...signUpData,
                  referralSource: updated, // keep only the first selected
                })
              }
            />
          </div>
        )}
      </Box>
      <Box display={'flex'} justifyContent={'center'} p={1}>
        <Pagination
          count={totalPages}
          page={currentForm}
          onChange={(event, value) => handleFormChange(value)}
          variant="outlined"
        ></Pagination>
        {currentForm == totalPages && (
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Box>
    </Box>
  );
}
