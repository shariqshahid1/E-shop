const { clerkClient } = require('@clerk/clerk-sdk-node');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token with Clerk
      const { sub: userId } = await clerkClient.verifyToken(token);
      
      if (!userId) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
      }

      // Find user in our DB by Clerk ID
      let user = await User.findOne({ clerkId: userId });
      
      if (!user) {
        // Sync with Clerk if user not in our DB
        const clerkUser = await clerkClient.users.getUser(userId);
        user = await User.create({
          clerkId: userId,
          name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
          email: clerkUser.emailAddresses[0].emailAddress,
          isAdmin: clerkUser.publicMetadata.role === 'admin'
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Clerk Auth Error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };
