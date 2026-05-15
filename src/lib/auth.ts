import { auth, currentUser } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function getBackendUser() {
  const { userId } = await auth();
  if (!userId) return null;

  await connectDB();
  let user = await User.findOne({ clerkId: userId });

  if (!user) {
    const clerkUser = await currentUser();
    if (clerkUser) {
      user = await User.create({
        clerkId: userId,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
        email: clerkUser.emailAddresses[0].emailAddress,
        isAdmin: clerkUser.publicMetadata.role === 'admin'
      });
    }
  }

  return user;
}
