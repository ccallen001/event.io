import { auth } from '@clerk/nextjs';

// clerk user public metadata
interface IUserPublicMetadata {
  userId: string;
}

export function useUserPublicMetadata() {
  const { sessionClaims } = auth();
  return (
    (sessionClaims?.userPublicMetadata as IUserPublicMetadata) || {
      userId: null
    }
  );
}
