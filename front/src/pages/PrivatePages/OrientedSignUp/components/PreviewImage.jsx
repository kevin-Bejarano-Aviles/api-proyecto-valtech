import { useState,useRef } from "react";
import addAvatar from '../../../../assets/icons/privatePage/add-avatar.svg';
import iconPlus from '../../../../assets/icons/icon-plus.svg';

function PreviewImage({file,change}) {
    const fileInputRef=useRef();
    const [preview,setPreview]=useState(addAvatar);
    if (file) {
    const reader=new FileReader();
    reader.readAsDataURL(file)
    reader.onload=()=>{
        setPreview(reader.result)
    }
}
    return (
        <label htmlFor='avatar' className='text-sm'>
		<input type='file'						
			    accept='.png, .jpg, .jpeg, .gif'
				name='avatar'
                hidden={true}
				onChange={change}
                ref={fileInputRef}
			/> 
        <div className='relative mobile:w-[96px]'
             onClick={(e)=>{
            e.preventDefault();
           fileInputRef.current.click() 
        }} >
            <img
                src={preview}
                alt='avatar'
                className='w-[96px] h-[96px] cursor-pointer rounded-full'
                id='selectedImage'
                />
            <img src={iconPlus} alt='Agregar imagen' className='absolute bottom-0 right-0' />
        </div>
        </label>

     );
}

export default PreviewImage;