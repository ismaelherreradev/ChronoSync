import { headingFont } from "@/fonts"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/">
      <div className="item-center hidden gap-x-2 transition hover:opacity-75 md:flex">
        <Image
          src="/logo.svg"
          alt="Taskify"
          width={40}
          height={40}
          className="mr-2"
        />
        <p className={cn("pb-1 text-lg", headingFont.className)}>Taskify</p>
      </div>
    </Link>
  )
}
