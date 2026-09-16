import { Bank, GraduationCap, UsersThree, Rocket, Cpu, type IconProps } from '@phosphor-icons/react'
import type { IndustryGroup } from '../data/work'

const ICONS: Record<IndustryGroup['icon'], typeof Bank> = {
  bank: Bank,
  graduationCap: GraduationCap,
  usersThree: UsersThree,
  rocket: Rocket,
  cpu: Cpu,
}

export function IndustryIcon({
  icon,
  ...props
}: { icon: IndustryGroup['icon'] } & IconProps) {
  const Component = ICONS[icon]
  return <Component weight="light" {...props} />
}
