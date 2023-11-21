import { styles } from '@/app/utils/style';
import { User } from '@clerk/nextjs/server';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import React from 'react'

type Props = {
    user: User | null;
    setOpen:(open:boolean) =>void
    handleProfile:()=>void;
    isSellerExists:boolean;
}

const DropDown = ({user,setOpen,handleProfile,isSellerExists}:Props) => {
    console.log(user?.imageUrl);
  return (
    <Dropdown placeholder='bottom-start'>
          <DropdownTrigger>
              <Avatar 
                src={user?.imageUrl}
                about=""
                className='w-[40px] h-[40px] cursor-pointer'
              />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Action' variant='flat'>
                <DropdownItem 
                  onClick={() =>{
                    handleProfile();
                    setOpen(false)
                  }}
                
                >
                 <div className="flex w-full items-center">
                    <Avatar 
                     src={user?.imageUrl}
                     about=""
                     className='w-[30px] h-[30px] cursor-pointer'
                     />
                     <span className={`${styles.label} text-black text-[16px] pl-2`}>
                        MY Profile
                     </span>
                 </div>
                </DropdownItem>
          </DropdownMenu>
    </Dropdown>
  )
}

export default DropDown;