"use client"

import { signout } from '@/lib/api'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { LogOut } from 'react-feather'


export default function SignoutButton() {
  const router = useRouter()

  async function onClickEvent() {
    try {
      await signout()
    }
    finally {
      router.replace("/signin")
    }
  }

  return (
    <button className="w-full flex justify-center items-center" onClick={onClickEvent}>
      <LogOut
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out cursor-pointer",

        )}
      />
    </button>
  )
}
