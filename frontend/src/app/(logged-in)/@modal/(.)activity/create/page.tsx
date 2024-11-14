'use client';

import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import React, { ElementRef, useEffect, useRef } from 'react'

export default function ActivityModal() {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<'dialog'>>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    const onDismiss = () => {
        router.back();
    }

  return (
    <div className="modal-backdrop">
        <dialog ref={dialogRef}>
            <div className="w-[400px] h-full">
                modal
                <Button onClick={onDismiss}>close</Button>
            </div>
        </dialog>
    </div>
  )
}
