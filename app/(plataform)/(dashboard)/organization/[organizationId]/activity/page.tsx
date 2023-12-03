import { Suspense } from 'react'

import { Separator } from '@/components/ui/separator'

import { ActivityList } from './_components/activity-list'

export default async function ActivityPage() {
  return (
    <div className="w-full">
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  )
}
