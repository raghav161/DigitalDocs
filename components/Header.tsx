import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header flex items-center p-4", className)}>
      <Link href='/' className="flex items-center md:flex-1">
        <Image 
          src="/assets/icons/logo-icon.svg"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2 hidden md:block"
        />
        <span className="text-lg font-bold">DigitalDocs</span>
      </Link>
      {children}
    </div>
  )
}

export default Header
