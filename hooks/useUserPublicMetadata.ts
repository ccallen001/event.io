import { auth } from '@clerk/nextjs';

// clerk user public metadata
interface IUserPublicMetadata {
  userId: string;
}

export function useUserPublicMetadata() {
  const { sessionClaims } = auth();
  const userPublicMetadata =
    sessionClaims?.userPublicMetadata as IUserPublicMetadata;
  return userPublicMetadata || null;
}
