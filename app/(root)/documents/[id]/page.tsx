import CollaborativeRoom from "@/components/CollaborativeRoom"
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const Document = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0]?.emailAddress || '', // Fallback to empty string if email is undefined
  });

  if (!room) redirect('/');

  const userIds = Object.keys(room.usersAccesses || {}); // Fallback to empty object if undefined
  const users = await getClerkUsers({ userIds });

  const usersData = users
    .filter((user: User) => user?.email && room.usersAccesses?.[user.email]) // Ensure user and email are valid
    .map((user: User) => ({
      ...user,
      userType: room.usersAccesses?.[user.email]?.includes('room:write') ? 'editor' : 'viewer',
    }));

  const currentUserEmail = clerkUser.emailAddresses[0]?.emailAddress || '';
  const currentUserType = room.usersAccesses?.[currentUserEmail]?.includes('room:write') ? 'editor' : 'viewer';

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
};

export default Document;
