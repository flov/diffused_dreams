import ThemedLogo from "@/components/navigation/ThemedLogo";
import verifyUserEmail from "@/db/queries/verifyUserEmail";
import Link from "next/link";

export default async function Page({ params }: { params: { token: string } }) {
  const verified = await verifyUserEmail(params.token);

  return (
    <div className="flex flex-col items-center gap-y-8">
      <ThemedLogo />

      {verified ? (
        <div className=" rounded bg-green-600 text-white text-xl p-4 ">
          Email verified successfully!{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </div>
      ) : (
        <div className="rounded bg-red-600 text-white text-xl p-4 ">
          Token is invalid or expired.{" "}
          <Link href="/verify-email/resend" className="text-blue-600">
            Click here to resend verification email
          </Link>
        </div>
      )}
    </div>
  );
}
