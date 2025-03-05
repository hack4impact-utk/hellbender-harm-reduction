import dbConnect from '@/utils/db-connect';
import CertSchema from '@/server/models/certification';
import {
  CreateCertRequest,
  CertResponse,
  UpdateCertRequest,
} from '@/types/certification';
import { isValidObjectId } from 'mongoose';

export async function getAllCerts(): Promise<CertResponse[]> {
  let response: CertResponse[];
  try {
    await dbConnect();

    response = await CertSchema.find();
  } catch (error) {
    throw error;
  }
  return response;
}

export async function createCert(
  event: CreateCertRequest
): Promise<CertResponse> {
  await dbConnect();

  const response = await CertSchema.create(event);

  return response as CertResponse;
}

export async function deleteCert(certId: string): Promise<void> {
  if (isValidObjectId(certId)) {
    try {
      await dbConnect();
      await CertSchema.deleteMany({
        cert: certId,
      });

      const res = await CertSchema.findByIdAndDelete(certId);
      if (!res) {
        throw new Error('500 Could Not Delete');
      }
    } catch (error) {
      throw error;
    }
  }
}

export async function getCert(certId: string): Promise<CertResponse | null> {
  if (!isValidObjectId(certId)) {
    throw new Error('400 Bad Id');
  }

  let target; // : CertResponse | null;
  try {
    await dbConnect();
    target = await CertSchema.findById(certId);
  } catch (error) {
    throw new Error('500 Certification lookup failed');
  }

  if (!target) {
    throw new Error('404 Certification not found');
  }

  return target as CertResponse;
}

export async function updateCert(
  certId: string,
  certUpdatesRequest: UpdateCertRequest
): Promise<void> {
  if (!isValidObjectId(certId)) {
    throw new Error('400 Bad Certification Id');
  }

  if (!certUpdatesRequest || Object.keys(certUpdatesRequest).length === 0) {
    throw new Error('500 Bad UpdateCertRequest');
  }

  let res;
  try {
    await dbConnect();
    res = await CertSchema.findByIdAndUpdate(certId, certUpdatesRequest);
  } catch (error) {
    throw new Error('500 Could Not Update');
  }

  if (!res) {
    throw new Error('404 Certification Not Found');
  }
}

export async function getCertBy(query: object): Promise<CertResponse[] | null> {
  let target: CertResponse[] | null;

  try {
    await dbConnect();
    target = await CertSchema.find(query);
  } catch (error) {
    throw new Error('500 Certification lookup failed');
  }

  if (!target) {
    throw new Error('404 Certifications not found');
  }

  return target;
}
