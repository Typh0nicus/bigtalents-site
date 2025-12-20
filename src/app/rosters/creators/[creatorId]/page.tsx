import { redirect } from 'next/navigation';

export default function RostersCreatorDetailRedirect({
  params,
}: {
  params: { creatorId: string };
}) {
  redirect(`/creators/${params.creatorId}`);
}
