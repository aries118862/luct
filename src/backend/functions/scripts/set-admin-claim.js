const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const email = process.argv[2]?.trim().toLowerCase();

if (!email) {
  console.error('Usage: node scripts/set-admin-claim.js <existing-user-email>');
  process.exit(1);
}

const { projectId } = require('../config');

initializeApp({ projectId });

async function grantInitialStaffAccess() {
  const auth = getAuth();
  const user = await auth.getUserByEmail(email);
  await auth.setCustomUserClaims(user.uid, {
    ...user.customClaims,
    admin: true,
  });
  console.log(`Staff access granted to ${user.email}. Ask them to sign out and sign in again.`);
}

grantInitialStaffAccess().catch((error) => {
  console.error(`Could not grant staff access: ${error.message}`);
  process.exitCode = 1;
});
