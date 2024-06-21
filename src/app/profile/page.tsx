import { getCurrentSessionRedirect } from "@/lib/session";

async function ProfilePage() {

  await getCurrentSessionRedirect();

  return (
    <div>ProfilePage</div>
  );
}

export default ProfilePage;