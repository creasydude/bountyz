import { Router, Request, Response, NextFunction } from 'express';
import { db } from '@bountyz/database';
import { users } from '@bountyz/database/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Middleware to validate JWT with Privy
const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // Verify JWT with Privy
    // In production, use Privy's server-side verification
    // For now, we'll decode the JWT payload to get the user ID
    const payload = decodeJwtPayload(token);
    
    if (!payload || !payload.sub) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    // Find or create user based on Privy ID
    const privyId = payload.sub;
    
    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.privyId, privyId))
      .limit(1);

    if (existingUser.length > 0) {
      req.body.userId = existingUser[0].id;
    } else {
      // User doesn't exist yet - this shouldn't happen for profile operations
      return res.status(401).json({ error: 'Unauthorized - User not found' });
    }

    next();
  } catch (error) {
    console.error('JWT validation error:', error);
    return res.status(401).json({ error: 'Unauthorized - Token validation failed' });
  }
};

// Helper function to decode JWT payload (simplified)
function decodeJwtPayload(token: string): { sub?: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
    return payload;
  } catch {
    return null;
  }
}

// GET /api/profile - Get user profile
router.get('/', validateJWT, async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, data: user[0] });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/profile - Update user profile
router.put('/', validateJWT, async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const { username, avatarUrl, preferences } = req.body;

    const updatedUser = await db
      .update(users)
      .set({
        username,
        avatarUrl,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    if (updatedUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, data: updatedUser[0] });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/profile - Delete user profile
router.delete('/', validateJWT, async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;

    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, userId))
      .returning();

    if (deletedUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
