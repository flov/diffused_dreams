import ResendVerificationLinkForm from "@/components/auth/ResendVerificationLinkForm";
import ThemedLogo from "@/components/navigation/ThemedLogo";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-y-6">
      <ThemedLogo />

      <h4 className="text-white text-xl  mt-8">RESEND EMAIL VERIFICATION</h4>

      <ResendVerificationLinkForm />
    </div>
  );
}
