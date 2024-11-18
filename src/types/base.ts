import { z } from 'zod';
import { zObjectId } from './objectId';

// export const zObjectId = z.string();

export const zBase = z.object({
  // _id: objectIdSchema,
  _id: zObjectId,
  createdAt: z.date(),
  updatedAt: z.date(),
});

//export type Base = z.infer<typeof zBase>;
export interface Base extends z.infer<typeof zBase> {}

export default zBase;
